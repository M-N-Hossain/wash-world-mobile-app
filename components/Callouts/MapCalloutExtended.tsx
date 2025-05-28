import { StyleSheet, View } from "react-native";
import ExtendedTop from "./ExtendedTop";
import ExtendedBottom from "./ExtendedBottom";
import { useRegisterWash } from "../../hooks/useRegisterWash";
import { WashEntity } from "../../entities/RegisterWash";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { UserAPI } from "../../APIs/UserAPI";
import { useEffect, useState } from "react";

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
  const handleBeginWash = () => {
    const wash_location = name;
    const fk_user_id = user.id;
    const fk_feedback_id = undefined;
    const reward = false;
    const fk_reward_id = undefined;

    const washEntity: WashEntity = new WashEntity(
      wash_location,
      fk_user_id,
      fk_feedback_id,
      reward,
      fk_reward_id
    );

    registerWash(washEntity, {
      onSuccess: () => {
        console.log("Wash registered successfully");
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
