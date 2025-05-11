import React from "react";
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Header from "../components/Header";
import LocationCard from "../components/NearbyWashCard";
import WashCard from "../components/WashHistoryCard";
import { ArrowUpRight, MessageCircleHeart } from "lucide-react-native";
import LiveStatusCard from "../components/LiveStatusCard";

export default function HomePage() {
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
          <TouchableOpacity style={styles.linkButton}>
            <Text style={styles.linkText}>See all locations</Text>
            <ArrowUpRight color="#777777" size={30} />
          </TouchableOpacity>
        </View>

        {/* Last Washes */}
        <Text style={styles.sectionTitle}>Last Washes</Text>
        <WashCard 
          name="Wash World Lyngby" 
          date="April 25th – 2025" />
        <WashCard 
          name="Wash World Lyngby" 
          date="April 25th – 2025" />
        
        <View style={styles.linkWrapper}>
          <TouchableOpacity style={styles.linkButton}>
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
    gap: 5
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