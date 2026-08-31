"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { Faq } from "@/content/faqs";

export function FaqAccordion({
  customerFaqs,
  professionalFaqs,
}: {
  customerFaqs: Faq[];
  professionalFaqs: Faq[];
}) {
  const [tab, setTab] = useState<"customers" | "professionals">("customers");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = tab === "customers" ? customerFaqs : professionalFaqs;

  return (
    <div className="mx-auto max-w-3xl">
      <div className="flex justify-center gap-3">
        {(
          [
            { key: "customers", label: "For Customers" },
            { key: "professionals", label: "For Professionals" },
          ] as const
        ).map((option) => (
          <button
            key={option.key}
            type="button"
            onClick={() => {
              setTab(option.key);
              setOpenIndex(null);
            }}
            className={`rounded-full border px-5 py-2 text-sm font-medium transition-colors ${
              tab === option.key
                ? "border-brand bg-brand text-brand-ink"
                : "border-border bg-card text-foreground hover:border-brand/40 hover:bg-card/80"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      <div className="glow-border mt-10 divide-y divide-white/10 rounded-xl bg-card">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={faq.question}>
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              >
                <span className="text-sm font-semibold text-white sm:text-base">
                  {faq.question}
                </span>
                <ChevronDown
                  aria-hidden="true"
                  className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                />
              </button>
              {isOpen && (
                <div className="px-6 pb-5 text-sm text-muted-foreground">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
