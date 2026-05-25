export type OnboardingStep = 1 | 2 | 3;

export type OnboardingFormState = {
  email: string;
  model: "frontier" | "local";
  name: string;
};
