// src/screens/MembershipOptionsScreen.tsx
import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";

export default function MembershipOptionsScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Back header stub */}
        <Text style={styles.back}>{"< Back"}</Text>

        {/* Gold Plan */}
        <View style={styles.card}>
          <Text style={styles.planTitle}>Gold</Text>
          <Text style={styles.price}>139 DKK / month</Text>

          <View style={styles.features}>
            {[
              "Shampoo",
              "Drying",
              "Brush washing",
              "High-pressure flushing",
              "Wheel wash",
              "Rinsing wax",
            ].map((f) => (
              <Text key={f} style={styles.featureRow}>
                <Text style={styles.check}>✔︎ </Text>
                <Text style={styles.featureText}>{f}</Text>
              </Text>
            ))}

            {/* disabled features */}
            {[
              "Undercarriage wash",
              "Polishing",
              "Insect repellent",
              "Degreasing",
              "Foam Splash",
              "Extra drying",
            ].map((f) => (
              <Text key={f} style={[styles.featureRow, styles.disabled]}>
                <Text style={styles.checkDisabled}>✔︎ </Text>
                <Text style={styles.featureText}>{f}</Text>
              </Text>
            ))}

            {/* Active Plan Badge */}
            <View style={styles.activeBadge}>
              <Text style={styles.activeText}>✓ Active</Text>
            </View>
          </View>
        </View>

        {/* Premium Plan */}
        <View style={styles.card}>
          <Text style={styles.planTitle}>Premium</Text>
          <Text style={styles.price}>169 DKK / month</Text>

          <View style={styles.features}>
            {[
              "Shampoo",
              "Drying",
              "Brush washing",
              "High-pressure flushing",
              "Wheel wash",
              "Rinsing wax",
              "Undercarriage wash*",
              "Polishing",
            ].map((f) => (
              <Text key={f} style={styles.featureRow}>
                <Text style={styles.check}>✔︎ </Text>
                <Text style={styles.featureText}>{f}</Text>
              </Text>
            ))}

            {/* disabled features */}
            {[
              "Insect repellent",
              "Degreasing",
              "Foam Splash",
              "Extra drying",
            ].map((f) => (
              <Text key={f} style={[styles.featureRow, styles.disabled]}>
                <Text style={styles.checkDisabled}>✔︎ </Text>
                <Text style={styles.featureText}>{f}</Text>
              </Text>
            ))}
          </View>

          <TouchableOpacity style={styles.actionRibbon}>
            <Text style={styles.actionText}>Become a member</Text>
          </TouchableOpacity>
        </View>

        {/* Brilliant Plan */}
        <View style={styles.card}>
          <Text style={styles.planTitle}>Brilliant / All inclusive</Text>
          <Text style={styles.price}>199 DKK / month</Text>

          <View style={styles.features}>
            {[
              "Shampoo",
              "Drying",
              "Brush washing",
              "High-pressure flushing",
              "Wheel wash",
              "Rinsing wax",
              "Undercarriage wash*",
              "Polishing",
              "Insect repellent",
              "Degreasing",
              "Foam Splash",
              "Extra drying",
            ].map((f) => (
              <Text key={f} style={styles.featureRow}>
                <Text style={styles.check}>✔︎ </Text>
                <Text style={styles.featureText}>{f}</Text>
              </Text>
            ))}
          </View>

          <TouchableOpacity style={styles.actionRibbon}>
            <Text style={styles.actionText}>Become a member</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff", width: "100%" },
  container: {
    padding: 20,
    paddingBottom: 24,
  },
  back: {
    fontSize: 16,
    color: "#000",
    marginBottom: 12,
    marginLeft: 4,
  },

  card: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    marginVertical: 6,
    overflow: "hidden",
    width: "100%",
  },
  planTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#4CAF50",
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  price: {
    fontSize: 32,
    fontWeight: "700",
    color: "#000",
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  features: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  featureRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
  },
  featureText: {
    fontSize: 14,
    color: "#000",
  },
  check: {
    color: "#4CAF50",
  },
  checkDisabled: {
    color: "#ccc",
  },
  disabled: {
    opacity: 0.5,
  },

  activeBadge: {
    backgroundColor: "#999999",
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: "center",
    transform: [{ skewX: "-20deg" }],
    alignSelf: "flex-end",
    position: "absolute",
    right: -7,
    bottom: 0,
    marginTop: 0,
  },
  activeText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
    transform: [{ skewX: "20deg" }],
  },

  actionRibbon: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: "center",
    // create the trapezoid cut on the left
    transform: [{ skewX: "-20deg" }],

    alignSelf: "flex-end",
    position: "absolute",
    right: -7,
    bottom: 0,
    marginTop: 0,
  },

  actionText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    transform: [{ skewX: "20deg" }],
  },
});
