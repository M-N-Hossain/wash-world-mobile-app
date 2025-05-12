import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStaticNavigation } from "@react-navigation/native";

///////////// Screens /////////////
// import LoginScreen from "./screens/Auth/Login";
// import RegisterScreen from "./screens/Auth/Register";
// import OnboardingScreen from "./screens/Onboarding/OnboardingScreen";
import MembershipOptionsScreen from "./screens/Profile/MembershipOptionsScreen";
import ProfileScreen from "./screens/Profile/ProfileScreen";
import HomePage from "./screens/HomePage";
import Locations from "./screens/locations";

export type ProfileStackParamList = {
  ProfileScreen: undefined;
  MembershipOptionsScreen: undefined;
};

export type HomepageStackParamList = {
  Homepage: undefined;
  Locations: undefined;
};

// Screens used in the profile section
const ProfileStack = createNativeStackNavigator<ProfileStackParamList>({
  screens: {
    ProfileScreen: ProfileScreen,
    MembershipOptionsScreen: MembershipOptionsScreen,
  },
});

// Screens used in the profile section
const HomepageStack = createNativeStackNavigator<HomepageStackParamList>({
  screens: {
    Homepage: HomePage,
    Locations: Locations,
  },
});

// The different stacks used in the bottom tab navigator
const BasicTabs = createBottomTabNavigator({
  screens: {
    Home: HomepageStack,
    Profile: ProfileStack,
  },
});

const BasicNavigation = createStaticNavigation(BasicTabs);

export default function Navigation() {
  return (
    <>
      <BasicNavigation />
    </>
  );
}
