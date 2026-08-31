"use client";

import { useActionState, useState, useTransition } from "react";
import { ArrowRight, ExternalLink, Search } from "lucide-react";
import {
  verifyAbn,
  submitPartnerApplication,
  type AbnCheckState,
  type PartnerApplicationState,
} from "./actions";

const initialAbnState: AbnCheckState = { status: "idle" };
const initialFormState: PartnerApplicationState = { status: "idle" };

export function PartnerForm() {
  const [abn, setAbn] = useState("");
  const [abnState, setAbnState] = useState<AbnCheckState>(initialAbnState);
  const [isVerifying, startVerifying] = useTransition();
  const [serviceArea, setServiceArea] = useState("");
  const [state, formAction, pending] = useActionState(
    submitPartnerApplication,
    initialFormState,
  );

  function handleVerify() {
    startVerifying(async () => {
      const result = await verifyAbn(abn);
      setAbnState(result);
      if (result.status === "verified" && result.result) {
        const { state: abrState, postcode } = result.result;
        if (abrState && !serviceArea) {
          setServiceArea([abrState, postcode].filter(Boolean).join(" "));
        }
      }
    });
  }

  return (
    <form action={formAction} className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-muted-foreground">
            Business / Trading Name
          </label>
          <input
            name="businessName"
            required
            className="mt-2 w-full rounded-xl border border-border bg-muted/50 px-4 py-3 text-sm text-white placeholder:text-muted-foreground focus:border-brand/60 focus:outline-none"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-muted-foreground">
            Contact Name
          </label>
          <input
            name="contactName"
            required
            className="mt-2 w-full rounded-xl border border-border bg-muted/50 px-4 py-3 text-sm text-white placeholder:text-muted-foreground focus:border-brand/60 focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-muted-foreground">ABN</label>
        <div className="mt-2 flex gap-3">
          <input
            name="abn"
            value={abn}
            onChange={(event) => {
              setAbn(event.target.value);
              setAbnState(initialAbnState);
            }}
            placeholder="11 digit ABN"
            required
            className="flex-1 rounded-xl border border-border bg-muted/50 px-4 py-3 text-sm text-white placeholder:text-muted-foreground focus:border-brand/60 focus:outline-none"
          />
          <button
            type="button"
            onClick={handleVerify}
            disabled={isVerifying || abn.length < 11}
            className="shrink-0 rounded-xl border border-border px-5 text-sm font-semibold text-foreground transition-colors hover:bg-muted disabled:opacity-50"
          >
            {isVerifying ? "Checking..." : "Verify ABN"}
          </button>
        </div>
        {abnState.status === "verified" && abnState.result && (
          <p className="mt-2 text-sm text-brand">
            {abnState.result.entityName} - {abnState.result.abnStatus}
          </p>
        )}
        {abnState.status === "error" && (
          <p className="mt-2 text-sm text-red-400">{abnState.message}</p>
        )}
        <p className="mt-2 flex items-center text-xs text-muted-foreground">
          <Search className="mr-1 h-4 w-4" aria-hidden="true" />
          Don&apos;t know your ABN? Search by business name -{" "}
          <a
            href="https://abr.business.gov.au/"
            target="_blank"
            rel="noreferrer"
            className="ml-1 inline-flex items-center gap-1 text-brand hover:text-brand/80"
          >
            Open the ABR
            <ExternalLink className="h-3 w-3" aria-hidden="true" />
          </a>
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-muted-foreground">Phone</label>
          <input
            name="phone"
            type="tel"
            required
            className="mt-2 w-full rounded-xl border border-border bg-muted/50 px-4 py-3 text-sm text-white placeholder:text-muted-foreground focus:border-brand/60 focus:outline-none"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-muted-foreground">Email</label>
          <input
            name="email"
            type="email"
            required
            className="mt-2 w-full rounded-xl border border-border bg-muted/50 px-4 py-3 text-sm text-white placeholder:text-muted-foreground focus:border-brand/60 focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-muted-foreground">
          Agreed Service Area
        </label>
        <textarea
          name="serviceArea"
          value={serviceArea}
          onChange={(event) => setServiceArea(event.target.value)}
          placeholder="e.g. Adelaide Metro - Northern & Southern Suburbs"
          rows={3}
          required
          className="mt-2 w-full rounded-xl border border-border bg-muted/50 px-4 py-3 text-sm text-white placeholder:text-muted-foreground focus:border-brand/60 focus:outline-none"
        />
      </div>

      {state.status !== "idle" && state.message && (
        <p
          className={`text-sm ${state.status === "success" ? "text-brand" : "text-red-400"}`}
        >
          {state.message}
        </p>
      )}

      <div>
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center rounded-full bg-brand px-8 py-3.5 text-base font-semibold text-brand-ink transition-colors hover:bg-brand/90 disabled:opacity-60"
        >
          {pending ? "Submitting..." : "Submit application"}
          {!pending && <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />}
        </button>
        <p className="mt-4 text-xs text-muted-foreground">
          By submitting, you agree to be contacted about your application. No
          account is created at this step.
        </p>
      </div>
    </form>
  );
}
