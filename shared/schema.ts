import { pgTable, serial, varchar, text, timestamp, integer, boolean, jsonb, index } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Status and urgency enums
export const bookingStatusEnum = z.enum(["pending", "confirmed", "in-progress", "completed", "cancelled"]);
export const contactStatusEnum = z.enum(["new", "responded", "closed"]);
export const urgencyEnum = z.enum(["urgent", "normal", "scheduled"]);
export const serviceTypeEnum = z.enum(["remote", "onsite"]);
export const preferredContactEnum = z.enum(["email", "phone", "whatsapp"]);
export const sessionStatusEnum = z.enum(["scheduled", "connecting", "active", "paused", "completed", "cancelled"]);
export const interactionTypeEnum = z.enum(["call", "email", "whatsapp", "sms", "in-person"]);
export const fileTypeEnum = z.enum(["screenshot", "report", "invoice", "document", "image"]);

// Bookings table for IT support service requests
export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  customerName: varchar("customer_name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }).notNull(),
  serviceType: varchar("service_type", { length: 100 }).notNull(),
  serviceCategory: varchar("service_category", { length: 100 }).notNull(),
  serviceArea: varchar("service_area", { length: 100 }),
  preferredDate: varchar("preferred_date", { length: 50 }),
  preferredTime: varchar("preferred_time", { length: 50 }),
  description: text("description"),
  urgency: varchar("urgency", { length: 50 }).default("normal"),
  estimatedPrice: integer("estimated_price").default(0),
  calloutFee: integer("callout_fee").default(0),
  status: varchar("status", { length: 50 }).default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Contact form submissions
export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }),
  subject: varchar("subject", { length: 255 }),
  message: text("message").notNull(),
  isNewCustomer: boolean("is_new_customer").default(true),
  preferredContact: varchar("preferred_contact", { length: 50 }).default("email"),
  status: varchar("status", { length: 50 }).default("new"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Service areas and pricing (for dynamic management)
export const serviceAreas = pgTable("service_areas", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  description: text("description"),
  calloutFee: integer("callout_fee").notNull(),
  distanceKm: integer("distance_km").notNull(),
  availability: varchar("availability", { length: 255 }).notNull(),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Service pricing tiers
export const servicePricing = pgTable("service_pricing", {
  id: serial("id").primaryKey(),
  serviceCategory: varchar("service_category", { length: 100 }).notNull(),
  serviceName: varchar("service_name", { length: 255 }).notNull(),
  basePrice: integer("base_price").notNull(),
  description: text("description"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Session storage table (required for Replit Auth)
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// Users table for customer authentication (compatible with Replit Auth)
export const users = pgTable("users", {
  id: serial("id").primaryKey(), // Keep serial ID as per database safety rules
  email: varchar("email", { length: 255 }).unique(),
  name: varchar("name", { length: 255 }), // Combined name field
  firstName: varchar("first_name", { length: 255 }),
  lastName: varchar("last_name", { length: 255 }),
  phone: varchar("phone", { length: 50 }),
  profileImageUrl: varchar("profile_image_url", { length: 500 }),
  passwordHash: text("password_hash"),
  replitUserId: varchar("replit_user_id", { length: 255 }).unique(), // For Replit Auth integration
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Service sessions for real-time tracking
export const serviceSessions = pgTable("service_sessions", {
  id: serial("id").primaryKey(),
  bookingId: integer("booking_id").references(() => bookings.id),
  customerId: integer("customer_id").references(() => users.id),
  sessionTitle: varchar("session_title", { length: 255 }).notNull(),
  status: varchar("status", { length: 50 }).default("scheduled"),
  startTime: timestamp("start_time"),
  endTime: timestamp("end_time"),
  estimatedDuration: integer("estimated_duration_minutes").default(60),
  actualDuration: integer("actual_duration_minutes"),
  technicianNotes: text("technician_notes"),
  customerFeedback: text("customer_feedback"),
  issuesResolved: text("issues_resolved"),
  issuesPending: text("issues_pending"),
  totalCost: integer("total_cost").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Customer interaction history
export const customerInteractions = pgTable("customer_interactions", {
  id: serial("id").primaryKey(),
  customerId: integer("customer_id").references(() => users.id),
  sessionId: integer("session_id").references(() => serviceSessions.id),
  bookingId: integer("booking_id").references(() => bookings.id),
  interactionType: varchar("interaction_type", { length: 50 }).notNull(),
  subject: varchar("subject", { length: 255 }),
  message: text("message").notNull(),
  direction: varchar("direction", { length: 20 }).notNull(), // incoming or outgoing
  technicianName: varchar("technician_name", { length: 255 }),
  isRead: boolean("is_read").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// File attachments for screenshots, reports, and documents
export const fileAttachments = pgTable("file_attachments", {
  id: serial("id").primaryKey(),
  sessionId: integer("session_id").references(() => serviceSessions.id),
  bookingId: integer("booking_id").references(() => bookings.id),
  customerId: integer("customer_id").references(() => users.id),
  fileName: varchar("file_name", { length: 255 }).notNull(),
  originalName: varchar("original_name", { length: 255 }).notNull(),
  fileType: varchar("file_type", { length: 50 }).notNull(),
  fileSize: integer("file_size").notNull(),
  mimeType: varchar("mime_type", { length: 100 }),
  filePath: text("file_path").notNull(),
  description: text("description"),
  isPublic: boolean("is_public").default(false),
  uploadedBy: varchar("uploaded_by", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow(),
});

// Session status updates for real-time tracking
export const sessionStatusUpdates = pgTable("session_status_updates", {
  id: serial("id").primaryKey(),
  sessionId: integer("session_id").references(() => serviceSessions.id),
  status: varchar("status", { length: 50 }).notNull(),
  message: text("message"),
  progress: integer("progress_percentage").default(0),
  technicianName: varchar("technician_name", { length: 255 }),
  isCustomerVisible: boolean("is_customer_visible").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

// Service reports for professional documentation
export const serviceReports = pgTable("service_reports", {
  id: serial("id").primaryKey(),
  sessionId: integer("session_id").references(() => serviceSessions.id),
  customerId: integer("customer_id").references(() => users.id),
  reportType: varchar("report_type", { length: 50 }).notNull(), // session_summary, technical_report, completion_report
  status: varchar("status", { length: 20 }).default("draft"), // draft, completed, approved
  title: varchar("title", { length: 255 }).notNull(),
  customerName: varchar("customer_name", { length: 255 }),
  technicianName: varchar("technician_name", { length: 255 }),
  executiveSummary: text("executive_summary"),
  issuesFound: text("issues_found"),
  workPerformed: text("work_performed"),
  recommendations: text("recommendations"),
  nextSteps: text("next_steps"),
  filesGenerated: text("files_generated"), // JSON array of file paths
  isCustomerVisible: boolean("is_customer_visible").default(false),
  generatedAt: timestamp("generated_at").defaultNow(),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Zod schemas using createInsertSchema (template pattern)

// Booking schemas
export const insertBookingSchema = createInsertSchema(bookings, {
  email: (schema) => schema.email("Please enter a valid email address"),
  phone: (schema) => schema.min(10, "Please enter a valid phone number"),
  serviceType: serviceTypeEnum,
  customerName: (schema) => schema.min(2, "Name must be at least 2 characters"),
  description: (schema) => schema.min(10, "Please provide more details about your issue"),
  urgency: urgencyEnum.default("normal"),
  status: bookingStatusEnum.default("pending"),
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const updateBookingSchema = createInsertSchema(bookings, {
  email: (schema) => schema.email().optional(),
  phone: (schema) => schema.min(10).optional(),
  serviceType: serviceTypeEnum.optional(),
  customerName: (schema) => schema.min(2).optional(),
  description: (schema) => schema.min(10).optional(),
  urgency: urgencyEnum.optional(),
  status: bookingStatusEnum.optional(),
}).omit({
  id: true,
  createdAt: true,
}).partial();

// Contact schemas
export const insertContactSchema = createInsertSchema(contacts, {
  email: (schema) => schema.email("Please enter a valid email address"),
  name: (schema) => schema.min(2, "Name must be at least 2 characters"),
  message: (schema) => schema.min(10, "Message must be at least 10 characters"),
  preferredContact: preferredContactEnum.default("email"),
  status: contactStatusEnum.default("new"),
}).omit({
  id: true,
  createdAt: true,
});

export const updateContactStatusSchema = z.object({
  status: contactStatusEnum,
});

// Service area schemas
export const insertServiceAreaSchema = createInsertSchema(serviceAreas, {
  name: (schema) => schema.min(1, "Area name is required"),
  calloutFee: (schema) => schema.min(0, "Callout fee must be positive"),
  distanceKm: (schema) => schema.min(0, "Distance must be positive"),
  availability: (schema) => schema.min(1, "Availability information is required"),
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Service pricing schemas
export const insertServicePricingSchema = createInsertSchema(servicePricing, {
  serviceCategory: (schema) => schema.min(1, "Service category is required"),
  serviceName: (schema) => schema.min(1, "Service name is required"),
  basePrice: (schema) => schema.min(0, "Price must be positive"),
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// User schemas
export const insertUserSchema = createInsertSchema(users, {
  email: (schema) => schema.email("Please enter a valid email address"),
  name: (schema) => schema.min(2, "Name must be at least 2 characters"),
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Service session schemas
export const insertServiceSessionSchema = createInsertSchema(serviceSessions, {
  sessionTitle: (schema) => schema.min(1, "Session title is required"),
  status: sessionStatusEnum.default("scheduled"),
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Customer interaction schemas
export const insertCustomerInteractionSchema = createInsertSchema(customerInteractions, {
  interactionType: interactionTypeEnum,
  message: (schema) => schema.min(1, "Message is required"),
  direction: z.enum(["incoming", "outgoing"]),
}).omit({
  id: true,
  createdAt: true,
});

// File attachment schemas
export const insertFileAttachmentSchema = createInsertSchema(fileAttachments, {
  fileName: (schema) => schema.min(1, "File name is required"),
  originalName: (schema) => schema.min(1, "Original name is required"),
  fileType: fileTypeEnum,
  fileSize: (schema) => schema.min(1, "File size must be positive"),
  filePath: (schema) => schema.min(1, "File path is required"),
}).omit({
  id: true,
  createdAt: true,
});

// Session status update schemas
export const insertSessionStatusUpdateSchema = createInsertSchema(sessionStatusUpdates, {
  status: sessionStatusEnum,
  progress: (schema) => schema.min(0).max(100).default(0),
}).omit({
  id: true,
  createdAt: true,
});

// Service report schemas
export const insertServiceReportSchema = createInsertSchema(serviceReports, {
  reportType: z.enum(["session_summary", "technical_report", "completion_report"]),
  status: z.enum(["draft", "completed", "approved"]).default("draft"),
  title: (schema) => schema.min(1, "Title is required"),
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  generatedAt: true,
});

export const updateServiceReportSchema = createInsertSchema(serviceReports, {
  reportType: z.enum(["session_summary", "technical_report", "completion_report"]).optional(),
  status: z.enum(["draft", "completed", "approved"]).optional(),
  title: (schema) => schema.min(1).optional(),
}).omit({
  id: true,
  createdAt: true,
  generatedAt: true,
}).partial();

// Type exports using template pattern
export type Booking = typeof bookings.$inferSelect;
export type InsertBooking = z.infer<typeof insertBookingSchema>;
export type UpdateBooking = z.infer<typeof updateBookingSchema>;

export type Contact = typeof contacts.$inferSelect;
export type InsertContact = z.infer<typeof insertContactSchema>;

export type ServiceArea = typeof serviceAreas.$inferSelect;
export type InsertServiceArea = z.infer<typeof insertServiceAreaSchema>;

export type ServicePricing = typeof servicePricing.$inferSelect;
export type InsertServicePricing = z.infer<typeof insertServicePricingSchema>;

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type ServiceSession = typeof serviceSessions.$inferSelect;
export type InsertServiceSession = z.infer<typeof insertServiceSessionSchema>;

export type CustomerInteraction = typeof customerInteractions.$inferSelect;
export type InsertCustomerInteraction = z.infer<typeof insertCustomerInteractionSchema>;

export type FileAttachment = typeof fileAttachments.$inferSelect;
export type InsertFileAttachment = z.infer<typeof insertFileAttachmentSchema>;

export type SessionStatusUpdate = typeof sessionStatusUpdates.$inferSelect;
export type InsertSessionStatusUpdate = z.infer<typeof insertSessionStatusUpdateSchema>;

export type ServiceReport = typeof serviceReports.$inferSelect;
export type InsertServiceReport = z.infer<typeof insertServiceReportSchema>;
export type UpdateServiceReport = z.infer<typeof updateServiceReportSchema>;