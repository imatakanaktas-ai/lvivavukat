"use server";

import { signIn } from "@/lib/auth/config";
import { loginFormSchema } from "@/lib/validations";
import { AuthError } from "next-auth";

export type LoginFormState = {
  success: boolean;
  message: string;
} | null;

export async function loginAction(
  _prev: LoginFormState,
  formData: FormData
): Promise<LoginFormState> {
  const raw = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const result = loginFormSchema.safeParse(raw);
  if (!result.success) {
    return { success: false, message: result.error.issues[0]?.message || "Geçersiz giriş bilgileri." };
  }

  try {
    const adminPrefix = process.env.ADMIN_ROUTE_PREFIX || "panel-yonetim2024x";
    await signIn("credentials", {
      email: result.data.email,
      password: result.data.password,
      redirectTo: `/${adminPrefix}`,
    });
    return { success: true, message: "Giriş başarılı." };
  } catch (error) {
    if (error instanceof AuthError) {
      if (error.type === "CredentialsSignin") {
        return { success: false, message: "E-posta veya şifre hatalı." };
      }
    }
    // NEXT_REDIRECT is thrown by signIn on success, re-throw it
    throw error;
  }
}
