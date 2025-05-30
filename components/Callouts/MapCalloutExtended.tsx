import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import { useRegisterWash } from "../../hooks/useRegisterWash";
import { RootState } from "../../store/store";
import ExtendedBottom from "./ExtendedBottom";
import ExtendedTop from "./ExtendedTop";

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
  const user = useSelector((state: RootState) => state.user.user_profile);

  const { mutate: registerWash, isPending, error } = useRegisterWash();

  // Function to handle registering a wash
  const handleWashRegister = async () => {
    try {
      await registerWash({
        userId: user.id,
        washLocation: name,
      });
      setSuccessMessage("Wash registered successfully!");
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (error) {
      setErrorMessage("Failed to register wash");
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }
  };

  return (
    <View style={styles.container}>
      <ExtendedTop
        address={address}
        name={name}
        handleBackPress={handleBackPress}
      />
      <ExtendedBottom
        handleBeginWash={handleWashRegister}
        open_hours={open_hours}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    alignItems: "center",
    // backgroundColor: "#FFFFFF",
    width: "100%",
    height: "100%",
  },
});
