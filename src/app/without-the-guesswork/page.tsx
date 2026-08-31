import type { Metadata } from "next";
import { ClarityPage } from "@/components/clarity-page";

export const metadata: Metadata = {
  title: "Without the Guesswork | AC Wise",
};

export default function WithoutTheGuesswork() {
  return (
    <ClarityPage
      title="Without the Guesswork."
      intro="It's easy to assume air conditioning is just air conditioning, that it's all much the same. But every property is different, and so is everyone living in it, which makes it hard to know what to ask for. The prices look different, but you're not comparing the same thing. The answer is in the planning, not the price."
      sections={[
        {
          heading: "What AC Wise does",
          body: "We can help you understand what actually matters. Why sizing a system correctly makes such a difference, why your space and the way you use it change what you need, and the questions worth asking. So when the quotes come in, you can read each one for what it is, and weigh it against what suits your property.",
        },
        {
          heading: "Why this matters",
          body: "Air conditioning is one of the biggest purchases you can make for your property, so the planning behind it matters. A system sized correctly for your space, and matched to how you use it, can run better and last longer than one that isn't. When you plan for it, you're choosing with clarity, not guesswork.",
        },
        {
          heading: "What this looks like in practice",
          body: "It starts with questions, but it comes down to more than the answers. Your space, your needs, how you want to use it, and understanding how all of that comes together to shape how well a system performs. That understanding is the part we can help with. From there, we match you with a professional suited to the job, grounded in industry standards.",
        },
      ]}
      closingLine="Tell us about your space"
      cta={{ label: "Start your request", href: "/find-a-professional" }}
    />
  );
}
