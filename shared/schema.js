"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertServicePricingSchema = exports.insertServiceAreaSchema = exports.updateContactStatusSchema = exports.insertContactSchema = exports.updateBookingSchema = exports.insertBookingSchema = exports.servicePricing = exports.serviceAreas = exports.contacts = exports.bookings = exports.preferredContactEnum = exports.serviceTypeEnum = exports.urgencyEnum = exports.contactStatusEnum = exports.bookingStatusEnum = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const drizzle_zod_1 = require("drizzle-zod");
const zod_1 = require("zod");
exports.bookingStatusEnum = zod_1.z.enum(["pending", "confirmed", "in-progress", "completed", "cancelled"]);
exports.contactStatusEnum = zod_1.z.enum(["new", "responded", "closed"]);
exports.urgencyEnum = zod_1.z.enum(["urgent", "normal", "scheduled"]);
exports.serviceTypeEnum = zod_1.z.enum(["remote", "onsite"]);
exports.preferredContactEnum = zod_1.z.enum(["email", "phone", "whatsapp"]);
exports.bookings = (0, pg_core_1.pgTable)("bookings", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    customerName: (0, pg_core_1.varchar)("customer_name", { length: 255 }).notNull(),
    email: (0, pg_core_1.varchar)("email", { length: 255 }).notNull(),
    phone: (0, pg_core_1.varchar)("phone", { length: 50 }).notNull(),
    serviceType: (0, pg_core_1.varchar)("service_type", { length: 100 }).notNull(),
    serviceCategory: (0, pg_core_1.varchar)("service_category", { length: 100 }).notNull(),
    serviceArea: (0, pg_core_1.varchar)("service_area", { length: 100 }),
    preferredDate: (0, pg_core_1.varchar)("preferred_date", { length: 50 }),
    preferredTime: (0, pg_core_1.varchar)("preferred_time", { length: 50 }),
    description: (0, pg_core_1.text)("description"),
    urgency: (0, pg_core_1.varchar)("urgency", { length: 50 }).default("normal"),
    estimatedPrice: (0, pg_core_1.integer)("estimated_price").default(0),
    calloutFee: (0, pg_core_1.integer)("callout_fee").default(0),
    status: (0, pg_core_1.varchar)("status", { length: 50 }).default("pending"),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at").defaultNow(),
});
exports.contacts = (0, pg_core_1.pgTable)("contacts", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    name: (0, pg_core_1.varchar)("name", { length: 255 }).notNull(),
    email: (0, pg_core_1.varchar)("email", { length: 255 }).notNull(),
    phone: (0, pg_core_1.varchar)("phone", { length: 50 }),
    subject: (0, pg_core_1.varchar)("subject", { length: 255 }),
    message: (0, pg_core_1.text)("message").notNull(),
    isNewCustomer: (0, pg_core_1.boolean)("is_new_customer").default(true),
    preferredContact: (0, pg_core_1.varchar)("preferred_contact", { length: 50 }).default("email"),
    status: (0, pg_core_1.varchar)("status", { length: 50 }).default("new"),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow(),
});
exports.serviceAreas = (0, pg_core_1.pgTable)("service_areas", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    name: (0, pg_core_1.varchar)("name", { length: 100 }).notNull(),
    description: (0, pg_core_1.text)("description"),
    calloutFee: (0, pg_core_1.integer)("callout_fee").notNull(),
    distanceKm: (0, pg_core_1.integer)("distance_km").notNull(),
    availability: (0, pg_core_1.varchar)("availability", { length: 255 }).notNull(),
    isActive: (0, pg_core_1.boolean)("is_active").default(true),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at").defaultNow(),
});
exports.servicePricing = (0, pg_core_1.pgTable)("service_pricing", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    serviceCategory: (0, pg_core_1.varchar)("service_category", { length: 100 }).notNull(),
    serviceName: (0, pg_core_1.varchar)("service_name", { length: 255 }).notNull(),
    basePrice: (0, pg_core_1.integer)("base_price").notNull(),
    description: (0, pg_core_1.text)("description"),
    isActive: (0, pg_core_1.boolean)("is_active").default(true),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at").defaultNow(),
});
exports.insertBookingSchema = (0, drizzle_zod_1.createInsertSchema)(exports.bookings).omit({
    id: true,
    createdAt: true,
    updatedAt: true,
}).extend({
    email: zod_1.z.string().email("Please enter a valid email address"),
    phone: zod_1.z.string().min(10, "Please enter a valid phone number"),
    serviceType: exports.serviceTypeEnum,
    customerName: zod_1.z.string().min(2, "Name must be at least 2 characters"),
    description: zod_1.z.string().min(10, "Please provide more details about your issue"),
    urgency: exports.urgencyEnum.default("normal"),
    status: exports.bookingStatusEnum.default("pending"),
});
exports.updateBookingSchema = (0, drizzle_zod_1.createInsertSchema)(exports.bookings).omit({
    id: true,
    createdAt: true,
}).partial().extend({
    email: zod_1.z.string().email().optional(),
    phone: zod_1.z.string().min(10).optional(),
    serviceType: exports.serviceTypeEnum.optional(),
    customerName: zod_1.z.string().min(2).optional(),
    description: zod_1.z.string().min(10).optional(),
    urgency: exports.urgencyEnum.optional(),
    status: exports.bookingStatusEnum.optional(),
});
exports.insertContactSchema = (0, drizzle_zod_1.createInsertSchema)(exports.contacts).omit({
    id: true,
    createdAt: true,
}).extend({
    email: zod_1.z.string().email("Please enter a valid email address"),
    name: zod_1.z.string().min(2, "Name must be at least 2 characters"),
    message: zod_1.z.string().min(10, "Message must be at least 10 characters"),
    preferredContact: exports.preferredContactEnum.default("email"),
    status: exports.contactStatusEnum.default("new"),
});
exports.updateContactStatusSchema = zod_1.z.object({
    status: exports.contactStatusEnum,
});
exports.insertServiceAreaSchema = (0, drizzle_zod_1.createInsertSchema)(exports.serviceAreas).omit({
    id: true,
    createdAt: true,
    updatedAt: true,
}).extend({
    name: zod_1.z.string().min(1, "Area name is required"),
    calloutFee: zod_1.z.number().min(0, "Callout fee must be positive"),
    distanceKm: zod_1.z.number().min(0, "Distance must be positive"),
    availability: zod_1.z.string().min(1, "Availability information is required"),
});
exports.insertServicePricingSchema = (0, drizzle_zod_1.createInsertSchema)(exports.servicePricing).omit({
    id: true,
    createdAt: true,
    updatedAt: true,
}).extend({
    serviceCategory: zod_1.z.string().min(1, "Service category is required"),
    serviceName: zod_1.z.string().min(1, "Service name is required"),
    basePrice: zod_1.z.number().min(0, "Price must be positive"),
});
//# sourceMappingURL=schema.js.map