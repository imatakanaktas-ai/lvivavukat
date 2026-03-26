"use server";

import { contactFormSchema } from "@/lib/validations";

export type ContactFormState = {
  success: boolean;
  message: string;
} | null;

export async function submitContactForm(
  _prev: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const raw = {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    subject: formData.get("subject"),
    message: formData.get("message"),
    honeypot: formData.get("honeypot"),
  };

  // Validate
  const result = contactFormSchema.safeParse(raw);
  if (!result.success) {
    const firstError = result.error.issues[0];
    return { success: false, message: firstError?.message || "Form verileri geçersiz." };
  }

  // Honeypot check
  if (result.data.honeypot) {
    // Silently reject bot submissions
    return { success: true, message: "Mesajınız başarıyla gönderildi." };
  }

  try {
    // TODO: Save to DB when Neon is connected
    // const { db } = await import("@/lib/db");
    // const { contactSubmissions } = await import("@/lib/db/schema");
    // await db.insert(contactSubmissions).values({
    //   name: result.data.name,
    //   email: result.data.email,
    //   phone: result.data.phone || null,
    //   subject: result.data.subject,
    //   message: result.data.message,
    // });

    // For now, log (remove in production)
    console.log("Contact form submitted:", {
      name: result.data.name,
      email: result.data.email,
      subject: result.data.subject,
    });

    return {
      success: true,
      message: "Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.",
    };
  } catch {
    return {
      success: false,
      message: "Bir hata oluştu. Lütfen daha sonra tekrar deneyin veya WhatsApp ile ulaşın.",
    };
  }
}
