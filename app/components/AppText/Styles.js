import { Platform, StyleSheet } from "react-native";
import React from "react";
import defaultStyles from "../../config/styles";

const styles = StyleSheet.create({
  text: {
    color: "blue",
    fontSize: 18,
    fontFamily: Platform.OS === "android" ? "Robot" : "Avenir",
  },
});

export default styles;
