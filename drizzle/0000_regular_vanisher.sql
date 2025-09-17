CREATE TABLE "bookings" (
	"id" serial PRIMARY KEY NOT NULL,
	"customer_name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"phone" varchar(50) NOT NULL,
	"service_type" varchar(100) NOT NULL,
	"service_category" varchar(100) NOT NULL,
	"service_area" varchar(100),
	"preferred_date" varchar(50),
	"preferred_time" varchar(50),
	"description" text,
	"urgency" varchar(50) DEFAULT 'normal',
	"estimated_price" integer DEFAULT 0,
	"callout_fee" integer DEFAULT 0,
	"status" varchar(50) DEFAULT 'pending',
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "contacts" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"phone" varchar(50),
	"subject" varchar(255),
	"message" text NOT NULL,
	"is_new_customer" boolean DEFAULT true,
	"preferred_contact" varchar(50) DEFAULT 'email',
	"status" varchar(50) DEFAULT 'new',
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "service_areas" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"description" text,
	"callout_fee" integer NOT NULL,
	"distance_km" integer NOT NULL,
	"availability" varchar(255) NOT NULL,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "service_pricing" (
	"id" serial PRIMARY KEY NOT NULL,
	"service_category" varchar(100) NOT NULL,
	"service_name" varchar(255) NOT NULL,
	"base_price" integer NOT NULL,
	"description" text,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
