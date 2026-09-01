"use server";

// Google Places API (New): Autocomplete + Place Details, called server-side
// only. Unlike the old client-side widget this replaces, the API key here
// is never sent to the browser at all, this file only ever runs on the
// server. Deliberately reads the same NEXT_PUBLIC_GOOGLE_PLACES_API_KEY
// value already set in Vercel (the NEXT_PUBLIC_ prefix only causes a
// variable to be inlined into the client bundle at the specific call sites
// that reference it in client code, nothing does that here, so in practice
// this key never leaves the server despite the variable's name).
const PLACES_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY;

export interface AddressSuggestion {
  placeId: string;
  mainText: string;
  secondaryText: string;
}

export async function searchAddresses(
  input: string,
  sessionToken: string,
): Promise<AddressSuggestion[]> {
  if (!PLACES_API_KEY || input.trim().length < 3) return [];

  try {
    const response = await fetch(
      "https://places.googleapis.com/v1/places:autocomplete",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": PLACES_API_KEY,
        },
        body: JSON.stringify({
          input,
          includedRegionCodes: ["au"],
          sessionToken,
        }),
      },
    );

    if (!response.ok) return [];

    const data = await response.json();
    const suggestions = data.suggestions ?? [];

    return suggestions
      .filter((s: { placePrediction?: unknown }) => s.placePrediction)
      .map(
        (s: {
          placePrediction: {
            placeId: string;
            structuredFormat?: {
              mainText?: { text: string };
              secondaryText?: { text: string };
            };
            text: { text: string };
          };
        }) => ({
          placeId: s.placePrediction.placeId,
          mainText:
            s.placePrediction.structuredFormat?.mainText?.text ??
            s.placePrediction.text.text,
          secondaryText:
            s.placePrediction.structuredFormat?.secondaryText?.text ?? "",
        }),
      );
  } catch {
    // Network hiccup, rate limit, whatever, the caller falls back to manual
    // entry either way, an empty list is a safe, honest answer here.
    return [];
  }
}

export interface PlaceDetailsResult {
  formatted: string;
  suburb?: string;
  state?: string;
  postcode?: string;
}

export async function getPlaceDetails(
  placeId: string,
  sessionToken: string,
): Promise<PlaceDetailsResult | null> {
  if (!PLACES_API_KEY) return null;

  try {
    const response = await fetch(
      `https://places.googleapis.com/v1/places/${placeId}?sessionToken=${sessionToken}`,
      {
        headers: {
          "X-Goog-Api-Key": PLACES_API_KEY,
          "X-Goog-FieldMask": "formattedAddress,addressComponents",
        },
      },
    );

    if (!response.ok) return null;

    const data = await response.json();
    const components: { longText: string; shortText: string; types: string[] }[] =
      data.addressComponents ?? [];
    const find = (type: string) =>
      components.find((c) => c.types.includes(type));

    return {
      formatted: data.formattedAddress ?? "",
      suburb: (find("locality") ?? find("sublocality"))?.longText,
      state: find("administrative_area_level_1")?.shortText,
      postcode: find("postal_code")?.longText,
    };
  } catch {
    return null;
  }
}
