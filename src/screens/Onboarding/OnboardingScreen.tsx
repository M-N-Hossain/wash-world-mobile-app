import React from "react";
import Onboarding from "react-native-onboarding-swiper";
import { View, Text, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Skip, Next, Done } from "./OnboardingButtons";

const OnboardingScreen = () => {
  const navigation = useNavigation();

  return (
    <Onboarding
      SkipButtonComponent={Skip}
      NextButtonComponent={Next}
      DoneButtonComponent={Done}
      bottomBarColor="#fff"
      bottomBarHeight={100}
      //   onSkip={() => navigation.navigate("Homescreen")}
      //   onDone={() => navigation.navigate("Homescreen")}
      pages={[
        {
          backgroundColor: "#fff",
          image: (
            <Image
              source={require("../../../assets/onboarding/onboarding-1.png")}
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
              source={require("../../../assets/onboarding/onboarding-2.png")}
              style={{ width: "100%", height: 170 }}
              resizeMode="contain"
            />
          ),
          title: "No tickets, no waiting",
          subtitle:
            "With smart license plate recognition, you’re identified instantly. No scanning, no fumbling, just smooth access every time.",
        },
        {
          backgroundColor: "#fff",
          image: (
            <Image
              source={require("../../../assets/onboarding/onboarding-3.png")}
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
