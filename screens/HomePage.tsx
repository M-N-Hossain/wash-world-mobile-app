import React from "react";
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Header from "../components/Header";
import LocationCard from "../components/LocationCard";
import WashCard from "../components/WashHistoryCard";
import { MessageCircleHeart } from "lucide-react-native";

export default function HomePage() {
  return (
    <View style={styles.container}>
      <Header />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
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
          <TouchableOpacity>
            <Text style={styles.linkText}>See all locations ↗</Text>
          </TouchableOpacity>
        </View>

        {/* Last Washes */}
        <Text style={styles.sectionTitle}>Last Washes</Text>
        <WashCard name="Wash World Lyngby" date="April 25th – 2025" />
        <WashCard name="Wash World Lyngby" date="April 25th – 2025" />
        <View style={styles.linkWrapper}>
          <TouchableOpacity>
            <Text style={styles.linkText}>See full history ↗</Text>
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
  linkText: {
    color: "#777777",
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
