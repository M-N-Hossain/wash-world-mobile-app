import { CarFront, ChevronRight } from "lucide-react-native";
import { StyleSheet, Text, View } from "react-native";
import FakeButton from "./FakeButton";

type Location = {
  name: string;
  address: string;
  open_hours: string;
};

// This is a custom callout component for the map marker
// It displays the location name, address, and opening hours

export default function MapCallout({ name, address, open_hours }: Location) {
  return (
    <View style={styles.CalloutContainer}>
      <View style={styles.CalloutHeader}>
        <View style={styles.CarIcon}>
          <CarFront color="white" size={35} strokeWidth={2} />
        </View>
        <View style={styles.CalloutMiddleTop}>
          <Text style={styles.CalloutMiddleBold}>{address}</Text>
        </View>
        <View style={styles.CalloutDistance}>
          <Text style={styles.CalloutDistanceText}>0.67 km</Text>
          <ChevronRight color="black" size={20} strokeWidth={2} />
        </View>
      </View>
      <View style={styles.CalloutMiddle}>
        <Text style={styles.CalloutMiddleAddress}>{name}</Text>
        <Text style={styles.calloutOpening}>Opening hours {open_hours}</Text>
      </View>
      <View style={styles.calloutButtons}>
        <FakeButton ButtonText="Open in Maps" />
        <FakeButton ButtonText="Notify if less busy" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  CalloutContainer: {
    position: "absolute",
    bottom: 0,
    backgroundColor: "#FFFFFF",
    width: "90%",
    height: 200,
    marginBottom: 30,
    padding: 20,
  },
  CarIcon: {
    backgroundColor: "#0AC267",
    width: 50,
    height: 50,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  CalloutHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  CalloutMiddleTop: {
    width: 210,
  },
  CalloutDistance: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  CalloutDistanceText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000",
  },
  CalloutMiddleBold: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000000",
  },
  CalloutMiddleAddress: {
    fontSize: 14,
    color: "#303234",
  },
  calloutOpening: {
    fontSize: 14,
    color: "#303234",
  },
  CalloutMiddle: {
    gap: 5,
  },
  calloutButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
  },
});
