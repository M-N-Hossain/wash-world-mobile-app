import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect } from "react";
import { House, MapPin, User } from "lucide-react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store/store";
import * as SecureStore from "expo-secure-store";
import { getUser, reloadJwtFromStorage } from "./redux/userSlice";

///////////////////// Screens /////////////////////
import LoginScreen from "./screens/Auth/Login";
import RegisterScreen from "./screens/Auth/Register";
import OnboardingScreen from "./screens/Onboarding/OnboardingScreen";
import MembershipOptionsScreen from "./screens/Profile/MembershipOptionsScreen";
import ProfileScreen from "./screens/Profile/ProfileScreen";
import HomePage from "./screens/HomePage";
import Locations from "./screens/locations";

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

export default function Navigation() {
  const token = useSelector((state: RootState) => state.user.token);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    async function updateReduxToken() {
      const stored = await SecureStore.getItemAsync("jwt");
      if (stored) {
        try {
          const parsedToken = JSON.parse(stored);
          if (parsedToken && typeof parsedToken === "string") {
            // console.log("Parsed token:", parsedToken);
            dispatch(reloadJwtFromStorage(parsedToken));
          }
        } catch (error) {
          console.error("Error parsing token:", error);
        }
      }
    }
    updateReduxToken();
  }, []);

  useEffect(() => {
    const loadTokenAndUser = async () => {
      const token = await SecureStore.getItemAsync("jwt");
      if (token) {
        const parsedToken = JSON.parse(token);
        dispatch(reloadJwtFromStorage(parsedToken));
        dispatch(getUser(parsedToken));
      }
    };
    loadTokenAndUser();
  }, []);

  return (
    <NavigationContainer>
      {token ? <BasicTabs /> : <AuthStack />}
    </NavigationContainer>
  );
}
