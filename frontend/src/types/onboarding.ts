export type OnboardingStep = 1 | 2 | 3;

export type OnboardingFormState = {
  email: string;
  model: "frontier" | "local";
  name: string;
};

export type UserConfigModel = OnboardingFormState["model"];

export type UpsertUserConfigPayload = {
  aiModel: UserConfigModel;
  email: string;
  name: string;
};

export type UserConfig = UpsertUserConfigPayload;

export type ApiMessageResponse = {
  message: string;
};
