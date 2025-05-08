import { Dimensions, Image, StyleSheet, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { useLocations } from "../hooks/useLocations";

// Using percentage for height and width is not recommended in this case
// because the map needs to be a fixed size to work properly. Instead, we use Dimensions API to get the window size.
// This allows us to set the map size dynamically based on the device's screen size.
const { height, width } = Dimensions.get("window");

export default function Map() {
  const initialRegion = {
    latitude: 55.6761, // Latitude of Copenhagen
    longitude: 10.5683, // Longitude of Copenhagen
    latitudeDelta: 6, // Zoom level
    longitudeDelta: 6, // Zoom level
  };

  // This hook is used to fetch the locations from the API we where provided from Wash World.
  const locations = useLocations();

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={initialRegion}
      >
        {locations.map((location, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: parseFloat(location.coordinates.y),
              longitude: parseFloat(location.coordinates.x),
            }}
            title={location.name}
            description={location.address}
            image={require("../assets/washworld-marker.png")}
          />
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: width,
    height: height - 120, // The height of the header is 120px, so we subtract that from the total height
  },
});
