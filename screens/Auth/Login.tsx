import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Pressable,
} from "react-native";
import { Mail, Lock, ChevronLeft } from "lucide-react-native";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { LoginUserDto } from "../../redux/LoginUserDto";
import { login } from "../../redux/userSlice";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../Navigation";

export default function LoginScreen() {
  const dispatch = useDispatch<AppDispatch>();

  // Navigation
  type NavigationProp = NativeStackNavigationProp<
    AuthStackParamList,
    "LoginScreen"
  >;

  const navigation = useNavigation<NavigationProp>();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  // Handle login action
  const handleLogin = () => {
    // console.log("Login button pressed");
    dispatch(login(new LoginUserDto(email, password)));
  };

  // Handle register action
  const handleRegister = () => {
    // console.log("Register button pressed");
    navigation.navigate("RegisterScreen");
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Title + Subtitle */}
      <Text style={styles.title}>Login to Wash World</Text>
      <Text style={styles.subtitle}>
        Login below with either your social media or with Email and password
      </Text>

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          style={styles.textInput}
          placeholderTextColor="#999"
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

      {/* Login Button */}
      <TouchableOpacity
        style={[styles.button, styles.buttonDisabled]}
        onPress={handleLogin}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      {/* Footer Links */}
      <View style={styles.footer}>
        <View style={styles.footerLeft}>
          <Text>Don't have an account?</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("RegisterScreen")}
          >
            <Text style={styles.link}>Register instead</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.link}>Forgot password</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 72,
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  footerLeft: {
    flexDirection: "column",
  },
  link: {
    color: "#0AC267",
    fontWeight: "bold",
  },
});
