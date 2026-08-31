export interface WizardAddress {
  formatted: string;
  suburb?: string;
  state?: string;
  postcode?: string;
}

export interface EnquiryData {
  address: WizardAddress | null;

  propertyType: string;
  relationship: string;
  pmOwnerName: string;
  pmOwnerPhone: string;
  pmOwnerEmail: string;
  tenantPermissionConfirmed: boolean;
  storeys: string;
  rooms: string;

  jobNeed: string;
  jobType: string;

  approximateSize: string;
  ceilingType: string;
  zones: string;
  brandPreference: string;

  budget: string;

  urgency: string;
  contactMethod: string;
  bestTime: string;

  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  notes: string;
  switchboardPhotos: File[];
  checkInAfterJob: boolean;
}

export const emptyEnquiry: EnquiryData = {
  address: null,
  propertyType: "",
  relationship: "",
  pmOwnerName: "",
  pmOwnerPhone: "",
  pmOwnerEmail: "",
  tenantPermissionConfirmed: false,
  storeys: "",
  rooms: "",
  jobNeed: "",
  jobType: "",
  approximateSize: "",
  ceilingType: "",
  zones: "",
  brandPreference: "",
  budget: "",
  urgency: "",
  contactMethod: "",
  bestTime: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  notes: "",
  switchboardPhotos: [],
  checkInAfterJob: true,
};

export const TOTAL_STEPS = 7;

// Job type options are contextual to what the customer said they need in
// step 3. Confirmed from a real production submission: "Service & Repair"
// reveals a diagnostic list. "New Install" revealing an equipment-type list
// was confirmed separately. "Replacement" is assumed to follow "New Install"
// (both involve choosing equipment); "Advice Only" has no sub-group.
export const JOB_TYPE_OPTIONS: Record<string, string[]> = {
  "New Install": [
    "High-wall split system",
    "Multi-split",
    "Ducted system",
    "Cassette / commercial",
  ],
  Replacement: [
    "High-wall split system",
    "Multi-split",
    "Ducted system",
    "Cassette / commercial",
  ],
  "Service & Repair": [
    "Not cooling / heating",
    "Strange noise",
    "Leak",
    "Routine service",
    "Filter / clean",
  ],
};

const AU_MOBILE_REGEX = /^(?:\+?61|0)4\d{8}$/;

export function isValidAuMobile(phone: string): boolean {
  return AU_MOBILE_REGEX.test(phone.replace(/\s/g, ""));
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Real Australia Post postcode allocation ranges, used to sanity-check that
// a manually-typed state and postcode are actually consistent with each
// other. Catches junk input ("asdf, NSW, 1234") that a plain regex parse
// can't tell apart from a real address.
const POSTCODE_RANGES: Record<string, [number, number][]> = {
  NSW: [
    [1000, 1999],
    [2000, 2599],
    [2619, 2899],
    [2921, 2999],
  ],
  ACT: [
    [200, 299],
    [2600, 2618],
    [2900, 2920],
  ],
  VIC: [
    [3000, 3999],
    [8000, 8999],
  ],
  QLD: [
    [4000, 4999],
    [9000, 9999],
  ],
  SA: [[5000, 5999]],
  WA: [
    [6000, 6797],
    [6800, 6999],
  ],
  TAS: [[7000, 7999]],
  NT: [[800, 999]],
};

export function isValidAuPostcode(postcode: string): boolean {
  return /^\d{4}$/.test(postcode);
}

export function postcodeMatchesState(postcode: string, state: string): boolean {
  const ranges = POSTCODE_RANGES[state.toUpperCase()];
  if (!ranges) return false;
  const value = Number(postcode);
  return ranges.some(([min, max]) => value >= min && value <= max);
}

export function isAddressComplete(address: WizardAddress | null): boolean {
  if (!address?.formatted || !address.suburb || !address.state || !address.postcode) {
    return false;
  }
  if (!isValidAuPostcode(address.postcode)) return false;
  if (!postcodeMatchesState(address.postcode, address.state)) return false;
  // Require some real street-level text beyond just "suburb, state,
  // postcode" - rejects entries with nothing meaningful before the location
  // bit (e.g. typing only "NSW 2000").
  const withoutLocation = address.formatted
    .replace(address.postcode, "")
    .replace(new RegExp(address.state, "i"), "")
    .replace(new RegExp(address.suburb, "i"), "")
    .replace(/[,\s]+/g, "");
  return withoutLocation.length >= 3;
}

const MAX_PHOTO_SIZE_MB = 10;
const MAX_PHOTOS = 3;
const ACCEPTED_PHOTO_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
];

export interface PhotoValidationResult {
  accepted: File[];
  errors: string[];
}

export function validatePhotos(
  files: File[],
  existingCount: number,
): PhotoValidationResult {
  const accepted: File[] = [];
  const errors: string[] = [];
  const remaining = MAX_PHOTOS - existingCount;

  for (const file of files) {
    if (accepted.length >= remaining) {
      errors.push(`Only ${MAX_PHOTOS} photos allowed. "${file.name}" skipped.`);
      continue;
    }
    if (!ACCEPTED_PHOTO_TYPES.includes(file.type)) {
      errors.push(`"${file.name}" isn't a supported file type.`);
      continue;
    }
    if (file.size > MAX_PHOTO_SIZE_MB * 1024 * 1024) {
      errors.push(`"${file.name}" is over ${MAX_PHOTO_SIZE_MB}MB.`);
      continue;
    }
    accepted.push(file);
  }

  return { accepted, errors };
}

export function createDraftId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `draft-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}
