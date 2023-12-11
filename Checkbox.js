import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

function Checkbox({ label, checked, onToggle }) {
  return (
    <TouchableOpacity
      style={{ flexDirection: "row", alignItems: "center" }}
      onPress={onToggle}
    >
      <Ionicons
        name={checked ? "checkmark-circle" : "ellipse-outline"}
        size={24}
        style={{ marginRight: 8 }}
      />
      <Text>{label}</Text>
    </TouchableOpacity>
  );
}

export default Checkbox;
