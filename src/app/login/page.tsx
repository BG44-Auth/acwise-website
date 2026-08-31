import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Sign in | AC Wise",
};

export default function LoginPage() {
  return (
    <div className="flex flex-1 items-center justify-center px-4 py-20 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="text-center">
          <h1 className="font-heading text-3xl font-bold text-white">Sign in</h1>
          <p className="mt-2 text-muted-foreground">Welcome back to AC Wise.</p>
        </div>

        <div className="mt-10">
          <LoginForm />
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <Link
            href="/become-a-partner/short-form"
            className="glow-border rounded-xl bg-card p-5 text-center transition-colors hover:border-brand/30"
          >
            <p className="text-xs font-semibold tracking-widest text-brand uppercase">
              Trade Professional
            </p>
            <p className="mt-2 text-sm font-medium text-white">
              Apply to become a partner
              <ArrowRight className="ml-0.5 inline h-3 w-3" aria-hidden="true" />
            </p>
          </Link>
          <Link
            href="/find-a-professional"
            className="glow-border rounded-xl bg-card p-5 text-center transition-colors hover:border-brand/30"
          >
            <p className="text-xs font-semibold tracking-widest text-brand uppercase">
              Homeowner
            </p>
            <p className="mt-2 text-sm font-medium text-white">
              Submit an enquiry
              <ArrowRight className="ml-0.5 inline h-3 w-3" aria-hidden="true" />
            </p>
          </Link>
        </div>
        <p className="mt-4 text-center text-xs text-muted-foreground">
          Homeowner accounts aren&apos;t open yet - join the waitlist.
        </p>
      </div>
    </div>
  );
}
