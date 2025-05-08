import { StyleSheet, Text, View } from "react-native";

type FakeButtonProps = {
  ButtonText: string;
};

export default function FakeButton({ ButtonText }: FakeButtonProps) {
  return (
    <View style={styles.buttonContainer}>
      <Text style={styles.buttonText}>{ButtonText}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: "#1E1E1E",
    padding: 10,
    width: 170,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#F3F3F3",
    fontSize: 14,
  },
});
