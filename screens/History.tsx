import { ScrollView, StyleSheet, Text, View } from "react-native";
import WashCard from "../components/WashHistoryCard";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useGetWashes } from "../hooks/useGetWashes";
import { formatDate } from "../utils/formatDate";
import { useNavigation } from "@react-navigation/native";
import { HomepageStackParamList } from "../Navigation";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export default function History() {
  type NavigationProp = NativeStackNavigationProp<
    HomepageStackParamList,
    "FeedbackScreen"
  >;

  const user = useSelector((state: RootState) => state.user.user_profile);
  const { isLoading, error, data } = useGetWashes(user.id);
  const navigation = useNavigation<NavigationProp>();

  const handleReportFeedback = (washLocation: string, id: unknown) => {
    console.log("hi from");
    navigation.navigate("FeedbackScreen", { washLocation: washLocation, washId: id });
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <View style={{ marginBottom: 20 }}>
          <Text style={styles.introText}>
            This is the full list of all your visits
          </Text>
          <Text style={styles.introText}>
            You can give feedback on each wash if you press the "Report an issue
            button"
          </Text>
        </View>
        {isLoading && <Text>Loading...</Text>}
        {error && <Text>Error: {error.message}</Text>}
        {data &&
          data.map(
            (wash: {
              id: React.Key;
              washLocation: string;
              washDatetime: string;
            }) => (
              <WashCard
                key={wash.id}
                name={wash.washLocation}
                date={formatDate(wash.washDatetime)}
                onReportIssue={() =>
                  handleReportFeedback(wash.washLocation, wash.id)
                }
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
