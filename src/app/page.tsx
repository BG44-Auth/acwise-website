import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  BadgeCheck,
  Building2,
  ChevronRight,
  Leaf,
  Scale,
  ShieldCheck,
} from "lucide-react";
import { SponsorMarquee } from "@/components/sponsor-marquee";
import { Reveal } from "@/components/reveal";

const differentiatorImages = [
  "/images/clarity-1.jpg",
  "/images/clarity-2.jpg",
  "/images/clarity-3.jpg",
];

const steps = [
  {
    number: "01",
    title: "Tell us about your space",
    description:
      "A few quick questions about your space, your needs, and your location.",
  },
  {
    number: "02",
    title: "Get matched",
    description:
      "We match you with vetted professionals based on what you've told us, so you can get free, no-obligation quotes.",
  },
  {
    number: "03",
    title: "Compare and choose",
    description:
      "Weigh up each quote against what your property needs, then choose the professional that suits you.",
  },
  {
    number: "04",
    title: "The job gets done",
    description:
      "Your chosen professional carries out the work, and we check in once it's done.",
  },
];

const differentiators = [
  {
    title: "Without the Guesswork",
    href: "/without-the-guesswork",
    description:
      "Clear guidance grounded in industry standards, so you know what to look for before you compare a single quote.",
  },
  {
    title: "Without the Blindfold",
    href: "/without-the-risk",
    description:
      "Every professional is vetted before they reach you, so you always know who you're dealing with.",
  },
  {
    title: "Without the Headaches",
    href: "/without-the-headaches",
    description:
      "We handle the matching and the follow-up, so you can focus on choosing the right professional for the job.",
  },
];

const standards = [
  {
    title: "ARC Licensed",
    icon: Award,
    description:
      "All refrigerant handling carried out by ARC-authorised technicians.",
  },
  {
    title: "AIRAH Aligned",
    icon: BadgeCheck,
    description:
      "Standards informed by the Australian Institute of Refrigeration, AC and Heating.",
  },
  {
    title: "Clean Energy Council",
    icon: Leaf,
    description:
      "Sustainability and efficiency benchmarks recognised across the industry.",
  },
  {
    title: "Consumer Law",
    icon: Scale,
    description:
      "Partners confirm they work within state consumer protection frameworks.",
  },
  {
    title: "Licensed & Insured",
    icon: Building2,
    description:
      "Trade licences and public liability insurance verified before listing.",
  },
  {
    title: "Partner Vetting",
    icon: ShieldCheck,
    description:
      "Every partner passes our internal verification before accepting enquiries.",
  },
];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-black">
      <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden px-4 py-24 sm:px-6 md:min-h-[80vh] lg:px-8">
        <Image
          src="/images/hero-install.jpg"
          alt=""
          fill
          priority
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/85 to-black/55"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(0,230,153,0.14),_transparent_60%)]"
        />

        <div className="relative mx-auto max-w-4xl text-center">
          <p className="mb-5 text-sm font-semibold tracking-widest text-brand uppercase">
            Australia&apos;s Managed HVAC Marketplace
          </p>

          <h1 className="font-heading text-4xl leading-[1.05] font-bold tracking-tight break-words sm:text-5xl md:text-6xl lg:text-[5.5rem] xl:text-[6rem]">
            Connecting you
            <br />
            with qualified
            <br />
            <span className="text-brand">air conditioning</span>
            <br />
            <span className="text-brand">professionals</span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            AC Wise connects Australian property owners with air conditioning
            professionals. Guidance grounded in industry standards, so you can
            choose with confidence.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/find-a-professional"
              className="inline-flex items-center rounded-full bg-brand px-8 py-3.5 text-base font-semibold text-brand-ink transition-colors hover:bg-brand/90"
            >
              I need a professional
              <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
            </Link>
            <Link
              href="/become-a-partner/short-form"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-8 py-3.5 text-base font-semibold text-foreground transition-colors hover:bg-muted"
            >
              I am a trade partner
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <p className="text-center text-xs font-semibold tracking-widest text-muted-foreground uppercase">
          Trusted by leading manufacturers and industry partners
        </p>
        <p className="mt-2 text-center text-[10px] font-semibold tracking-widest text-muted-foreground uppercase">
          Sponsored Partners
        </p>
        <div className="mt-6">
          <SponsorMarquee />
        </div>
      </section>

      <section className="px-4 py-20 md:py-28 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold tracking-widest text-brand uppercase">
              How It Works
            </p>
            <h2 className="font-heading mt-4 text-3xl font-bold text-white sm:text-4xl">
              Four steps to your professional
            </h2>
          </div>

          <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <div key={step.number}>
                <p className="mb-1 font-mono text-xs text-cyan/80">
                  {step.number}
                </p>
                <h3 className="font-heading mt-4 text-lg font-semibold text-white">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="px-4 py-20 md:py-28 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold tracking-widest text-brand uppercase">
              What Sets Us Apart
            </p>
            <h2 className="font-heading mt-4 text-3xl font-bold text-white sm:text-4xl">
              Built for Clarity.
            </h2>
            <p className="mt-4 text-muted-foreground">
              We cut through the noise so you can make informed decisions
              with confidence.
            </p>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-3">
            {differentiators.map((item, index) => (
              <div
                key={item.title}
                className="glow-border group relative overflow-hidden rounded-xl"
              >
                <div className="relative h-40 w-full overflow-hidden">
                  <Image
                    src={differentiatorImages[index]}
                    alt=""
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                </div>
                <div className="bg-card p-8">
                  <h3 className="font-heading text-lg font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground">
                    {item.description}
                  </p>
                  <Link
                    href={item.href}
                    className="mt-1 inline-flex items-center gap-1 text-sm text-brand hover:underline"
                  >
                    Learn More
                    <ChevronRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="px-4 py-20 md:py-28 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold tracking-widest text-brand uppercase">
              Trust &amp; Transparency
            </p>
            <h2 className="font-heading mt-4 text-3xl font-bold text-white sm:text-4xl">
              Built on Industry Standards.
            </h2>
            <p className="mt-4 text-muted-foreground">
              Our platform is grounded in the certifications, licensing and
              frameworks that govern Australia&apos;s air conditioning
              industry.
            </p>
          </div>

          <div className="mt-16 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {standards.map((item) => (
              <div key={item.title} className="flex gap-3">
                <item.icon className="h-5 w-5 shrink-0 text-cyan" aria-hidden="true" />
                <div>
                  <h3 className="font-heading text-base font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="px-4 py-20 md:py-28 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold tracking-widest text-brand uppercase">
            What We Stand For
          </p>
          <h2 className="font-heading mt-4 text-3xl font-bold text-white sm:text-4xl">
            Clear guidance, honestly delivered.
          </h2>
          <p className="mt-6 text-muted-foreground">
            We advocate for a higher standard in Australian air conditioning.
            For property owners, that means vetted professionals, guidance
            that goes beyond the purchase, and quality as the baseline, all
            grounded in industry standards.
          </p>
          <Link
            href="/about"
            className="mt-8 inline-flex items-center font-medium text-brand hover:underline"
          >
            Read about our mission
          </Link>
        </Reveal>
      </section>
    </div>
  );
}
