import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MessageCircle } from "lucide-react-native";

type Props = {
  title: string;
  rating: string;
  description: string;
};

export default function FeedbackReportCardXL({
  title,
  rating,
  description,
}: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.leftSide}>
        <View style={styles.iconContainer}>
          <MessageCircle color="#FFFFFF" size={24} strokeWidth={1.5} />
        </View>
        <View style={styles.textContainer}>
          <Text
            style={styles.title}
          >{`Your feedback is about the "${title}"`}</Text>
          <Text style={styles.description}>{description}</Text>
          <Text style={styles.rating}>{`${rating} out of 5 stars`}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 2,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    overflow: "hidden",
  },
  leftSide: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    flex: 1,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#1E1E1E",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    color: "#1E1E1E",
    fontWeight: "bold",
    fontSize: 18,
  },
  rating: {
    color: "#777777",
    fontSize: 16,
  },
  description: {
    color: "#1E1E1E",
    fontSize: 16,
    paddingTop: 10,
    paddingBottom: 10,
  },
  rightSide: {
    backgroundColor: "#1E1E1E",
    height: "100%",
    paddingVertical: 16,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  seeMore: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
});
