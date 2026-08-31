import type { Metadata } from "next";
import { FaqAccordion } from "@/components/faq-accordion";
import { customerFaqs, professionalFaqs } from "@/content/faqs";

export const metadata: Metadata = {
  title: "Air Conditioning FAQs | AC Wise",
  description: "Answers to the most common questions about how AC Wise works.",
};

export default function FaqsPage() {
  return (
    <div className="flex flex-1 flex-col bg-black">
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold tracking-widest text-brand uppercase">
            Help Centre
          </p>
          <h1 className="font-heading mt-6 text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl">
            Frequently Asked Questions
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
            Answers to the most common questions about how AC Wise works.
          </p>
        </div>
      </section>

      <section className="px-4 pb-24 sm:px-6 lg:px-8">
        <FaqAccordion
          customerFaqs={customerFaqs}
          professionalFaqs={professionalFaqs}
        />
      </section>
    </div>
  );
}
