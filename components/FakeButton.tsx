import { StyleSheet, Text, View } from "react-native";

type FakeButtonProps = {
  ButtonText: string;
};

// Fake button component to be used in the map callout

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
    height: 40,
  },
  buttonText: {
    color: "#F3F3F3",
    fontSize: 14,
  },
});
