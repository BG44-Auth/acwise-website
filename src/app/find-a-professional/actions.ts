"use server";

import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import {
  isAddressComplete,
  isValidAuMobile,
  isValidEmail,
  type EnquiryData,
} from "./types";

export interface SubmitEnquiryState {
  status: "idle" | "success" | "error";
  message?: string;
}

export async function submitEnquiry(
  data: EnquiryData,
  draftId?: string,
): Promise<SubmitEnquiryState> {
  // Structured location data (suburb/state/postcode, not just raw typed
  // text) is required before a submission is allowed through. A blank
  // suburb or malformed postcode must never reach partner matching.
  if (
    !isAddressComplete(data.address) ||
    !data.propertyType ||
    !data.jobNeed ||
    !data.budget ||
    !data.urgency ||
    !data.firstName ||
    !data.lastName ||
    !isValidEmail(data.email) ||
    !isValidAuMobile(data.phone)
  ) {
    return { status: "error", message: "Please complete every step before submitting." };
  }

  if (data.relationship === "Tenant" && !data.tenantPermissionConfirmed) {
    return {
      status: "error",
      message: "Please confirm you have permission to request quotes on the owner's behalf.",
    };
  }

  if (!isSupabaseConfigured()) {
    return {
      status: "error",
      message:
        "This form isn't fully wired up yet. Supabase credentials haven't been added to this environment.",
    };
  }

  const supabase = await createClient();

  // Storage paths only, never a public URL. "enquiry-attachments" must be
  // created as a PRIVATE bucket in Supabase, with an RLS policy that only
  // lets a matched partner or staff read a given enquiry's own files. A
  // switchboard photo can reveal someone's home and street number, so a
  // guessable public link is not acceptable. Signed URLs get generated
  // on demand, at display time, wherever these paths are read.
  const photoPaths: string[] = [];
  for (const photo of data.switchboardPhotos.slice(0, 3)) {
    const path = `switchboard/${crypto.randomUUID()}-${photo.name}`;
    const { error: uploadError } = await supabase.storage
      .from("enquiry-attachments")
      .upload(path, photo);
    if (!uploadError) {
      photoPaths.push(path);
    }
  }

  // "enquiry" (the dashboard's real table, singular, in acwise-rebuild's
  // schema.sql) only models what matching actually needs as real columns:
  // contact info, postcode, service category. Everything else the wizard
  // collects goes into "details", a jsonb column added specifically so this
  // richer intake doesn't get thrown away or force-fit into columns the
  // spec never described.
  // Deliberately not chaining .select() here: "enquiry" has no anon SELECT
  // policy (read-gated to admin/matched-partner), so a select-back as this
  // anonymous inserter would return zero rows, and .single() would then
  // throw on a successful insert, turning a real submission into a false
  // "something went wrong" for the customer. The draft link below is
  // best-effort without the new row's id for exactly this reason.
  const { error } = await supabase.from("enquiry").insert({
    contact_name: `${data.firstName} ${data.lastName}`.trim(),
    contact_email: data.email,
    contact_phone: data.phone,
    postcode: data.address!.postcode,
    service_category: data.jobType || data.jobNeed,
    details: {
      address: data.address!.formatted,
      suburb: data.address!.suburb,
      state: data.address!.state,
      postcode: data.address!.postcode,
      property_type: data.propertyType,
      relationship: data.relationship,
      pm_owner_name: data.pmOwnerName || null,
      pm_owner_phone: data.pmOwnerPhone || null,
      pm_owner_email: data.pmOwnerEmail || null,
      tenant_permission_confirmed: data.tenantPermissionConfirmed,
      storeys: data.storeys,
      rooms: data.rooms,
      job_need: data.jobNeed,
      job_type: data.jobType,
      approximate_size: data.approximateSize,
      ceiling_type: data.ceilingType,
      zones: data.zones,
      brand_preference: data.brandPreference,
      budget: data.budget,
      urgency: data.urgency,
      contact_method: data.contactMethod,
      best_time: data.bestTime,
      notes: data.notes || null,
      switchboard_photo_paths: photoPaths,
      check_in_after_job: data.checkInAfterJob,
    },
  });

  if (error) {
    return {
      status: "error",
      message: "Something went wrong submitting your enquiry. Please try again.",
    };
  }

  // Close the loop on the drop-off-recovery draft: flip it out of
  // "in_progress" so it stops showing up in the dashboard's "still
  // deciding" follow-up list. Not linking submitted_enquiry_id here, that
  // would need reading the new row's id back, which RLS blocks for this
  // anonymous inserter (enquiry's SELECT policy is admin/matched-partner
  // only) — "status" is what actually matters for hiding it from that
  // list. A draft that was never started (direct API call, or a
  // localStorage draft saved before this feature shipped) simply has no
  // matching row to update.
  if (draftId) {
    await supabase
      .from("enquiry_draft")
      .update({ status: "submitted" })
      .eq("draft_id", draftId);
  }

  // TODO once email is wired up: send the internal admin lead-notification
  // email (reference number, job type and suburb in the subject line, not a
  // bare "New enquiry REF") and a separate customer-facing confirmation
  // email. Neither exists yet. This insert is the only side effect today.

  return {
    status: "success",
    message: "Thanks. We're matching you with vetted professionals now.",
  };
}
