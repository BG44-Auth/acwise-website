import type { Metadata } from "next";
import { FindProfessionalWizard } from "./wizard";

export const metadata: Metadata = {
  title: "Find an AC Professional | AC Wise",
  description:
    "Tell us about your space and we'll match you with vetted air conditioning professionals near you.",
};

export default function FindAProfessionalPage() {
  return (
    <div className="flex flex-1 flex-col bg-black px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-2xl">
        <h1 className="font-heading text-center text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl">
          Find a Trusted AC Professional
        </h1>
        <div className="mt-10">
          <FindProfessionalWizard />
        </div>
      </div>
    </div>
  );
}
