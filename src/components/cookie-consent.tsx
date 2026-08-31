"use client";

import { useEffect, useState } from "react";
import { Cookie, X } from "lucide-react";

const STORAGE_KEY = "acwise-cookie-consent";
export const OPEN_COOKIE_PREFERENCES_EVENT = "acwise:open-cookie-preferences";
export const CONSENT_UPDATED_EVENT = "acwise:consent-updated";

export interface Consent {
  analytics: boolean;
  marketing: boolean;
}

export function getStoredConsent(): Consent | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveConsent(consent: Consent) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
  window.dispatchEvent(
    new CustomEvent<Consent>(CONSENT_UPDATED_EVENT, { detail: consent }),
  );
}

export function CookieSettingsButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() =>
        window.dispatchEvent(new Event(OPEN_COOKIE_PREFERENCES_EVENT))
      }
      className={className}
    >
      Cookie Settings
    </button>
  );
}

function PreferencesModal({
  onClose,
  onSave,
}: {
  onClose: () => void;
  onSave: (consent: Consent) => void;
}) {
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Cookie preferences"
      className="fixed inset-0 z-[70] flex items-center justify-center p-4"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="glow-border relative w-full max-w-md rounded-2xl bg-card p-6 shadow-2xl sm:p-8">
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground transition-colors hover:text-foreground"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>

        <h2 className="font-heading text-lg font-semibold text-foreground">
          Cookie preferences
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Choose which categories of cookies you allow. You can change these
          at any time from the footer.
        </p>

        <div className="mt-6 space-y-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-foreground">
                Strictly necessary
              </p>
              <p className="text-xs text-muted-foreground">
                Required for sign in, security, and core site functionality.
                Always on.
              </p>
            </div>
            <input
              type="checkbox"
              checked
              disabled
              aria-label="Strictly necessary (always on)"
              className="h-4 w-4 shrink-0 accent-brand opacity-50"
            />
          </div>
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-foreground">
                Analytics
              </p>
              <p className="text-xs text-muted-foreground">
                Anonymous usage data so we can improve the site. No
                advertising profiles.
              </p>
            </div>
            <input
              type="checkbox"
              checked={analytics}
              onChange={(event) => setAnalytics(event.target.checked)}
              aria-label="Analytics"
              className="h-4 w-4 shrink-0 accent-brand"
            />
          </div>
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-foreground">
                Marketing
              </p>
              <p className="text-xs text-muted-foreground">
                Cookies used to measure the effectiveness of campaigns. Not
                currently used, reserved for future tools.
              </p>
            </div>
            <input
              type="checkbox"
              checked={marketing}
              onChange={(event) => setMarketing(event.target.checked)}
              aria-label="Marketing"
              className="h-4 w-4 shrink-0 accent-brand"
            />
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={() => onSave({ analytics: false, marketing: false })}
            className="h-9 rounded-full border border-border bg-transparent px-5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            Reject non-essential
          </button>
          <button
            type="button"
            onClick={() => onSave({ analytics, marketing })}
            className="h-9 rounded-full bg-brand px-5 text-sm font-medium text-brand-ink transition-colors hover:bg-brand/90"
          >
            Save preferences
          </button>
        </div>
      </div>
    </div>
  );
}

export function CookieConsent() {
  const [bannerVisible, setBannerVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    // localStorage is unavailable during SSR, so visibility can only be
    // determined after mount.
    const stored = localStorage.getItem(STORAGE_KEY);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!stored) setBannerVisible(true);

    const openPreferences = () => setModalOpen(true);
    window.addEventListener(OPEN_COOKIE_PREFERENCES_EVENT, openPreferences);
    return () =>
      window.removeEventListener(OPEN_COOKIE_PREFERENCES_EVENT, openPreferences);
  }, []);

  function handleSave(consent: Consent) {
    saveConsent(consent);
    setBannerVisible(false);
    setModalOpen(false);
  }

  return (
    <>
      {bannerVisible && (
        <div
          role="dialog"
          aria-live="polite"
          aria-label="Cookie consent"
          className="pointer-events-none fixed inset-x-0 bottom-0 z-[60] p-3 sm:p-4"
        >
          <div className="pointer-events-auto container mx-auto max-w-4xl">
            <div className="glow-border rounded-2xl bg-card/95 p-5 shadow-2xl backdrop-blur-xl sm:p-6">
              <div className="flex items-start gap-3">
                <div className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan/10 sm:flex">
                  <Cookie className="h-5 w-5 text-cyan" aria-hidden="true" />
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="font-heading mb-1 text-base font-semibold text-foreground sm:text-lg">
                    Your privacy
                  </h2>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    We use essential cookies to make AC Wise work. With your
                    permission, we also use optional cookies to understand
                    how the site is used and to improve it. Read our{" "}
                    <a href="/cookies" className="text-brand hover:underline">
                      cookie policy
                    </a>{" "}
                    or{" "}
                    <a href="/privacy" className="text-brand hover:underline">
                      privacy policy
                    </a>
                    .
                  </p>

                  <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                    <button
                      type="button"
                      onClick={() =>
                        handleSave({ analytics: true, marketing: true })
                      }
                      className="h-9 rounded-full bg-brand px-5 text-sm font-medium text-brand-ink transition-colors hover:bg-brand/90"
                    >
                      Accept all
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        handleSave({ analytics: false, marketing: false })
                      }
                      className="h-9 rounded-full border border-border bg-transparent px-5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                    >
                      Reject non-essential
                    </button>
                    <button
                      type="button"
                      onClick={() => setModalOpen(true)}
                      className="h-9 rounded-full px-5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                      Manage preferences
                    </button>
                  </div>
                </div>
                <button
                  type="button"
                  aria-label="Dismiss (rejects non-essential cookies)"
                  onClick={() => handleSave({ analytics: false, marketing: false })}
                  className="shrink-0 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {modalOpen && (
        <PreferencesModal
          onClose={() => setModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </>
  );
}
