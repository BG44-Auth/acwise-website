import type { Metadata } from "next";
import { ClarityPage } from "@/components/clarity-page";

export const metadata: Metadata = {
  title: "Without the Headaches | AC Wise",
};

export default function WithoutTheHeadaches() {
  return (
    <ClarityPage
      title="Without the Headaches."
      intro="With air conditioning, getting started can often feel like the hardest part. Finding a professional suited to the job, not always knowing the right questions to ask, reaching out to each one and explaining the same preliminary details each time."
      sections={[
        {
          heading: "How this helps you",
          body: "We ask you a few questions, which helps us connect you with a professional suited to your job based on your needs. Your details only go to them, no one outside our professional network. And the guidance you need is all on one centralised platform.",
        },
        {
          heading: "What this means for you",
          body: "It's a shorter path to the people who can help. It's also knowing the smaller details that can help you find the right solution and create longevity for your system. The initial contact and enquiry information is handled, so instead of starting at square one, you start steps ahead.",
        },
        {
          heading: "Why we do it",
          body: "Air conditioning is essential, and we wanted a central place to make it easier for you to find what you need, so you can spend less time sweating the small stuff and more time on what really matters.",
        },
      ]}
      closingLine="Start here to find a professional"
      cta={{ label: "Start your request", href: "/find-a-professional" }}
    />
  );
}
