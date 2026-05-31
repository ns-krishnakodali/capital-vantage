import { BrainCircuit, Check, Cpu, LoaderCircle } from "lucide-react";

type AiConfigurationProps = {
  selectedModel: "frontier" | "local";
  isSubmitting: boolean;
  errorMessage?: string;
  onBack: () => void;
  onComplete: () => void;
  onSelect: (model: "frontier" | "local") => void;
};

export const AIConfiguration = ({
  selectedModel,
  isSubmitting,
  errorMessage,
  onBack,
  onComplete,
  onSelect,
}: AiConfigurationProps) => {
  return (
    <div className="flex flex-1 flex-col justify-center space-y-6">
      <div>
        <h2 className="text-2xl mb-0.5 font-black text-white">AI Reasoning Model Configuration</h2>
        <p className="text-xs text-zinc-400">
          Select how AI should assist with financial insights and personalized recommendations.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <button
          type="button"
          disabled={isSubmitting}
          onClick={() => onSelect("frontier")}
          className={`premium-panel flex h-44 flex-col justify-between rounded-2xl p-5 text-left transition-all duration-200 ${
            selectedModel === "frontier"
              ? "border-emerald-500/60 bg-emerald-500/2 shadow-md"
              : "border-white/5 bg-transparent"
          } ${isSubmitting ? "cursor-not-allowed opacity-60" : "hover:border-emerald-500/20"}`}
        >
          <div className="flex items-start justify-between">
            <div className="rounded-lg bg-emerald-500/10 p-2 text-emerald-400">
              <BrainCircuit className="h-5 w-5" strokeWidth={2} />
            </div>
            <span
              className={`flex h-4 w-4 items-center justify-center rounded-full border ${
                selectedModel === "frontier"
                  ? "border-emerald-400 bg-emerald-500"
                  : "border-white/10"
              }`}
            >
              {selectedModel === "frontier" ? (
                <span className="h-1.5 w-1.5 rounded-full bg-black" />
              ) : null}
            </span>
          </div>
          <div className="space-y-1">
            <h4 className="text-xs font-bold text-zinc-100">Frontier Core Models</h4>
            <p className="text-[10px] leading-normal text-zinc-400">
              Cloud processing utilizing Claude 3.5, Gemini 1.5 Pro, or GPT-4o. Extreme complex
              reasoning capabilities.
            </p>
          </div>
        </button>
        <button
          type="button"
          disabled={isSubmitting}
          onClick={() => onSelect("local")}
          className={`premium-panel flex h-44 flex-col justify-between rounded-2xl p-5 text-left transition-all duration-200 ${
            selectedModel === "local"
              ? "border-emerald-500/60 bg-emerald-500/2 shadow-md"
              : "border-white/5 bg-transparent"
          } ${isSubmitting ? "cursor-not-allowed opacity-60" : "hover:border-emerald-500/20"}`}
        >
          <div className="flex items-start justify-between">
            <div className="rounded-lg bg-indigo-500/10 p-2 text-indigo-400">
              <Cpu className="h-5 w-5" strokeWidth={2} />
            </div>
            <span
              className={`flex h-4 w-4 items-center justify-center rounded-full border ${
                selectedModel === "local" ? "border-emerald-400 bg-emerald-500" : "border-white/10"
              }`}
            >
              {selectedModel === "local" ? (
                <span className="h-1.5 w-1.5 rounded-full bg-black" />
              ) : null}
            </span>
          </div>

          <div className="space-y-1">
            <h4 className="text-xs font-bold text-zinc-100">Local Edge Llama-3</h4>
            <p className="text-[10px] leading-normal text-zinc-400">
              On-device secure model processing offline. Ultimate privacy layout where data never
              leaves physical memory.
            </p>
          </div>
        </button>
      </div>
      <div className="flex gap-3 pt-4">
        <button
          type="button"
          disabled={isSubmitting}
          onClick={onBack}
          className={`w-1/2 rounded-lg border border-white/10 bg-zinc-900 px-4 py-3 text-center text-[11px] font-medium normal-case tracking-wide
            text-zinc-300 transition duration-200 ${
              isSubmitting
                ? "cursor-not-allowed opacity-50"
                : "cursor-pointer hover:border-white/20 hover:bg-zinc-800 hover:text-white active:scale-95"
            }`}
        >
          Back
        </button>
        <button
          type="button"
          disabled={isSubmitting}
          onClick={onComplete}
          className={`flex w-1/2 items-center justify-center gap-2 rounded-lg bg-linear-to-r from-emerald-500 to-teal-600 px-4 py-3 text-[11px]
            font-medium normal-case tracking-wide text-black shadow-lg shadow-emerald-500/20 transition duration-200 ${
              isSubmitting
                ? "cursor-wait opacity-70"
                : "cursor-pointer hover:from-emerald-600 hover:to-teal-700 active:scale-95"
            }`}
        >
          <span>{isSubmitting ? "Saving Configuration" : "Launch Workspace"}</span>
          {isSubmitting ? (
            <LoaderCircle className="h-4 w-4 animate-spin" strokeWidth={2.5} />
          ) : (
            <Check className="h-4 w-4" strokeWidth={2.5} />
          )}
        </button>
      </div>
      <p className="min-h-4 font-mono text-[10px] tracking-wide text-amber-400">
        {errorMessage ?? ""}
      </p>
    </div>
  );
};
