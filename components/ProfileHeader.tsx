import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";

export default function ProfileHeader() {
  const dispatch = useDispatch<AppDispatch>();

  const user = useSelector((state: RootState) => state.user.user_profile);

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/profile/user-icon.png")}
        style={styles.avatar}
      />
      <View>
        <Text style={styles.name}>{`${user.firstName} ${user.lastName}`}</Text>
        <Text style={styles.status}>{`${user.subscription} membership`}</Text>
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
