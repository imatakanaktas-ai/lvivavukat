"use server";

import { contactFormSchema } from "@/lib/validations";
import { cookies } from "next/headers";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

export type ContactFormState = {
  success: boolean;
  message: string;
} | null;

export async function submitContactForm(
  _prev: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("NEXT_LOCALE")?.value || "tr") as Locale;
  const dict = await getDictionary(locale);

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
    return { success: false, message: firstError?.message || dict.contact.errorValidation };
  }

  // Honeypot check
  if (result.data.honeypot) {
    // Silently reject bot submissions
    return { success: true, message: dict.contact.successMessage };
  }

  try {
    // For now, log (remove in production)
    console.log("Contact form submitted:", {
      name: result.data.name,
      email: result.data.email,
      subject: result.data.subject,
    });

    return {
      success: true,
      message: dict.contact.successMessage,
    };
  } catch {
    return {
      success: false,
      message: dict.contact.errorGeneric,
    };
  }
}
