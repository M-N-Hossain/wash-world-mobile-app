import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { UserAPI } from "../../APIs/UserAPI";
import { ProfileStackParamList } from "../../Navigation";
import AlertMessage from "../../components/AlertMessage";
import ProfileHeader from "../../components/ProfileHeader";
import ProfileSection from "../../components/ProfileSection";
import { useTokenExpiration } from "../../hooks/useTokenExpiration";
import { updateUserProfile } from "../../redux/userSlice";
import { AppDispatch, RootState } from "../../store/store";

export default function ProfileScreen() {
  type NavigationProp = NativeStackNavigationProp<
    ProfileStackParamList,
    "ProfileScreen"
  >;
  const navigation = useNavigation<NavigationProp>();
  const { checkTokenBeforeAction, handleExpiredToken } = useTokenExpiration();

  const dispatch = useDispatch<AppDispatch>();

  // Check token on component mount
  useEffect(() => {
    const validateToken = async () => {
      await handleExpiredToken();
    };

    validateToken();
  }, []);

  const handleMembershipPress = () => {
    checkTokenBeforeAction(() => {
      navigation.navigate("MembershipOptionsScreen");
    });
  };

  const [openSection, setOpenSection] = useState<string | null>(null);
  const toggleSection = (sectionName: string) => {
    setOpenSection((prev) => (prev === sectionName ? null : sectionName));
  };

  // Get user and token from Redux
  const user = useSelector((state: RootState) => state.user.user_profile);
  const token = useSelector((state: RootState) => state.user.token);

  /*   // Local state initialized empty — will be set from Redux user data
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [licensePlate, setLicensePlate] = useState(""); */

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    licensePlate: "",
  });

  // When Redux user changes, update local state
  useEffect(() => {
    setUserData({
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      email: user.email || "",
      licensePlate: user.licensePlate || "",
    });
  }, [user]);

  // Editing toggle
  const [isEditing, setIsEditing] = useState(false);

  // Alert state
  const [showAlert, setShowAlert] = useState(false);
  const [showError, setShowError] = useState(false);

  const showSuccessAlert = () => {
    setShowAlert(true);
  };

  const showErrorAlert = () => {
    setShowError(true);
  };

  // Function to handle saving user details
  const handleSave = async () => {
    checkTokenBeforeAction(async () => {
      setIsEditing(false);

      const userToUpdateData = {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        licensePlate: userData.licensePlate,
      };

      try {
        // We will add the api call to update user profile directly in the UserAPI file when we merge this branch into dev
        // Call backend update
        const response = await UserAPI.updateUserProfile(token, userToUpdateData);
        setUserData(response); // Update local state with response data
        dispatch(updateUserProfile(response)); // Dispatch action to update Redux store
        // Show success alert
        showSuccessAlert();
      } catch (error) {
        console.error("Failed to update user profile", error);
        showErrorAlert();
      }
    });
  };

  return (
    <ScrollView style={styles.container}>
      <ProfileHeader />
      <View style={styles.profileOptions}>
        {/* USER DETAILS SECTION */}
        <ProfileSection
          title="User details"
          expanded={openSection === "user"}
          onPress={() => toggleSection("user")}
        >
          {isEditing ? (
            <>
              <TextInput
                style={styles.input}
                value={userData.firstName}
                onChangeText={(text) => setUserData({ ...userData, firstName: text })}
                placeholder="First Name"
              />
              <TextInput
                style={styles.input}
                value={userData.lastName}
                onChangeText={(text) => setUserData({ ...userData, lastName: text })}
                placeholder="Last Name"
              />
              <TextInput
                style={styles.input}
                value={userData.email}
                onChangeText={(text) => setUserData({ ...userData, email: text })}
                placeholder="E-mail"
                keyboardType="email-address"
              />

              <TextInput
                style={styles.input}
                value={userData.licensePlate}
                onChangeText={(text) => setUserData({ ...userData, licensePlate: text })}
                placeholder="License plate"
              />
              <TouchableOpacity onPress={handleSave}>
                <View style={styles.saveButton}>
                  <Text style={styles.saveText}>💾 Save</Text>
                </View>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <View style={styles.innerBox}>
                <Text>First Name: {userData.firstName}</Text>
              </View>
              <View style={styles.innerBox}>
                <Text>Last Name: {userData.lastName}</Text>
              </View>
              <View style={styles.innerBox}>
                <Text>E-mail: {userData.email}</Text>
              </View>

              <View style={styles.innerBox}>
                <Text>License plate: {userData.licensePlate}</Text>
              </View>
              <TouchableOpacity onPress={() => setIsEditing(true)}>
                <View style={styles.editButton}>
                  <Text style={styles.editText}>✏️ Edit</Text>
                </View>
              </TouchableOpacity>
            </>
          )}
        </ProfileSection>

        {/* PAYMENT METHOD SECTION */}
        <ProfileSection
          title="Payment method"
          expanded={openSection === "payment"}
          onPress={() => toggleSection("payment")}
        >
          <View style={styles.innerBox}>
            <Text>✔️ Apple Pay</Text>
          </View>
          <View style={styles.innerBox}>
            <Text>MobilePay</Text>
          </View>
          <View style={styles.innerBox}>
            <Text>Betalingsservice</Text>
          </View>
          <View style={styles.innerBox}>
            <Text>➕ Add new method</Text>
          </View>
        </ProfileSection>

        {/* MANAGE MEMBERSHIP */}
        <ProfileSection
          title="Manage membership"
          expanded={openSection === "membership"}
          onPress={() => toggleSection("membership")}
        >
          <View style={styles.innerBox}>
            <Text>Gold membership active</Text>
          </View>
          <View style={styles.innerBox}>
            <Text>Change membership plan</Text>
          </View>
          <View style={styles.innerBox}>
            <Text>Change billing cycle (25% off yearly)</Text>
          </View>
          <View style={styles.innerBox}>
            <Text>Payments history</Text>
          </View>
          <View style={styles.innerBox}>
            <Text style={{ color: "red" }}>Cancel membership</Text>
          </View>
        </ProfileSection>

        {/* SETTINGS */}
        <ProfileSection
          title="Additional settings"
          expanded={openSection === "settings"}
          onPress={() => toggleSection("settings")}
        >
          <View style={styles.innerBox}>
            <Text>Language, notifications, etc.</Text>
          </View>
        </ProfileSection>

        {/* SUPPORT */}
        <ProfileSection
          title="Help & Support"
          expanded={openSection === "support"}
          onPress={() => toggleSection("support")}
        >
          <View style={styles.innerBox}>
            <Text>FAQ, contact form</Text>
          </View>
        </ProfileSection>
      </View>

      {/* Upgrade Membership Button */}
      <TouchableOpacity onPress={handleMembershipPress}>
        <View style={styles.upgradeButton}>
          <Text style={styles.upgradeText}>Upgrade Membership</Text>
        </View>
      </TouchableOpacity>

      {/* Alerts */}
      {showAlert && (
        <AlertMessage
          type="success"
          message="Changes saved successfully!"
          onHide={() => setShowAlert(false)}
        />
      )}
      {showError && (
        <AlertMessage
          type="error"
          message="Failed to save changes."
          onHide={() => setShowError(false)}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    width: "100%",
  },
  profileOptions: {
    padding: 20,
  },
  innerBox: {
    paddingVertical: 20,
    marginVertical: 6,
    borderRadius: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginVertical: 6,
  },
  saveButton: {
    backgroundColor: "#06c167",
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    alignItems: "center",
  },
  saveText: {
    color: "#fff",
    fontWeight: "600",
  },
  editButton: {
    backgroundColor: "#ccc",
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    alignItems: "center",
  },
  editText: {
    color: "#333",
    fontWeight: "600",
  },
  upgradeButton: {
    backgroundColor: "#06c167",
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 40,
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "#198B47",
  },
  upgradeText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});