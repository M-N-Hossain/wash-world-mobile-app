import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";

///////////////////// Screens /////////////////////
// import LoginScreen from "./screens/Auth/Login";
// import RegisterScreen from "./screens/Auth/Register";
// import OnboardingScreen from "./screens/Onboarding/OnboardingScreen";
import MembershipOptionsScreen from "./screens/Profile/MembershipOptionsScreen";
import ProfileScreen from "./screens/Profile/ProfileScreen";
import HomePage from "./screens/HomePage";
import Locations from "./screens/locations";
import { House, MapPin, User } from "lucide-react-native";

// This is the type for the Profile stack
export type ProfileStackParamList = {
  ProfileScreen: undefined;
  MembershipOptionsScreen: undefined;
};

// This is the type for the Homepage stack
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
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#0ac267", // Optional: Controls label color when active
        tabBarInactiveTintColor: "#666666", // Optional: Controls label color when inactive
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomepageStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <House color={focused ? "#0ac267" : "#666666"} />
          ),
        }}
      />
      <Tab.Screen
        name="Locations"
        component={Locations}
        options={{
          tabBarIcon: ({ focused }) => (
            <MapPin color={focused ? "#0ac267" : "#666666"} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <User color={focused ? "#0ac267" : "#666666"} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// Navigation used for the logged in user
const BasisNavigation = () => (
  <NavigationContainer>
    <BasicTabs />
  </NavigationContainer>
);

export default function Navigation() {
  return (
    <>
      <BasisNavigation />
    </>
  );
}
