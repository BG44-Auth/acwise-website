"use server";

import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { isValidAbnFormat, lookupAbn, type AbrLookupResult } from "@/lib/abn";

export interface AbnCheckState {
  status: "idle" | "checking" | "verified" | "error";
  message?: string;
  result?: AbrLookupResult;
}

export async function verifyAbn(abn: string): Promise<AbnCheckState> {
  if (!isValidAbnFormat(abn)) {
    return { status: "error", message: "That doesn't look like a valid ABN." };
  }

  try {
    const result = await lookupAbn(abn);
    return { status: "verified", result };
  } catch (error) {
    return {
      status: "error",
      message: error instanceof Error ? error.message : "Couldn't verify that ABN.",
    };
  }
}

export interface PartnerApplicationState {
  status: "idle" | "success" | "error";
  message?: string;
}

export async function submitPartnerApplication(
  _prevState: PartnerApplicationState,
  formData: FormData,
): Promise<PartnerApplicationState> {
  const businessName = String(formData.get("businessName") ?? "").trim();
  const contactName = String(formData.get("contactName") ?? "").trim();
  const abn = String(formData.get("abn") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const serviceArea = String(formData.get("serviceArea") ?? "").trim();

  if (!businessName || !contactName || !phone || !email) {
    return { status: "error", message: "Please fill in all required fields." };
  }

  if (!isValidAbnFormat(abn)) {
    return { status: "error", message: "Please enter a valid ABN." };
  }

  if (!serviceArea) {
    return { status: "error", message: "Let us know your agreed service area." };
  }

  if (!isSupabaseConfigured()) {
    return {
      status: "error",
      message:
        "This form isn't fully wired up yet. Supabase credentials haven't been added to this environment.",
    };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("partner_application").insert({
    business_name: businessName,
    applicant_name: contactName,
    applicant_email: email,
    abn,
    phone,
    service_area: serviceArea,
  });

  if (error) {
    return {
      status: "error",
      message: "Something went wrong submitting your application. Please try again.",
    };
  }

  return {
    status: "success",
    message: "Thanks. We've received your application and will be in touch.",
  };
}
