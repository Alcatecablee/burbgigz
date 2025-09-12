import { pgTable, serial, varchar, text, timestamp, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Status and urgency enums
export const bookingStatusEnum = z.enum(["pending", "confirmed", "in-progress", "completed", "cancelled"]);
export const contactStatusEnum = z.enum(["new", "responded", "closed"]);
export const urgencyEnum = z.enum(["urgent", "normal", "scheduled"]);
export const serviceTypeEnum = z.enum(["remote", "onsite"]);
export const preferredContactEnum = z.enum(["email", "phone", "whatsapp"]);

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

// Zod schemas using createInsertSchema (template pattern)

// Booking schemas
export const insertBookingSchema = createInsertSchema(bookings).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  serviceType: serviceTypeEnum,
  customerName: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().min(10, "Please provide more details about your issue"),
  urgency: urgencyEnum.default("normal"),
  status: bookingStatusEnum.default("pending"),
});

export const updateBookingSchema = createInsertSchema(bookings).omit({
  id: true,
  createdAt: true,
}).partial().extend({
  email: z.string().email().optional(),
  phone: z.string().min(10).optional(),
  serviceType: serviceTypeEnum.optional(),
  customerName: z.string().min(2).optional(),
  description: z.string().min(10).optional(),
  urgency: urgencyEnum.optional(),
  status: bookingStatusEnum.optional(),
});

// Contact schemas
export const insertContactSchema = createInsertSchema(contacts).omit({
  id: true,
  createdAt: true,
}).extend({
  email: z.string().email("Please enter a valid email address"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  preferredContact: preferredContactEnum.default("email"),
  status: contactStatusEnum.default("new"),
});

export const updateContactStatusSchema = z.object({
  status: contactStatusEnum,
});

// Service area schemas
export const insertServiceAreaSchema = createInsertSchema(serviceAreas).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  name: z.string().min(1, "Area name is required"),
  calloutFee: z.number().min(0, "Callout fee must be positive"),
  distanceKm: z.number().min(0, "Distance must be positive"),
  availability: z.string().min(1, "Availability information is required"),
});

// Service pricing schemas
export const insertServicePricingSchema = createInsertSchema(servicePricing).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  serviceCategory: z.string().min(1, "Service category is required"),
  serviceName: z.string().min(1, "Service name is required"),
  basePrice: z.number().min(0, "Price must be positive"),
});

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