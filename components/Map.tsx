import { Dimensions, StyleSheet, View } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

// Using percentage for height and width is not recommended in this case
// because the map needs to be a fixed size to work properly. Instead, we use Dimensions API to get the window size.
// This allows us to set the map size dynamically based on the device's screen size.
const { height, width } = Dimensions.get("window");

export default function Map() {
  const initialRegion = {
    latitude: 55.6761, // Latitude of Copenhagen
    longitude: 12.5683, // Longitude of Copenhagen
    latitudeDelta: 0.0922, // Zoom level
    longitudeDelta: 0.0421, // Zoom level
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={initialRegion}
      ></MapView>
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
