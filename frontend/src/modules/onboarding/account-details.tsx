import { ChevronRight } from "lucide-react";

import type { OnboardingFormState } from "@/types";

type AccountDetailsProps = {
  canContinue: boolean;
  formState: OnboardingFormState;
  isEmailValid: boolean;
  onBack: () => void;
  onChange: (field: "name" | "email", value: string) => void;
  onNext: () => void;
};

export const AccountDetails = ({
  canContinue,
  formState,
  isEmailValid,
  onBack,
  onChange,
  onNext,
}: AccountDetailsProps) => {
  const showEmailError = formState.email.trim() !== "" && !isEmailValid;

  return (
    <div className="flex flex-1 flex-col justify-center space-y-6">
      <div>
        <h2 className="text-2xl mb-0.5 font-black text-white">Account details</h2>
        <p className="text-xs tracking-normal text-zinc-400">
          Create your secure account and start organizing your finances in one place.
        </p>
      </div>
      <div className="space-y-4">
        <div>
          <label
            htmlFor="full-name"
            className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.22em] text-zinc-400"
          >
            Account Name
          </label>
          <input
            id="full-name"
            type="text"
            value={formState.name}
            onChange={(event) => onChange("name", event.target.value)}
            placeholder="Enter your name"
            className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3.5 text-xs text-zinc-100 transition-all duration-200 outline-none
              hover:border-white/20 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.22em] text-zinc-400"
          >
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={formState.email}
            onChange={(event) => onChange("email", event.target.value)}
            placeholder="Enter your email"
            className={`w-full rounded-xl border bg-zinc-900 px-4 py-3.5 text-xs text-zinc-100 transition-all duration-200 outline-none ${
              showEmailError
                ? "border-amber-500/70 hover:border-amber-400 focus:border-amber-400 focus:ring-2 focus:ring-amber-500/20"
                : "border-white/10 hover:border-white/20 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
            }`}
          />
          <p className="mt-2 font-mono text-[10px] tracking-wide text-amber-400">
            {showEmailError ? "Enter a valid email address." : ""}
          </p>
        </div>
      </div>
      <p
        className={`font-mono text-[10px] font-semibold tracking-widest ${
          canContinue ? "text-emerald-500" : "text-amber-500"
        }`}
      >
        {canContinue
          ? "* Authorized"
          : "* Please input a valid name and email credentials to authorize next step"}
      </p>
      <div className="flex gap-3 pt-4">
        <button
          type="button"
          onClick={onBack}
          className="w-1/2 cursor-pointer rounded-lg border border-white/10 bg-zinc-900 px-4 py-3 text-center text-[11px] font-medium normal-case tracking-wide
            text-zinc-300 transition duration-200 hover:border-white/20 hover:bg-zinc-800 hover:text-white active:scale-95"
        >
          Back
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={!canContinue}
          className={`flex w-1/2 items-center justify-center gap-2 px-4 py-3 text-[11px] normal-case tracking-wide transition duration-200 ${
            canContinue
              ? "cursor-pointer rounded-lg bg-linear-to-r from-emerald-500 to-teal-600 font-medium text-black shadow-lg shadow-emerald-500/20 " +
                "hover:from-emerald-600 hover:to-teal-700 active:scale-95"
              : "cursor-not-allowed rounded-lg bg-zinc-800 font-medium text-zinc-500 opacity-40"
          }`}
        >
          <span>Next: AI Setup</span>
          <ChevronRight className="h-4 w-4" strokeWidth={2} />
        </button>
      </div>
    </div>
  );
};
