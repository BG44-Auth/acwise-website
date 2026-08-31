import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Cookie Policy | AC Wise",
};

export default function CookiesPage() {
  return (
    <LegalPage title="Cookie Policy" updated="28 May 2026">
      <p>
        This Cookie Policy explains how AC Wise (&ldquo;we&rdquo;,
        &ldquo;us&rdquo;) uses cookies and similar technologies when you
        visit acwise.au.
      </p>

      <h2>1. What are cookies?</h2>
      <p>
        Cookies are small text files stored on your device when you visit a
        website. They are used to make websites work, to make them work more
        efficiently, and to provide information to the site&apos;s owners.
      </p>

      <h2>2. Categories of cookies we use</h2>
      <p className="font-medium text-foreground">Strictly necessary</p>
      <p>
        Required for the site to function. They include cookies that keep
        you signed in, remember your form progress, and protect against
        fraud. These cannot be switched off.
      </p>
      <p className="font-medium text-foreground">Analytics</p>
      <p>
        Help us understand how visitors use the site so we can improve it.
        They collect aggregated, non-identifying information such as which
        pages are visited and how visitors arrive at the site.
      </p>
      <p className="font-medium text-foreground">Marketing</p>
      <p>
        Used to measure the effectiveness of advertising campaigns. AC Wise
        does not currently run marketing cookies, but this category is
        reserved for future use.
      </p>

      <h2>3. Your choices</h2>
      <p>
        When you first visit AC Wise you are shown a cookie banner. You can:
      </p>
      <ul className="list-disc space-y-1 pl-5">
        <li>Accept all cookies,</li>
        <li>Reject all non-essential cookies, or</li>
        <li>Manage preferences to choose by category.</li>
      </ul>
      <p>
        You can change your preferences at any time using the Cookie
        Settings link in the site footer.
      </p>

      <h2>4. Third-party services</h2>
      <p>
        If we enable third-party services (for example analytics
        providers), they may set their own cookies. We will only load these
        once you have given consent for the relevant category.
      </p>

      <h2>5. Your rights under GDPR</h2>
      <p>
        If you are in the European Economic Area or the United Kingdom you
        have the right to:
      </p>
      <ul className="list-disc space-y-1 pl-5">
        <li>access the personal data we hold about you,</li>
        <li>request that we correct or delete it,</li>
        <li>object to or restrict our processing,</li>
        <li>withdraw consent at any time, and</li>
        <li>lodge a complaint with your local data protection authority.</li>
      </ul>
      <p>To exercise any of these rights, contact us at hello@acwise.au.</p>

      <h2>6. Contact</h2>
      <p>Questions about this policy can be sent to hello@acwise.au.</p>
    </LegalPage>
  );
}
