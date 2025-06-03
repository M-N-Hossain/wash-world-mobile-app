import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  useNavigationState,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SecureStore from "expo-secure-store";
import { House, MapPin, User } from "lucide-react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingScreen from "./components/LoadingScreen";
import { getUser, logout, reloadJwtFromStorage } from "./redux/userSlice";
import { AppDispatch, RootState } from "./store/store";
import { jwtDecode } from "jwt-decode";

///////////////////// Screens /////////////////////
import LoginScreen from "./screens/Auth/Login";
import RegisterScreen from "./screens/Auth/Register";
import History from "./screens/History";
import HomePage from "./screens/HomePage";
import Locations from "./screens/locations";
import OnboardingScreen from "./screens/Onboarding/OnboardingScreen";
import MembershipOptionsScreen from "./screens/Profile/MembershipOptionsScreen";
import ProfileScreen from "./screens/Profile/ProfileScreen";
import FeedbackScreen from "./screens/Feedback";
import FeedbackReportsScreen from "./screens/FeedbackReports";
import StartWashingScreen from "./screens/StartWashingScreen";

// This is the type for the Profile stack
export type ProfileStackParamList = {
  ProfileScreen: undefined;
  MembershipOptionsScreen: undefined;
};

export type washStackParamList = {
  Locations: undefined;
  StartWashingScreen: {
    washId: string;
    washLocation: string;
    licensePlate: string;
  };
  FeedbackScreen: { washId: any; washLocation: string; licensePlate: string };
};

// This is the type for the Homepage stack
export type HomepageStackParamList = {
  Homepage: undefined;
  History: undefined;
  FeedbackScreen: { washLocation: string; washId: unknown };
  FeedbackReportsScreen: undefined;
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

// Auth stack
const AuthStackNavigator = createNativeStackNavigator<AuthStackParamList>();

function AuthStack() {
  const currentRoute = useNavigationState(
    (state) => state?.routes?.[state.index]?.name
  );

  console.log("Current route:", currentRoute);

  return (
    <AuthStackNavigator.Navigator>
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
      <AuthStackNavigator.Screen
        name="OnboardingScreen"
        component={OnboardingScreen}
        options={{
          headerShown: false,
        }}
      />
    </AuthStackNavigator.Navigator>
  );
}

// Profile stack
const ProfileStackNavigator =
  createNativeStackNavigator<ProfileStackParamList>();

// Wash stack
const WashStackNavigator = createNativeStackNavigator<washStackParamList>();

function WashStack() {
  return (
    <WashStackNavigator.Navigator>
      <WashStackNavigator.Screen
        name="Locations"
        component={Locations}
        options={{
          headerShown: false,
        }}
      />
      <WashStackNavigator.Screen
        name="StartWashingScreen"
        component={StartWashingScreen}
        options={{
          headerShown: false,
        }}
      />
      <WashStackNavigator.Screen
        name="FeedbackScreen"
        component={FeedbackScreen}
        options={{
          headerShown: false,
        }}
      />
    </WashStackNavigator.Navigator>
  );
}

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
      <HomepageStackNavigator.Screen
        name="FeedbackScreen"
        component={FeedbackScreen}
        options={{
          title: "Feedback",
          headerShown: true,
          headerStyle: { backgroundColor: "#0ac267" },
          headerTintColor: "#fff",
        }}
      />
      <HomepageStackNavigator.Screen
        name="FeedbackReportsScreen"
        component={FeedbackReportsScreen}
        options={{
          title: "Feedback reports",
          headerShown: true,
          headerStyle: { backgroundColor: "#0ac267" },
          headerTintColor: "#fff",
        }}
      />
      <HomepageStackNavigator.Screen
        name="History"
        component={History}
        options={{
          title: "Wash History",
          headerShown: true,
          headerStyle: { backgroundColor: "#0ac267" },
          headerTintColor: "#fff",
        }}
      />
      {/* <HomepageStackNavigator.Screen
        name="FeedbackReportsScreen"
        component={WashStack}
      /> */}
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
        component={WashStack}
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

export default function Navigation() {
  const token = useSelector((state: RootState) => state.user.token);
  const isLoadingUser = useSelector(
    (state: RootState) => state.user.isLoadingUser
  );
  const user_profile = useSelector(
    (state: RootState) => state.user.user_profile
  );

  const dispatch = useDispatch<AppDispatch>();
  type DecodedToken = {
    exp: number;
  };

  // Check for token expiration on app load
  useEffect(() => {
    const checkTokenExpiration = async () => {
      try {
        const stored = await SecureStore.getItemAsync("jwt");

        if (!stored) {
          // No token found in storage
          dispatch(logout());
          return;
        }

        try {
          // Parse the token correctly - it's stored as a plain string
          const decoded: DecodedToken = jwtDecode(stored);
          const now = Math.floor(Date.now() / 1000); // current time in seconds
          const timeUntilExpiry = decoded.exp - now;

          // If token is expired, log out immediately
          if (timeUntilExpiry <= 0) {
            console.log("Token expired, logging out");
            await SecureStore.deleteItemAsync("jwt");
            dispatch(logout());
            return;
          }

          // If token is valid but we don't have it in Redux, load it
          if (!token && timeUntilExpiry > 0) {
            dispatch(reloadJwtFromStorage(stored));
            dispatch(getUser(stored));
          }
        } catch (decodeError) {
          console.error("Error decoding token:", decodeError);
          await SecureStore.deleteItemAsync("jwt");
          dispatch(logout());
        }
      } catch (err) {
        console.error("Error checking token:", err);
        dispatch(logout());
      }
    };

    checkTokenExpiration();
  }, [dispatch]);

  return (
    <NavigationContainer>
      {token ? (
        isLoadingUser || user_profile.id === 0 ? (
          <LoadingScreen />
        ) : (
          <BasicTabs />
        )
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
}
