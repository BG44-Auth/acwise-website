"use client";

import { useEffect, useRef, useState } from "react";
import { AlertCircle, Check, Loader2 } from "lucide-react";
import { isAddressComplete, type WizardAddress } from "./types";
import {
  searchAddresses,
  getPlaceDetails,
  type AddressSuggestion,
} from "./address-search";

const AU_STATES = ["NSW", "VIC", "QLD", "WA", "SA", "TAS", "ACT", "NT"];

// Best-effort parse for manual entry, used whenever a suggestion isn't
// picked (no results, network hiccup, or the visitor just types the whole
// thing and moves on). Pulls a postcode and state out of free text so
// submissions still carry usable structured data.
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

export function AddressAutocomplete({
  value,
  onSelect,
}: {
  value: WizardAddress | null;
  onSelect: (address: WizardAddress) => void;
}) {
  const [query, setQuery] = useState(value?.formatted ?? "");
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [highlighted, setHighlighted] = useState(-1);
  const [touched, setTouched] = useState(false);
  const [checkingCoverage, setCheckingCoverage] = useState(false);
  const sessionTokenRef = useRef(crypto.randomUUID());
  const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    return () => clearTimeout(debounceRef.current);
  }, []);

  function handleSelect(address: WizardAddress) {
    onSelect(address);
    setTouched(true);
    setQuery(address.formatted);
    setSuggestions([]);
    setIsOpen(false);
    if (isAddressComplete(address)) {
      setCheckingCoverage(true);
      window.setTimeout(() => setCheckingCoverage(false), 1200);
    }
  }

  function handleQueryChange(next: string) {
    setQuery(next);
    setHighlighted(-1);
    clearTimeout(debounceRef.current);

    if (next.trim().length < 3) {
      setSuggestions([]);
      setIsOpen(false);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      const results = await searchAddresses(next, sessionTokenRef.current);
      setLoading(false);
      setSuggestions(results);
      setIsOpen(results.length > 0);
    }, 300);
  }

  async function pickSuggestion(suggestion: AddressSuggestion) {
    const details = await getPlaceDetails(
      suggestion.placeId,
      sessionTokenRef.current,
    );
    // A fresh token per completed search, matches Google's own guidance for
    // autocomplete + details billing sessions.
    sessionTokenRef.current = crypto.randomUUID();

    if (details) {
      handleSelect(details);
    } else {
      // Details lookup failed for whatever reason, the suggestion text
      // itself is still a real, Google-confirmed address string, worth
      // running through the manual parser rather than losing the pick
      // entirely.
      handleSelect(parseManualAddress(`${suggestion.mainText}, ${suggestion.secondaryText}`));
    }
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (!isOpen || suggestions.length === 0) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setHighlighted((i) => (i + 1) % suggestions.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setHighlighted((i) => (i <= 0 ? suggestions.length - 1 : i - 1));
    } else if (event.key === "Enter" && highlighted >= 0) {
      event.preventDefault();
      pickSuggestion(suggestions[highlighted]);
    } else if (event.key === "Escape") {
      setIsOpen(false);
    }
  }

  function handleBlur() {
    // Belt and braces, same as before: whatever's in the field when focus
    // leaves gets run through the manual parser, unless a real selection
    // already produced a complete address, so a genuine pick never gets
    // overwritten by this fallback.
    setIsOpen(false);
    if (!isAddressComplete(value) && query.trim()) {
      handleSelect(parseManualAddress(query));
    } else {
      setTouched(true);
    }
  }

  const isVerified = isAddressComplete(value);
  const isInvalid = touched && !isVerified;

  return (
    <div className="relative">
      <div className="relative">
        <input
          type="text"
          placeholder="Start typing your street address"
          value={query}
          onChange={(event) => handleQueryChange(event.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          onFocus={() => suggestions.length > 0 && setIsOpen(true)}
          role="combobox"
          aria-expanded={isOpen}
          aria-controls="address-suggestions"
          aria-autocomplete="list"
          className={`w-full rounded-xl border bg-muted/50 px-4 py-3 text-sm text-white placeholder:text-muted-foreground focus:outline-none ${
            isInvalid
              ? "border-red-400 focus:border-red-400"
              : "border-border focus:border-brand/60"
          }`}
        />
        {loading && (
          <Loader2
            className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-muted-foreground"
            aria-hidden="true"
          />
        )}
      </div>

      {isOpen && suggestions.length > 0 && (
        <ul
          id="address-suggestions"
          role="listbox"
          className="glow-border absolute z-20 mt-2 w-full overflow-hidden rounded-xl bg-card shadow-2xl"
        >
          {suggestions.map((suggestion, index) => (
            <li key={suggestion.placeId}>
              <button
                type="button"
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => pickSuggestion(suggestion)}
                className={`block w-full px-4 py-3 text-left text-sm transition-colors ${
                  index === highlighted ? "bg-muted" : "hover:bg-muted/60"
                }`}
              >
                <span className="text-white">{suggestion.mainText}</span>
                {suggestion.secondaryText && (
                  <span className="text-muted-foreground">
                    {" "}
                    {suggestion.secondaryText}
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
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
