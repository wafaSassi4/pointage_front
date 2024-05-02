import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import colors from "../config/colors";

function AppButton({ title, onPress, color = "beige" }) {
  return (
    <TouchableOpacity
      style={[styles.Button, { backgroundColor: colors[color] }]}
      onPress={onPress}
    >
      <Text style={styles.Text}>{title}</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  Button: {
    backgroundColor: colors.caramel,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    borderRadius: 50,
    marginVertical: 10,
  },
});

export default AppButton;
