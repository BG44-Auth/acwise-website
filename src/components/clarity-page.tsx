import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function ClarityPage({
  title,
  intro,
  sections,
  closingLine,
  cta,
}: {
  title: string;
  intro: string;
  sections: { heading: string; body: string }[];
  closingLine: string;
  cta: { label: string; href: string };
}) {
  return (
    <div className="flex flex-1 flex-col bg-black px-4 py-20 md:py-28 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-3xl">
        <p className="text-sm font-semibold tracking-widest text-brand uppercase">
          Built for Clarity
        </p>
        <h1 className="font-heading mt-4 text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl">
          {title}
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
          {intro}
        </p>

        <div className="mt-16 space-y-12">
          {sections.map((section) => (
            <div key={section.heading}>
              <h2 className="font-heading text-2xl font-bold text-white">
                {section.heading}
              </h2>
              <p className="mt-4 text-muted-foreground">{section.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 border-t border-border/30 pt-10 text-center">
          <p className="text-lg font-medium text-white">{closingLine}</p>
          <Link
            href={cta.href}
            className="mt-6 inline-flex items-center rounded-full bg-brand px-8 py-3.5 text-base font-semibold text-brand-ink transition-colors hover:bg-brand/90"
          >
            {cta.label}
            <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
