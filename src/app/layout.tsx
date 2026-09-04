import type { Metadata } from "next";
import { Suspense } from "react";
import { Analytics } from "@vercel/analytics/next";
import { Poppins, Readex_Pro } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CookieConsent } from "@/components/cookie-consent";
import { MetaPixel } from "@/components/meta-pixel";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const readexPro = Readex_Pro({
  variable: "--font-readex-pro",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  // Fixes canonical/OG URLs pointing at whichever host actually served the
  // request (including the acwise-website.vercel.app deployment domain,
  // which Google indexed before the acwise.au cutover finished, see
  // proxy.ts). Every page's canonical tag now points at the real domain
  // regardless of where it was fetched from, so search engines consolidate
  // ranking signal there instead of splitting it across two "sites".
  metadataBase: new URL("https://www.acwise.au"),
  title: "AC Wise | Australia's Managed HVAC Marketplace",
  description:
    "AC Wise connects Australian property owners with vetted air conditioning professionals.",
};

// Organization schema, read by search engines and AI answer engines to
// establish who AC Wise is, independent of whatever page copy says. Kept
// factual and minimal on purpose, specific/checkable claims are what get
// cited by AI overviews, vague marketing language isn't.
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "AC Wise",
  url: "https://www.acwise.au",
  logo: "https://www.acwise.au/logo.png",
  description:
    "AC Wise is an Australian managed marketplace connecting property owners with vetted, licensed air conditioning professionals for installation, replacement, service, and repair.",
  areaServed: "AU",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "1800-227-822",
    contactType: "customer service",
    email: "hello@acwise.au",
    areaServed: "AU",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${readexPro.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-black">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <SiteHeader />
        <main className="flex flex-1 flex-col">{children}</main>
        <SiteFooter />
        <CookieConsent />
        <Suspense fallback={null}>
          <MetaPixel />
        </Suspense>
        <Analytics />
      </body>
    </html>
  );
}
