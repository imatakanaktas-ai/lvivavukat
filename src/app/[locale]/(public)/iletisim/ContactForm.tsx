"use client";

import { useActionState } from "react";
import { Send, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { submitContactForm, type ContactFormState } from "./actions";
import type { Dictionary } from "@/i18n/get-dictionary";

type ContactDict = Dictionary["contact"];

export default function ContactForm({ dict }: { dict: ContactDict }) {
  const [state, formAction, isPending] = useActionState<ContactFormState, FormData>(
    submitContactForm,
    null
  );

  if (state?.success) {
    return (
      <div className="p-8 rounded-2xl bg-success/10 border border-success/20 text-center">
        <CheckCircle className="w-12 h-12 text-success mx-auto mb-4" />
        <h3 className="text-xl font-serif font-bold text-foreground mb-2">
          {dict.successTitle}
        </h3>
        <p className="text-muted">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5">
      {state && !state.success && (
        <div className="flex items-center gap-2 p-3 rounded-xl bg-destructive/10 border border-destructive/20">
          <AlertCircle className="w-4 h-4 text-destructive flex-shrink-0" />
          <p className="text-sm text-destructive">{state.message}</p>
        </div>
      )}

      {/* Honeypot */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="honeypot">Do not fill this field</label>
        <input type="text" name="honeypot" id="honeypot" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1.5">
            {dict.nameLabel} <span className="text-destructive">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            minLength={2}
            maxLength={100}
            className="w-full px-4 py-3 rounded-xl bg-secondary border border-border/50 text-foreground 
              placeholder:text-muted text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 
              focus:border-accent/30 transition-shadow"
            placeholder={dict.namePlaceholder}
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">
            {dict.emailLabel2} <span className="text-destructive">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full px-4 py-3 rounded-xl bg-secondary border border-border/50 text-foreground 
              placeholder:text-muted text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 
              focus:border-accent/30 transition-shadow"
            placeholder={dict.emailPlaceholder}
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-1.5">
            {dict.phoneLabel2}
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="w-full px-4 py-3 rounded-xl bg-secondary border border-border/50 text-foreground 
              placeholder:text-muted text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 
              focus:border-accent/30 transition-shadow"
            placeholder={dict.phonePlaceholder}
          />
        </div>
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-1.5">
            {dict.subjectLabel} <span className="text-destructive">*</span>
          </label>
          <select
            id="subject"
            name="subject"
            required
            className="w-full px-4 py-3 rounded-xl bg-secondary border border-border/50 text-foreground 
              text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 
              focus:border-accent/30 transition-shadow"
            defaultValue=""
          >
            <option value="" disabled>
              {dict.subjectPlaceholder}
            </option>
            <option value="residence">{dict.subjectResidence}</option>
            <option value="work">{dict.subjectWork}</option>
            <option value="marriage">{dict.subjectMarriage}</option>
            <option value="company">{dict.subjectCompany}</option>
            <option value="realEstate">{dict.subjectRealEstate}</option>
            <option value="visa">{dict.subjectVisa}</option>
            <option value="translation">{dict.subjectTranslation}</option>
            <option value="other">{dict.subjectOther}</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1.5">
          {dict.messageLabel} <span className="text-destructive">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          minLength={10}
          maxLength={5000}
          className="w-full px-4 py-3 rounded-xl bg-secondary border border-border/50 text-foreground 
            placeholder:text-muted text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 
            focus:border-accent/30 transition-shadow resize-y"
          placeholder={dict.messagePlaceholder}
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover 
          text-primary py-3.5 rounded-xl font-bold text-sm transition-colors 
          disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isPending ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            {dict.sending}
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            {dict.sendButton}
          </>
        )}
      </button>

      <p className="text-xs text-muted text-center">
        {dict.privacy}
      </p>
    </form>
  );
}
