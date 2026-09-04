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
  title: "AC Wise | Australia's Managed HVAC Marketplace",
  description:
    "AC Wise connects Australian property owners with vetted air conditioning professionals.",
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
