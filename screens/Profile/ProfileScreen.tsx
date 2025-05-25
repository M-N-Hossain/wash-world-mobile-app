import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import ProfileHeader from "../../components/ProfileHeader";
import ProfileSection from "../../components/ProfileSection";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { ProfileStackParamList } from "../../Navigation";
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

  // User detail states
  const [fullName, setFullName] = useState("John Super Doe");
  const [email, setEmail] = useState("johnSuper@doe.com");
  const [phone, setPhone] = useState("+45 12 34 56 78");
  const [licensePlate, setLicensePlate] = useState("AD 87 123");

  // Editing toggle
  const [isEditing, setIsEditing] = useState(false);

  // Alert state
  const [showAlert, setShowAlert] = useState(false);
  const showSuccessAlert = () => {
    setShowAlert(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    showSuccessAlert();
    // todo: send all updated values to backend
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
                value={fullName}
                onChangeText={setFullName}
                placeholder="Full Name"
              />
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="E-mail"
                keyboardType="email-address"
              />
              <TextInput
                style={styles.input}
                value={phone}
                onChangeText={setPhone}
                placeholder="Phone number"
                keyboardType="phone-pad"
              />
              <TextInput
                style={styles.input}
                value={licensePlate}
                onChangeText={setLicensePlate}
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
                <Text>Full Name: {fullName}</Text>
              </View>
              <View style={styles.innerBox}>
                <Text>E-mail: {email}</Text>
              </View>
              <View style={styles.innerBox}>
                <Text>Phone number: {phone}</Text>
              </View>
              <View style={styles.innerBox}>
                <Text>License plate: {licensePlate}</Text>
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

      {/* Alert */}
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
