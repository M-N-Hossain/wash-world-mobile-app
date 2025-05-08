import { StyleSheet, Text, View } from "react-native";
import Header from "../components/Header";
import Map from "../components/Map";

export default function Locations() {


  return (
    <View style={styles.screenContainer}>
      <Header />
      <View style={styles.locationContainer}>
        <Map />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    width: "100%",
    flex: 1,
  },
  locationContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#000000",
  },
});
