import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect } from "react";
import { House, MapPin, User } from "lucide-react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store/store";
import * as SecureStore from "expo-secure-store";
import { getUser, logout, reloadJwtFromStorage } from "./redux/userSlice";
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
import { jwtDecode } from "jwt-decode";

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

  // Initialize auth state from secure storage
  useEffect(() => {
    const initAuth = async () => {
      try {
        const stored = await SecureStore.getItemAsync("jwt");
        console.log("Stored JWT:", stored);

        if (stored && typeof stored === "string") {
          const decoded: DecodedToken = jwtDecode(stored);
          const now = Math.floor(Date.now() / 1000); // current time in seconds

          if (decoded.exp < now) {
            // Token has expired
            dispatch(logout());
          } else {
            dispatch(reloadJwtFromStorage(stored));
            setTimeout(() => {
              dispatch(getUser(stored));
            }, 100);
          }
        }
      } catch (err) {
        console.error("Failed to initialize auth:", err);
      }
    };

    initAuth();
  }, []);


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
