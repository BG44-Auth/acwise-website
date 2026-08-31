import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Terms of Service | AC Wise",
};

export default function TermsPage() {
  return (
    <LegalPage title="AC Wise Terms and Conditions" updated="December 2025">
      <p>
        By accessing and using the Aircon Quotes Australia website, you
        agree to the following Terms of Use. If you do not agree, please do
        not use our site.
      </p>
      <p>These Terms apply to all visitors and users of the website.</p>

      <h2>1. Our Service</h2>
      <p>Aircon Quotes Australia provides:</p>
      <ul className="list-disc space-y-1 pl-5">
        <li>A platform to request air-conditioning quotations</li>
        <li>Connections to licensed AC professionals</li>
      </ul>
      <p>
        We are not the provider of the air-conditioning service itself.
        Contracts for installation, repairs, or maintenance are strictly
        between you and the selected contractor.
      </p>

      <h2>2. No Guarantees or Endorsements</h2>
      <p>While we aim to connect you with trusted providers:</p>
      <ul className="list-disc space-y-1 pl-5">
        <li>
          We do not guarantee pricing, workmanship quality, availability, or
          suitability of any contractor
        </li>
        <li>
          We are not responsible for any work performed, delays, damages,
          warranties, or disputes
        </li>
      </ul>
      <p>All service providers operate independently.</p>

      <h2>3. User Responsibilities</h2>
      <p>You agree that:</p>
      <ul className="list-disc space-y-1 pl-5">
        <li>All information you submit is accurate and complete</li>
        <li>You will only use the website for lawful purposes</li>
        <li>
          You will not misuse or attempt to harm our website or systems
        </li>
      </ul>

      <h2>4. Intellectual Property</h2>
      <p>
        All content on the website, including text, logos, graphics,
        videos, and layout, is protected by copyright and intellectual
        property laws.
      </p>
      <p>
        You may not reproduce or re-use content without written permission
        from us.
      </p>

      <h2>5. Limitation of Liability</h2>
      <p>
        To the fullest extent permitted by law, Aircon Quotes Australia is
        not liable for:
      </p>
      <ul className="list-disc space-y-1 pl-5">
        <li>Losses or damages related to contractor services</li>
        <li>Third-party actions or failures</li>
        <li>Website errors, downtime, or data issues</li>
        <li>Indirect or consequential losses</li>
      </ul>
      <p>Your use of the website is at your own risk.</p>

      <h2>6. Links to Third-Party Websites</h2>
      <p>
        Our website may contain links to third-party sites. We are not
        responsible for their content, services, or policies.
      </p>

      <h2>7. Privacy</h2>
      <p>
        By using our website, you agree to our Privacy Policy and Cookie
        Policy, which govern how we handle personal data.
      </p>

      <h2>8. Amendments</h2>
      <p>
        We may update these Terms periodically. Continued use of the website
        after changes are posted constitutes acceptance of those changes.
      </p>

      <h2>9. Governing Law</h2>
      <p>
        These Terms are governed by the laws of Australia. Any disputes will
        be handled by Australian courts or other applicable authorities.
      </p>

      <h2>10. Contact Us</h2>
      <p>If you have questions:</p>
      <p>
        Aircon Quotes Australia
        <br />
        Phone: 1800 227 822
        <br />
        Email: hello@acwise.au
      </p>
    </LegalPage>
  );
}
