import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

export default function ProfileHeader() {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/profile/user-icon.png")}
        style={styles.avatar}
      />
      <View>
        <Text style={styles.name}>Anders Jensen</Text>
        <Text style={styles.status}>Gold membership</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#1E1E1E",
    paddingHorizontal: 20,
    paddingBottom: 30,
    paddingTop: 50,
    alignItems: "center",
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 16,
  },
  name: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  status: {
    color: "#ccc",
  },
});
