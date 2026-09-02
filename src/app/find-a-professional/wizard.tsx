"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AlertCircle, Check, CheckCircle2, MapPin } from "lucide-react";
import { AddressAutocomplete } from "./address-autocomplete";
import { submitEnquiry, type SubmitEnquiryState } from "./actions";
import { saveDraftProgress } from "./draft-actions";
import {
  createDraftId,
  emptyEnquiry,
  isAddressComplete,
  isValidAuMobile,
  isValidEmail,
  JOB_TYPE_OPTIONS,
  TOTAL_STEPS,
  validatePhotos,
  type EnquiryData,
} from "./types";

const DRAFT_STORAGE_KEY = "acwise.enquiry.draft.v1";

function OptionGrid({
  options,
  value,
  onChange,
  columns = 2,
}: {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  columns?: 2 | 3;
}) {
  return (
    <div
      className={`grid gap-3 sm:grid-cols-2 ${columns === 3 ? "lg:grid-cols-3" : ""}`}
    >
      {options.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onChange(option)}
          className={`rounded-xl border px-5 py-4 text-left text-sm font-medium transition-all ${
            value === option
              ? "glow-brand border-brand bg-brand/10 text-brand"
              : "border-border bg-card text-foreground hover:border-brand/40 hover:bg-card/80"
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

function Question({
  label,
  missing,
  children,
}: {
  label: string;
  missing?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="font-heading flex items-center gap-2 text-sm font-semibold text-white">
        {label}
        {missing && (
          <span className="text-xs font-normal text-red-400">Required</span>
        )}
      </h3>
      <div className="mt-3">{children}</div>
    </div>
  );
}

function inputClass(invalid?: boolean) {
  return `w-full rounded-xl border bg-muted/50 px-4 py-3 text-sm text-white placeholder:text-muted-foreground focus:outline-none ${
    invalid
      ? "border-red-400 focus:border-red-400"
      : "border-border focus:border-brand/60"
  }`;
}

interface StoredDraft {
  step: number;
  data: Omit<EnquiryData, "switchboardPhotos">;
  draftId: string;
}

export function FindProfessionalWizard() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<EnquiryData>(emptyEnquiry);
  const [draftId, setDraftId] = useState<string>("");
  const [submitState, setSubmitState] = useState<SubmitEnquiryState>({
    status: "idle",
  });
  const [submitting, setSubmitting] = useState(false);
  const [showIncomplete, setShowIncomplete] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [photoErrors, setPhotoErrors] = useState<string[]>([]);
  const cardRef = useRef<HTMLDivElement>(null);

  // Restore an in-progress draft on mount, and generate a fresh draft id
  // when there's nothing to restore. localStorage is unavailable during
  // SSR, so this can only happen after mount.
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    try {
      const raw = localStorage.getItem(DRAFT_STORAGE_KEY);
      if (raw) {
        const stored: StoredDraft = JSON.parse(raw);
        setData((prev) => ({ ...prev, ...stored.data }));
        setStep(stored.step);
        setDraftId(stored.draftId);
        return;
      }
    } catch {
      // Corrupt or unavailable storage. Fall through to a fresh draft.
    }
    setDraftId(createDraftId());
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  // Persist the draft (excluding files, which can't be serialised) on every
  // change, so a reload or accidental close doesn't lose progress.
  useEffect(() => {
    if (!draftId) return;
    const persistable: Omit<EnquiryData, "switchboardPhotos"> = { ...data };
    delete (persistable as Partial<EnquiryData>).switchboardPhotos;
    const stored: StoredDraft = { step, data: persistable, draftId };
    try {
      localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(stored));
    } catch {
      // Storage full or unavailable. Draft simply won't survive a reload.
    }
  }, [step, data, draftId]);

  function update<K extends keyof EnquiryData>(key: K, value: EnquiryData[K]) {
    setData((prev) => ({ ...prev, [key]: value }));
  }

  function markTouched(field: string) {
    setTouched((prev) => ({ ...prev, [field]: true }));
  }

  const jobTypeOptions = JOB_TYPE_OPTIONS[data.jobNeed];
  const showTenantBlock = data.relationship === "Tenant";

  const missingByStep: Record<number, string[]> = {
    1: [
      !isAddressComplete(data.address) && "address",
      !data.firstName && "firstName",
      !isValidEmail(data.email) && "email",
    ].filter((x): x is string => Boolean(x)),
    2: [
      !data.propertyType && "propertyType",
      !data.relationship && "relationship",
      !data.storeys && "storeys",
      !data.rooms && "rooms",
      showTenantBlock && !data.pmOwnerName && "pmOwnerName",
      showTenantBlock && !data.pmOwnerPhone && "pmOwnerPhone",
      showTenantBlock && !data.pmOwnerEmail && "pmOwnerEmail",
      showTenantBlock && !data.tenantPermissionConfirmed && "tenantPermissionConfirmed",
    ].filter((x): x is string => Boolean(x)),
    3: [
      !data.jobNeed && "jobNeed",
      jobTypeOptions && !data.jobType && "jobType",
    ].filter((x): x is string => Boolean(x)),
    4: [
      !data.approximateSize && "approximateSize",
      !data.ceilingType && "ceilingType",
      !data.zones && "zones",
      !data.brandPreference && "brandPreference",
    ].filter((x): x is string => Boolean(x)),
    5: [!data.budget && "budget"].filter((x): x is string => Boolean(x)),
    6: [
      !data.urgency && "urgency",
      !data.contactMethod && "contactMethod",
      !data.bestTime && "bestTime",
    ].filter((x): x is string => Boolean(x)),
    7: [
      !data.lastName && "lastName",
      !isValidAuMobile(data.phone) && "phone",
    ].filter((x): x is string => Boolean(x)),
  };

  const canAdvance = missingByStep[step].length === 0;

  function goNext() {
    if (!canAdvance) {
      setShowIncomplete(true);
      cardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    setShowIncomplete(false);
    setTouched({});
    const nextStep = Math.min(TOTAL_STEPS, step + 1);
    setStep(nextStep);
    // Best-effort, fire-and-forget: never block navigation on this. Once a
    // name and email exist (from step 1 onward) each step advance refreshes
    // the draft row, so a drop-off anywhere after this point still leaves a
    // named, contactable, in-progress lead for follow-up.
    void saveDraftProgress(draftId, nextStep, data);
  }

  function goBack() {
    setShowIncomplete(false);
    setStep((s) => Math.max(1, s - 1));
  }

  function handlePhotoSelection(files: File[]) {
    const { accepted, errors } = validatePhotos(
      files,
      data.switchboardPhotos.length,
    );
    setPhotoErrors(errors);
    if (accepted.length > 0) {
      update("switchboardPhotos", [...data.switchboardPhotos, ...accepted]);
    }
  }

  async function handleSubmit() {
    if (!canAdvance) {
      setShowIncomplete(true);
      cardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    setSubmitting(true);
    const result = await submitEnquiry(data, draftId);
    setSubmitState(result);
    setSubmitting(false);
    if (result.status === "success") {
      try {
        localStorage.removeItem(DRAFT_STORAGE_KEY);
      } catch {
        // Ignore. Nothing more to do if storage isn't available.
      }
    }
  }

  if (submitState.status === "success") {
    return (
      <div className="glow-border rounded-xl bg-card p-10 text-center">
        <CheckCircle2
          className="mx-auto h-12 w-12 text-brand"
          aria-hidden="true"
        />
        <h2 className="font-heading mt-4 text-2xl font-bold text-white">
          You&apos;re in good hands.
        </h2>
        <p className="mt-3 text-muted-foreground">
          We&apos;ll match you with verified providers in your area and be
          in touch shortly.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center rounded-full bg-brand px-8 py-3 text-sm font-semibold text-brand-ink transition-colors hover:bg-brand/90"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div ref={cardRef} className="glow-border rounded-xl bg-card p-8 sm:p-10">
      <p className="mb-2 text-xs font-medium tracking-widest text-cyan uppercase">
        Step {step} of {TOTAL_STEPS}
      </p>

      <div className="mb-2 flex gap-1.5">
        {Array.from({ length: TOTAL_STEPS }).map((_, index) => (
          <div
            key={index}
            className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
              index < step ? "bg-brand" : "bg-white/10"
            }`}
          />
        ))}
      </div>

      <div className="mt-8 min-h-[260px] space-y-8">
        {step === 1 && (
          <div>
            <MapPin className="h-6 w-6 text-cyan" aria-hidden="true" />
            <h2 className="font-heading mt-3 text-xl font-bold text-white">
              Where are you located?
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Pick your address from the suggestions so we capture suburb,
              state and postcode cleanly. Shared with matched partners so
              they can quote accurately.
            </p>
            <div className="mt-6">
              <AddressAutocomplete
                value={data.address}
                onSelect={(address) => update("address", address)}
              />
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div>
                <input
                  placeholder="First name"
                  value={data.firstName}
                  onChange={(event) => update("firstName", event.target.value)}
                  onBlur={() => markTouched("firstName")}
                  className={inputClass(
                    (touched.firstName || showIncomplete) && !data.firstName,
                  )}
                />
                {(touched.firstName || showIncomplete) && !data.firstName && (
                  <p className="mt-1 text-xs text-red-400">First name is required.</p>
                )}
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  value={data.email}
                  onChange={(event) => update("email", event.target.value)}
                  onBlur={() => markTouched("email")}
                  className={inputClass(
                    (touched.email || showIncomplete) && !isValidEmail(data.email),
                  )}
                />
                {(touched.email || showIncomplete) && !isValidEmail(data.email) && (
                  <p className="mt-1 text-xs text-red-400">Enter a valid email address.</p>
                )}
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-8">
            <h2 className="font-heading text-xl font-bold text-white">
              What type of property?
            </h2>
            <Question
              label="Property type"
              missing={showIncomplete && !data.propertyType}
            >
              <OptionGrid
                options={["Home", "Unit", "Office", "Commercial"]}
                value={data.propertyType}
                onChange={(value) => update("propertyType", value)}
              />
            </Question>
            <Question
              label="Your relationship to the property"
              missing={showIncomplete && !data.relationship}
            >
              <OptionGrid
                options={["Owner-occupier", "Landlord", "Tenant", "Property manager"]}
                value={data.relationship}
                onChange={(value) => update("relationship", value)}
              />
            </Question>

            {showTenantBlock && (
              <div className="space-y-4 rounded-xl border border-cyan/30 bg-cyan/5 p-5">
                <p className="flex gap-2 text-sm text-foreground">
                  <AlertCircle
                    className="h-5 w-5 shrink-0 text-cyan"
                    aria-hidden="true"
                  />
                  We strongly recommend consulting the property manager or
                  owner directly. Please submit their contact details below.
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <input
                    placeholder="Full name"
                    value={data.pmOwnerName}
                    onChange={(event) => update("pmOwnerName", event.target.value)}
                    className={inputClass(
                      showIncomplete && !data.pmOwnerName,
                    )}
                  />
                  <input
                    type="tel"
                    placeholder="e.g. 0412 345 678"
                    value={data.pmOwnerPhone}
                    onChange={(event) => update("pmOwnerPhone", event.target.value)}
                    className={inputClass(
                      showIncomplete && !data.pmOwnerPhone,
                    )}
                  />
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={data.pmOwnerEmail}
                    onChange={(event) => update("pmOwnerEmail", event.target.value)}
                    className={`sm:col-span-2 ${inputClass(showIncomplete && !data.pmOwnerEmail)}`}
                  />
                </div>
                <label className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={data.tenantPermissionConfirmed}
                    onChange={(event) =>
                      update("tenantPermissionConfirmed", event.target.checked)
                    }
                    className="mt-0.5 h-4 w-4 rounded-full border-white/20 bg-white/5 accent-brand"
                  />
                  <span className="text-sm text-foreground">
                    I confirm I have permission from the property manager or
                    owner to request quotes on their behalf.
                  </span>
                </label>
              </div>
            )}

            <Question label="Storeys" missing={showIncomplete && !data.storeys}>
              <OptionGrid
                options={["Single storey", "Double storey", "3+ storeys"]}
                value={data.storeys}
                onChange={(value) => update("storeys", value)}
              />
            </Question>
            <Question label="Rooms involved" missing={showIncomplete && !data.rooms}>
              <OptionGrid
                options={["1-2 rooms", "3-4 rooms", "5+ rooms", "Whole property"]}
                value={data.rooms}
                onChange={(value) => update("rooms", value)}
              />
            </Question>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-8">
            <h2 className="font-heading text-xl font-bold text-white">What do you need?</h2>
            <Question label="What do you need?" missing={showIncomplete && !data.jobNeed}>
              <OptionGrid
                options={["New Install", "Replacement", "Service & Repair", "Advice Only"]}
                value={data.jobNeed}
                onChange={(value) => update("jobNeed", value)}
              />
            </Question>
            {jobTypeOptions && (
              <Question
                label="Job type"
                missing={showIncomplete && !data.jobType}
              >
                <OptionGrid
                  options={jobTypeOptions}
                  value={data.jobType}
                  onChange={(value) => update("jobType", value)}
                />
              </Question>
            )}
          </div>
        )}

        {step === 4 && (
          <div className="space-y-8">
            <h2 className="font-heading text-xl font-bold text-white">
              How big is the space?
            </h2>
            <Question
              label="Approximate size"
              missing={showIncomplete && !data.approximateSize}
            >
              <OptionGrid
                options={["Under 50 sqm", "50-100 sqm", "100-200 sqm", "200+ sqm", "Not sure"]}
                value={data.approximateSize}
                onChange={(value) => update("approximateSize", value)}
              />
            </Question>
            <Question
              label="Ceiling type"
              missing={showIncomplete && !data.ceilingType}
            >
              <OptionGrid
                options={["Standard", "High-cathedral", "Flat roof", "Not sure"]}
                value={data.ceilingType}
                onChange={(value) => update("ceilingType", value)}
              />
            </Question>
            <Question label="Units / zones" missing={showIncomplete && !data.zones}>
              <OptionGrid
                options={["1 unit / 1 zone", "2-3 zones", "4+ zones", "Whole-home ducted"]}
                value={data.zones}
                onChange={(value) => update("zones", value)}
              />
            </Question>
            <Question
              label="Brand preference"
              missing={showIncomplete && !data.brandPreference}
            >
              <OptionGrid
                columns={3}
                options={[
                  "Daikin",
                  "Mitsubishi Electric",
                  "Fujitsu",
                  "Panasonic",
                  "Samsung",
                  "Actron",
                  "Hitachi",
                  "Seeley International",
                  "No preference",
                ]}
                value={data.brandPreference}
                onChange={(value) => update("brandPreference", value)}
              />
            </Question>
          </div>
        )}

        {step === 5 && (
          <div>
            <h2 className="font-heading text-xl font-bold text-white">
              What&apos;s your budget?
            </h2>
            <Question label="Budget range" missing={showIncomplete && !data.budget}>
              <OptionGrid
                options={["Under $2k", "$2k-$5k", "$5k-$10k", "$10k+", "Not sure"]}
                value={data.budget}
                onChange={(value) => update("budget", value)}
              />
            </Question>
            <p className="mt-4 text-xs text-muted-foreground italic">
              This budget stays with AC Wise. Partners only see the details
              needed to quote.
            </p>
          </div>
        )}

        {step === 6 && (
          <div className="space-y-8">
            <h2 className="font-heading text-xl font-bold text-white">
              When do you need it?
            </h2>
            <Question label="How urgent is this?" missing={showIncomplete && !data.urgency}>
              <OptionGrid
                options={["Emergency (today)", "This week", "Within a month", "Just exploring"]}
                value={data.urgency}
                onChange={(value) => update("urgency", value)}
              />
            </Question>
            <Question
              label="Preferred contact method"
              missing={showIncomplete && !data.contactMethod}
            >
              <OptionGrid
                options={["Phone call", "SMS", "Email", "Any"]}
                value={data.contactMethod}
                onChange={(value) => update("contactMethod", value)}
              />
            </Question>
            <Question
              label="Best time to reach you"
              missing={showIncomplete && !data.bestTime}
            >
              <OptionGrid
                columns={3}
                options={["Morning", "Midday", "Afternoon", "Evening", "Anytime"]}
                value={data.bestTime}
                onChange={(value) => update("bestTime", value)}
              />
            </Question>
          </div>
        )}

        {step === 7 && (
          <div className="space-y-8">
            <div>
              <h2 className="font-heading text-xl font-bold text-white">
                Almost done, {data.firstName || "there"}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Just your last name and a mobile number so partners can reach
                you.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <input
                  placeholder="Last name"
                  value={data.lastName}
                  onChange={(event) => update("lastName", event.target.value)}
                  onBlur={() => markTouched("lastName")}
                  className={inputClass(touched.lastName && !data.lastName)}
                />
                {touched.lastName && !data.lastName && (
                  <p className="mt-1 text-xs text-red-400">Last name is required.</p>
                )}
              </div>
              <div>
                <input
                  type="tel"
                  placeholder="Phone"
                  value={data.phone}
                  onChange={(event) => update("phone", event.target.value)}
                  onBlur={() => markTouched("phone")}
                  className={inputClass(touched.phone && !isValidAuMobile(data.phone))}
                />
                {touched.phone && !isValidAuMobile(data.phone) ? (
                  <p className="mt-1 text-xs text-red-400">Enter a valid Australian mobile.</p>
                ) : (
                  <p className="mt-2 text-xs text-muted-foreground">
                    Australian mobile, e.g. 0412 345 678. Our team confirms
                    numbers before passing them to partners.
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Anything else partners should know?{" "}
                <span className="text-muted-foreground">(optional)</span>
              </label>
              <textarea
                value={data.notes}
                onChange={(event) => update("notes", event.target.value)}
                placeholder="Access issues, preferred install location, existing system age, etc."
                rows={3}
                className={`${inputClass()} mt-2`}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Photo of your switchboard{" "}
                <span className="text-muted-foreground">(optional)</span>
              </label>
              <p className="mt-1 text-xs text-muted-foreground">
                Including a photo of your switchboard helps installers check
                your power supply and give you a more accurate quote. You
                can skip this and add it later.
              </p>
              <label className="mt-3 inline-flex cursor-pointer items-center rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted">
                {data.switchboardPhotos.length > 0
                  ? `${data.switchboardPhotos.length} photo${data.switchboardPhotos.length > 1 ? "s" : ""} added`
                  : "Add a photo"}
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/heic"
                  multiple
                  className="hidden"
                  onChange={(event) =>
                    handlePhotoSelection(Array.from(event.target.files ?? []))
                  }
                />
              </label>
              <p className="mt-2 text-xs text-muted-foreground">
                JPG, PNG, WebP or HEIC. Up to 3 photos, 10 MB each.
              </p>
              {photoErrors.length > 0 && (
                <ul className="mt-2 space-y-1">
                  {photoErrors.map((error) => (
                    <li key={error} className="text-xs text-red-400">
                      {error}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <p className="text-xs text-muted-foreground">
              By submitting you agree to our{" "}
              <a href="/privacy" className="text-brand hover:text-brand/80">
                privacy policy
              </a>{" "}
              and{" "}
              <a href="/terms" className="text-brand hover:text-brand/80">
                terms
              </a>
              .
            </p>

            <label className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={data.checkInAfterJob}
                onChange={(event) =>
                  update("checkInAfterJob", event.target.checked)
                }
                className="mt-1 h-4 w-4 rounded border-white/20 bg-white/5 accent-brand"
              />
              <span>
                <span className="block text-sm font-medium text-white">
                  Check in with me after the job
                </span>
                <span className="block text-xs text-muted-foreground">
                  We&apos;ll send a short note when the job&apos;s done to
                  make sure you&apos;re sorted. You can switch this off any
                  time from your inbox.
                </span>
              </span>
            </label>
          </div>
        )}
      </div>

      {showIncomplete && !canAdvance && (
        <p className="mt-4 flex items-center gap-2 text-sm text-red-400">
          <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
          Please complete the highlighted fields above before continuing.
        </p>
      )}

      {submitState.status === "error" && (
        <p className="mt-4 text-sm text-red-400">{submitState.message}</p>
      )}

      <div className="mt-8 flex items-center justify-between">
        <button
          type="button"
          onClick={goBack}
          disabled={step === 1}
          className="rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted disabled:opacity-40"
        >
          Back
        </button>

        {step < TOTAL_STEPS ? (
          <button
            type="button"
            onClick={goNext}
            className="rounded-full bg-brand px-8 py-3 text-sm font-semibold text-brand-ink transition-colors hover:bg-brand/90"
          >
            Next
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitting}
            className="inline-flex items-center rounded-full bg-brand px-8 py-3 text-sm font-semibold text-brand-ink transition-colors hover:bg-brand/90 disabled:opacity-60"
          >
            {submitting ? "Submitting..." : "Submit enquiry"}
            {!submitting && <Check className="ml-2 h-4 w-4" aria-hidden="true" />}
          </button>
        )}
      </div>
    </div>
  );
}
