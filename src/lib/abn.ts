const ABN_WEIGHTS = [10, 1, 3, 5, 7, 9, 11, 13, 15, 17, 19];

export function isValidAbnFormat(abn: string): boolean {
  const digits = abn.replace(/\s/g, "");
  if (!/^\d{11}$/.test(digits)) return false;

  const sum = digits
    .split("")
    .map(Number)
    .reduce((total, digit, index) => {
      const adjusted = index === 0 ? digit - 1 : digit;
      return total + adjusted * ABN_WEIGHTS[index];
    }, 0);

  return sum % 89 === 0;
}

export interface AbrLookupResult {
  abn: string;
  entityName: string;
  abnStatus: string;
  state?: string;
  postcode?: string;
}

export async function lookupAbn(abn: string): Promise<AbrLookupResult> {
  const guid = process.env.ABR_GUID;
  if (!guid) {
    throw new Error(
      "ABN verification isn't configured yet. ABR_GUID is missing from the environment.",
    );
  }

  const digits = abn.replace(/\s/g, "");
  const url = `https://abr.business.gov.au/json/AbnDetails.aspx?abn=${digits}&guid=${guid}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Couldn't reach the Australian Business Register.");
  }

  const raw = await response.text();
  // The ABR endpoint returns a JSONP-style response wrapped in a callback
  // function, e.g. `callback({...})`, even without a `callback` param.
  const match = raw.match(/^\s*[\w$]*\(([\s\S]*)\)\s*;?\s*$/);
  const jsonText = match ? match[1] : raw;
  const data = JSON.parse(jsonText);

  if (data.Message) {
    throw new Error(data.Message);
  }

  return {
    abn: data.Abn ?? digits,
    entityName: data.EntityName ?? "Unknown entity",
    abnStatus: data.AbnStatus ?? "Unknown",
    state: data.AddressState,
    postcode: data.AddressPostcode,
  };
}
