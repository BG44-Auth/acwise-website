import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Privacy Policy | AC Wise",
};

export default function PrivacyPage() {
  return (
    <LegalPage title="AC Wise Privacy Policy" updated="December 2025">
      <p>
        Aircon Quotes Australia (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or
        &ldquo;our&rdquo;) is committed to protecting your personal
        information and respecting your privacy. This Privacy Policy explains
        how we collect, use, disclose, and safeguard your information when
        you interact with our website and services.
      </p>
      <p>
        This Policy applies to all users of our website and services,
        regardless of location. It complies with the Australian Privacy
        Principles (APPs) under the Privacy Act 1988 (Cth), and where
        applicable, the EU/UK GDPR.
      </p>
      <p>
        This Privacy Policy forms part of our Website Terms of Use and
        Cookie Policy.
      </p>

      <h2>1. Information We Collect</h2>
      <p>We collect personal and non-personal information including:</p>
      <p className="font-medium text-foreground">Personal Information</p>
      <ul className="list-disc space-y-1 pl-5">
        <li>Name</li>
        <li>Phone number</li>
        <li>Email address</li>
        <li>Suburb/Location</li>
        <li>Details of your air-conditioning request</li>
        <li>
          Any information you voluntarily provide through our forms or
          communications
        </li>
      </ul>
      <p className="font-medium text-foreground">
        Usage &amp; Technical Information
      </p>
      <ul className="list-disc space-y-1 pl-5">
        <li>IP address</li>
        <li>Device type and browser</li>
        <li>Pages visited, actions taken on our site</li>
        <li>
          Cookies and tracking identifiers (refer to our Cookie Policy)
        </li>
      </ul>
      <p>
        We do not knowingly collect information from children under 16 years
        old.
      </p>

      <h2>2. How We Collect Information</h2>
      <p>We may collect information when you:</p>
      <ul className="list-disc space-y-1 pl-5">
        <li>Submit a quote request form</li>
        <li>Contact us via phone or email</li>
        <li>Interact with website forms and features</li>
        <li>Click on our ads or marketing materials</li>
        <li>Accept cookies and analytics tools</li>
      </ul>

      <h2>3. How We Use Your Information</h2>
      <p>We use your information to:</p>
      <ul className="list-disc space-y-1 pl-5">
        <li>Provide quotations from licensed air-conditioning professionals</li>
        <li>Connect you with suitable service providers</li>
        <li>Respond to enquiries and provide customer support</li>
        <li>Improve website functionality and user experience</li>
        <li>Conduct marketing, remarketing, and advertising campaigns</li>
        <li>Monitor website performance and analytics</li>
        <li>Comply with legal and security obligations</li>
      </ul>
      <p>
        We will only process your personal data when legally permitted,
        including with your consent or for our legitimate business
        interests.
      </p>

      <h2>4. Sharing &amp; Disclosure</h2>
      <p>We may share your information with:</p>
      <ul className="list-disc space-y-1 pl-5">
        <li>Trusted AC contractors who will provide quotes or services</li>
        <li>Marketing and analytics providers such as Google or Meta</li>
        <li>Professional advisers (e.g., legal, compliance)</li>
        <li>Government or regulatory authorities when required by law</li>
      </ul>
      <p>
        We do not sell personal information to third parties. All
        contractors and partners are required to handle personal information
        securely and only for service delivery purposes.
      </p>

      <h2>5. Overseas Disclosure</h2>
      <p>
        Some third-party systems we use may store data overseas (e.g.,
        Europe, USA). Where this occurs, we ensure appropriate safeguards are
        in place in accordance with APPs and GDPR standards.
      </p>

      <h2>6. Data Security</h2>
      <p>
        We use administrative, technical, and physical safeguards to protect
        your information against:
      </p>
      <ul className="list-disc space-y-1 pl-5">
        <li>Loss</li>
        <li>Misuse</li>
        <li>Unauthorised access</li>
        <li>Disclosure or alteration</li>
      </ul>
      <p>
        No online system is 100% secure, but we take reasonable steps to
        protect your data.
      </p>

      <h2>7. Your Rights &amp; Choices</h2>
      <p>
        Depending on your location (e.g., EU under GDPR), you may have the
        right to:
      </p>
      <ul className="list-disc space-y-1 pl-5">
        <li>Access your personal data</li>
        <li>Correct or update your data</li>
        <li>Request deletion of your data</li>
        <li>Withdraw consent (including cookies)</li>
        <li>Object to or restrict processing</li>
        <li>Request data portability</li>
      </ul>
      <p>
        To exercise your rights, please contact us at the details below. You
        may also unsubscribe from marketing communications at any time.
      </p>

      <h2>8. Cookies &amp; Tracking Technologies</h2>
      <p>
        We use cookies to improve user experience and personalise content.
        Full details are available in our Cookie Policy.
      </p>

      <h2>9. Data Retention</h2>
      <p>We retain your information only as long as needed for:</p>
      <ul className="list-disc space-y-1 pl-5">
        <li>Service delivery</li>
        <li>Legal, accounting, and reporting requirements</li>
      </ul>

      <h2>10. Third-Party Links</h2>
      <p>
        Our website may contain links to external websites. We are not
        responsible for their privacy practices, content, or data handling.
      </p>

      <h2>11. Contact Information</h2>
      <p>For privacy concerns or data rights requests:</p>
      <p>
        Aircon Quotes Australia
        <br />
        Phone: 1800 227 822
        <br />
        Email: hello@acwise.au
      </p>

      <h2>12. Updates to This Policy</h2>
      <p>
        We may update this Privacy Policy periodically. Revised versions
        will include a new &ldquo;Last updated&rdquo; date.
      </p>
    </LegalPage>
  );
}
