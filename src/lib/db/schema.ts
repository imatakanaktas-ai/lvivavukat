import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  boolean,
  integer,
  decimal,
  date,
  time,
  jsonb,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// ============================================================
// ADMIN USERS
// ============================================================
export const adminUsers = pgTable("admin_users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ============================================================
// CLIENTS (Müvekkiller)
// ============================================================
export const clients = pgTable("clients", {
  id: uuid("id").defaultRandom().primaryKey(),
  firstName: varchar("first_name", { length: 255 }).notNull(),
  lastName: varchar("last_name", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }),
  email: varchar("email", { length: 255 }),
  nationality: varchar("nationality", { length: 100 }).default("Türk"),
  passportNo: varchar("passport_no", { length: 50 }),
  address: text("address"),
  notes: text("notes"),
  status: varchar("status", { length: 20 }).default("active").notNull(), // active, inactive, pending
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const clientsRelations = relations(clients, ({ many }) => ({
  documents: many(clientDocuments),
  payments: many(payments),
  reminders: many(reminders),
  courtDates: many(courtDates),
  calendarEvents: many(calendarEvents),
  clientNotes: many(clientNotes),
}));

// ============================================================
// CLIENT DOCUMENTS (Müvekkil Belgeleri - Gruplar)
// ============================================================
export const clientDocuments = pgTable("client_documents", {
  id: uuid("id").defaultRandom().primaryKey(),
  clientId: uuid("client_id")
    .references(() => clients.id, { onDelete: "cascade" })
    .notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  category: varchar("category", { length: 100 }).notNull(), // kimlik, sozlesme, mahkeme, devlet, diger
  uploadedAt: timestamp("uploaded_at").defaultNow().notNull(),
});

export const clientDocumentsRelations = relations(clientDocuments, ({ one, many }) => ({
  client: one(clients, {
    fields: [clientDocuments.clientId],
    references: [clients.id],
  }),
  files: many(clientDocumentFiles),
}));

// ============================================================
// CLIENT DOCUMENT FILES (Belge Dosyaları)
// ============================================================
export const clientDocumentFiles = pgTable("client_document_files", {
  id: uuid("id").defaultRandom().primaryKey(),
  documentId: uuid("document_id")
    .references(() => clientDocuments.id, { onDelete: "cascade" })
    .notNull(),
  fileUrl: text("file_url").notNull(),
  fileName: varchar("file_name", { length: 255 }).notNull(),
  fileSize: integer("file_size"),
  mimeType: varchar("mime_type", { length: 100 }),
  sortOrder: integer("sort_order").default(0).notNull(),
  uploadedAt: timestamp("uploaded_at").defaultNow().notNull(),
});

export const clientDocumentFilesRelations = relations(clientDocumentFiles, ({ one }) => ({
  document: one(clientDocuments, {
    fields: [clientDocumentFiles.documentId],
    references: [clientDocuments.id],
  }),
}));

// ============================================================
// PAYMENTS (Ödemeler)
// ============================================================
export const payments = pgTable("payments", {
  id: uuid("id").defaultRandom().primaryKey(),
  clientId: uuid("client_id")
    .references(() => clients.id, { onDelete: "cascade" })
    .notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  amount: decimal("amount", { precision: 12, scale: 2 }).notNull(),
  currency: varchar("currency", { length: 10 }).default("UAH").notNull(),
  dueDate: date("due_date"),
  paidDate: date("paid_date"),
  status: varchar("status", { length: 20 }).default("pending").notNull(), // pending, paid, overdue, cancelled
  type: varchar("type", { length: 50 }).notNull(), // avukat_ucreti, devlet_hарci, vergi, noter, diger
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const paymentsRelations = relations(payments, ({ one }) => ({
  client: one(clients, {
    fields: [payments.clientId],
    references: [clients.id],
  }),
}));

// ============================================================
// REMINDERS (Hatırlatmalar)
// ============================================================
export const reminders = pgTable("reminders", {
  id: uuid("id").defaultRandom().primaryKey(),
  clientId: uuid("client_id").references(() => clients.id, { onDelete: "cascade" }),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  dueDate: timestamp("due_date").notNull(),
  type: varchar("type", { length: 50 }).notNull(), // mahkeme, odeme, devlet_islemi, vergi, deadline, ozel
  isCompleted: boolean("is_completed").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const remindersRelations = relations(reminders, ({ one }) => ({
  client: one(clients, {
    fields: [reminders.clientId],
    references: [clients.id],
  }),
}));

// ============================================================
// COURT DATES (Mahkeme Tarihleri)
// ============================================================
export const courtDates = pgTable("court_dates", {
  id: uuid("id").defaultRandom().primaryKey(),
  clientId: uuid("client_id")
    .references(() => clients.id, { onDelete: "cascade" })
    .notNull(),
  courtName: varchar("court_name", { length: 255 }).notNull(),
  caseNumber: varchar("case_number", { length: 100 }),
  hearingDate: date("hearing_date").notNull(),
  hearingTime: time("hearing_time"),
  notes: text("notes"),
  status: varchar("status", { length: 20 }).default("scheduled").notNull(), // scheduled, completed, postponed, cancelled
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const courtDatesRelations = relations(courtDates, ({ one }) => ({
  client: one(clients, {
    fields: [courtDates.clientId],
    references: [clients.id],
  }),
}));

// ============================================================
// CALENDAR EVENTS (Takvim Etkinlikleri)
// ============================================================
export const calendarEvents = pgTable("calendar_events", {
  id: uuid("id").defaultRandom().primaryKey(),
  clientId: uuid("client_id").references(() => clients.id, { onDelete: "set null" }),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date"),
  eventType: varchar("event_type", { length: 50 }).notNull(), // toplanti, mahkeme, odeme, kisisel, diger
  color: varchar("color", { length: 20 }).default("#3B82F6"),
  isAllDay: boolean("is_all_day").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const calendarEventsRelations = relations(calendarEvents, ({ one }) => ({
  client: one(clients, {
    fields: [calendarEvents.clientId],
    references: [clients.id],
  }),
}));

// ============================================================
// BLOG CATEGORIES
// ============================================================
export const blogCategories = pgTable("blog_categories", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const blogCategoriesRelations = relations(blogCategories, ({ many }) => ({
  posts: many(blogPosts),
}));

// ============================================================
// BLOG POSTS
// ============================================================
export const blogPosts = pgTable("blog_posts", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: varchar("title", { length: 500 }).notNull(),
  slug: varchar("slug", { length: 500 }).notNull().unique(),
  content: text("content").notNull(),
  excerpt: text("excerpt"),
  metaDescription: text("meta_description"),
  metaKeywords: text("meta_keywords"),
  coverImageUrl: text("cover_image_url"),
  categoryId: uuid("category_id").references(() => blogCategories.id, { onDelete: "set null" }),
  status: varchar("status", { length: 20 }).default("draft").notNull(), // draft, published, archived
  publishedAt: timestamp("published_at"),
  readingTime: integer("reading_time"),
  aiGenerated: boolean("ai_generated").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const blogPostsRelations = relations(blogPosts, ({ one }) => ({
  category: one(blogCategories, {
    fields: [blogPosts.categoryId],
    references: [blogCategories.id],
  }),
}));

// ============================================================
// CONTACT SUBMISSIONS (İletişim Formları)
// ============================================================
export const contactSubmissions = pgTable("contact_submissions", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }),
  subject: varchar("subject", { length: 500 }).notNull(),
  message: text("message").notNull(),
  isRead: boolean("is_read").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ============================================================
// SERVICES (Hizmetler — admin'den yönetilebilir)
// ============================================================
export const services = pgTable("services", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  description: text("description"),
  content: text("content"),
  icon: varchar("icon", { length: 50 }),
  metaDescription: text("meta_description"),
  sortOrder: integer("sort_order").default(0),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ============================================================
// DOCUMENT TEMPLATES (Belge Şablonları)
// ============================================================
export const documentTemplates = pgTable("document_templates", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  category: varchar("category", { length: 100 }).notNull(), // dilekce, sozlesme, vekaletname, basvuru, diger
  contentTemplate: text("content_template").notNull(),
  variables: jsonb("variables"), // ["müvekkil_adı", "tarih", "pasaport_no", ...]
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ============================================================
// SITE SETTINGS (Site Ayarları)
// ============================================================
export const siteSettings = pgTable("site_settings", {
  id: uuid("id").defaultRandom().primaryKey(),
  key: varchar("key", { length: 255 }).notNull().unique(),
  value: text("value"),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ============================================================
// CLIENT NOTES (Müvekkil Notları)
// ============================================================
export const clientNotes = pgTable("client_notes", {
  id: uuid("id").defaultRandom().primaryKey(),
  clientId: uuid("client_id")
    .references(() => clients.id, { onDelete: "cascade" })
    .notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const clientNotesRelations = relations(clientNotes, ({ one }) => ({
  client: one(clients, {
    fields: [clientNotes.clientId],
    references: [clients.id],
  }),
}));

// ============================================================
// Type exports
// ============================================================
export type AdminUser = typeof adminUsers.$inferSelect;
export type NewAdminUser = typeof adminUsers.$inferInsert;
export type Client = typeof clients.$inferSelect;
export type NewClient = typeof clients.$inferInsert;
export type ClientDocument = typeof clientDocuments.$inferSelect;
export type ClientDocumentFile = typeof clientDocumentFiles.$inferSelect;
export type Payment = typeof payments.$inferSelect;
export type Reminder = typeof reminders.$inferSelect;
export type CourtDate = typeof courtDates.$inferSelect;
export type CalendarEvent = typeof calendarEvents.$inferSelect;
export type BlogPost = typeof blogPosts.$inferSelect;
export type BlogCategory = typeof blogCategories.$inferSelect;
export type ContactSubmission = typeof contactSubmissions.$inferSelect;
export type Service = typeof services.$inferSelect;
export type DocumentTemplate = typeof documentTemplates.$inferSelect;
export type SiteSetting = typeof siteSettings.$inferSelect;
export type ClientNote = typeof clientNotes.$inferSelect;
