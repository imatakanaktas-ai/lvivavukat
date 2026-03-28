import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { ukSlugToCanonical, ukServiceSlugToCanonical } from "@/i18n/config";

const LOCALES = ["tr", "uk"] as const;
const DEFAULT_LOCALE = "tr";
const LOCALE_COOKIE = "NEXT_LOCALE";

// Bot user-agents that should never be locale-redirected
const BOT_UA_PATTERN =
  /googlebot|bingbot|yandexbot|duckduckbot|slurp|baiduspider|facebookexternalhit|twitterbot|rogerbot|linkedinbot|embedly|quora|pinterest|slackbot|vkshare|w3c_validator|whatsapp|telegrambot|crawl|spider|bot\b/i;

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

function getPreferredLocale(request: NextRequest): string {
  // 1. Cookie preference takes priority
  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value;
  if (cookieLocale && (LOCALES as readonly string[]).includes(cookieLocale)) {
    return cookieLocale;
  }

  // 2. Accept-Language header detection
  const headers: Record<string, string> = {};
  request.headers.forEach((value, key) => {
    headers[key] = value;
  });
  const languages = new Negotiator({ headers }).languages();

  try {
    return match(languages, [...LOCALES], DEFAULT_LOCALE);
  } catch {
    return DEFAULT_LOCALE;
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const adminPrefix = process.env.ADMIN_ROUTE_PREFIX || "panel-yonetim2024x";

  // --- LOCALE HANDLING ---
  // Skip locale handling for admin, API, and static paths
  const isAdminPath = pathname.startsWith(`/${adminPrefix}`) || pathname.startsWith("/panel-");
  const isApiPath = pathname.startsWith("/api/");
  const isPublicPath = !isAdminPath && !isApiPath;

  if (isPublicPath) {
    const isUaPath = pathname.startsWith("/ua");
    const userAgent = request.headers.get("user-agent") || "";
    const isBot = BOT_UA_PATTERN.test(userAgent);

    // Rewrite /ua/* paths → /uk/* for the [locale] segment
    // Also remap Ukrainian slugs back to canonical (Turkish) slugs
    if (isUaPath) {
      const restPath = pathname.replace(/^\/ua\/?/, "");
      const segments = restPath.split("/").filter(Boolean);

      // Remap first segment: page slug (e.g. posluhy → hizmetler)
      if (segments[0] && ukSlugToCanonical[segments[0]]) {
        segments[0] = ukSlugToCanonical[segments[0]];
      }

      // Remap second segment: service slug (e.g. opika-nad-ditmy → velayet)
      if (segments.length > 1 && segments[1] && ukServiceSlugToCanonical[segments[1]]) {
        segments[1] = ukServiceSlugToCanonical[segments[1]];
      }

      const url = request.nextUrl.clone();
      url.pathname = `/uk/${segments.join("/")}`;
      const response = NextResponse.rewrite(url);
      addSecurityHeaders(response);
      return response;
    }

    // For root paths (no /ua prefix), this is Turkish.
    // Auto-redirect non-bot users whose preferred locale is Ukrainian to /ua
    if (!isBot && pathname === "/") {
      const locale = getPreferredLocale(request);
      if (locale === "uk") {
        const url = request.nextUrl.clone();
        url.pathname = "/ua";
        const response = NextResponse.redirect(url, 302);
        response.cookies.set(LOCALE_COOKIE, "uk", {
          path: "/",
          maxAge: 365 * 24 * 60 * 60,
          sameSite: "lax",
        });
        return response;
      }
    }

    // Rewrite root Turkish paths to /tr/* for the [locale] segment
    const url = request.nextUrl.clone();
    url.pathname = `/tr${pathname}`;
    const response = NextResponse.rewrite(url);
    addSecurityHeaders(response);
    return response;
  }

  // --- SECURITY & ADMIN HANDLING ---
  const response = NextResponse.next();
  addSecurityHeaders(response);

  // Block access to admin routes that don't use the secret prefix
  if (pathname.startsWith("/panel-") && !pathname.startsWith(`/${adminPrefix}`)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Rate limit login attempts
  if (pathname === `/${adminPrefix}/login` && request.method === "POST") {
    const ip = getClientIp(request);
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Забагато спроб входу. Спробуйте через 15 хвилин." },
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

function addSecurityHeaders(response: NextResponse) {
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
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.svg$|.*\\.webp$|.*\\.ico$).*)",
  ],
};
