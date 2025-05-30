import { ArrowRight } from "lucide-react-native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

// Skip button
export const Skip = ({ ...props }) => (
  <View style={styles.skipWrapper}>
    <TouchableOpacity {...props}>
      <Text style={styles.skipText}>Skip</Text>
    </TouchableOpacity>
  </View>
);

// Next button
export const Next = ({ ...props }) => (
  <View style={styles.buttonWrapper}>
    <TouchableOpacity style={styles.circleButton} {...props}>
      <ArrowRight size={20} color="#fff" />
    </TouchableOpacity>
  </View>
);

//Done button
export const Done = ({ ...props }) => (
  <View style={styles.buttonWrapper}>
    <TouchableOpacity style={styles.circleButton} {...props}>
      <ArrowRight size={20} color="#fff" />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  skipWrapper: {
    paddingLeft: 20,
  },
  buttonWrapper: {
    paddingRight: 20,
  },
  skipText: {
    color: "#0AC267",
    fontWeight: "600",
    fontSize: 16,
  },
  circleButton: {
    width: 45,
    height: 45,
    borderRadius: 999,
    backgroundColor: "#0AC267",
    justifyContent: "center",
    alignItems: "center",
  },
  doneButton: {
    backgroundColor: "#0AC267",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  doneText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
