import { StyleSheet, Text, TouchableOpacity } from "react-native";

type ButtonProps = {
  buttonText: string;
  handleOnPress?: () => void;
};

export default function BasicButton({
  buttonText,
  handleOnPress,
}: ButtonProps) {
  return (
    <TouchableOpacity style={styles.Button} onPress={handleOnPress}>
      <Text style={styles.upgradeText}>{buttonText}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  Button: {
    backgroundColor: "#06c167",
    padding: 20,
    marginHorizontal: 20,
    height: 80,
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 2,
    borderBottomColor: "#198B47",
  },
  upgradeText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 20,
  },
});
