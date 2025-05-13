import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  createStaticNavigation,
  NavigationContainer,
} from "@react-navigation/native";

///////////////////// Screens /////////////////////
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

// Profile stack
const ProfileStackNavigator =
  createNativeStackNavigator<ProfileStackParamList>();

function ProfileStack() {
  return (
    <ProfileStackNavigator.Navigator>
      <ProfileStackNavigator.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
            headerShown: false,
        }}
      />
      <ProfileStackNavigator.Screen
        name="MembershipOptionsScreen"
        component={MembershipOptionsScreen}
        options={{
            title: "Membership Options",
        }}
      />
    </ProfileStackNavigator.Navigator>
  );
}

// Homepage stack
const HomepageStackNavigator =
  createNativeStackNavigator<HomepageStackParamList>();

function HomepageStack() {
  return (
    <HomepageStackNavigator.Navigator screenOptions={{ headerShown: false }}>
      <HomepageStackNavigator.Screen name="Homepage" component={HomePage} />
      <HomepageStackNavigator.Screen name="Locations" component={Locations} />
    </HomepageStackNavigator.Navigator>
  );
}

// Bottom tab navigator
const Tab = createBottomTabNavigator();

function BasicTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={HomepageStack} />
      <Tab.Screen name="Locations" component={Locations} />
      <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <BasicTabs />
    </NavigationContainer>
  );
}
