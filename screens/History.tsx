import { ScrollView, StyleSheet, Text, View } from "react-native";
import WashCard from "../components/WashHistoryCard";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useGetWashes } from "../hooks/useGetWashes";
import { formatDate } from "../utils/formatDate";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { WashHistoryStackParamList } from "../Navigation";

export default function History() {
  const user = useSelector((state: RootState) => state.user.user_profile);
  const { isLoading, error, data } = useGetWashes(user.id);

  type NavigationProp = NativeStackNavigationProp<
    WashHistoryStackParamList,
    "History"
  >;
  const navigation = useNavigation<NavigationProp>();

  const handleFeedback = (washId: string) => {
    // Navigate to feedback screen with the washId
    // navigation.navigate("Feedback", { washId });
    console.log(`Report an issue for wash ID: ${washId}`);
    navigation.navigate("Feedback");
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
