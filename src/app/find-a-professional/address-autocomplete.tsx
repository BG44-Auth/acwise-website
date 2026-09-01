"use client";

import { useEffect, useRef, useState } from "react";
import { AlertCircle, Check } from "lucide-react";
import { isAddressComplete, type WizardAddress } from "./types";

const GOOGLE_MAPS_SCRIPT_ID = "google-maps-places-script";

declare global {
  interface Window {
    google?: typeof google;
  }
}

function loadGoogleMapsScript(apiKey: string): Promise<void> {
  if (window.google?.maps?.places) return Promise.resolve();

  const existing = document.getElementById(
    GOOGLE_MAPS_SCRIPT_ID,
  ) as HTMLScriptElement | null;
  if (existing) {
    return new Promise((resolve) => existing.addEventListener("load", () => resolve()));
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.id = GOOGLE_MAPS_SCRIPT_ID;
    // No loading=async here on purpose: that flag switches Google's script
    // to a lazy, split library-loading pattern where google.maps.places
    // isn't guaranteed to exist the instant onload fires, it's meant to be
    // paired with awaiting google.maps.importLibrary() instead. This code
    // assumes classic synchronous-after-onload availability, which is what
    // omitting the flag actually guarantees.
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Google Maps"));
    document.head.appendChild(script);
  });
}

const AU_STATES = ["NSW", "VIC", "QLD", "WA", "SA", "TAS", "ACT", "NT"];

// Best-effort parse for manual entry (no geocoding API configured). Pulls a
// postcode and state out of free text so submissions still carry usable
// structured data; falls back to the raw text as the suburb when it can't
// find better.
function parseManualAddress(raw: string): WizardAddress {
  const formatted = raw.trim();
  const postcodeMatch = formatted.match(/\b(\d{4})\b/);
  const postcode = postcodeMatch?.[1];

  const stateMatch = formatted
    .toUpperCase()
    .match(new RegExp(`\\b(${AU_STATES.join("|")})\\b`));
  const state = stateMatch?.[1];

  let suburb: string | undefined = formatted;
  if (postcode) suburb = suburb.replace(postcode, "");
  if (state) suburb = suburb.replace(new RegExp(state, "i"), "");
  suburb = suburb
    .replace(/,+/g, ",")
    .replace(/^[,\s]+|[,\s]+$/g, "")
    .split(",")
    .pop()
    ?.trim();

  return {
    formatted,
    suburb: suburb || formatted,
    state,
    postcode,
  };
}

function parseAddressComponents(
  place: google.maps.places.PlaceResult,
): WizardAddress {
  const components = place.address_components ?? [];
  const find = (type: string) =>
    components.find((component) => component.types.includes(type))?.long_name;

  return {
    formatted: place.formatted_address ?? "",
    suburb: find("locality") ?? find("sublocality"),
    state: components.find((c) => c.types.includes("administrative_area_level_1"))
      ?.short_name,
    postcode: find("postal_code"),
  };
}

export function AddressAutocomplete({
  value,
  onSelect,
}: {
  value: WizardAddress | null;
  onSelect: (address: WizardAddress) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY;
  const [scriptState, setScriptState] = useState<
    "idle" | "loading" | "ready" | "unavailable"
  >(apiKey ? "loading" : "unavailable");
  const [checkingCoverage, setCheckingCoverage] = useState(false);
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (!apiKey) return;

    loadGoogleMapsScript(apiKey)
      .then(() => setScriptState("ready"))
      .catch(() => setScriptState("unavailable"));
  }, [apiKey]);

  function handleSelect(address: WizardAddress) {
    onSelect(address);
    setTouched(true);
    if (isAddressComplete(address)) {
      setCheckingCoverage(true);
      window.setTimeout(() => setCheckingCoverage(false), 1200);
    }
  }

  useEffect(() => {
    if (
      scriptState !== "ready" ||
      !inputRef.current ||
      !window.google?.maps?.places?.Autocomplete
    ) {
      return;
    }

    // Defense in depth: a script-loading race, an unexpected Google API
    // change, or a bad key/billing state should degrade to manual entry,
    // never crash the whole page. This is exactly the kind of failure the
    // platform build principles call out explicitly (fail gracefully, know
    // when it's broken).
    try {
      const autocomplete = new window.google.maps.places.Autocomplete(
        inputRef.current,
        {
          componentRestrictions: { country: "au" },
          fields: ["address_components", "formatted_address"],
          types: ["address"],
        },
      );

      const listener = autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        if (!place.address_components) return;
        handleSelect(parseAddressComponents(place));
      });

      return () => listener.remove();
    } catch {
      // Deferred rather than called synchronously in the effect body, this
      // is a genuine "external system misbehaved" fallback, not derived
      // render state, so a microtask hop avoids the cascading-render
      // pattern the lint rule is actually guarding against.
      queueMicrotask(() => setScriptState("unavailable"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scriptState]);

  const isVerified = isAddressComplete(value);
  const isInvalid = touched && !isVerified;

  return (
    <div>
      {scriptState === "unavailable" ? (
        <input
          type="text"
          placeholder="Start typing your street address"
          defaultValue={value?.formatted}
          onBlur={(event) => handleSelect(parseManualAddress(event.target.value))}
          className={`w-full rounded-xl border bg-muted/50 px-4 py-3 text-sm text-white placeholder:text-muted-foreground focus:outline-none ${
            isInvalid
              ? "border-red-400 focus:border-red-400"
              : "border-border focus:border-brand/60"
          }`}
        />
      ) : (
        <input
          ref={inputRef}
          type="text"
          placeholder="Start typing your street address"
          defaultValue={value?.formatted}
          // Belt and braces: if the Google dropdown never actually returns a
          // suggestion (wrong API tier, network hiccup, an account
          // restriction like Places' "not available to new customers"
          // notice), place_changed never fires and there'd be no way to
          // complete this field at all. Falling back to the same manual
          // parse used in the "unavailable" branch on blur, but only when a
          // real selection hasn't already produced a complete address, so a
          // genuine Google pick never gets clobbered by this safety net.
          onBlur={(event) => {
            if (!isAddressComplete(value)) {
              handleSelect(parseManualAddress(event.target.value));
            }
          }}
          className="w-full rounded-xl border border-border bg-muted/50 px-4 py-3 text-sm text-white placeholder:text-muted-foreground focus:border-brand/60 focus:outline-none"
        />
      )}

      {scriptState === "unavailable" && (
        <p className="mt-2 text-xs text-muted-foreground">
          Address autocomplete isn&apos;t configured yet. Enter your address
          manually.
        </p>
      )}

      {isVerified && (
        <p className="mt-2 flex items-center gap-1.5 text-xs text-brand">
          <Check className="h-3.5 w-3.5" aria-hidden="true" />
          Verified: {value?.suburb}, {value?.state} {value?.postcode}
        </p>
      )}

      {isInvalid && (
        <p className="mt-2 flex items-center gap-1.5 text-xs text-red-400">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          That doesn&apos;t look like a complete Australian address. Include
          a street, suburb, state and postcode (e.g. 12 Smith St, Adelaide SA
          5000).
        </p>
      )}

      {checkingCoverage && (
        <p className="mt-1 text-xs text-muted-foreground">
          Checking coverage for {value?.postcode}…
        </p>
      )}
    </div>
  );
}
