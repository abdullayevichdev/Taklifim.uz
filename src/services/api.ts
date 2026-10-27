import { Template, InvitationData, GuestRSVP, OrderItem } from '../types';
import { mockTemplates } from '../data/mockTemplates';
import { mockInvitations } from '../data/mockInvitations';
import { mockGuests } from '../data/mockGuests';
import { mockOrders } from '../data/mockOrders';

// In-memory / localStorage demonstration storage
const STORAGE_KEY_INVITATIONS = 'taklifim_demo_invitations';
const STORAGE_KEY_GUESTS = 'taklifim_demo_guests';
const STORAGE_KEY_ORDERS = 'taklifim_demo_orders';
const STORAGE_KEY_TEMPLATES = 'taklifim_demo_templates';

function getStored<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw);
  } catch {
    // ignore
  }
  return fallback;
}

function setStored<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch {
    // ignore
  }
}

export const api = {
  // Templates
  async getTemplates(): Promise<Template[]> {
    return getStored<Template[]>(STORAGE_KEY_TEMPLATES, mockTemplates);
  },

  async getTemplateBySlug(slug: string): Promise<Template | null> {
    const templates = await this.getTemplates();
    return templates.find((t) => t.slug === slug) || null;
  },

  async addTemplate(template: Template): Promise<Template> {
    const templates = await this.getTemplates();
    const updated = [template, ...templates];
    setStored(STORAGE_KEY_TEMPLATES, updated);
    return template;
  },

  async deleteTemplate(id: string): Promise<boolean> {
    const templates = await this.getTemplates();
    const updated = templates.filter((t) => t.id !== id);
    setStored(STORAGE_KEY_TEMPLATES, updated);
    return true;
  },

  // Invitations
  async getInvitations(): Promise<InvitationData[]> {
    return getStored<InvitationData[]>(STORAGE_KEY_INVITATIONS, mockInvitations);
  },

  async getInvitationBySlug(slug: string): Promise<InvitationData | null> {
    const list = await this.getInvitations();
    return list.find((inv) => inv.slug === slug) || null;
  },

  async saveInvitation(data: InvitationData): Promise<InvitationData> {
    const list = await this.getInvitations();
    const index = list.findIndex((inv) => inv.id === data.id || inv.slug === data.slug);
    let updated: InvitationData[];
    if (index >= 0) {
      updated = [...list];
      updated[index] = { ...data, updatedAt: new Date().toISOString() };
    } else {
      updated = [{ ...data, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }, ...list];
    }
    setStored(STORAGE_KEY_INVITATIONS, updated);
    return data;
  },

  async deleteInvitation(id: string): Promise<boolean> {
    const list = await this.getInvitations();
    const updated = list.filter((inv) => inv.id !== id);
    setStored(STORAGE_KEY_INVITATIONS, updated);
    return true;
  },

  // RSVP
  async getGuests(invitationSlug?: string): Promise<GuestRSVP[]> {
    const all = getStored<GuestRSVP[]>(STORAGE_KEY_GUESTS, mockGuests);
    if (!invitationSlug) return all;
    return all.filter((g) => g.invitationSlug === invitationSlug);
  },

  async submitRSVP(payload: Omit<GuestRSVP, 'id' | 'submittedAt'>): Promise<GuestRSVP> {
    const all = getStored<GuestRSVP[]>(STORAGE_KEY_GUESTS, mockGuests);
    const newGuest: GuestRSVP = {
      ...payload,
      id: `g-${Date.now()}`,
      submittedAt: new Date().toLocaleString('uz-UZ', { dateStyle: 'short', timeStyle: 'short' }),
    };
    const updated = [newGuest, ...all];
    setStored(STORAGE_KEY_GUESTS, updated);
    return newGuest;
  },

  // Orders
  async getOrders(): Promise<OrderItem[]> {
    return getStored<OrderItem[]>(STORAGE_KEY_ORDERS, mockOrders);
  },

  async createOrder(payload: Partial<OrderItem>): Promise<OrderItem> {
    const all = await this.getOrders();
    const newOrder: OrderItem = {
      id: `ord-${Date.now()}`,
      orderNumber: `TK-${Math.floor(10000 + Math.random() * 90000)}`,
      serviceType: payload.serviceType || 'website_invitation',
      serviceName: payload.serviceName || 'Taklifnoma Xizmati',
      planName: payload.planName || 'Standard Plan',
      customerName: payload.customerName || 'Hurmatli Mijoz',
      customerPhone: payload.customerPhone || '+998 90 000 00 00',
      customerEmail: payload.customerEmail,
      date: new Date().toISOString().split('T')[0],
      price: payload.price || 150000,
      status: 'confirmed',
      notes: payload.notes,
      invitationId: payload.invitationId,
    };
    const updated = [newOrder, ...all];
    setStored(STORAGE_KEY_ORDERS, updated);
    return newOrder;
  },

  async updateOrderStatus(orderId: string, status: OrderItem['status']): Promise<boolean> {
    const all = await this.getOrders();
    const updated = all.map((o) => (o.id === orderId ? { ...o, status } : o));
    setStored(STORAGE_KEY_ORDERS, updated);
    return true;
  },
};
