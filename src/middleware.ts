import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Simple in-memory rate limiting (per instance)
const loginAttempts = new Map<string, { count: number; lastAttempt: number }>();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 dakika
const MAX_ATTEMPTS = 5;

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = loginAttempts.get(ip);

  if (!entry) return false;
  if (now - entry.lastAttempt > RATE_LIMIT_WINDOW) {
    loginAttempts.delete(ip);
    return false;
  }

  return entry.count >= MAX_ATTEMPTS;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const adminPrefix = process.env.ADMIN_ROUTE_PREFIX || "panel-yonetim2024x";

  // Security headers for all responses
  const response = NextResponse.next();
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()"
  );
  response.headers.set(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: blob: https:; connect-src 'self' https:; frame-ancestors 'none'; base-uri 'self'; form-action 'self';"
  );
  response.headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");

  // Block access to admin routes that don't use the secret prefix
  if (pathname.startsWith("/panel-") && !pathname.startsWith(`/${adminPrefix}`)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Rate limit login attempts
  if (pathname === `/${adminPrefix}/login` && request.method === "POST") {
    const ip = getClientIp(request);
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Çok fazla giriş denemesi. 15 dakika sonra tekrar deneyin." },
        { status: 429 }
      );
    }

    const now = Date.now();
    const entry = loginAttempts.get(ip);
    if (entry) {
      entry.count++;
      entry.lastAttempt = now;
    } else {
      loginAttempts.set(ip, { count: 1, lastAttempt: now });
    }
  }

  // Protect admin routes (except login)
  if (
    pathname.startsWith(`/${adminPrefix}`) &&
    !pathname.startsWith(`/${adminPrefix}/login`) &&
    !pathname.startsWith("/api/auth")
  ) {
    // Auth check handled by NextAuth middleware or page-level
    // This is additional layer - check for session cookie
    const sessionToken =
      request.cookies.get("authjs.session-token") ||
      request.cookies.get("__Secure-authjs.session-token");

    if (!sessionToken) {
      return NextResponse.redirect(
        new URL(`/${adminPrefix}/login`, request.url)
      );
    }
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.png$|.*\\.jpg$|.*\\.svg$).*)",
  ],
};
