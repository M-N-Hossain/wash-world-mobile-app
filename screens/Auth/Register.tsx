import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ChevronLeft, Lock, Mail } from "lucide-react-native";
import React from "react";
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import { UserAPI } from "../../APIs/UserAPI";
import { useGetSubscriptions } from "../../hooks/useGetSubscriptions";
import { AuthStackParamList } from "../../Navigation";
import { AppDispatch } from "../../store/store";

export default function RegisterScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<NavigationProp>();

  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [licensePlate, setLicensePlate] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [subscriptionId, setSubscriptionId] = React.useState("");
  const [isRegistering, setIsRegistering] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  type NavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  "OnboardingScreen"
>;

  // Handle register action
  const handleRegister = async () => {
    try {
      setIsRegistering(true);
      setErrorMessage("");
      
      // Make API call directly without using the Redux action
      await UserAPI.signupUser({
        firstName,
        lastName,
        licensePlate,
        email,
        password,
        subscriptionId: subscriptionId || "26fa4dea-5f91-4131-ba98-87d36722f729"
      });
      
      // If successful, navigate to onboarding with registration data
      navigation.replace("OnboardingScreen", {
        registrationData: {
          email,
          password
        }
      });
    } catch (error) {
      console.error("Registration error:", error);
      setErrorMessage("Registration failed. Please try again.");
    } finally {
      setIsRegistering(false);
    }
  };

  const { isLoading, isError, data, error } = useGetSubscriptions();
  console.log("Subscriptions data:", data);

  return (
    <SafeAreaView style={styles.container}>
      {/* Back Button */}
      <Pressable style={styles.backButton} onPress={() => navigation.navigate("LoginScreen")}>
        <View style={styles.iconWrapper}>
          <ChevronLeft size={24} />
        </View>
      </Pressable>

      {/* Title + Subtitle */}
      <Text style={styles.title}>Welcome to Wash World</Text>
      <Text style={styles.subtitle}>
        Sign up to unlock premium washes and exclusive deals—fast and easy!
      </Text>

      {/* FirstName Input */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="First Name"
          style={styles.textInput}
          placeholderTextColor="#999"
          keyboardType="default"
          value={firstName}
          onChangeText={setFirstName}
        />
        <View style={styles.iconWrapper}>
          <Mail size={20} />
        </View>
      </View>

      {/* LastName Input */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Last Name"
          style={styles.textInput}
          placeholderTextColor="#999"
          keyboardType="default"
          value={lastName}
          onChangeText={setLastName}
        />
        <View style={styles.iconWrapper}>
          <Mail size={20} />
        </View>
      </View>

      {/* LicensePlate Input */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="License Plate"
          style={styles.textInput}
          placeholderTextColor="#999"
          keyboardType="default"
          value={licensePlate}
          onChangeText={setLicensePlate}
        />
        <View style={styles.iconWrapper}>
          <Mail size={20} />
        </View>
      </View>

      {/* Membership Input */}
      {isLoading ? (
        <Text>Loading memberships...</Text>
      ) : error ? (
        <Text>Error loading memberships</Text>
      ) : (
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={subscriptionId}
            onValueChange={(itemValue) => setSubscriptionId(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select membership" value="" />
            {data?.map((sub) => (
              <Picker.Item key={sub.id} label={sub.tierName} value={sub.id} />
            ))}
          </Picker>
        </View>
      )}


      {/* Email Input */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          style={styles.textInput}
          placeholderTextColor="#999"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <View style={styles.iconWrapper}>
          <Mail size={20} />
        </View>
      </View>

      {/* Password Input */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Password"
          style={styles.textInput}
          secureTextEntry
          placeholderTextColor="#999"
          value={password}
          onChangeText={setPassword}
        />
        <View style={styles.iconWrapper}>
          <Lock size={20} />
        </View>
      </View>

      {/* Repeat Password Input */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Repeat Password"
          style={styles.textInput}
          secureTextEntry
          placeholderTextColor="#999"
        />
        <View style={styles.iconWrapper}>
          <Lock size={20} />
        </View>
      </View>

      {/* Register Button */}
      <TouchableOpacity
        style={[styles.button, isRegistering ? styles.buttonDisabled : styles.buttonActive]}
        onPress={handleRegister}
        disabled={isRegistering}
      >
        <Text style={styles.buttonText}>{isRegistering ? "Registering..." : "Register"}</Text>
      </TouchableOpacity>

      {/* Error message */}
      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Already have an account?{" "}
          <Text style={styles.link} onPress={() => navigation.navigate("LoginScreen")}>Login instead</Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 24,
  },
  backButton: {
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    color: "#666",
    marginVertical: 12,
  },
  inputContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    alignItems: "center",
    marginTop: 12,
  },
  textInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: "#000",
  },
  iconWrapper: {
    marginLeft: 8,
  },
  button: {
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 24,
  },
  buttonDisabled: {
    backgroundColor: "#999",
  },
  buttonActive: {
    backgroundColor: "#0AC267",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  footer: {
    marginTop: 24,
    alignItems: "center",
  },
  footerText: {
    textAlign: "center",
    color: "#333",
  },
  link: {
    color: "#0AC267",
    fontWeight: "bold",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginTop: 12,
    overflow: "hidden",
  },
  picker: {
    height: 50,
    width: "100%",
    color: "#000",
  },
  errorText: {
    color: "red",
    marginTop: 12,
    textAlign: "center",
  },
});
