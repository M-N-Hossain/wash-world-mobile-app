import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Car, ArrowRight } from "lucide-react-native";

interface Props {
  name: string;
  address: string;
  distance: string;
}

export default function LocationCard({ name, address, distance }: Props) {
  return (
    <TouchableOpacity style={styles.card}>
      <View style={styles.leftSide}>
        <Car color="#1E1E1E" size={24} strokeWidth={1.5} />
        <View>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.address}>{address}</Text>
        </View>
      </View>

      <View style={styles.rightSide}>
        <Text style={styles.distance}>{distance}</Text>
        <ArrowRight color="#FFFFFF" size={20} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#F3F3F3",
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  leftSide: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  name: {
    color: "#1E1E1E", 
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4,
  },
  address: {
    color: "#777777", 
    fontSize: 14,
  },
  rightSide: {
    backgroundColor: "#1E1E1E", 
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  distance: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 14,
  },
});
