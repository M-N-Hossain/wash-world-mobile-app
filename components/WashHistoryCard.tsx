import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

interface Props {
  name: string;
  date: string;
}

export default function WashCard({ name, date }: Props) {
  return (
    <View style={styles.card}>
      <View>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Report an issue</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#F3F3F3",
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    color: "#1E1E1E",
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4,
  },
  date: {
    color: "#777777",
    fontSize: 14,
  },
  button: {
    backgroundColor: "#0AC267",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 14,
  },
});
