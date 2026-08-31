"use server";

import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export type ContactEnquiryType =
  | "Residential"
  | "Commercial"
  | "Partner Enquiry"
  | "General";

export interface ContactFormState {
  status: "idle" | "success" | "error";
  message?: string;
}

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const enquiryType = String(formData.get("enquiryType") ?? "General");
  const firstName = String(formData.get("firstName") ?? "").trim();
  const lastName = String(formData.get("lastName") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!firstName || !lastName || !email || !message) {
    return { status: "error", message: "Please fill in all required fields." };
  }

  if (!isSupabaseConfigured()) {
    return {
      status: "error",
      message:
        "This form isn't fully wired up yet. Supabase credentials haven't been added to this environment. Ask your developer to set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.",
    };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("contact_message").insert({
    name: `${firstName} ${lastName}`.trim(),
    email,
    phone: phone || null,
    enquiry_type: enquiryType,
    message,
  });

  if (error) {
    return {
      status: "error",
      message: "Something went wrong sending your message. Please try again or email hello@acwise.au directly.",
    };
  }

  return { status: "success", message: "Thanks. We'll be in touch shortly." };
}
