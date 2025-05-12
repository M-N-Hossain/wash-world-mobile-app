/////////////////////////////////////////////////////////////////////// Commented out is Kai's work on the navigation :)  ///////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////// If you want to see Kai's onboarding screens, you need to use the commented out code /////////////////////////////////////

// import { StyleSheet } from "react-native";
// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import OnboardingScreen from "./screens/Onboarding/OnboardingScreen";

// const Stack = createNativeStackNavigator();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator screenOptions={{ headerShown: false }}>
//         <Stack.Screen name="Onboarding" component={OnboardingScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });

import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import Locations from "./screens/locations";
import LoginScreen from "./screens/Auth/Login";
import RegisterScreen from "./screens/Auth/Register";
import ProfileScreen from "./screens/Profile/ProfileScreen";
import MembershipOptionsScreen from "./screens/Profile/MembershipOptionsScreen";
import HomePage from "./screens/HomePage";

export default function App() {
  return (
    <View style={styles.container}>
      {/* <Locations /> */}
      < HomePage />
      {/*<Locations />*/}
      {/* <LoginScreen /> */}
      {/* <RegisterScreen /> */}
      {/* <ProfileScreen /> */}
      {/* <MembershipOptionsScreen /> */}
      {/* Uncomment the component you want to display */}
      {/* <OnboardingScreen /> */}
      {/* <NavigationContainer> */}
      {/* <Stack.Navigator screenOptions={{ headerShown: false }}> */}
      {/* <Stack.Screen name="Onboarding" component={OnboardingScreen} /> */}
      {/* </Stack.Navigator> */}
      {/* </NavigationContainer> */}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
