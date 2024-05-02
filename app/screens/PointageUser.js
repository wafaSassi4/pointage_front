import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  Text,
  TouchableOpacity,
  Platform,
  StatusBar,
} from "react-native";
import AppButton from "../components/AppButton";
import { FontAwesome } from "@expo/vector-icons";
import colors from "../config/colors";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";

function PointageUser(props) {
  const navigation = useNavigation();
  const [workType, setWorkType] = useState("");

  const handleCommencer = () => {
    if (!workType) {
      alert("Veuillez choisir un mode de travail avant de commencer.");
      return;
    }

    navigation.navigate("Chrono");
  };

  const handleWorkType = (type) => {
    setWorkType(type);
    alert(
      `Vous avez choisi le travail ${
        type === "remote" ? "en remote" : "présentiel"
      }.`
    );
  };

  return (
    <ImageBackground
      blurRadius={50}
      style={styles.background}
      source={require("../assets/welcomebackground.jpg")}
    >
      <View style={styles.container}>
        <Text style={styles.Text}>choisissez le mode de travaille :</Text>
        <View style={styles.row}>
          <TouchableOpacity
            style={[
              styles.checkbox,
              workType === "presentiel" && styles.selectedCheckbox,
            ]}
            onPress={() => handleWorkType("presentiel")}
          >
            {workType === "presentiel" && (
              <FontAwesome name="check" size={20} color="#fff" />
            )}
          </TouchableOpacity>
          <Text style={styles.checkboxLabel}>Travail présentiel</Text>
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            style={[
              styles.checkbox,
              workType === "remote" && styles.selectedCheckbox,
            ]}
            onPress={() => handleWorkType("remote")}
          >
            {workType === "remote" && (
              <FontAwesome name="check" size={20} color="#fff" />
            )}
          </TouchableOpacity>
          <Text style={styles.checkboxLabel}>Travail en ligne</Text>
        </View>
      </View>
      <AppButton
        style={styles.button}
        title="J'ai commencé"
        color="beige"
        onPress={handleCommencer}
      ></AppButton>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginTop: 40,
    marginLeft: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  Text: {
    fontSize: 20,
    marginBottom: 21,
    fontWeight: "bold",
    color: colors.marron,
    fontStyle: "italic",
    marginLeft: 20,
  },
  checkbox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.caramel,
    padding: 5,
    borderRadius: 5,
    marginBottom: 10,
  },
  selectedCheckbox: {
    backgroundColor: colors.beige,
  },
  checkboxLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    marginLeft: 10,
  },
  button: {
    justifyContent: "flex-end",
    marginEnd: 50,
    backgroundColor: colors.beige,
    width: "90%",
  },
});

export default PointageUser;
