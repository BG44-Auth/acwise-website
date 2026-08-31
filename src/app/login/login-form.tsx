"use client";

import { useActionState } from "react";
import { ArrowRight } from "lucide-react";
import { signIn, type LoginFormState } from "./actions";

const initialState: LoginFormState = { status: "idle" };

export function LoginForm() {
  const [state, formAction, pending] = useActionState(signIn, initialState);

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label htmlFor="email" className="sr-only">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          required
          className="w-full rounded-xl border border-border bg-muted/50 px-4 py-3 text-sm text-white placeholder:text-muted-foreground focus:border-brand/60 focus:outline-none"
        />
      </div>
      <div>
        <label htmlFor="password" className="sr-only">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          required
          className="w-full rounded-xl border border-border bg-muted/50 px-4 py-3 text-sm text-white placeholder:text-muted-foreground focus:border-brand/60 focus:outline-none"
        />
      </div>

      <div className="text-right">
        <a href="mailto:hello@acwise.au" className="text-sm text-muted-foreground hover:text-foreground">
          Forgot password?
        </a>
      </div>

      {state.status === "error" && state.message && (
        <p className="text-sm text-red-400">{state.message}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex w-full items-center justify-center rounded-full bg-brand px-8 py-3.5 text-base font-semibold text-brand-ink transition-colors hover:bg-brand/90 disabled:opacity-60"
      >
        {pending ? "Signing in..." : "Sign in"}
        {!pending && <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />}
      </button>
    </form>
  );
}
