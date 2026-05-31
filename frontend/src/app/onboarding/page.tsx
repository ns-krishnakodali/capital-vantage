"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { AmbientBackdrop } from "@/components";
import { EMAIL_PATTERN, ENTER_DURATION_MS, LEAVE_DURATION_MS } from "@/constants";
import { apiClient, ApiError } from "@/lib";
import { AccountDetails, AIConfiguration, OnboardingHeader, StartConfiguration } from "@/modules";

import type {
  ApiMessageResponse,
  OnboardingFormState,
  OnboardingStep,
  UserConfig,
  UpsertUserConfigPayload,
} from "@/types";

type TransitionPhase = "entering" | "idle" | "leaving";

const OnboardingPage = () => {
  const router = useRouter();

  const leaveTimerRef = useRef<number | null>(null);
  const enterTimerRef = useRef<number | null>(null);

  const [step, setStep] = useState<OnboardingStep>(1);
  const [renderedStep, setRenderedStep] = useState<OnboardingStep>(1);
  const [transitionPhase, setTransitionPhase] = useState<TransitionPhase>("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formState, setFormState] = useState<OnboardingFormState>({
    email: "",
    model: "frontier",
    name: "",
  });

  useEffect(() => {
    return () => {
      if (leaveTimerRef.current !== null) {
        window.clearTimeout(leaveTimerRef.current);
      }
      if (enterTimerRef.current !== null) {
        window.clearTimeout(enterTimerRef.current);
      }
    };
  }, []);

  const isEmailValid = EMAIL_PATTERN.test(formState.email.trim());
  const canContinueFromDetails = formState.name.trim() !== "" && isEmailValid;

  const updateField = (field: "name" | "email", value: string) => {
    setSubmitError(null);
    setFormState((currentValue) => ({
      ...currentValue,
      [field]: value,
    }));
  };

  const updateModel = (model: OnboardingFormState["model"]) => {
    setSubmitError(null);
    setFormState((currentValue) => ({
      ...currentValue,
      model,
    }));
  };

  const goToStep = (nextStep: OnboardingStep) => {
    if (nextStep === step || transitionPhase !== "idle" || isSubmitting) {
      return;
    }

    setSubmitError(null);
    setStep(nextStep);
    setTransitionPhase("leaving");

    leaveTimerRef.current = window.setTimeout(() => {
      setRenderedStep(nextStep);
      setTransitionPhase("entering");

      enterTimerRef.current = window.setTimeout(() => {
        setTransitionPhase("idle");
      }, ENTER_DURATION_MS);
    }, LEAVE_DURATION_MS);
  };

  const handleComplete = async () => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const payload: UpsertUserConfigPayload = {
        aiModel: formState.model,
        email: formState.email,
        name: formState.name,
      };

      await apiClient.put<UserConfig>("/api/user-config", payload);
      router.replace("/dashboard");
    } catch (err) {
      console.error("Failed to save user configuration.", err);

      if (err instanceof ApiError) {
        const errorData = err.data as ApiMessageResponse | undefined;
        setSubmitError(errorData?.message ?? err.message);
      } else {
        setSubmitError("Unable to save your configuration right now.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const stepTransitionClass =
    transitionPhase === "leaving"
      ? "onboarding-step-leave absolute inset-0"
      : transitionPhase === "entering"
        ? "onboarding-step-enter"
        : "";

  return (
    <main className="app-shell bg-grid-mesh no-scrollbar relative isolate min-h-screen overflow-x-hidden overflow-y-auto px-4 py-6 text-zinc-100 antialiased">
      <AmbientBackdrop />
      <div className="fixed inset-0 z-0 bg-obsidian-950/95 backdrop-blur-md" />
      <div className="relative z-10 flex min-h-[calc(100vh-3rem)] items-center justify-center">
        <div className="premium-panel glow-emerald flex min-h-145 w-full max-w-2xl flex-col justify-between overflow-hidden rounded-[28px] p-8 sm:p-12">
          <OnboardingHeader step={step} />
          <div className="relative flex min-h-95 flex-1 flex-col justify-between overflow-hidden">
            <div className={`flex h-full w-full ${stepTransitionClass}`} key={renderedStep}>
              {renderedStep === 1 && <StartConfiguration onContinue={() => goToStep(2)} />}
              {renderedStep === 2 && (
                <AccountDetails
                  canContinue={canContinueFromDetails}
                  formState={formState}
                  isEmailValid={isEmailValid}
                  onBack={() => goToStep(1)}
                  onChange={updateField}
                  onNext={() => goToStep(3)}
                />
              )}
              {renderedStep === 3 && (
                <AIConfiguration
                  selectedModel={formState.model}
                  isSubmitting={isSubmitting}
                  errorMessage={submitError ?? undefined}
                  onBack={() => goToStep(2)}
                  onComplete={handleComplete}
                  onSelect={updateModel}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default OnboardingPage;
