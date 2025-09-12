"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storage = void 0;
class MemStorage {
    constructor() {
        this.bookings = [];
        this.contacts = [];
        this.serviceAreas = [
            { id: 1, name: "Lombardy East", description: "Primary service area and base.", calloutFee: 40000, distanceKm: 0, availability: "Same-day callouts available.", isActive: true, createdAt: new Date(), updatedAt: new Date() },
            { id: 2, name: "Alexandra", description: "~3 km NW. Fast access for remote prep, callouts on request.", calloutFee: 45000, distanceKm: 3, availability: "Next-day callouts.", isActive: true, createdAt: new Date(), updatedAt: new Date() },
            { id: 3, name: "Sandton", description: "~6–8 km NW. Business hub; after‑hours remote preferred.", calloutFee: 52000, distanceKm: 7, availability: "Scheduled callouts.", isActive: true, createdAt: new Date(), updatedAt: new Date() },
        ];
        this.servicePricing = [
            { id: 1, serviceCategory: "virus-removal", serviceName: "Virus & Malware Removal", basePrice: 15000, description: "Complete system cleanup", isActive: true, createdAt: new Date(), updatedAt: new Date() },
            { id: 2, serviceCategory: "hardware-upgrade", serviceName: "SSD Installation", basePrice: 25000, description: "Professional SSD upgrade", isActive: true, createdAt: new Date(), updatedAt: new Date() },
        ];
        this.nextBookingId = 1;
        this.nextContactId = 1;
        this.nextAreaId = 4;
        this.nextPricingId = 3;
    }
    async createBooking(data) {
        const booking = {
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
    async getBookings() {
        return [...this.bookings].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    }
    async getBookingById(id) {
        return this.bookings.find(b => b.id === id) || null;
    }
    async updateBooking(id, data) {
        const index = this.bookings.findIndex(b => b.id === id);
        if (index === -1)
            return null;
        this.bookings[index] = {
            ...this.bookings[index],
            ...data,
            updatedAt: new Date(),
        };
        return this.bookings[index];
    }
    async deleteBooking(id) {
        const index = this.bookings.findIndex(b => b.id === id);
        if (index === -1)
            return false;
        this.bookings.splice(index, 1);
        return true;
    }
    async createContact(data) {
        const contact = {
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
    async getContacts() {
        return [...this.contacts].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    }
    async getContactById(id) {
        return this.contacts.find(c => c.id === id) || null;
    }
    async updateContactStatus(id, status) {
        const index = this.contacts.findIndex(c => c.id === id);
        if (index === -1)
            return null;
        this.contacts[index].status = status;
        return this.contacts[index];
    }
    async getServiceAreas() {
        return [...this.serviceAreas].sort((a, b) => a.name.localeCompare(b.name));
    }
    async getActiveServiceAreas() {
        return this.serviceAreas.filter(a => a.isActive).sort((a, b) => a.name.localeCompare(b.name));
    }
    async createServiceArea(data) {
        const area = {
            id: this.nextAreaId++,
            ...data,
            isActive: data.isActive ?? true,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        this.serviceAreas.push(area);
        return area;
    }
    async updateServiceArea(id, data) {
        const index = this.serviceAreas.findIndex(a => a.id === id);
        if (index === -1)
            return null;
        this.serviceAreas[index] = {
            ...this.serviceAreas[index],
            ...data,
            updatedAt: new Date(),
        };
        return this.serviceAreas[index];
    }
    async getServicePricing() {
        return [...this.servicePricing].sort((a, b) => a.serviceCategory.localeCompare(b.serviceCategory));
    }
    async getActiveServicePricing() {
        return this.servicePricing.filter(p => p.isActive).sort((a, b) => a.serviceCategory.localeCompare(b.serviceCategory));
    }
    async createServicePricing(data) {
        const pricing = {
            id: this.nextPricingId++,
            ...data,
            isActive: data.isActive ?? true,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        this.servicePricing.push(pricing);
        return pricing;
    }
    async updateServicePricing(id, data) {
        const index = this.servicePricing.findIndex(p => p.id === id);
        if (index === -1)
            return null;
        this.servicePricing[index] = {
            ...this.servicePricing[index],
            ...data,
            updatedAt: new Date(),
        };
        return this.servicePricing[index];
    }
}
function createStorage() {
    if (process.env.DATABASE_URL) {
        console.log("ℹ️ DATABASE_URL detected but using in-memory storage (Supabase integration pending)");
    }
    else {
        console.log("ℹ️ Using in-memory storage (no DATABASE_URL provided)");
    }
    return new MemStorage();
}
exports.storage = createStorage();
//# sourceMappingURL=storage.js.map