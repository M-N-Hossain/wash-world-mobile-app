import { CarFront, ChevronLeft } from "lucide-react-native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type ExtendedTopProps = {
  name: string;
  address: string;
  handleBackPress: () => void;
};

export default function ExtendedTop({
  name,
  address,
  handleBackPress,
}: ExtendedTopProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.back} onPress={handleBackPress}>
        <ChevronLeft color="black" size={20} strokeWidth={2} />
      </TouchableOpacity>
      <View style={styles.CarIcon}>
        <CarFront color="white" size={35} strokeWidth={2} />
      </View>
      <View>
        <Text style={styles.address}>{address}</Text>
        <Text style={styles.name}>{name}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    backgroundColor: "#FFFFFF",
    width: "100%",
    top: 0,
    height: 90,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    padding: 20,
    gap: 20,
  },
  address: {
    fontSize: 20,
    fontWeight: "bold",
  },
  name: {
    fontSize: 16,
    color: "#A0A0A0",
  },
  CarIcon: {
    backgroundColor: "#0AC267",
    width: 50,
    height: 50,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  back: {
    position: "absolute",
    left: 20,
  },
});
