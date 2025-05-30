import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import { BackHandler, Image } from "react-native";
import Onboarding from "react-native-onboarding-swiper";
import { useDispatch } from "react-redux";
import { Done, Next, Skip } from "../../components/OnboardingButtons";
import { AuthStackParamList } from "../../Navigation";
import { login } from "../../redux/userSlice";
import { AppDispatch } from "../../store/store";

const OnboardingScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const dispatch = useDispatch<AppDispatch>();

  // Prevent back button from working on Android
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      return true; // Prevent default behavior (going back)
    });

    return () => backHandler.remove();
  }, []);

  // Auto navigate to home after 30 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      goToHomeScreen();
    }, 30000); // 30 seconds

    return () => clearTimeout(timer);
  }, []);

  // Store user registration data passed from registration screen
  const route = navigation.getState().routes.find(
    r => r.name === "OnboardingScreen"
  );
  const userData = route?.params?.registrationData;
  
  console.log("OnboardingScreen - userData:", userData);

  const goToHomeScreen = async () => {
    try {
      console.log("Attempting to go to home screen with userData:", userData);
      // If we have registration data, use it to log in automatically
      if (userData?.email && userData?.password) {
        console.log("Logging in with:", userData.email);
        await dispatch(login({
          email: userData.email,
          password: userData.password
        }));
        console.log("Login dispatched successfully");
        // The Navigation component will handle redirecting to home screen once logged in
      } else {
        console.log("No user data, redirecting to login");
        // Fallback to login screen if no registration data
        navigation.reset({
          index: 0,
          routes: [{ name: 'LoginScreen' }],
        });
      }
    } catch (error) {
      console.error("Auto-login error:", error);
      navigation.reset({
        index: 0,
        routes: [{ name: 'LoginScreen' }],
      });
    }
  };

  const handleDone = () => {
    goToHomeScreen();
  };

  const handleSkip = () => {
    goToHomeScreen();
  };

  return (
    <Onboarding
      SkipButtonComponent={Skip}
      NextButtonComponent={Next}
      DoneButtonComponent={Done}
      bottomBarColor="#fff"
      bottomBarHeight={100}
      onSkip={handleSkip}
      onDone={handleDone}
      pages={[
        {
          backgroundColor: "#fff",
          image: (
            <Image
              source={require("../../assets/onboarding/onboarding-1.png")}
              style={{ width: "100%", height: 130 }}
              resizeMode="contain"
            />
          ),
          title: "Unlimited washes, one subscription",
          subtitle:
            "Manage your membership with ease through our app or website. Wash your car as often as you like, stress-free.",
        },
        {
          backgroundColor: "#fff",
          image: (
            <Image
              source={require("../../assets/onboarding/onboarding-2.png")}
              style={{ width: "100%", height: 170 }}
              resizeMode="contain"
            />
          ),
          title: "No tickets, no waiting",
          subtitle:
            "With smart license plate recognition, you're identified instantly. No scanning, no fumbling, just smooth access every time.",
        },
        {
          backgroundColor: "#fff",
          image: (
            <Image
              source={require("../../assets/onboarding/onboarding-3.png")}
              style={{ width: "100%", height: 180 }}
              resizeMode="contain"
            />
          ),
          title: "Drive in, shine out",
          subtitle:
            "Enjoy a fast, convenient, and fully automated car wash experience. Just drive in and let our machines take care of the rest.",
        },
      ]}
    />
  );
};

export default OnboardingScreen;
