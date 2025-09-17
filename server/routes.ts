import { Router, type Express } from "express";
import { storage } from "./storage";
import { setupSupabaseAuth, isAuthenticated, optionalAuth } from "./supabaseAuth";
import supabaseInitRoutes from "./routes/supabaseInit";
import multer from "multer";
import path from "path";
import fs from "fs"; import { promisify } from "util";
const unlinkAsync = promisify(fs.unlink);
import { 
  insertBookingSchema, 
  updateBookingSchema,
  insertContactSchema,
  updateContactStatusSchema,
  insertServiceAreaSchema,
  insertServicePricingSchema,
  insertFileAttachmentSchema,
  insertServiceSessionSchema,
  insertCustomerInteractionSchema
} from "../shared/schema";
import { z } from "zod";

// Configure multer for file uploads
const uploadStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: uploadStorage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: function (req, file, cb) {
    // Allow common file types for IT support
    const allowedTypes = /jpeg|jpg|png|gif|pdf|txt|doc|docx|zip|rar|log/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only images, documents, and archives are allowed'));
    }
  }
});

// Validation middleware for Zod schemas
function validateBody(schema: z.ZodTypeAny) {
  return (req: any, res: any, next: any) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          error: "Validation failed", 
          details: error.errors 
        });
      }
      return res.status(400).json({ error: "Invalid request body" });
    }
  };
}

// Authorization middleware for file access
async function canAccessFile(req: any, res: any, next: any) {
  try {
    const fileId = parseInt(req.params.id);
    if (isNaN(fileId)) {
      return res.status(400).json({ error: "Invalid file ID" });
    }

    const file = await storage.getFileAttachmentById(fileId);
    if (!file) {
      return res.status(404).json({ error: "File not found" });
    }

    const replitUserId = req.user.claims.sub;
    const user = await storage.getUser(replitUserId);
    if (!user) {
      return res.status(403).json({ error: "User not found" });
    }

    // Check if file is public
    if (file.isPublic) {
      req.file = file;
      return next();
    }

    // Check ownership through various associations
    let hasAccess = false;

    // Check if user uploaded the file
    if (file.uploadedBy === replitUserId) {
      hasAccess = true;
    }

    // Check if user owns the customer record
    if (file.customerId === user.id) {
      hasAccess = true;
    }

    // Check if user owns the booking
    if (file.bookingId) {
      const booking = await storage.getBookingById(file.bookingId);
      if (booking && booking.email === user.email) {
        hasAccess = true;
      }
    }

    // Check if user has access to the session
    if (file.sessionId) {
      const session = await storage.getServiceSessionById(file.sessionId);
      if (session && session.customerId === user.id) {
        hasAccess = true;
      }
    }

    if (!hasAccess) {
      return res.status(403).json({ error: "Access denied: You don't have permission to access this file" });
    }

    req.file = file;
    next();
  } catch (error) {
    console.error("Error in file authorization:", error);
    res.status(500).json({ error: "Authorization check failed" });
  }
}

// Validate file upload data
function validateFileUpload(req: any, res: any, next: any) {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const fileData = {
      sessionId: req.body.sessionId ? parseInt(req.body.sessionId) : null,
      bookingId: req.body.bookingId ? parseInt(req.body.bookingId) : null,
      customerId: req.body.customerId ? parseInt(req.body.customerId) : null,
      fileName: req.file.filename,
      originalName: req.file.originalname,
      fileType: req.body.fileType || path.extname(req.file.originalname).toLowerCase().substring(1),
      fileSize: req.file.size,
      mimeType: req.file.mimetype,
      filePath: req.file.path,
      description: req.body.description || null,
      isPublic: req.body.isPublic === 'true',
      uploadedBy: req.user.claims.sub,
    };

    // Validate using the schema
    const validatedData = insertFileAttachmentSchema.parse(fileData);
    req.validatedFileData = validatedData;
    next();
  } catch (error) {
    // Clean up uploaded file on validation failure
    if (req.file && req.file.path) {
      fs.unlink(req.file.path, (unlinkError) => {
        if (unlinkError) console.error("Error cleaning up file:", unlinkError);
      });
    }
    
    if (error instanceof z.ZodError) {
      return res.status(400).json({ 
        error: "File validation failed", 
        details: error.errors 
      });
    }
    return res.status(400).json({ error: "Invalid file data" });
  }
}

// Express router setup
const router = Router();

// Health check endpoint
router.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Booking routes
router.post("/bookings", validateBody(insertBookingSchema), async (req, res) => {
  try {
    const booking = await storage.createBooking(req.body);
    res.status(201).json(booking);
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ error: "Failed to create booking" });
  }
});

router.get("/bookings", async (req, res) => {
  try {
    const bookings = await storage.getBookings();
    res.json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
});

router.get("/bookings/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid booking ID" });
    }
    
    const booking = await storage.getBookingById(id);
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }
    res.json(booking);
  } catch (error) {
    console.error("Error fetching booking:", error);
    res.status(500).json({ error: "Failed to fetch booking" });
  }
});

router.patch("/bookings/:id", validateBody(updateBookingSchema), async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid booking ID" });
    }
    
    const booking = await storage.updateBooking(id, req.body);
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }
    res.json(booking);
  } catch (error) {
    console.error("Error updating booking:", error);
    res.status(500).json({ error: "Failed to update booking" });
  }
});

router.delete("/bookings/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid booking ID" });
    }
    
    const success = await storage.deleteBooking(id);
    if (!success) {
      return res.status(404).json({ error: "Booking not found" });
    }
    res.json({ message: "Booking deleted successfully" });
  } catch (error) {
    console.error("Error deleting booking:", error);
    res.status(500).json({ error: "Failed to delete booking" });
  }
});

// Contact routes
router.post("/contacts", validateBody(insertContactSchema), async (req, res) => {
  try {
    const contact = await storage.createContact(req.body);
    res.status(201).json(contact);
  } catch (error) {
    console.error("Error creating contact:", error);
    res.status(500).json({ error: "Failed to create contact" });
  }
});

router.get("/contacts", async (req, res) => {
  try {
    const contacts = await storage.getContacts();
    res.json(contacts);
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({ error: "Failed to fetch contacts" });
  }
});

router.patch("/contacts/:id/status", validateBody(updateContactStatusSchema), async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid contact ID" });
    }
    
    const contact = await storage.updateContactStatus(id, req.body.status);
    if (!contact) {
      return res.status(404).json({ error: "Contact not found" });
    }
    res.json(contact);
  } catch (error) {
    console.error("Error updating contact status:", error);
    res.status(500).json({ error: "Failed to update contact status" });
  }
});

// Service area routes
router.get("/service-areas", async (req, res) => {
  try {
    const areas = await storage.getActiveServiceAreas();
    res.json(areas);
  } catch (error) {
    console.error("Error fetching service areas:", error);
    res.status(500).json({ error: "Failed to fetch service areas" });
  }
});

router.post("/service-areas", validateBody(insertServiceAreaSchema), async (req, res) => {
  try {
    const area = await storage.createServiceArea(req.body);
    res.status(201).json(area);
  } catch (error) {
    console.error("Error creating service area:", error);
    res.status(500).json({ error: "Failed to create service area" });
  }
});

// Service pricing routes
router.get("/service-pricing", async (req, res) => {
  try {
    const pricing = await storage.getActiveServicePricing();
    res.json(pricing);
  } catch (error) {
    console.error("Error fetching service pricing:", error);
    res.status(500).json({ error: "Failed to fetch service pricing" });
  }
});

router.post("/service-pricing", validateBody(insertServicePricingSchema), async (req, res) => {
  try {
    const pricing = await storage.createServicePricing(req.body);
    res.status(201).json(pricing);
  } catch (error) {
    console.error("Error creating service pricing:", error);
    res.status(500).json({ error: "Failed to create service pricing" });
  }
});

// File attachment routes with enhanced security
router.post("/files/upload", isAuthenticated, upload.single('file'), validateFileUpload, async (req: any, res) => {
  try {
    const fileAttachment = await storage.createFileAttachment(req.validatedFileData);
    res.status(201).json(fileAttachment);
  } catch (error) {
    console.error("Error uploading file:", error);
    
    // Clean up uploaded file on database error
    if (req.file && req.file.path) {
      fs.unlink(req.file.path, (unlinkError) => {
        if (unlinkError) console.error("Error cleaning up file:", unlinkError);
      });
    }
    
    res.status(500).json({ error: "Failed to upload file" });
  }
});

// Secure file download endpoint
router.get("/files/:id/download", isAuthenticated, canAccessFile, async (req: any, res) => {
  try {
    const file = req.file;
    
    // Check if file exists on disk
    if (!fs.existsSync(file.filePath)) {
      return res.status(404).json({ error: "File not found on disk" });
    }

    // Set appropriate headers
    res.setHeader('Content-Type', file.mimeType || 'application/octet-stream');
    res.setHeader('Content-Disposition', `attachment; filename="${file.originalName}"`);
    res.setHeader('Content-Length', file.fileSize);
    res.setHeader('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');

    // Stream the file
    const fileStream = fs.createReadStream(file.filePath);
    fileStream.pipe(res);
    
    fileStream.on('error', (error) => {
      console.error('Error streaming file:', error);
      if (!res.headersSent) {
        res.status(500).json({ error: "Failed to stream file" });
      }
    });
  } catch (error) {
    console.error("Error in file download:", error);
    res.status(500).json({ error: "Failed to download file" });
  }
});

router.get("/files", isAuthenticated, async (req: any, res) => {
  try {
    const replitUserId = req.user.claims.sub;
    const user = await storage.getUser(replitUserId);
    if (!user) {
      return res.status(403).json({ error: "User not found" });
    }

    const sessionId = req.query.sessionId ? parseInt(req.query.sessionId as string) : undefined;
    const bookingId = req.query.bookingId ? parseInt(req.query.bookingId as string) : undefined;
    const customerId = req.query.customerId ? parseInt(req.query.customerId as string) : undefined;
    
    // Verify user has access to requested filters
    if (sessionId) {
      const session = await storage.getServiceSessionById(sessionId);
      if (!session || session.customerId !== user.id) {
        return res.status(403).json({ error: "Access denied: You don't have access to this session" });
      }
    }
    
    if (bookingId) {
      const booking = await storage.getBookingById(bookingId);
      if (!booking || booking.email !== user.email) {
        return res.status(403).json({ error: "Access denied: You don't have access to this booking" });
      }
    }
    
    if (customerId && customerId !== user.id) {
      return res.status(403).json({ error: "Access denied: You can only access your own files" });
    }
    
    const files = await storage.getFileAttachments(sessionId, bookingId, customerId || user.id);
    
    // Filter files based on access permissions
    const accessibleFiles = files.filter(file => {
      return file.isPublic || 
             file.uploadedBy === replitUserId || 
             file.customerId === user.id;
    });
    
    res.json(accessibleFiles);
  } catch (error) {
    console.error("Error fetching files:", error);
    res.status(500).json({ error: "Failed to fetch files" });
  }
});

router.get("/files/:id", isAuthenticated, canAccessFile, async (req: any, res) => {
  try {
    // File access already verified by canAccessFile middleware
    res.json(req.file);
  } catch (error) {
    console.error("Error fetching file:", error);
    res.status(500).json({ error: "Failed to fetch file" });
  }
});

router.delete("/files/:id", isAuthenticated, canAccessFile, async (req: any, res) => {
  try {
    const file = req.file;
    
    // Additional check: only uploader or file owner can delete
    const replitUserId = req.user.claims.sub;
    const user = await storage.getUser(replitUserId);
    
    if (file.uploadedBy !== replitUserId && file.customerId !== user?.id) {
      return res.status(403).json({ error: "Access denied: You can only delete files you uploaded or own" });
    }
    
    // Delete from database first
    const success = await storage.deleteFileAttachment(file.id);
    if (!success) {
      return res.status(404).json({ error: "File not found" });
    }
    
    // Delete physical file
    try {
      if (fs.existsSync(file.filePath)) {
        await unlinkAsync(file.filePath);
      }
    } catch (unlinkError) {
      console.error("Error deleting physical file:", unlinkError);
      // Continue - database record is already deleted
    }
    
    res.json({ message: "File deleted successfully" });
  } catch (error) {
    console.error("Error deleting file:", error);
    res.status(500).json({ error: "Failed to delete file" });
  }
});

// Service session routes
router.post("/sessions", isAuthenticated, validateBody(insertServiceSessionSchema), async (req, res) => {
  try {
    const session = await storage.createServiceSession(req.body);
    res.status(201).json(session);
  } catch (error) {
    console.error("Error creating service session:", error);
    res.status(500).json({ error: "Failed to create service session" });
  }
});

router.get("/sessions", isAuthenticated, async (req: any, res) => {
  try {
    const customerId = req.query.customerId ? parseInt(req.query.customerId as string) : undefined;
    const sessions = await storage.getServiceSessions(customerId);
    res.json(sessions);
  } catch (error) {
    console.error("Error fetching sessions:", error);
    res.status(500).json({ error: "Failed to fetch sessions" });
  }
});

router.get("/sessions/:id", isAuthenticated, async (req: any, res) => {
  try {
    const session = await storage.getServiceSessionById(parseInt(req.params.id));
    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }
    
    // Transform session status to match frontend expectations
    const transformedSession = {
      ...session,
      status: mapSessionStatus(session.status)
    };
    
    res.json(transformedSession);
  } catch (error) {
    console.error("Error fetching session:", error);
    res.status(500).json({ error: "Failed to fetch session" });
  }
});

// Transform backend status to frontend expected values
function mapSessionStatus(backendStatus: string): string {
  switch (backendStatus) {
    case 'active':
    case 'connecting':
      return 'in_progress';
    case 'scheduled':
      return 'scheduled';
    case 'completed':
      return 'completed';
    case 'cancelled':
      return 'cancelled';
    case 'paused':
      return 'paused';
    default:
      return backendStatus;
  }
}

// Transform backend SessionStatusUpdate to frontend expected format
function transformStatusUpdate(update: any) {
  return {
    id: update.id,
    sessionId: update.sessionId,
    technicianId: update.technicianName ? 1 : undefined, // Mock technician ID
    updateType: update.status ? 'status_change' : update.progress !== undefined ? 'progress' : 'note',
    title: update.message || `Status changed to ${mapSessionStatus(update.status)}`,
    description: update.message,
    progress: update.progress || (update.status === 'completed' ? 100 : update.status === 'active' ? 65 : 0),
    timestamp: update.createdAt, // Transform createdAt to timestamp
    isVisible: update.isCustomerVisible !== false,
  };
}

router.get("/sessions/:id/updates", isAuthenticated, async (req: any, res) => {
  try {
    const sessionId = parseInt(req.params.id);
    
    // First check if session exists and user has access
    const session = await storage.getServiceSessionById(sessionId);
    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }
    
    // Get user from auth
    const replitUserId = req.user.claims.sub;
    const user = await storage.getUser(replitUserId);
    
    // Check if user owns this session
    if (session.customerId !== user?.id) {
      return res.status(403).json({ error: "Access denied" });
    }
    
    const updates = await storage.getSessionStatusUpdates(sessionId);
    // Transform the data to match frontend expectations
    const transformedUpdates = updates.map(transformStatusUpdate);
    res.json(transformedUpdates);
  } catch (error) {
    console.error("Error fetching session updates:", error);
    res.status(500).json({ error: "Failed to fetch session updates" });
  }
});

// Template-expected export: register function that mounts routes on Express app
export default async function register(app: Express) {
  // Setup authentication first
  await setupSupabaseAuth(app);

  // Add auth-specific routes
  router.get('/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.id;
      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  app.use("/api", router);
  
  // Only enable initialization routes in development
  if (process.env.NODE_ENV !== 'production') {
    app.use("/api/supabase", supabaseInitRoutes);
    console.log("[DEV] Supabase initialization routes available at /api/supabase");
  }
  
  console.log("[SUCCESS] API routes registered at /api");
  console.log("[SUCCESS] Authentication system enabled");
}

// Also export the router for testing if needed
export { router };