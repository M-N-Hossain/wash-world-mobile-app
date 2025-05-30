// This is the type for the Profile stack
export type ProfileStackParamList = {
  ProfileScreen: undefined;
  MembershipOptionsScreen: undefined;
};

// This is the type for the Homepage stack
export type HomepageStackParamList = {
  Homepage: undefined;
  Locations: undefined;
  History: undefined;
  FeedbackScreen: { washLocation: string; washId: unknown };
  FeedbackReportsScreen: undefined
};

// This is the type for the Auth stack
export type AuthStackParamList = {
  LoginScreen: undefined;
  RegisterScreen: undefined;
  OnboardingScreen: {
    registrationData?: {
      email: string;
      password: string;
    };
  };
}; 