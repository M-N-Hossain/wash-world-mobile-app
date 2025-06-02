import { StyleSheet, View } from "react-native";
import ExtendedTop from "./ExtendedTop";
import ExtendedBottom from "./ExtendedBottom";
import { useRegisterWash } from "../../hooks/useRegisterWash";
import { WashEntity } from "../../entities/RegisterWash";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { washStackParamList } from "../../Navigation";
import { useNavigation } from "@react-navigation/native";

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
  type NavigationProp = NativeStackNavigationProp<
    washStackParamList,
    "StartWashingScreen"
  >;
  const navigation = useNavigation<NavigationProp>();
  const user = useSelector((state: RootState) => state.user.user_profile);

  const { mutate: registerWash, isPending, error } = useRegisterWash();

  // Function to handle registering a wash
  const handleBeginWash = () => {
    const wash_location = name;
    const fk_user_id = user.id;
    const reward = false;
    const points_gained = 50;
    const fk_reward_id = undefined;

    const washEntity: WashEntity = new WashEntity(
      wash_location,
      fk_user_id,
      reward,
      points_gained,
      fk_reward_id
    );

    registerWash(washEntity, {
      onSuccess: (response) => {
        console.log("Wash registered successfully", response);
        const washId =
          response?.data?.washId ||
          response?.data?.id ||
          response?.washId ||
          response?.id;

        navigation.navigate("StartWashingScreen", {
          washId,
          washLocation: wash_location,
          licensePlate: user.licensePlate,
        });
      },
      onError: (error) => {
        console.error("Error registering wash:", error);
      },
    });
  };

  return (
    <View style={styles.container}>
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

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    alignItems: "center",
    // backgroundColor: "#FFFFFF",
    width: "100%",
    height: "100%",
  },
});
