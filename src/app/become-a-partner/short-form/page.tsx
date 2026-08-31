import type { Metadata } from "next";
import { PartnerForm } from "./partner-form";

export const metadata: Metadata = {
  title: "Apply to join AC Wise",
  description:
    "AC Wise is a vetted network, not a directory. Tell us about your business and our team will review your application before getting in touch.",
};

export default function BecomeAPartnerPage() {
  return (
    <div className="flex flex-1 flex-col bg-black px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-2xl">
        <p className="text-sm font-semibold tracking-widest text-brand uppercase">
          Partner Application
        </p>
        <h1 className="font-heading mt-4 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl">
          Apply to join the AC Wise network
        </h1>
        <p className="mt-4 text-muted-foreground">
          AC Wise is a vetted network, not a directory. Tell us about your
          business and our team will review your application before getting
          in touch.
        </p>

        <div className="glow-border mt-12 rounded-xl bg-card p-8 sm:p-10">
          <h2 className="font-heading text-lg font-semibold text-white">Your details</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            We only need a few details to get started. ARCtick licence,
            insurance documents and the partner agreement come after
            we&apos;ve reviewed your application.
          </p>
          <div className="mt-8">
            <PartnerForm />
          </div>
        </div>
      </div>
    </div>
  );
}
