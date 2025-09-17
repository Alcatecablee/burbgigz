import { 
  type Booking, 
  type InsertBooking,
  type UpdateBooking,
  type Contact,
  type InsertContact,
  type ServiceArea,
  type InsertServiceArea,
  type ServicePricing,
  type InsertServicePricing,
  type User,
  bookings,
  contacts,
  serviceAreas,
  servicePricing,
  users
} from "../shared/schema";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { eq, desc } from "drizzle-orm";

// User upsert type for Replit Auth
export interface UpsertUser {
  replitUserId: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  profileImageUrl?: string;
}

export interface IStorage {
  // User operations (required for Replit Auth)
  getUser(replitUserId: string): Promise<User | undefined>;
  upsertUser(userData: UpsertUser): Promise<User>;

  // Booking operations
  createBooking(data: InsertBooking): Promise<Booking>;
  getBookings(): Promise<Booking[]>;
  getBookingById(id: number): Promise<Booking | null>;
  updateBooking(id: number, data: UpdateBooking): Promise<Booking | null>;
  deleteBooking(id: number): Promise<boolean>;

  // Contact operations
  createContact(data: InsertContact): Promise<Contact>;
  getContacts(): Promise<Contact[]>;
  getContactById(id: number): Promise<Contact | null>;
  updateContactStatus(id: number, status: string): Promise<Contact | null>;

  // Service area operations
  getServiceAreas(): Promise<ServiceArea[]>;
  getActiveServiceAreas(): Promise<ServiceArea[]>;
  createServiceArea(data: InsertServiceArea): Promise<ServiceArea>;
  updateServiceArea(id: number, data: Partial<InsertServiceArea>): Promise<ServiceArea | null>;

  // Service pricing operations
  getServicePricing(): Promise<ServicePricing[]>;
  getActiveServicePricing(): Promise<ServicePricing[]>;
  createServicePricing(data: InsertServicePricing): Promise<ServicePricing>;
  updateServicePricing(id: number, data: Partial<InsertServicePricing>): Promise<ServicePricing | null>;
}

// In-memory storage implementation (primary)
class MemStorage implements IStorage {
  private users: User[] = [];
  private bookings: Booking[] = [];
  private contacts: Contact[] = [];
  private serviceAreas: ServiceArea[] = [
    { id: 1, name: "Lombardy East", description: "Primary service area and base.", calloutFee: 40000, distanceKm: 0, availability: "Same-day callouts available.", isActive: true, createdAt: new Date(), updatedAt: new Date() },
    { id: 2, name: "Alexandra", description: "~3 km NW. Fast access for remote prep, callouts on request.", calloutFee: 45000, distanceKm: 3, availability: "Next-day callouts.", isActive: true, createdAt: new Date(), updatedAt: new Date() },
    { id: 3, name: "Sandton", description: "~6–8 km NW. Business hub; after‑hours remote preferred.", calloutFee: 52000, distanceKm: 7, availability: "Scheduled callouts.", isActive: true, createdAt: new Date(), updatedAt: new Date() },
  ];
  private servicePricing: ServicePricing[] = [
    { id: 1, serviceCategory: "virus-removal", serviceName: "Virus & Malware Removal", basePrice: 15000, description: "Complete system cleanup", isActive: true, createdAt: new Date(), updatedAt: new Date() },
    { id: 2, serviceCategory: "hardware-upgrade", serviceName: "SSD Installation", basePrice: 25000, description: "Professional SSD upgrade", isActive: true, createdAt: new Date(), updatedAt: new Date() },
  ];
  private nextUserId = 1;
  private nextBookingId = 1;
  private nextContactId = 1;
  private nextAreaId = 4;
  private nextPricingId = 3;

  // User operations (required for Replit Auth)
  async getUser(replitUserId: string): Promise<User | undefined> {
    return this.users.find(u => u.replitUserId === replitUserId);
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const existingUser = await this.getUser(userData.replitUserId);
    if (existingUser) {
      // Update existing user
      const updatedUser: User = {
        ...existingUser,
        ...userData,
        name: userData.firstName && userData.lastName 
          ? `${userData.firstName} ${userData.lastName}` 
          : existingUser.name,
        updatedAt: new Date(),
      };
      const index = this.users.findIndex(u => u.replitUserId === userData.replitUserId);
      this.users[index] = updatedUser;
      return updatedUser;
    } else {
      // Create new user
      const newUser: User = {
        id: this.nextUserId++,
        email: userData.email || null,
        name: userData.firstName && userData.lastName 
          ? `${userData.firstName} ${userData.lastName}` 
          : null,
        firstName: userData.firstName || null,
        lastName: userData.lastName || null,
        phone: null,
        profileImageUrl: userData.profileImageUrl || null,
        passwordHash: null,
        replitUserId: userData.replitUserId,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      this.users.push(newUser);
      return newUser;
    }
  }

  // Booking operations
  async createBooking(data: InsertBooking): Promise<Booking> {
    const booking: Booking = {
      id: this.nextBookingId++,
      ...data,
      estimatedPrice: data.estimatedPrice || 0,
      calloutFee: data.calloutFee || 0,
      status: data.status || "pending",
      urgency: data.urgency || "normal",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.bookings.push(booking);
    return booking;
  }

  async getBookings(): Promise<Booking[]> {
    return [...this.bookings].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getBookingById(id: number): Promise<Booking | null> {
    return this.bookings.find(b => b.id === id) || null;
  }

  async updateBooking(id: number, data: UpdateBooking): Promise<Booking | null> {
    const index = this.bookings.findIndex(b => b.id === id);
    if (index === -1) return null;
    
    this.bookings[index] = {
      ...this.bookings[index],
      ...data,
      updatedAt: new Date(),
    };
    return this.bookings[index];
  }

  async deleteBooking(id: number): Promise<boolean> {
    const index = this.bookings.findIndex(b => b.id === id);
    if (index === -1) return false;
    this.bookings.splice(index, 1);
    return true;
  }

  // Contact operations
  async createContact(data: InsertContact): Promise<Contact> {
    const contact: Contact = {
      id: this.nextContactId++,
      ...data,
      isNewCustomer: data.isNewCustomer ?? true,
      preferredContact: data.preferredContact || "email",
      status: data.status || "new",
      createdAt: new Date(),
    };
    this.contacts.push(contact);
    return contact;
  }

  async getContacts(): Promise<Contact[]> {
    return [...this.contacts].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getContactById(id: number): Promise<Contact | null> {
    return this.contacts.find(c => c.id === id) || null;
  }

  async updateContactStatus(id: number, status: string): Promise<Contact | null> {
    const index = this.contacts.findIndex(c => c.id === id);
    if (index === -1) return null;
    this.contacts[index].status = status;
    return this.contacts[index];
  }

  // Service area operations
  async getServiceAreas(): Promise<ServiceArea[]> {
    return [...this.serviceAreas].sort((a, b) => a.name.localeCompare(b.name));
  }

  async getActiveServiceAreas(): Promise<ServiceArea[]> {
    return this.serviceAreas.filter(a => a.isActive).sort((a, b) => a.name.localeCompare(b.name));
  }

  async createServiceArea(data: InsertServiceArea): Promise<ServiceArea> {
    const area: ServiceArea = {
      id: this.nextAreaId++,
      ...data,
      isActive: data.isActive ?? true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.serviceAreas.push(area);
    return area;
  }

  async updateServiceArea(id: number, data: Partial<InsertServiceArea>): Promise<ServiceArea | null> {
    const index = this.serviceAreas.findIndex(a => a.id === id);
    if (index === -1) return null;
    
    this.serviceAreas[index] = {
      ...this.serviceAreas[index],
      ...data,
      updatedAt: new Date(),
    };
    return this.serviceAreas[index];
  }

  // Service pricing operations
  async getServicePricing(): Promise<ServicePricing[]> {
    return [...this.servicePricing].sort((a, b) => a.serviceCategory.localeCompare(b.serviceCategory));
  }

  async getActiveServicePricing(): Promise<ServicePricing[]> {
    return this.servicePricing.filter(p => p.isActive).sort((a, b) => a.serviceCategory.localeCompare(b.serviceCategory));
  }

  async createServicePricing(data: InsertServicePricing): Promise<ServicePricing> {
    const pricing: ServicePricing = {
      id: this.nextPricingId++,
      ...data,
      isActive: data.isActive ?? true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.servicePricing.push(pricing);
    return pricing;
  }

  async updateServicePricing(id: number, data: Partial<InsertServicePricing>): Promise<ServicePricing | null> {
    const index = this.servicePricing.findIndex(p => p.id === id);
    if (index === -1) return null;
    
    this.servicePricing[index] = {
      ...this.servicePricing[index],
      ...data,
      updatedAt: new Date(),
    };
    return this.servicePricing[index];
  }
}

// Supabase/PostgreSQL storage implementation using Drizzle ORM
class DatabaseStorage implements IStorage {
  private db: ReturnType<typeof drizzle>;
  
  constructor(connectionString: string) {
    const client = postgres(connectionString);
    this.db = drizzle(client);
  }

  // User operations (required for Replit Auth)
  async getUser(replitUserId: string): Promise<User | undefined> {
    const [user] = await this.db
      .select()
      .from(users)
      .where(eq(users.replitUserId, replitUserId));
    return user || undefined;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    // Combine first and last names for the name field
    const fullName = userData.firstName && userData.lastName 
      ? `${userData.firstName} ${userData.lastName}` 
      : null;

    const [user] = await this.db
      .insert(users)
      .values({
        email: userData.email,
        name: fullName,
        firstName: userData.firstName,
        lastName: userData.lastName,
        profileImageUrl: userData.profileImageUrl,
        replitUserId: userData.replitUserId,
        isActive: true,
      })
      .onConflictDoUpdate({
        target: users.replitUserId,
        set: {
          email: userData.email,
          name: fullName,
          firstName: userData.firstName,
          lastName: userData.lastName,
          profileImageUrl: userData.profileImageUrl,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // Booking operations
  async createBooking(data: InsertBooking): Promise<Booking> {
    const [booking] = await this.db.insert(bookings).values(data).returning();
    return booking;
  }

  async getBookings(): Promise<Booking[]> {
    return await this.db.select().from(bookings).orderBy(desc(bookings.createdAt));
  }

  async getBookingById(id: number): Promise<Booking | null> {
    const [booking] = await this.db.select().from(bookings).where(eq(bookings.id, id));
    return booking || null;
  }

  async updateBooking(id: number, data: UpdateBooking): Promise<Booking | null> {
    const [booking] = await this.db.update(bookings)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(bookings.id, id))
      .returning();
    return booking || null;
  }

  async deleteBooking(id: number): Promise<boolean> {
    const result = await this.db.delete(bookings).where(eq(bookings.id, id));
    return result.rowCount > 0;
  }

  // Contact operations
  async createContact(data: InsertContact): Promise<Contact> {
    const [contact] = await this.db.insert(contacts).values(data).returning();
    return contact;
  }

  async getContacts(): Promise<Contact[]> {
    return await this.db.select().from(contacts).orderBy(desc(contacts.createdAt));
  }

  async getContactById(id: number): Promise<Contact | null> {
    const [contact] = await this.db.select().from(contacts).where(eq(contacts.id, id));
    return contact || null;
  }

  async updateContactStatus(id: number, status: string): Promise<Contact | null> {
    const [contact] = await this.db.update(contacts)
      .set({ status })
      .where(eq(contacts.id, id))
      .returning();
    return contact || null;
  }

  // Service area operations
  async getServiceAreas(): Promise<ServiceArea[]> {
    return await this.db.select().from(serviceAreas).orderBy(serviceAreas.name);
  }

  async getActiveServiceAreas(): Promise<ServiceArea[]> {
    return await this.db.select().from(serviceAreas)
      .where(eq(serviceAreas.isActive, true))
      .orderBy(serviceAreas.name);
  }

  async createServiceArea(data: InsertServiceArea): Promise<ServiceArea> {
    const [area] = await this.db.insert(serviceAreas).values(data).returning();
    return area;
  }

  async updateServiceArea(id: number, data: Partial<InsertServiceArea>): Promise<ServiceArea | null> {
    const [area] = await this.db.update(serviceAreas)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(serviceAreas.id, id))
      .returning();
    return area || null;
  }

  // Service pricing operations
  async getServicePricing(): Promise<ServicePricing[]> {
    return await this.db.select().from(servicePricing).orderBy(servicePricing.serviceCategory);
  }

  async getActiveServicePricing(): Promise<ServicePricing[]> {
    return await this.db.select().from(servicePricing)
      .where(eq(servicePricing.isActive, true))
      .orderBy(servicePricing.serviceCategory);
  }

  async createServicePricing(data: InsertServicePricing): Promise<ServicePricing> {
    const [pricing] = await this.db.insert(servicePricing).values(data).returning();
    return pricing;
  }

  async updateServicePricing(id: number, data: Partial<InsertServicePricing>): Promise<ServicePricing | null> {
    const [pricing] = await this.db.update(servicePricing)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(servicePricing.id, id))
      .returning();
    return pricing || null;
  }
}

// Storage selection: Use database storage when DATABASE_URL is available
function createStorage(): IStorage {
  if (process.env.DATABASE_URL) {
    console.log("✅ Using PostgreSQL database storage");
    try {
      return new DatabaseStorage(process.env.DATABASE_URL);
    } catch (error) {
      console.error("❌ Database connection failed, falling back to in-memory storage:", error);
      return new MemStorage();
    }
  } else {
    console.log("ℹ️ Using in-memory storage (no DATABASE_URL provided)");
    return new MemStorage();
  }
}

export const storage: IStorage = createStorage();