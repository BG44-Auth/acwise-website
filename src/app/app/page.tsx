import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { signOut } from "@/app/login/actions";

export const metadata: Metadata = {
  title: "Dashboard | AC Wise",
};

export default async function AppDashboardPage() {
  if (!isSupabaseConfigured()) {
    return (
      <div className="flex flex-1 items-center justify-center px-4 py-20 text-center sm:px-6 lg:px-8">
        <div className="max-w-md">
          <h1 className="font-heading text-2xl font-bold text-white">
            Partner dashboard not configured yet
          </h1>
          <p className="mt-4 text-muted-foreground">
            This area needs Supabase credentials before it can show real
            accounts and enquiries. Add them to your environment to enable
            sign-in.
          </p>
        </div>
      </div>
    );
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="flex flex-1 flex-col px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-5xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold tracking-widest text-brand uppercase">
              Partner Dashboard
            </p>
            <h1 className="font-heading mt-2 text-3xl font-bold text-white">
              Welcome back{user?.email ? `, ${user.email}` : ""}
            </h1>
          </div>
          <form action={signOut}>
            <button
              type="submit"
              className="rounded-full border border-border px-5 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
            >
              Sign out
            </button>
          </form>
        </div>

        <div className="glow-border mt-12 rounded-xl bg-card p-10 text-center">
          <h2 className="font-heading text-lg font-semibold text-white">
            No enquiries yet
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Matched enquiries will appear here once your partner profile is
            live.
          </p>
        </div>
      </div>
    </div>
  );
}
