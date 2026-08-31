import type { Metadata } from "next";
import Link from "next/link";
import {
  Award,
  BadgeCheck,
  ChartColumn,
  Filter,
  Home,
  Library,
  LifeBuoy,
  ArrowRight,
  Wind,
  Zap,
} from "lucide-react";
import { CountUp } from "@/components/count-up";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "AC Wise for Businesses",
  description:
    "Join a vetted network of air conditioning professionals. Quality enquiries, pre-qualified and matched to your trade and service area.",
};

const stats = [
  {
    value: "63%",
    label: "of Australian households use air conditioning",
    icon: Home,
  },
  {
    value: "40%",
    label: "of household energy bills go to heating and cooling",
    icon: Zap,
  },
  {
    value: "17.2 Million+",
    label: "Air conditioning units in use across Australia",
    icon: Wind,
  },
];

const benefits = [
  {
    title: "Verified partner profile",
    icon: BadgeCheck,
    description:
      "We verify your licences and insurance before listing. Every enquiry we send you arrives with the customer already confident they've been matched with a verified operator.",
  },
  {
    title: "Pre-qualified enquiries",
    icon: Filter,
    description:
      "Every enquiry is checked and matched to your trade and service area before it reaches you. Qualified enquiries, suited to your services, so your time goes where it counts.",
  },
  {
    title: "Partner resource library",
    icon: Library,
    description:
      "Templates and guides made for HVAC professionals, so you can quote clearly and keep customers well informed.",
  },
  {
    title: "Monthly performance reports",
    icon: ChartColumn,
    description:
      "A clear monthly report on how your profile is performing month to month, so you can keep improving the service your customers receive.",
  },
  {
    title: "30-day onboarding support",
    icon: LifeBuoy,
    description:
      "Dedicated support through your first 30 days. We help you set up your profile, and we're here for the questions that come up as you go.",
  },
  {
    title: "Industry Insights",
    icon: Award,
    description:
      "A regular look at what we're seeing across the network: what customers are asking for, where demand is shifting, and the trends worth knowing.",
  },
];

export default function ForBusinessesPage() {
  return (
    <div className="flex flex-1 flex-col bg-black">
      <section className="relative overflow-hidden px-4 py-20 md:py-28 sm:px-6 lg:px-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(0,230,153,0.14),_transparent_60%)]"
        />
        <div className="relative mx-auto max-w-4xl text-center">
          <p className="text-sm font-semibold tracking-widest text-brand uppercase">
            For Trade Partners
          </p>
          <h1 className="font-heading mt-6 text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
            Quality enquiries.
            <br />
            Sustainable growth.
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-lg text-muted-foreground">
            We help with the preliminary questions, so you can spend more
            time with customers on what matters most.
          </p>
          <div className="mt-10 flex justify-center">
            <Link
              href="/become-a-partner/short-form"
              className="inline-flex items-center rounded-full bg-brand px-8 py-3.5 text-base font-semibold text-brand-ink transition-colors hover:bg-brand/90"
            >
              Register your interest
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-5xl gap-10 text-center sm:grid-cols-3">
          {stats.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 120}>
              <stat.icon
                className="mx-auto h-6 w-6 text-cyan"
                aria-hidden="true"
              />
              <p
                className="mt-3 text-4xl font-extrabold text-brand sm:text-5xl"
                style={{ textShadow: "0 0 24px rgba(0,230,153,.35)" }}
              >
                <CountUp value={stat.value} />
              </p>
              <p className="mt-3 text-sm text-muted-foreground">{stat.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="px-4 py-20 md:py-28 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold tracking-widest text-brand uppercase">
              Why Partner With Us
            </p>
            <h2 className="font-heading mt-4 text-3xl font-bold text-white sm:text-4xl">
              Built to support your growth.
            </h2>
            <p className="mt-4 text-muted-foreground">
              Practical support to take on quality work and run a smoother
              business.
            </p>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="glow-border rounded-xl bg-card p-8"
              >
                <benefit.icon
                  className="h-5 w-5 text-brand"
                  aria-hidden="true"
                />
                <h3 className="font-heading mt-4 text-lg font-semibold text-white">
                  {benefit.title}
                </h3>
                <p className="mt-3 text-sm text-muted-foreground">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-20 md:py-28 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">
            Join a vetted network of professionals.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Register your interest to join a network of vetted professionals
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              href="/become-a-partner/short-form"
              className="inline-flex items-center rounded-full bg-brand px-8 py-3.5 text-base font-semibold text-brand-ink transition-colors hover:bg-brand/90"
            >
              Register your interest
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
