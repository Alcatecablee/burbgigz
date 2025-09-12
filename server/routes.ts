import { Router, type Express } from "express";
import { storage } from "./storage";
import { 
  insertBookingSchema, 
  updateBookingSchema,
  insertContactSchema,
  updateContactStatusSchema,
  insertServiceAreaSchema,
  insertServicePricingSchema
} from "../shared/schema";
import { z } from "zod";

// Validation middleware for Zod schemas
function validateBody(schema: z.ZodSchema) {
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

// Template-expected export: register function that mounts routes on Express app
export default function register(app: Express) {
  app.use("/api", router);
  console.log("[SUCCESS] API routes registered at /api");
}

// Also export the router for testing if needed
export { router };