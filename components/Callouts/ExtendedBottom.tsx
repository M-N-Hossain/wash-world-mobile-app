import { StyleSheet, View } from "react-native";
import FakeButton from "../FakeButton";
import BasicButton from "../basicButton";
import InfoBox from "./InfoBoz";

type ExtendedBottomProps = {
  open_hours: string;
  handleBeginWash: () => void;
};

export default function ExtendedBottom({
  open_hours,
  handleBeginWash,
}: ExtendedBottomProps) {
  return (
    <View style={styles.container}>
      <View style={styles.InfoBox}>
        <InfoBox description="Opening hours" info={open_hours} />
        <InfoBox description="Waiting time" info="12 min" />
      </View>
      <BasicButton buttonText="Start Washing" handleOnPress={handleBeginWash} />
      <View style={styles.bottomButtons}>
        <FakeButton ButtonText="open in Maps" />
        <FakeButton ButtonText="Notify if less busy" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    backgroundColor: "#FFFFFF",
    width: "100%",
    alignItems: "center",
    paddingTop: 20,
    bottom: 0,
    paddingBottom: 20,
    gap: 20,
  },
  bottomButtons: {
    justifyContent: "space-between",
    flexDirection: "row",
    gap: 20,
  },
  InfoBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
});
