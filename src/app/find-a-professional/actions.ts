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

  // TODO once email is wired up: send the internal admin lead-notification
  // email (reference number, job type and suburb in the subject line, not a
  // bare "New enquiry REF") and a separate customer-facing confirmation
  // email. Neither exists yet. This insert is the only side effect today.

  return {
    status: "success",
    message: "Thanks. We're matching you with vetted professionals now.",
  };
}
