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
import LocationCard from "../components/NearbyWashCard";
import WashCard from "../components/WashHistoryCard";
import { useGetWashes } from "../hooks/useGetWashes";
import { useTokenExpiration } from "../hooks/useTokenExpiration";
import { HomepageStackParamList } from "../Navigation";
import { RootState } from "../store/store";
import { formatDate } from "../utils/formatDate";

export default function HomePage() {
  type NavigationProp = NativeStackNavigationProp<
    HomepageStackParamList,
    "Homepage"
  >;

  const navigation = useNavigation<NavigationProp>();
  const { checkTokenBeforeAction } = useTokenExpiration();

  const handleLocationPress = () => {
    checkTokenBeforeAction(() => {
      navigation.navigate("Locations");
    });
  };

  const handleHistoryPress = () => {
    checkTokenBeforeAction(() => {
      navigation.navigate("History");
    });
  };

  const user = useSelector((state: RootState) => state.user.user_profile);
  const { isLoading, error, data } = useGetWashes(user.id);

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

        {/* Nearby Wash World */}
        <Text style={styles.sectionTitle}>Nearby Wash World</Text>
        <LocationCard
          name="Wash World Aarhus"
          address="Ringvej Syd 100, Aarhus"
          distance="0,67km"
        />
        <LocationCard
          name="Wash World Aarhus"
          address="Ringvej Syd 100, Aarhus"
          distance="0,67km"
        />
        <View style={styles.linkWrapper}>
          <TouchableOpacity
            style={styles.linkButton}
            onPress={handleLocationPress}
          >
            <Text style={styles.linkText}>See all locations</Text>
            <ArrowUpRight color="#777777" size={30} />
          </TouchableOpacity>
        </View>

        {/* Last Washes */}
        <Text style={styles.sectionTitle}>Last Washes</Text>
        {isLoading && <Text>Loading...</Text>}
        {error && <Text>Error fetching washes: {error.message}</Text>}
        {data &&
          data
            .slice(0, 2)
            .map(
              (wash: {
                wash_id: React.Key;
                wash_location: string;
                wash_date: string;
              }) => (
                <WashCard
                  key={wash.wash_id}
                  name={wash.wash_location}
                  date={formatDate(wash.wash_date)}
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
