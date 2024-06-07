import React from "react";
import { View, Text, ImageBackground, StyleSheet } from "react-native";

function Confirmation(props) {
  return (
    <ImageBackground
      blurRadius={50}
      style={styles.background}
      source={require("../assets/a2.png")}
    >
      <View style={styles.logoContainer}>
        <Text style={styles.text}>
        {t("Reset_Password_Email_Sent")}
        </Text>
      </View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  logoContainer: {
    position: "absolute",
    padding: 15,
    alignItems: "center",
  },
  text: {
    marginTop: 20,
    fontSize: 20,
  },
});

export default Confirmation;
