import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Animated,
} from "react-native";
import {
  X,
  MapPin,
  Car,
  CarFront,
  CheckCircle,
  Hourglass,
  Wind,
  Droplets,
  Sparkles,
  Circle,
  CircleDot,
} from "lucide-react-native";
import { washStackParamList } from "../Navigation";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation, useRoute } from "@react-navigation/native";

const CIRCLE_SIZE = 120;
const COUNTDOWN_SECONDS = 24;
const PHASE_SECONDS = 4;

const StartWashingScreen = () => {
  type NavigationProp = NativeStackNavigationProp<
    washStackParamList,
    "StartWashingScreen"
  >;
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute();
  type FeedbackScreenRouteParams = {
    washId: string;
    washLocation: string;
    licensePlate: string;
  };
  const { washId, washLocation, licensePlate } =
    route.params as FeedbackScreenRouteParams;

  const [secondsLeft, setSecondsLeft] = useState(COUNTDOWN_SECONDS);
  const animatedValue = useRef(new Animated.Value(0)).current;

  // if (secondsLeft === 0) {
  //   navigation.navigate("FeedbackScreen", {
  //     washId,
  //     washLocation,
  //     licensePlate,
  //   });
  // }

  const timeout = setTimeout(() => {
    navigation.navigate("FeedbackScreen", {
      washId,
      washLocation,
      licensePlate,
    });
  }, COUNTDOWN_SECONDS * 1000);

  const activeStep =
    steps.length -
    Math.floor(secondsLeft / PHASE_SECONDS) -
    (secondsLeft === 0 ? 0 : 1);

  useEffect(() => {
    animatedValue.setValue(0);
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: COUNTDOWN_SECONDS * 1000,
      useNativeDriver: false,
    }).start();

    setSecondsLeft(COUNTDOWN_SECONDS);
    const interval = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(interval);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (secs: number) => {
    const minutes = Math.floor(secs / 60);
    const seconds = secs % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.closeButton}>
          <X size={28} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Wash in progress</Text>
        <Text style={styles.subtitle}>ESTIMATED TIME REMAINING</Text>
        <Text style={styles.time}>{formatTime(secondsLeft)}</Text>
      </View>

      <View style={styles.circleWrapper}>
        <View style={styles.progressCircle}>
          <Image
            source={require("../assets/car-wash-icon.png")}
            style={styles.carImage}
          />
        </View>
      </View>

      <View style={styles.licenseInfo}>
        <Text style={styles.label}>License Plate</Text>
        <Text style={styles.plate}>{licensePlate}</Text>
        {/* <Text style={styles.locationTitle}>Ballerup - Industrial Park</Text> */}
        <View style={styles.locationRow}>
          <MapPin size={14} color="black" />
          <Text style={styles.address}>{washLocation}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.emergencyButton}>
        <Text style={styles.emergencyButtonText}>Emergency Stop</Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.stepsContainer}>
        {steps.map((step, index) => (
          <View
            style={[styles.stepItem, index <= activeStep && styles.activeStep]}
            key={index}
          >
            {getStepIcon(step.icon, index <= activeStep)}
            <View style={styles.stepTextContainer}>
              <Text
                style={[
                  styles.stepTitle,
                  index <= activeStep && styles.activeStepTitle,
                ]}
              >
                {step.title}
              </Text>
              <Text
                style={[
                  styles.stepDescription,
                  index <= activeStep && styles.activeStepDescription,
                ]}
              >
                {step.description}
              </Text>
            </View>
            {index <= activeStep ? (
              <CheckCircle size={24} color="green" />
            ) : (
              <Hourglass size={24} color="#ddd" />
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

function getStepIcon(icon: string, active: boolean) {
  switch (icon) {
    case "car":
      return <Car size={24} color={active ? "#000" : "#ccc"} />;
    case "car-side":
      return <CarFront size={24} color={active ? "#000" : "#ccc"} />;
    case "dot-circle":
      return <CircleDot size={24} color={active ? "#000" : "#ccc"} />;
    case "shower":
      return <Droplets size={24} color={active ? "#000" : "#ccc"} />;
    case "magic":
      return <Sparkles size={24} color={active ? "#000" : "#ccc"} />;
    case "wind":
      return <Wind size={24} color={active ? "#000" : "#ccc"} />;
    default:
      return <Circle size={24} color={active ? "#000" : "#ccc"} />;
  }
}

const steps = [
  {
    title: "Shampoo",
    description: "Applying high-quality shampoo to loosen surface dirt.",
    icon: "car",
  },
  {
    title: "Brush Washing",
    description: "Gentle foam brushes are scrubbing away stubborn dirt.",
    icon: "car-side",
  },
  {
    title: "Wheel Wash",
    description: "Cleaning your wheels to remove grime and brake dust.",
    icon: "dot-circle",
  },
  {
    title: "High-Pressure Flushing",
    description: "Removing stuck-on dirt with a powerful water blast.",
    icon: "shower",
  },
  {
    title: "Rinsing Wax",
    description: "Adding wax to protect your paint and make water slide off.",
    icon: "magic",
  },
  {
    title: "Drying",
    description: "Blowing dry to prevent limescale stains and water spots.",
    icon: "wind",
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  header: {
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    right: 0,
    top: 0,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 12,
    color: "#888",
  },
  time: {
    fontSize: 32,
    fontWeight: "bold",
    marginVertical: 10,
  },
  circleWrapper: {
    alignItems: "center",
    marginVertical: 20,
  },
  progressCircle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    borderWidth: 8,
    borderColor: "#1ec773",
    justifyContent: "center",
    alignItems: "center",
  },
  carImage: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  licenseInfo: {
    alignItems: "center",
    marginBottom: 15,
  },
  label: {
    fontWeight: "bold",
  },
  plate: {
    fontSize: 16,
    fontWeight: "600",
  },
  locationTitle: {
    fontWeight: "bold",
    marginTop: 8,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  address: {
    marginLeft: 5,
    fontSize: 12,
  },
  emergencyButton: {
    backgroundColor: "#e53935",
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 10,
    marginVertical: 20,
  },
  emergencyButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  stepsContainer: {
    paddingBottom: 40,
  },
  stepItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    opacity: 0.3,
  },
  activeStep: {
    opacity: 1,
  },
  stepTextContainer: {
    flex: 1,
    marginLeft: 10,
  },
  stepTitle: {
    fontWeight: "bold",
    fontSize: 14,
  },
  activeStepTitle: {
    color: "#000",
  },
  stepDescription: {
    fontSize: 12,
    color: "#888",
  },
  activeStepDescription: {
    color: "#000",
  },
});

export default StartWashingScreen;
