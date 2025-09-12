import { 
  type Booking, 
  type InsertBooking,
  type UpdateBooking,
  type Contact,
  type InsertContact,
  type ServiceArea,
  type InsertServiceArea,
  type ServicePricing,
  type InsertServicePricing
} from "../shared/schema";

export interface IStorage {
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
  private nextBookingId = 1;
  private nextContactId = 1;
  private nextAreaId = 4;
  private nextPricingId = 3;

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

// Storage selection: MemStorage by default (Supabase support can be added later)
function createStorage(): IStorage {
  // For now, always use MemStorage to ensure stability
  // DatabaseStorage can be implemented when full Supabase integration is needed
  if (process.env.DATABASE_URL) {
    console.log("ℹ️ DATABASE_URL detected but using in-memory storage (Supabase integration pending)");
  } else {
    console.log("ℹ️ Using in-memory storage (no DATABASE_URL provided)");
  }
  return new MemStorage();
}

export const storage: IStorage = createStorage();