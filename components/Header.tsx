import { CircleUser, LogOut } from "lucide-react-native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { logout } from "../redux/userSlice";

export default function Header() {
  const dispatch = useDispatch<AppDispatch>();

  // Handle logout action
  const handleLogout = () => {
    dispatch(logout());
  };

  // Get user information from Redux store
  const user = useSelector((state: RootState) => state.user.user_profile);

  return (
    <View style={styles.headerContainer}>
      <View style={styles.userInfo}>
        <CircleUser color="black" size={50} strokeWidth={1} />
        <Text style={styles.userInfoText}>{`${user.firstName} ${user.lastName}`}</Text>
      </View>
      <TouchableOpacity style={styles.userInfo} onPress={handleLogout}>
        <Text style={styles.userInfoText2}>Log out</Text>
        <LogOut color="red" size={30} strokeWidth={1} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "#FFFFFF",
    height: 120,
    width: "100%",
    paddingTop: 33,
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
  userInfoText2: {
    fontSize: 16,
    color: "red",
  },
});
