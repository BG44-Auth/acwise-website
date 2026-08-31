"use client";

import { useActionState, useState } from "react";
import { ArrowRight } from "lucide-react";
import {
  submitContactForm,
  type ContactEnquiryType,
  type ContactFormState,
} from "./actions";

const enquiryTypes: ContactEnquiryType[] = [
  "Residential",
  "Commercial",
  "Partner Enquiry",
  "General",
];

const initialState: ContactFormState = { status: "idle" };

export function ContactForm() {
  const [enquiryType, setEnquiryType] = useState<ContactEnquiryType>(
    "Residential",
  );
  const [state, formAction, pending] = useActionState(
    submitContactForm,
    initialState,
  );

  return (
    <form action={formAction} className="space-y-6">
      <input type="hidden" name="enquiryType" value={enquiryType} />

      <div>
        <p className="mb-3 text-sm font-medium text-muted-foreground">
          What type of enquiry?
        </p>
        <div className="flex flex-wrap gap-3">
          {enquiryTypes.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setEnquiryType(type)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                enquiryType === type
                  ? "border-brand bg-brand text-brand-ink"
                  : "border-border bg-card text-foreground hover:border-brand/40 hover:bg-card/80"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <input
          name="firstName"
          placeholder="First name"
          required
          className="rounded-xl border border-border bg-muted/50 px-4 py-3 text-sm text-white placeholder:text-muted-foreground focus:border-brand/60 focus:outline-none"
        />
        <input
          name="lastName"
          placeholder="Last name"
          required
          className="rounded-xl border border-border bg-muted/50 px-4 py-3 text-sm text-white placeholder:text-muted-foreground focus:border-brand/60 focus:outline-none"
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <input
          name="email"
          type="email"
          placeholder="Email address"
          required
          className="rounded-xl border border-border bg-muted/50 px-4 py-3 text-sm text-white placeholder:text-muted-foreground focus:border-brand/60 focus:outline-none"
        />
        <input
          name="phone"
          type="tel"
          placeholder="Phone number"
          className="rounded-xl border border-border bg-muted/50 px-4 py-3 text-sm text-white placeholder:text-muted-foreground focus:border-brand/60 focus:outline-none"
        />
      </div>
      <textarea
        name="message"
        placeholder="Your message"
        required
        rows={5}
        className="w-full rounded-xl border border-border bg-muted/50 px-4 py-3 text-sm text-white placeholder:text-muted-foreground focus:border-brand/60 focus:outline-none"
      />

      {state.status !== "idle" && state.message && (
        <p
          className={`text-sm ${state.status === "success" ? "text-brand" : "text-red-400"}`}
        >
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center rounded-full bg-brand px-8 py-3.5 text-base font-semibold text-brand-ink transition-colors hover:bg-brand/90 disabled:opacity-60"
      >
        {pending ? "Sending..." : "Send Message"}
        {!pending && <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />}
      </button>
    </form>
  );
}
