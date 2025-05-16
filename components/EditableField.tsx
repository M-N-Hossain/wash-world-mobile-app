import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { Pencil, Check, X } from "lucide-react-native";

interface EditableFieldProps {
  label: string;
  value: string;
  onSave: (newValue: string) => void;
}

export default function EditableField({ label, value, onSave }: EditableFieldProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  const handleSave = () => {
    onSave(inputValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setInputValue(value);
    setIsEditing(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      {isEditing ? (
        <View style={styles.editContainer}>
          <TextInput
            style={styles.input}
            value={inputValue}
            onChangeText={setInputValue}
          />
          <View style={styles.buttons}>
            <TouchableOpacity onPress={handleSave} style={styles.iconButton}>
              <Check size={20} color="#06c167" />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCancel} style={styles.iconButton}>
              <X size={20} color="#ff3333" />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <TouchableOpacity
          style={styles.displayRow}
          onPress={() => setIsEditing(true)}
        >
          <Text style={styles.value}>{value}</Text>
          <Pencil size={16} color="#888" />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    borderBottomColor: "#e0e0e0",
    borderBottomWidth: 1,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  displayRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  value: {
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 8,
    flex: 1,
  },
  editContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  buttons: {
    flexDirection: "row",
    marginLeft: 10,
  },
  iconButton: {
    marginHorizontal: 5,
  },
});
