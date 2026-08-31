import type { Metadata } from "next";
import { Mail, Phone } from "lucide-react";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "Contact AC Wise",
  description:
    "Whether you're a homeowner, commercial property manager, or trade professional, we'd love to hear from you.",
};

export default function ContactPage() {
  return (
    <div className="flex flex-1 flex-col bg-black">
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <p className="text-sm font-semibold tracking-widest text-brand uppercase">
              Get in Touch
            </p>
            <h1 className="font-heading mt-6 text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl">
              Contact AC Wise
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              Whether you&apos;re a homeowner, commercial property manager, or
              trade professional, we&apos;d love to hear from you.
            </p>
          </div>

          <div className="mt-16 grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <ContactForm />
            </div>

            <div className="space-y-8">
              <div>
                <Mail className="mb-3 h-5 w-5 text-brand" aria-hidden="true" />
                <h2 className="font-heading text-sm font-semibold text-white">Email</h2>
                <a
                  href="mailto:hello@acwise.au"
                  className="mt-2 block text-sm text-brand hover:text-brand/80"
                >
                  hello@acwise.au
                </a>
              </div>
              <div>
                <Phone className="mb-3 h-5 w-5 text-brand" aria-hidden="true" />
                <h2 className="font-heading text-sm font-semibold text-white">Phone</h2>
                <a
                  href="tel:1800227822"
                  className="mt-2 block text-sm text-muted-foreground hover:text-foreground"
                >
                  1800 227 822
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
