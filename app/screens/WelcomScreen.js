import React from "react";
import { ImageBackground, StyleSheet, View, Text, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import colors from "../config/colors";
import AppButton from "../components/AppButton";
import { useTranslation } from "react-i18next";

function WelcomeScreen(props) {
  const { t } = useTranslation();
  const navigation = useNavigation(); 

  const handleUserPress = () => {
    navigation.navigate("Login"); 
  };

  return (
    <ImageBackground
      blurRadius={50}
      style={styles.background}
      source={require("../assets/a2.png")}
    >
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require("../assets/logoF.png")}
        ></Image>
        <Text style={styles.tagtitle}>{t("Bienvenue à notre application")}  </Text>
        <View style={styles.buttonscontainer}>
          <AppButton title={t("Ressource Humaine")} color="caramel"></AppButton>
          <AppButton
            title={t("utilisateur ")}
            color="caramel"
            onPress={handleUserPress}
          ></AppButton>
        </View>
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
  buttonscontainer: {
    padding: 20,
    width: "90%",
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginBottom: 20,
    marginTop: 80,
  },
  logoContainer: {
    position: "absolute",
    top: 100,
    alignItems: "center",
  },
  tagtitle: {
    fontSize: 30,
    marginTop: 40,
    fontStyle: "italic",
    paddingVertical: 15,
    color: colors.caramel,
  },
});

export default WelcomeScreen;
