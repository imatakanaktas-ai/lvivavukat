import { z } from "zod";

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, "İsim en az 2 karakter olmalıdır")
    .max(100, "İsim en fazla 100 karakter olabilir"),
  email: z.string().email("Geçerli bir e-posta adresi girin"),
  phone: z
    .string()
    .min(10, "Geçerli bir telefon numarası girin")
    .max(20)
    .optional()
    .or(z.literal("")),
  subject: z
    .string()
    .min(3, "Konu en az 3 karakter olmalıdır")
    .max(200, "Konu en fazla 200 karakter olabilir"),
  message: z
    .string()
    .min(10, "Mesaj en az 10 karakter olmalıdır")
    .max(5000, "Mesaj en fazla 5000 karakter olabilir"),
  honeypot: z.string().max(0).optional(), // Bot protection
});

export const clientFormSchema = z.object({
  firstName: z.string().min(2, "Ad en az 2 karakter olmalıdır").max(100),
  lastName: z.string().min(2, "Soyad en az 2 karakter olmalıdır").max(100),
  phone: z.string().max(50).optional().or(z.literal("")),
  email: z.string().email("Geçerli bir e-posta adresi girin").optional().or(z.literal("")),
  nationality: z.string().max(100).optional(),
  passportNo: z.string().max(50).optional().or(z.literal("")),
  address: z.string().max(500).optional().or(z.literal("")),
  notes: z.string().max(5000).optional().or(z.literal("")),
  status: z.enum(["active", "inactive", "pending"]).default("active"),
});

export const paymentFormSchema = z.object({
  clientId: z.string().uuid(),
  title: z.string().min(2).max(255),
  amount: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Geçerli bir tutar girin",
  }),
  currency: z.enum(["UAH", "USD", "EUR", "TRY"]).default("UAH"),
  dueDate: z.string().optional().or(z.literal("")),
  status: z.enum(["pending", "paid", "overdue", "cancelled"]).default("pending"),
  type: z.enum(["avukat_ucreti", "devlet_harci", "vergi", "noter", "diger"]),
  notes: z.string().max(1000).optional().or(z.literal("")),
});

export const reminderFormSchema = z.object({
  clientId: z.string().uuid().optional().or(z.literal("")),
  title: z.string().min(2).max(255),
  description: z.string().max(1000).optional().or(z.literal("")),
  dueDate: z.string().min(1, "Tarih seçin"),
  type: z.enum(["mahkeme", "odeme", "devlet_islemi", "vergi", "deadline", "ozel"]),
});

export const calendarEventFormSchema = z.object({
  clientId: z.string().uuid().optional().or(z.literal("")),
  title: z.string().min(2, "Başlık en az 2 karakter").max(255),
  description: z.string().max(1000).optional().or(z.literal("")),
  startDate: z.string().min(1, "Başlangıç tarihi seçin"),
  endDate: z.string().optional().or(z.literal("")),
  eventType: z.enum(["toplanti", "mahkeme", "odeme", "kisisel", "diger"]),
  color: z.string().max(20).optional(),
  isAllDay: z.string().optional(),
});

export type CalendarEventFormData = z.infer<typeof calendarEventFormSchema>;

export const blogPostFormSchema = z.object({
  title: z.string().min(5, "Başlık en az 5 karakter olmalıdır").max(500),
  slug: z.string().min(3).max(500),
  content: z.string().min(50, "İçerik en az 50 karakter olmalıdır"),
  excerpt: z.string().max(500).optional().or(z.literal("")),
  metaDescription: z.string().max(160).optional().or(z.literal("")),
  metaKeywords: z.string().max(500).optional().or(z.literal("")),
  categoryId: z.string().uuid().optional().or(z.literal("")),
  status: z.enum(["draft", "published", "archived"]).default("draft"),
  coverImageUrl: z.string().url().optional().or(z.literal("")),
});

export const loginFormSchema = z.object({
  email: z.string().email("Geçerli bir e-posta adresi girin"),
  password: z.string().min(6, "Şifre en az 6 karakter olmalıdır"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
export type ClientFormData = z.infer<typeof clientFormSchema>;
export type PaymentFormData = z.infer<typeof paymentFormSchema>;
export type ReminderFormData = z.infer<typeof reminderFormSchema>;
export type BlogPostFormData = z.infer<typeof blogPostFormSchema>;
export type LoginFormData = z.infer<typeof loginFormSchema>;
