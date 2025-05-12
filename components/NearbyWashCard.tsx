import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { ArrowRight, Car } from "lucide-react-native";

interface Props {
  name: string;
  address: string;
  distance: string;
  onPress?: () => void;
}

export default function LocationCard({ 
  name, 
  address, 
  distance,
  onPress = () => {} 
}: Props) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.leftSide}>
        <View style={styles.iconContainer}>
          <Car color="#FFFFFF" size={24} strokeWidth={1.5} />
        </View>
        <View style={styles.textContainer}>
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
    backgroundColor: "#FFFFFF",
    borderRadius: 2,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    overflow: "hidden" 
  },
  leftSide: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    flex: 1
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#1E1E1E",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16
  },
  textContainer: {
    flex: 1
  },
  name: {
    color: "#1E1E1E",
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 4
  },
  address: {
    color: "#777777",
    fontSize: 16
  },
  rightSide: {
    backgroundColor: "#1E1E1E",
    height: "100%",
    paddingVertical: 16,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  distance: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16
  }
});