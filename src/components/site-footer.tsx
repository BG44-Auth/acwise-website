import Link from "next/link";
import Image from "next/image";
import { CookieSettingsButton } from "./cookie-consent";

const columns = [
  {
    heading: "Platform",
    links: [
      { href: "/find-a-professional", label: "Find a Professional" },
      { href: "/for-businesses", label: "For Businesses" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { href: "/learn", label: "Learn" },
      { href: "/learn?category=Buyer%27s%20Guide", label: "Buying Guides" },
      { href: "/faqs", label: "FAQs" },
    ],
  },
  {
    heading: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms of Service" },
      { href: "/cookies", label: "Cookie Policy" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer>
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-heading text-2xl font-bold text-white sm:text-3xl">
              Ready to start?
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              It takes 2 minutes. No account required.
            </p>
          </div>
          <Link
            href="/find-a-professional"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-brand px-8 py-3.5 text-base font-semibold text-brand-ink transition-colors hover:bg-brand/90"
          >
            Get Started
          </Link>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-8 sm:grid-cols-5">
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/logo.png" alt="AC Wise" width={32} height={32} className="h-8 w-8" />
            </Link>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              Air conditioning guidance. Verified professionals.
              Australia-wide.
            </p>
            <a
              href="mailto:hello@acwise.au"
              className="mt-4 inline-block text-sm text-muted-foreground hover:text-foreground"
            >
              hello@acwise.au
            </a>
          </div>

          {columns.map((column) => (
            <div key={column.heading}>
              <h3 className="font-heading text-sm font-semibold text-white">
                {column.heading}
              </h3>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-border/30 pt-8 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>
            &copy; AC Wise 2025. All rights reserved.
            {" · "}ABN 47 718 879 496
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-foreground">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-foreground">
              Terms
            </Link>
            <Link href="/cookies" className="hover:text-foreground">
              Cookies
            </Link>
            <CookieSettingsButton className="hover:text-foreground" />
          </div>
        </div>
      </div>
    </footer>
  );
}
