import type { Metadata } from "next";
import { FaqAccordion } from "@/components/faq-accordion";
import { customerFaqs, professionalFaqs } from "@/content/faqs";

export const metadata: Metadata = {
  title: "Air Conditioning FAQs | AC Wise",
  description: "Answers to the most common questions about how AC Wise works.",
};

export default function FaqsPage() {
  // FAQPage schema, read by both search engines (the classic "expandable
  // FAQ" rich result) and AI answer engines, which lean on exactly this
  // structured Q&A shape when a user asks something this page already
  // answers. Built straight from the same content the page renders, so
  // the two can never drift out of sync.
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [...customerFaqs, ...professionalFaqs].map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <div className="flex flex-1 flex-col bg-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
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
