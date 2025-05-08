import { Car, CircleUser } from "lucide-react-native";
import { StyleSheet, Text, View } from "react-native";

export default function Header() {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.userInfo}>
        <CircleUser color="black" size={50} strokeWidth={1} />
        <Text style={styles.userInfoText}>Anders Jensen</Text>
      </View>
      <View style={styles.userInfo}>
        <Text style={styles.userInfoText}>1220</Text>
        <Car color="black" size={40} strokeWidth={1} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "#FFFFFF",
    height: 120,
    width: "100%",
    paddingTop: 30,
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  userInfoText: {
    fontSize: 16,
  },
});
