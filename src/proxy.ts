import type { NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/proxy";

export async function proxy(request: NextRequest) {
  const response = await updateSession(request);

  // The site is reachable at its raw Vercel deployment URL as well as the
  // real domain, and Google indexed that vercel.app URL before the
  // acwise.au cutover finished, splitting search ranking across two
  // "sites" that are actually one. noindex anything not served from the
  // real domain so that URL drops out of search results over time,
  // without touching the deployment URL's actual usefulness for preview/
  // debugging access.
  if (request.nextUrl.hostname.endsWith(".vercel.app")) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
