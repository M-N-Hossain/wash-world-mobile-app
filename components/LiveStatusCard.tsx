import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";

interface Props {
  status: string;
  location: string;
  timer: string;
}

export default function LiveStatusCard({ 
  status = "Your car is being washed", 
  location = "Industrial Park 6, 2750 Ballerup", 
  timer = "03:27" 
}: Props) {
  return (
    <View style={styles.container}>
      {/* Left section with status info */}
      <View style={styles.infoSection}>
        <Text style={styles.statusText}>{status}</Text>
        <Text style={styles.locationText}>{location}</Text>
        <Text style={styles.timerText}>{timer}</Text>
      </View>
      
      {/* Right section with car image */}
      <View style={styles.imageSection}>
        <View style={styles.circleContainer}>
          {/* Car illustration image */}
          <Image 
            source={require('../assets/homePage/car-illustration.png')} 
            style={styles.carImage}
            resizeMode="contain"
          />
        </View>
        <TouchableOpacity>
          <Text style={styles.viewDetailsText}>View details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: 20,
  },
  infoSection: {
    flex: 3,
    backgroundColor: "#1E1E1E",
    padding: 20,
    justifyContent: "space-between",
  },
  statusText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 24,
    marginBottom: 12
  },
  locationText: {
    color: "#FFFFFF",
    fontSize: 16,
    marginBottom: 20
  },
  timerText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 46,
  },
  imageSection: {
    flex: 2,
    backgroundColor: "#0AC267",
    padding: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  circleContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 4,
    borderColor: "#000000",
    overflow: "hidden"
  },
  carImage: {
    width: 90,
    height: 90
  },
  viewDetailsText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 18,
  }
});