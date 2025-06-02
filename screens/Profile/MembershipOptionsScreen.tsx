import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useGetSubscriptions } from "../../hooks/useGetSubscriptions";
import { UserAPI } from "../../APIs/UserAPI";

const planFeatures = {
  Gold: {
    price: "139 DKK / month",
    included: ["Shampoo", "Drying", "Brush washing", "High-pressure flushing", "Wheel wash", "Rinsing wax"],
    excluded: ["Undercarriage wash", "Polishing", "Insect repellent", "Degreasing", "Foam Splash", "Extra drying"],
  },
  Premium: {
    price: "169 DKK / month",
    included: [
      "Shampoo", "Drying", "Brush washing", "High-pressure flushing", "Wheel wash",
      "Rinsing wax", "Undercarriage wash*", "Polishing"
    ],
    excluded: ["Insect repellent", "Degreasing", "Foam Splash", "Extra drying"],
  },
  Brilliant: {
    price: "199 DKK / month",
    included: [
      "Shampoo", "Drying", "Brush washing", "High-pressure flushing", "Wheel wash",
      "Rinsing wax", "Undercarriage wash*", "Polishing", "Insect repellent",
      "Degreasing", "Foam Splash", "Extra drying"
    ],
    excluded: [],
  },
};

export default function MembershipOptionsScreen() {
  const user = useSelector((state: RootState) => state.user.user_profile);
  const token = useSelector((state: RootState) => state.user.token);
  const { data: subscriptions, isLoading, isError } = useGetSubscriptions();

  const changeMembership = async (subscriptionId: string) => {
    console.log("Changing membership to:", subscriptionId);
    try {

      const response = await UserAPI.updateUserSuscription(subscriptionId, token);
      console.log("Backend response:", response);
      // TODO: Dispatch Redux update or local state if needed
    } catch (error) {
      console.error("Failed to update user subscription:", error);
    }
  };

  const renderPlan = (index: number, label: string) => {
    if (!subscriptions || !subscriptions[index]) return null;

    const { tierName } = subscriptions[index];
    const { price, included, excluded } =   planFeatures[label];
    const isActive = user.subscription === label;

    return (
      <View key={label} style={styles.card}>
        <Text style={styles.planTitle}>{tierName}</Text>
        <Text style={styles.price}>{price}</Text>

        <View style={styles.features}>
          {included.map((f) => (
            <Text key={f} style={styles.featureRow}>
              <Text style={styles.check}>✔︎ </Text>
              <Text style={styles.featureText}>{f}</Text>
            </Text>
          ))}
          {excluded.map((f) => (
            <Text key={f} style={[styles.featureRow, styles.disabled]}>
              <Text style={styles.checkDisabled}>✔︎ </Text>
              <Text style={styles.featureText}>{f}</Text>
            </Text>
          ))}
        </View>

        {isActive ? (
          <View style={styles.activeBadge}>
            <Text style={styles.activeText}>✓ Active</Text>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.actionRibbon}
            onPress={() => changeMembership(subscriptions[index].id)}
          >
            <Text style={styles.actionText}>Become a member</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        {["Gold", "Premium", "Brilliant"].map((label, index) =>
          renderPlan(index, label)
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff", width: "100%" },
  container: { padding: 20, paddingBottom: 24 },
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
    color: "#06c167",
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
  check: { color: "#06c167" },
  checkDisabled: { color: "#ccc" },
  disabled: { opacity: 0.5 },
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
  },
  activeText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
    transform: [{ skewX: "20deg" }],
  },
  actionRibbon: {
    backgroundColor: "#06c167",
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: "center",
    transform: [{ skewX: "-20deg" }],
    alignSelf: "flex-end",
    position: "absolute",
    right: -7,
    bottom: 0,
  },
  actionText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    transform: [{ skewX: "20deg" }],
  },
});
