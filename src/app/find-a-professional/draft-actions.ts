"use server";

import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { isValidEmail, type EnquiryData } from "./types";

// Fired on every step change once a name and email exist (from step 1
// onward). This is the whole point of asking for them on step 1: a visitor
// who drops off at step 3 still leaves a named, contactable, in-progress
// lead behind in "enquiry_draft" instead of nothing at all. Upserts by
// draft_id, so this is one row per browser session, not one per step.
export async function saveDraftProgress(
  draftId: string,
  step: number,
  data: EnquiryData,
): Promise<void> {
  if (!draftId || !data.firstName || !isValidEmail(data.email)) return;
  if (!isSupabaseConfigured()) return;

  const supabase = await createClient();

  // Upsert on draft_id. The RLS "update" policy only allows this while the
  // row is still status = 'in_progress', so this silently stops mattering
  // (last write simply fails, nothing throws here) once submitEnquiry has
  // already flipped this draft to 'submitted'.
  await supabase.from("enquiry_draft").upsert(
    {
      draft_id: draftId,
      first_name: data.firstName,
      email: data.email,
      phone: data.phone || null,
      address_formatted: data.address?.formatted || null,
      suburb: data.address?.suburb || null,
      state: data.address?.state || null,
      postcode: data.address?.postcode || null,
      step_reached: step,
      details: {
        property_type: data.propertyType,
        relationship: data.relationship,
        job_need: data.jobNeed,
        job_type: data.jobType,
        budget: data.budget,
        urgency: data.urgency,
        notes: data.notes || null,
      },
    },
    { onConflict: "draft_id" },
  );
  // Errors (rate limit, RLS refusing an already-submitted draft, a network
  // hiccup) are swallowed on purpose: this is a best-effort background save
  // riding along on step navigation, never something that should block or
  // interrupt someone filling out the actual wizard.
}
