import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Shield, Users, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "About AC Wise",
  description:
    "AC Wise is a network of vetted professionals, helping property owners make clearer decisions when choosing an air conditioner.",
};

const sections = [
  {
    title: "Why we exist",
    body: "It's easy to think air conditioning is just air conditioning, that it heats and cools and nothing more, so it's hard to know what to ask. Quotes come back with no common ground, quality varies, and the cheapest price rarely tells the full story. Too many homes end up with the wrong system, and an installation that doesn't meet Australian standards.",
  },
  {
    title: "What we stand for",
    body: "We advocate for a higher standard in Australian air conditioning, with quality as the baseline rather than the exception. For property owners, that means clear guidance and a professional suited to the job. For businesses, it means quality enquiries and the backing to keep doing good work. We align with professionals who stand behind their work, and we keep our guidance grounded in industry standards.",
  },
  {
    title: "Who we are",
    body: "AC Wise is a national platform that guides property owners through their heating and cooling choices, and helps businesses grow with quality enquiries. We sit in the middle, between a property owner who wants it done well and a professional who takes pride in their work, and our guidance for both is grounded in industry standards.",
  },
  {
    title: "Where we work",
    body: "With head office based in Adelaide, AC Wise operates across Australia. You can access HVAC guidance across the nation from your device. Our network of professionals covers the major metropolitan areas and keeps growing into the regions. And if our network hasn't reached you yet, we can still help.",
  },
  {
    title: "How we do it",
    body: "Every enquiry is handled with intention, so we can match you with a professional suited to the job. We ask the questions that help from the start, point you towards the information you're looking for. We brief that professional with your enquiry, they carry out the work, and we check in once it's done.",
  },
];

const pillars = [
  {
    title: "Trustworthy",
    icon: Shield,
    description: "Every professional on AC Wise is vetted before they reach you.",
  },
  {
    title: "Expert",
    icon: Users,
    description:
      "Understand your system, make it last longer, and keep heating and cooling efficient.",
  },
  {
    title: "Professional",
    icon: Zap,
    description:
      "Australian HVAC standards and professional service is the baseline.",
  },
];

export default function AboutPage() {
  return (
    <div className="flex flex-1 flex-col bg-black">
      <section className="px-4 py-20 md:py-28 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-semibold tracking-widest text-brand uppercase">
            About AC Wise
          </p>
          <h1 className="font-heading mt-6 text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl">
            Australia&apos;s Managed HVAC Marketplace.
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-lg text-muted-foreground">
            AC Wise is a network of vetted professionals, helping property
            owners make clearer decisions when choosing an air conditioner,
            so one of their biggest investments isn&apos;t left to chance.
          </p>
        </div>
      </section>

      <section className="px-4 py-20 md:py-28 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl space-y-16">
          <p className="text-sm font-semibold tracking-widest text-brand uppercase">
            Our Mission
          </p>
          {sections.map((section) => (
            <div key={section.title}>
              <h2 className="font-heading text-2xl font-bold text-white">
                {section.title}
              </h2>
              <p className="mt-4 text-muted-foreground">{section.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 py-20 md:py-28 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-5xl gap-10 sm:grid-cols-3">
          {pillars.map((pillar) => (
            <div key={pillar.title} className="text-center sm:text-left">
              <pillar.icon
                className="mx-auto h-5 w-5 text-brand sm:mx-0"
                aria-hidden="true"
              />
              <h3 className="font-heading mt-3 text-lg font-semibold text-brand">
                {pillar.title}
              </h3>
              <p className="mt-3 text-sm text-muted-foreground">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 py-20 md:py-28 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">
            Glad you found us.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Whether you&apos;re looking for a professional or you are one, we
            can help
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/find-a-professional"
              className="inline-flex items-center rounded-full bg-brand px-8 py-3.5 text-base font-semibold text-brand-ink transition-colors hover:bg-brand/90"
            >
              Find a Professional
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/become-a-partner/short-form"
              className="inline-flex items-center rounded-full border border-border bg-background px-8 py-3.5 text-base font-semibold text-foreground transition-colors hover:bg-muted"
            >
              Become a Partner
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
