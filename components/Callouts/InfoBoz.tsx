import { StyleSheet, Text, View } from "react-native";

type InfoBoxProps = {
  description: string;
  info: string;
};

export default function InfoBox({ description, info }: InfoBoxProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.info}>{info}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F3F3F3",
    borderBottomWidth: 2,
    borderBottomColor: "#0AC267",
    width: 150,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  description: {
    color: "#303234",
    fontSize: 16,
    fontWeight: "bold",
  },
  info: {
    color: "#303234",
    fontSize: 16,
  },
});
