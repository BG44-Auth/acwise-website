import type { NextConfig } from "next";

// Security headers, one of the "before launch" items. A CSP this specific
// (rather than a blanket allow-all) has to know every third-party origin the
// site actually calls: Supabase (REST/Auth/Storage), Google Places
// (autocomplete script + map tiles), and Meta Pixel (gated behind marketing
// cookie consent, not live yet, but its domains are included now so turning
// on a real NEXT_PUBLIC_META_PIXEL_ID later doesn't silently break under a
// CSP nobody remembered to update).
//
// 'unsafe-inline' on script-src is a pragmatic tradeoff, not the ideal
// nonce-based CSP Next.js supports, that requires per-request nonce
// generation wired through proxy.ts. Worth tightening later, not something
// to risk getting wrong the night before launch.
// React's dev mode needs eval() for its debugging features (stack
// reconstruction etc.) and says so itself: "React will never use eval() in
// production mode." Scoping unsafe-eval to development only, so the actual
// deployed CSP stays strict.
const scriptSrcEval = process.env.NODE_ENV === "production" ? "" : " 'unsafe-eval'";

const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${scriptSrcEval} https://maps.googleapis.com https://connect.facebook.net`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://maps.googleapis.com https://maps.gstatic.com https://www.facebook.com",
  "font-src 'self' data:",
  "connect-src 'self' https://*.supabase.co https://maps.googleapis.com https://connect.facebook.net https://www.facebook.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
