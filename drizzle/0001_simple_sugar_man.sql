CREATE TABLE "customer_interactions" (
	"id" serial PRIMARY KEY NOT NULL,
	"customer_id" integer,
	"session_id" integer,
	"booking_id" integer,
	"interaction_type" varchar(50) NOT NULL,
	"subject" varchar(255),
	"message" text NOT NULL,
	"direction" varchar(20) NOT NULL,
	"technician_name" varchar(255),
	"is_read" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "file_attachments" (
	"id" serial PRIMARY KEY NOT NULL,
	"session_id" integer,
	"booking_id" integer,
	"customer_id" integer,
	"file_name" varchar(255) NOT NULL,
	"original_name" varchar(255) NOT NULL,
	"file_type" varchar(50) NOT NULL,
	"file_size" integer NOT NULL,
	"mime_type" varchar(100),
	"file_path" text NOT NULL,
	"description" text,
	"is_public" boolean DEFAULT false,
	"uploaded_by" varchar(255),
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "service_reports" (
	"id" serial PRIMARY KEY NOT NULL,
	"session_id" integer,
	"customer_id" integer,
	"report_type" varchar(50) NOT NULL,
	"status" varchar(20) DEFAULT 'draft',
	"title" varchar(255) NOT NULL,
	"customer_name" varchar(255),
	"technician_name" varchar(255),
	"executive_summary" text,
	"issues_found" text,
	"work_performed" text,
	"recommendations" text,
	"next_steps" text,
	"files_generated" text,
	"is_customer_visible" boolean DEFAULT false,
	"generated_at" timestamp DEFAULT now(),
	"completed_at" timestamp,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "service_sessions" (
	"id" serial PRIMARY KEY NOT NULL,
	"booking_id" integer,
	"customer_id" integer,
	"session_title" varchar(255) NOT NULL,
	"status" varchar(50) DEFAULT 'scheduled',
	"start_time" timestamp,
	"end_time" timestamp,
	"estimated_duration_minutes" integer DEFAULT 60,
	"actual_duration_minutes" integer,
	"technician_notes" text,
	"customer_feedback" text,
	"issues_resolved" text,
	"issues_pending" text,
	"total_cost" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "session_status_updates" (
	"id" serial PRIMARY KEY NOT NULL,
	"session_id" integer,
	"status" varchar(50) NOT NULL,
	"message" text,
	"progress_percentage" integer DEFAULT 0,
	"technician_name" varchar(255),
	"is_customer_visible" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "sessions" (
	"sid" varchar PRIMARY KEY NOT NULL,
	"sess" jsonb NOT NULL,
	"expire" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(255),
	"name" varchar(255),
	"first_name" varchar(255),
	"last_name" varchar(255),
	"phone" varchar(50),
	"profile_image_url" varchar(500),
	"password_hash" text,
	"replit_user_id" varchar(255),
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_replit_user_id_unique" UNIQUE("replit_user_id")
);
--> statement-breakpoint
ALTER TABLE "customer_interactions" ADD CONSTRAINT "customer_interactions_customer_id_users_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "customer_interactions" ADD CONSTRAINT "customer_interactions_session_id_service_sessions_id_fk" FOREIGN KEY ("session_id") REFERENCES "public"."service_sessions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "customer_interactions" ADD CONSTRAINT "customer_interactions_booking_id_bookings_id_fk" FOREIGN KEY ("booking_id") REFERENCES "public"."bookings"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "file_attachments" ADD CONSTRAINT "file_attachments_session_id_service_sessions_id_fk" FOREIGN KEY ("session_id") REFERENCES "public"."service_sessions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "file_attachments" ADD CONSTRAINT "file_attachments_booking_id_bookings_id_fk" FOREIGN KEY ("booking_id") REFERENCES "public"."bookings"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "file_attachments" ADD CONSTRAINT "file_attachments_customer_id_users_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "service_reports" ADD CONSTRAINT "service_reports_session_id_service_sessions_id_fk" FOREIGN KEY ("session_id") REFERENCES "public"."service_sessions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "service_reports" ADD CONSTRAINT "service_reports_customer_id_users_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "service_sessions" ADD CONSTRAINT "service_sessions_booking_id_bookings_id_fk" FOREIGN KEY ("booking_id") REFERENCES "public"."bookings"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "service_sessions" ADD CONSTRAINT "service_sessions_customer_id_users_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session_status_updates" ADD CONSTRAINT "session_status_updates_session_id_service_sessions_id_fk" FOREIGN KEY ("session_id") REFERENCES "public"."service_sessions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "IDX_session_expire" ON "sessions" USING btree ("expire");