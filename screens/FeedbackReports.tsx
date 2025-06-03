import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useGetFeedbackReports } from "../hooks/useGetFeedbackReports";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import FeedbackReportCardXL from "../components/FeedbackReportCardXL";

export default function FeedbackReportsScreen() {
  const user = useSelector((state: RootState) => state.user.user_profile);
  const {
    isLoading: feedbackLoading,
    error: feedbackError,
    data: feedbackData,
  } = useGetFeedbackReports(user.id);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <View style={{ marginBottom: 20 }}>
          <Text style={styles.introText}>
            This is the full list of all your feedback reports
          </Text>
        </View>
        {feedbackLoading && <Text>Loading...</Text>}
        {feedbackError && (
          <Text>Error fetching feedback reports: {feedbackError.message}</Text>
        )}
        {feedbackData &&
          feedbackData
          .reverse()
          .map(
            (feedbackReport: {
              id: React.Key;
              rating: string;
              title: string;
              description: string;
            }) => (
              <FeedbackReportCardXL
                key={feedbackReport.id}
                rating={feedbackReport.rating}
                title={feedbackReport.title}
                description={feedbackReport.description}
              />
            )
          )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 100,
    width: "100%",
  },
  introText: {
    fontSize: 16,
    color: "black",
    textAlign: "center",
  },
});
