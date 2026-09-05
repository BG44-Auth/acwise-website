import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/proxy";

// The site's stable, guessable Vercel project domain, not a per-deployment
// preview hash. Bianca doesn't want "vercel.app" visible to the public
// anywhere, redirecting this one specifically (rather than every
// *.vercel.app preview URL) means a stray link, old screenshot, or browser
// autocomplete entry bounces straight to the real domain instead of
// rendering the site there, while ad-hoc preview-branch URLs used for
// internal review before a merge still work normally.
const PUBLIC_VERCEL_DOMAIN = "acwise-website.vercel.app";

export async function proxy(request: NextRequest) {
  const hostname = request.nextUrl.hostname;

  if (hostname === PUBLIC_VERCEL_DOMAIN) {
    const target = new URL(request.nextUrl.pathname + request.nextUrl.search, "https://www.acwise.au");
    return NextResponse.redirect(target, 308);
  }

  const response = await updateSession(request);

  // Belt-and-braces for any other *.vercel.app host (a preview-branch URL,
  // say): not redirected, since those are meant to still work for internal
  // review, but never indexable if a crawler stumbles onto one anyway.
  if (hostname.endsWith(".vercel.app")) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
