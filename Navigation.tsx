import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect } from "react";
import { House, MapPin, User } from "lucide-react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store/store";
import * as SecureStore from "expo-secure-store";
import { getUser, reloadJwtFromStorage } from "./redux/userSlice";
import LoadingScreen from "./components/LoadingScreen";

///////////////////// Screens /////////////////////
import LoginScreen from "./screens/Auth/Login";
import RegisterScreen from "./screens/Auth/Register";
import OnboardingScreen from "./screens/Onboarding/OnboardingScreen";
import MembershipOptionsScreen from "./screens/Profile/MembershipOptionsScreen";
import ProfileScreen from "./screens/Profile/ProfileScreen";
import HomePage from "./screens/HomePage";
import Locations from "./screens/locations";
import History from "./screens/History";
import Feedback from "./screens/Feedback";

// This is the type for the Profile stack
export type ProfileStackParamList = {
  ProfileScreen: undefined;
  MembershipOptionsScreen: undefined;
};

// This is the type for the Homepage stack
export type HomepageStackParamList = {
  Homepage: undefined;
  Locations: undefined;
  WashHistoryStack: { screen: string };
};

export type WashHistoryStackParamList = {
  History: undefined;
  Feedback: undefined;
};

// This is the type for the Auth stack
export type AuthStackParamList = {
  LoginScreen: undefined;
  RegisterScreen: undefined;
  OnboardingScreen: undefined;
};

// Auth stack
const AuthStackNavigator = createNativeStackNavigator<AuthStackParamList>();

function AuthStack() {
  return (
    <AuthStackNavigator.Navigator>
      {/* <AuthStackNavigator.Screen
        name="OnboardingScreen"
        component={OnboardingScreen}
        options={{
          headerShown: false,
        }}
      /> */}
      <AuthStackNavigator.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{
          title: "Login",
          headerShown: false,
        }}
      />
      <AuthStackNavigator.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{
          title: "Register",
          headerShown: false,
        }}
      />
    </AuthStackNavigator.Navigator>
  );
}

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

// Wash history stack
const FeedbackStackNavigator =
  createNativeStackNavigator<WashHistoryStackParamList>();

function WashHistoryStack() {
  return (
    <FeedbackStackNavigator.Navigator>
      <FeedbackStackNavigator.Screen name="History" component={History} />
      <FeedbackStackNavigator.Screen name="Feedback" component={Feedback} />
    </FeedbackStackNavigator.Navigator>
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
        tabBarActiveTintColor: "#0ac267",
        tabBarInactiveTintColor: "#666666",
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

const RootStack = createNativeStackNavigator();

function RootStackNavigator() {
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      {/* Main tabs */}
      <RootStack.Screen name="MainTabs" component={BasicTabs} />
      {/* Stack for history + feedback, outside of tabs */}
      <RootStack.Screen name="WashHistoryStack" component={WashHistoryStack} />
    </RootStack.Navigator>
  );
}

export default function Navigation() {
  const token = useSelector((state: RootState) => state.user.token);
  const isLoadingUser = useSelector(
    (state: RootState) => state.user.isLoadingUser
  );
  const user_profile = useSelector(
    (state: RootState) => state.user.user_profile
  );

  const dispatch = useDispatch<AppDispatch>();

  // Initialize auth state from secure storage
  useEffect(() => {
    const initAuth = async () => {
      try {
        const stored = await SecureStore.getItemAsync("jwt");
        if (stored) {
          const parsedToken = JSON.parse(stored);
          if (parsedToken && typeof parsedToken === "string") {
            dispatch(reloadJwtFromStorage(parsedToken));
            setTimeout(() => {
              dispatch(getUser(parsedToken));
            }, 100);
          }
        }
      } catch (err) {
        console.error("Failed to initialize auth:", err);
      }
    };
    initAuth();
  }, []);

  if (!token) {
    return (
      <NavigationContainer>
        <AuthStack />
      </NavigationContainer>
    );
  }

  if (isLoadingUser || user_profile.id === 0) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      <RootStackNavigator />
    </NavigationContainer>
  );
}
