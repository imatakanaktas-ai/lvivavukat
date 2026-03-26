"use client";

import { useActionState } from "react";
import { Lock, Mail, Loader2, AlertCircle, Scale } from "lucide-react";
import { loginAction, type LoginFormState } from "./actions";

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState<LoginFormState, FormData>(
    loginAction,
    null
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0A1628] via-[#1B2A4A] to-[#0A1628] px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#C9A84C]/20 mb-4">
            <Scale className="w-8 h-8 text-[#C9A84C]" />
          </div>
          <h1 className="text-2xl font-serif font-bold text-white">
            Lviv Avukat
          </h1>
          <p className="text-sm text-white/40 mt-1">Yönetim Paneli</p>
        </div>

        {/* Form Card */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
          <h2 className="text-lg font-semibold text-white mb-6">Giriş Yap</h2>

          {state && !state.success && (
            <div className="flex items-center gap-2 p-3 mb-5 rounded-xl bg-red-500/10 border border-red-500/20">
              <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
              <p className="text-sm text-red-400">{state.message}</p>
            </div>
          )}

          <form action={formAction} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white/70 mb-1.5">
                E-posta
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  autoComplete="email"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 
                    text-white placeholder:text-white/20 text-sm 
                    focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/30 focus:border-[#C9A84C]/30 
                    transition-shadow"
                  placeholder="admin@lvivavukat.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white/70 mb-1.5">
                Şifre
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  minLength={6}
                  autoComplete="current-password"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 
                    text-white placeholder:text-white/20 text-sm 
                    focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/30 focus:border-[#C9A84C]/30 
                    transition-shadow"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full flex items-center justify-center gap-2 bg-[#C9A84C] hover:bg-[#D4AF37] 
                text-[#0A1628] py-3.5 rounded-xl font-bold text-sm transition-colors 
                disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Giriş yapılıyor...
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  Giriş Yap
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-white/20 mt-6">
          © {new Date().getFullYear()} Lviv Avukat — Yönetim Paneli
        </p>
      </div>
    </div>
  );
}
