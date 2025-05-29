import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ArrowUpRight, MessageCircleHeart } from "lucide-react-native";
import React, { useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import LiveStatusCard from "../components/LiveStatusCard";
import WashCard from "../components/WashHistoryCard";
import { useGetWashes } from "../hooks/useGetWashes";
import { useTokenExpiration } from "../hooks/useTokenExpiration";
import { HomepageStackParamList } from "../Navigation";
import { RootState } from "../store/store";
import { formatDate } from "../utils/formatDate";
import FeedbackReportCard from "../components/FeedbackReportCard";
import { useGetFeedbackReports } from "../hooks/useGetFeedbackReports";

export default function HomePage() {
  type NavigationProp = NativeStackNavigationProp<
    HomepageStackParamList,
    "Homepage"
  >;

  const navigation = useNavigation<NavigationProp>();
  const { checkTokenBeforeAction } = useTokenExpiration();

  const handleFeedbackPress = () => {
    // console.log("See all feedback reports");
    checkTokenBeforeAction(() => {
      navigation.navigate("FeedbackReportsScreen");
    });
  };

  const handleHistoryPress = () => {
    checkTokenBeforeAction(() => {
      navigation.navigate("History");
    });
  };

  const user = useSelector((state: RootState) => state.user.user_profile);
  const {
    isLoading: washesLoading,
    error: washesError,
    data: washesData,
  } = useGetWashes(user.id);
  const {
    isLoading: feedbackLoading,
    error: feedbackError,
    data: feedbackData,
  } = useGetFeedbackReports(user.id);

  // Check token on component mount
  useEffect(() => {
    const validateToken = async () => {
      await checkTokenBeforeAction(() => {
        console.log("Token is valid on HomePage mount");
      });
    };

    validateToken();
  }, []);

  return (
    <View style={styles.container}>
      <Header />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Live Status Card */}
        <Text style={styles.sectionTitle}>Live Status</Text>
        <LiveStatusCard
          status="Your car is being washed"
          location="Industrial Park 6, 2750 Ballerup"
          timer="03:27"
        />

        {/* Last Washes */}
        <Text style={styles.sectionTitle}>Last Washes</Text>
        {washesLoading && <Text>Loading...</Text>}
        {washesError && (
          <Text>Error fetching washes: {washesError.message}</Text>
        )}
        {washesData &&
          washesData
            .slice(0, 2)
            .map(
              (wash: {
                id: React.Key;
                washLocation: string;
                washDatetime: string;
              }) => (
                <WashCard
                  key={wash.id}
                  name={wash.washLocation}
                  date={formatDate(wash.washDatetime)}
                />
              )
            )}

        <View style={styles.linkWrapper}>
          <TouchableOpacity
            style={styles.linkButton}
            onPress={handleHistoryPress}
          >
            <Text style={styles.linkText}>See full history</Text>
            <ArrowUpRight color="#777777" size={30} />
          </TouchableOpacity>
        </View>

        {/* Feedback reports */}
        <Text style={styles.sectionTitle}>Your feedback reports</Text>
        {feedbackLoading && <Text>Loading...</Text>}
        {feedbackError && (
          <Text>Error fetching feedback reports: {feedbackError.message}</Text>
        )}
        {feedbackData &&
          feedbackData
            .slice(0, 2)
            .map(
              (feedbackReport: {
                id: React.Key;
                rating: string;
                title: string;
              }) => (
                <FeedbackReportCard
                  key={feedbackReport.id}
                  rating={feedbackReport.rating}
                  title={feedbackReport.title}
                />
              )
            )}
        <View style={styles.linkWrapper}>
          <TouchableOpacity
            style={styles.linkButton}
            onPress={handleFeedbackPress}
          >
            <Text style={styles.linkText}>See all reports</Text>
            <ArrowUpRight color="#777777" size={30} />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Floating Chat Icon */}
      <TouchableOpacity style={styles.chatButton}>
        <MessageCircleHeart color="#FF3B30" size={40} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 100,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#1E1E1E",
  },
  linkWrapper: {
    alignItems: "flex-end",
    marginBottom: 24,
  },
  linkButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  linkText: {
    color: "#777777",
    fontSize: 16,
    fontWeight: "500",
    textDecorationLine: "underline",
  },
  chatButton: {
    position: "absolute",
    bottom: 24,
    right: 24,
    backgroundColor: "#FFFFFF",
    padding: 12,
    borderRadius: 30,
    elevation: 4,
  },
});
