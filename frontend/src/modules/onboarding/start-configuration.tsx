import { ShieldCheck } from "lucide-react";

type StartConfigurationProps = {
  onContinue: () => void;
};

export const StartConfiguration = ({ onContinue }: StartConfigurationProps) => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center space-y-6 text-center">
      <div className="relative flex h-40 w-40 items-center justify-center">
        <div className="animate-spin-slow absolute inset-0 rounded-full border border-emerald-500/20" />
        <div className="animate-pulse-fast absolute inset-4 rounded-full border border-indigo-500/30" />
        <div className="absolute inset-8 flex items-center justify-center rounded-full border border-white/5">
          <ShieldCheck className="h-12 w-12 text-emerald-400" strokeWidth={1.5} />
        </div>
      </div>
      <div className="space-y-2">
        <h1 className="bg-linear-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-3xl font-black tracking-tight text-transparent">
          START CONFIGURATION
        </h1>
        <p className="mx-auto max-w-md text-xs leading-relaxed tracking-wide text-zinc-400">
          Consolidate assets, optimize premium underwriting vectors, minimize tax liabilities, and
          forecast cash flows using institutional machine reasoning.
        </p>
      </div>
      <p className="font-mono text-xs tracking-widest text-zinc-500">
        System check complete. Workspace ready.
      </p>
      <div className="flex h-12 items-center justify-center">
        <button
          type="button"
          onClick={onContinue}
          className="cursor-pointer rounded-lg bg-linear-to-r from-emerald-500 to-teal-600 px-4 py-3 text-[11px] font-medium normal-case tracking-wide text-black
            shadow-lg shadow-emerald-500/20 transition duration-200 active:scale-95 hover:from-emerald-600 hover:to-teal-700"
        >
          Configure Workspace
        </button>
      </div>
    </div>
  );
};
