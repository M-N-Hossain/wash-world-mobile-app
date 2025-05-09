import {
  Dimensions,
  Image,
  StyleSheet,
  TextInput,
  View,
  Keyboard,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { useLocations } from "../hooks/useLocations";
import { useState } from "react";
import MapCallout from "./MapCallout";

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

  //Search logic
  const [search, setSearch] = useState("");

  // Filter the locations based on the search input
  // The filter function checks if the search input is included in either the name or address of the location.
  const filteredLocations = locations.filter((location) => {
    const lowerCaseSearch = search.toLowerCase();
    return (
      location.name.toLowerCase().includes(lowerCaseSearch) ||
      location.address.toLowerCase().includes(lowerCaseSearch)
    );
  });

  // Callout logic
  const [selectedLocation, setSelectedLocation] = useState<
    null | (typeof locations)[0]
  >(null);

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search location"
          value={search}
          onChangeText={setSearch}
        />
      </View>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={initialRegion}
        // when you press on the map, it will close the callout and set the selected location to null
        onPress={() => setSelectedLocation(null)}
      >
        {filteredLocations.map((location, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: parseFloat(location.coordinates.y),
              longitude: parseFloat(location.coordinates.x),
            }}
            // Setting the title and description to empty strings to prevent the default callout from showing
            title=""
            description=""
            image={
              // Change image when you select a location
              selectedLocation?.uid === location.uid
                ? require("../assets/location/washworld-marker-selected.png")
                : require("../assets/location/washworld-marker.png")
            }
            onPress={() => {
              setSelectedLocation(location);
              Keyboard.dismiss();
              setSearch("");
            }}
            // This is used to prevent the marker from re-rendering when the state changes
            tracksViewChanges={false}
          />
        ))}
      </MapView>
      {selectedLocation && (
        <View style={styles.callout}>
          <MapCallout
            address={selectedLocation.name}
            open_hours={selectedLocation.open_hours}
            name={selectedLocation.address}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: width,
    height: height - 210, // The height of the header is 120px and the height of the searchBar is 80, so we subtract that from the total height
  },
  searchBar: {
    backgroundColor: "#FFFFFF",
    height: 90,
    justifyContent: "center",
    alignItems: "center",
  },
  searchInput: {
    backgroundColor: "#F3F3F3",
    width: "90%",
    borderRadius: 18,
    padding: 20,
  },
  callout: {
    alignItems: "center",
  },
});
