import Image from "next/image";

import type { OnboardingStep } from "@/types";

type OnboardingHeaderProps = {
  step: OnboardingStep;
};

export const OnboardingHeader = ({ step }: OnboardingHeaderProps) => {
  const steps: OnboardingStep[] = [1, 2, 3];

  return (
    <div className="mb-8 border-b border-white/4 pb-4">
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col items-center gap-3 text-center sm:flex-row sm:text-left">
          <div className="relative h-12 w-12">
            <Image
              alt="Capital Vantage logo"
              src="/logo.png"
              fill
              priority
              sizes="48px"
              className="object-contain object-center scale-150"
            />
          </div>
          <div className="flex flex-col items-center sm:items-start">
            <h2 className="text-sm font-bold uppercase tracking-[0.24em] text-emerald-400">
              Capital Vantage
            </h2>
            <p className="font-mono text-[10px] tracking-wide text-zinc-500">WORKSPACE SETUP</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {steps.map((stepValue) => (
            <span
              key={stepValue}
              className={`h-2.5 w-2.5 rounded-full transition-colors duration-300 ${step >= stepValue ? "bg-emerald-500" : "bg-zinc-800"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
