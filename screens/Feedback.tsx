import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { Star } from "lucide-react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useRegisterFeedback } from "../hooks/useRegisterFeedback";
import { Feedback } from "../entities/RegisterFeedback";
import { washStackParamList } from "../Navigation";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const reasonsList = [
  "Location",
  "Speed",
  "Price",
  "Staff",
  "Cleanliness",
  "Other",
];
type FeedbackScreenRouteParams = {
  washLocation: string;
  washId: string;
};

const FeedbackScreen = () => {
  type NavigationProp = NativeStackNavigationProp<
    washStackParamList,
    "StartWashingScreen"
  >;
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute();
  const { washLocation, washId } = (route.params ||
    {}) as FeedbackScreenRouteParams;

  const [rating, setRating] = useState(0);
  const [selectedReason, setSelectedReason] = useState<string>("");
  const [description, setDescription] = useState("");

  const user = useSelector((state: RootState) => state.user.user_profile);
  const userId = user.id;

  const toggleReason = (reason: string) => {
    setSelectedReason((prev) => (prev === reason ? "" : reason));
  };

  const { mutate: registerFeedback, isPending, error } = useRegisterFeedback();

  const handleSubmit = () => {
    const feedback: Feedback = new Feedback(
      selectedReason,
      description,
      String(rating),
      String(userId),
      String(washId),
      washLocation
    );

    registerFeedback(feedback, {
      onSuccess: () => {
        Alert.alert("Thank you!", "Your feedback has been submitted.");
        navigation.reset({
          index: 0,
          routes: [{ name: "Locations" }], // Replace "Homepage" with the desired screen
        });
      },
      onError: () => {
        Alert.alert(
          "There has been a problem with your feedback report, please try again later"
        );
        console.error("Error registering feedback:", error);
      },
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Your wash is now completed!</Text>
      <Text style={styles.subtitle}>
        Thanks for using Wash World! How was your experience?
      </Text>

      <View style={styles.stars}>
        {[1, 2, 3, 4, 5].map((num) => (
          <TouchableOpacity key={num} onPress={() => setRating(num)}>
            <Star
              fill={rating >= num ? "#0ac267" : "none"}
              color={rating >= num ? "#0ac267" : "#666"}
              strokeWidth={2}
              size={32}
            />
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.reasonsContainer}>
        {reasonsList.map((reason) => (
          <TouchableOpacity
            key={reason}
            style={[
              styles.reasonButton,
              selectedReason === reason && styles.reasonButtonSelected,
            ]}
            onPress={() => toggleReason(reason)}
          >
            <Text
              style={[
                styles.reasonText,
                selectedReason === reason && styles.reasonTextSelected,
              ]}
            >
              {reason}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TextInput
        style={styles.commentBox}
        placeholder="Anything you would like to share?"
        multiline
        value={description}
        onChangeText={setDescription}
      />

      <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
        <Text style={styles.submitText}>Submit feedback</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.skipBtn}>
        <Text style={styles.skipText}>Skip Feedback</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.reportText}>
          Encountered a problem?{" "}
          <Text style={styles.reportLink}>Report the issue</Text>
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    padding: 24,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 32,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#444",
    textAlign: "center",
    marginBottom: 24,
  },
  stars: {
    flexDirection: "row",
    marginBottom: 24,
  },
  reasonsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 12,
    marginBottom: 24,
  },
  reasonButton: {
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    margin: 4,
  },
  reasonButtonSelected: {
    backgroundColor: "#0ac26720",
    borderColor: "#0ac267",
  },
  reasonText: {
    fontSize: 14,
    color: "#333",
  },
  reasonTextSelected: {
    color: "#0ac267",
    fontWeight: "600",
  },
  commentBox: {
    width: "100%",
    minHeight: 80,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    textAlignVertical: "top",
    marginBottom: 24,
  },
  submitBtn: {
    width: "100%",
    backgroundColor: "#0ac267",
    padding: 16,
    borderBottomColor: "#198B47",
    borderBottomWidth: 2,
    alignItems: "center",
    marginBottom: 12,
  },
  submitText: {
    color: "#fff",
    fontWeight: "bold",
  },
  skipBtn: {
    width: "100%",
    backgroundColor: "#f0f0f0",
    padding: 16,

    alignItems: "center",
    marginBottom: 16,
  },
  skipText: {
    color: "#444",
  },
  reportText: {
    fontSize: 14,
    color: "#222",
    textAlign: "center",
  },
  reportLink: {
    color: "#0ac267",
    fontWeight: "600",
    textDecorationLine: "underline",
  },
});
export default FeedbackScreen;
