import React, { ReactNode } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

type ProfileSectionProps = {
  title: string;
  icon?: string; // you can wire this up to lucide if you like
  expanded: boolean;
  onPress: () => void;
  children: ReactNode;
};

export default function ProfileSection({
  title,
  expanded,
  onPress,
  children,
}: ProfileSectionProps) {
  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={onPress} style={styles.header}>
        {/* optional icon placeholder */}
        {/* <YourIcon name={icon} size={20} style={styles.icon} /> */}
        <Text style={styles.title}>{title}</Text>
        <View style={styles.toggleWrapper}>
          <Text style={styles.toggleText}>
            {expanded ? "See less" : "See more"}
          </Text>
        </View>
      </TouchableOpacity>
      {expanded && <View style={styles.content}>{children}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#f3f3f3",
    marginVertical: 6,

    borderWidth: 1,
    borderColor: "#e0e0e0",
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 24,
    paddingHorizontal: 16,
    backgroundColor: "#f3f3f3",
    borderBottomWidth: 1,
    borderBottomColor: "#0AC267",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  toggle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#06c167",
  },

  toggleWrapper: {
    backgroundColor: "#06c167",
    paddingVertical: 6,
    paddingHorizontal: 16,

    transform: [{ skewX: "-20deg" }],

    alignSelf: "flex-end",
    position: "absolute",
    right: -5,
    bottom: 0,
  },

  toggleText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    transform: [{ skewX: "20deg" }],
  },
  content: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    backgroundColor: "#fff",
  },
  // icon: { marginRight: 12 }, // if you add an icon
});
