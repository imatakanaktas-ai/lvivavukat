"use client";

import { signOut } from "next-auth/react";

const adminPrefix = process.env.NEXT_PUBLIC_ADMIN_ROUTE_PREFIX || "panel-yonetim2024x";

export function handleSignOut() {
  signOut({ callbackUrl: `/${adminPrefix}/login` });
}
