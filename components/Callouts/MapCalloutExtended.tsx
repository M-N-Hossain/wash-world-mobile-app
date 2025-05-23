import { StyleSheet, Text, View } from "react-native";
import ExtendedTop from "./ExtendedTop";
import ExtendedBottom from "./ExtendedBottom";

type MapCalloutExtendedProps = {
  name: string;
  address: string;
  open_hours: string;
  handleBackPress: () => void;
};

export default function MapCalloutExtended({
  name,
  address,
  open_hours,
  handleBackPress,
}: MapCalloutExtendedProps) {
  const handleBeginWash = () => {
    console.log("Begin wash");
  };

  return (
    <View>
      <ExtendedTop
        address={address}
        name={name}
        handleBackPress={handleBackPress}
      />
      <ExtendedBottom
        handleBeginWash={handleBeginWash}
        open_hours={open_hours}
      />
    </View>
  );
}
