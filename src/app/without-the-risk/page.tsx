import type { Metadata } from "next";
import { ClarityPage } from "@/components/clarity-page";

export const metadata: Metadata = {
  title: "Without the Blindfold | AC Wise",
};

export default function WithoutTheBlindfold() {
  return (
    <ClarityPage
      title="Without the Blindfold."
      intro="Sometimes things don't go to plan. A job runs over, a unit fails, the unexpected occurs. That's normal, and no one can promise it never happens. What matters is the business behind the work: one built on performance standards, that works within the guidelines, communicates clearly, and delivers on what it promises."
      sections={[
        {
          heading: "How we vet our network",
          body: "Every professional in our network is qualified through our onboarding process. We check their business registration, licences, and insurance, and they confirm they work within Australian WHS guidelines and consumer law. This isn't a directory of HVAC businesses. It's a network of professionals who agree to uphold a standard.",
        },
        {
          heading: "What that means for you",
          body: "You're not on your own with it. You're still doing the research, but we bring it together in one place and help you work out what you actually need, so getting started is a lot faster. Ask us anything as you go. And we only send your enquiry to a professional who works within that scope of work, so it reaches someone who does your kind of job.",
        },
        {
          heading: "The standard we hold",
          body: "We hold ourselves to a standard, and we support the professionals in our network to meet it. That means real backing and honest feedback, so they can keep doing their best work. It also means matching them with jobs suited to what they do, so each enquiry reaches a professional equipped for it.",
        },
      ]}
      closingLine="Get matched with a qualified professional in your area."
      cta={{ label: "Find a professional", href: "/find-a-professional" }}
    />
  );
}
