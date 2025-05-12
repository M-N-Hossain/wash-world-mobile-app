import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

interface Props {
  name: string;
  date: string;
  onReportIssue?: () => void;
}

export default function WashCard({ 
  name, 
  date,
  onReportIssue = () => {} 
}: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.contentContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>

      <TouchableOpacity 
        style={styles.button}
        onPress={onReportIssue}
      >
        <Text style={styles.buttonText}>Report an issue</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#F3F3F3",
    borderRadius: 3,
    marginBottom: 16,
    overflow: "hidden",
    borderBottomWidth: 4,
    borderBottomColor: "#0AC267",
  },
  contentContainer: {
    padding: 15
  },
  name: {
    color: "#1E1E1E",
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 4
  },
  date: {
    color: "#777777",
    fontSize: 18
  },
  button: {
    backgroundColor: "#0AC267", 
    alignSelf: "flex-end",
    paddingVertical: 15,
    paddingHorizontal: 25,
    width: "60%", 
    alignItems: "center",
    borderTopLeftRadius: 20
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 18
  }
});