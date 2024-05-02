import React from "react";
import { Platform } from "react-native";
import colors from "./colors";

export default {
  colors,
  text: {
    color: "#0c0c0c",
    fontSize: 18,
    fontFamily: Platform.OS === "android" ? "Robot" : "Avenir",
  },
};
