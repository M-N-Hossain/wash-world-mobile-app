import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import ProfileHeader from "../../components/ProfileHeader";
import ProfileSection from "../../components/ProfileSection";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { ProfileStackParamList } from "../../Navigation";
import EditableField from "../../components/EditableField";
import AlertMessage from "../../components/AlertMessage";

export default function ProfileScreen() {
  type NavigationProp = NativeStackNavigationProp<
    ProfileStackParamList,
    "ProfileScreen"
  >;
  const navigation = useNavigation<NavigationProp>();

  const handleMembershipPress = () => {
    navigation.navigate("MembershipOptionsScreen");
  };

  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (sectionName: string) => {
    setOpenSection((prev) => (prev === sectionName ? null : sectionName));
  };

  {/* states for the editable inputs */}
  const [fullName, setFullName] = useState("John Super Doe");
  const [email, setEmail] = useState("johnSuper@doe.com");
  const [phone, setPhone] = useState("+45 12 34 56 78");
  const [licensePlate, setLicensePlate] = useState("AD 87 123");

  // Alert state
  const [showAlert, setShowAlert] = useState(false);
  const showSuccessAlert = () => {
    setShowAlert(true);
  };

  return (
    <ScrollView style={styles.container}>
      <ProfileHeader />
      <View style={styles.profileOptions}>
        <ProfileSection
          title="User details"
          expanded={openSection === "user"}
          onPress={() => toggleSection("user")}
        >
            <EditableField 
              label="Full Name" 
              value={fullName} 
              onSave={(newValue) => {
                setFullName(newValue);
                showSuccessAlert();
              }}
            />
            <EditableField
              label="E-mail"
              value={email}
              onSave={(newValue) => {
                setEmail(newValue);
                showSuccessAlert();
              }
              }
            />          
            <EditableField
              label="Phone number"
              value={phone}
              onSave={(newValue) => {
                setPhone(newValue);
                showSuccessAlert();
              }
              }
            />          
            <EditableField
              label="License plate"
              value={licensePlate}
              onSave={(newValue) => {
                setLicensePlate(newValue);
                showSuccessAlert();
              }
              }
            />          
        </ProfileSection>

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

        <ProfileSection
          title="Additional settings"
          expanded={openSection === "settings"}
          onPress={() => toggleSection("settings")}
        >
          <View style={styles.innerBox}>
            <Text>Language, notifications, etc.</Text>
          </View>
        </ProfileSection>

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

      <TouchableOpacity onPress={handleMembershipPress}>
        <View style={styles.upgradeButton}>
          <Text style={styles.upgradeText}>Upgrade Membership</Text>
        </View>
      </TouchableOpacity>

      {/* Alert message */}
      {showAlert && (
        <AlertMessage
          type="success"
          message="Changes saved successfully!"
          onHide={() => setShowAlert(false)}
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
