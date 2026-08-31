"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { CONSENT_UPDATED_EVENT, getStoredConsent, type Consent } from "./cookie-consent";

interface Fbq {
  (...args: unknown[]): void;
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[][];
  push: Fbq;
  loaded: boolean;
  version: string;
}

declare global {
  interface Window {
    fbq?: Fbq;
    _fbq?: Fbq;
  }
}

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

// Minified version of Meta's own pixel loader snippet. Loads the fbevents.js
// script once and sets up window.fbq.
function loadPixelScript() {
  if (window.fbq) return;

  const fbq = function (...args: unknown[]) {
    if (fbq.callMethod) {
      fbq.callMethod(...args);
    } else {
      fbq.queue.push(args);
    }
  } as Fbq;
  fbq.queue = [];
  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = "2.0";

  window.fbq = fbq;
  if (!window._fbq) window._fbq = fbq;

  const script = document.createElement("script");
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(script);
}

export function MetaPixel() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const initialized = useRef(false);

  useEffect(() => {
    if (!PIXEL_ID) return;

    function activateIfConsented(consent: Consent | null) {
      if (!consent?.marketing) return;
      if (!initialized.current) {
        loadPixelScript();
        window.fbq?.("init", PIXEL_ID);
        initialized.current = true;
      }
      window.fbq?.("track", "PageView");
    }

    activateIfConsented(getStoredConsent());

    function onConsentUpdated(event: Event) {
      activateIfConsented((event as CustomEvent<Consent>).detail);
    }
    window.addEventListener(CONSENT_UPDATED_EVENT, onConsentUpdated);
    return () => window.removeEventListener(CONSENT_UPDATED_EVENT, onConsentUpdated);
    // Re-check consent on every route change so PageView fires per navigation.
  }, [pathname, searchParams]);

  return null;
}
