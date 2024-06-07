import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import colors from "../config/colors";
import AppButton from "../components/AppButton";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next";

const verifyExistingEntry = async (fullname) => {
  try {
    const response = await axios.post(
      "https://gcrbjwsr-3000.euw.devtunnels.ms/employees/getActiveEmployee",
      {
        fullname,
      }
    );
    if (response.data.message === "Employee exist") {
      await AsyncStorage.removeItem("workedTime");
      await AsyncStorage.setItem(
        "workedTime",
        response.data.entry[0].hoursWorked
      );
      return true;
    }
  } catch (error) {
    console.error("Error verifying existing entry:", error);
    return false;
  }
};

function PointageUser(props) {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [workMode, setWorkMode] = useState("");

  const handleWorkMode = (mode) => {
    setWorkMode(mode);
    Alert.alert(
      t("Work Mode Selected"),
      t("You have chosen to work {{mode}}.", {
        mode: mode === "remote" ? t("remotely") : t("on-site"),
      })
    );
  };

  const handleCommencer = async () => {
    try {
      if (!workMode) {
        Alert.alert(t("Select a work type"));
        return;
      }

      const fullname = await AsyncStorage.getItem("fullname");
      const token = await AsyncStorage.getItem("userToken");
      await AsyncStorage.setItem("workMode", workMode);

      const entryData = {
        entryTime: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
        workMode: workMode,
        fullname: fullname,
      };

      if (!(await verifyExistingEntry(fullname))) {
        const response = await axios.post(
          "https://gcrbjwsr-3000.euw.devtunnels.ms/employees/createEntry",
          entryData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response) {
          const Entry = response.data.data;
          await AsyncStorage.setItem("entryId", Entry._id);
        }
      }

      navigation.navigate("Chrono");
    } catch (error) {
      console.error("Erreur lors de la sauvegarde des données :", error);
      Alert.alert(t("Error"), t("An error occurred while saving data."));
    }
  };

  return (
    <ImageBackground
      blurRadius={50}
      style={styles.background}
      source={require("../assets/a2.png")}
    >
      <View style={styles.container}>
        <Text style={styles.text}>{t("Check your work mode:")}</Text>
        <View style={styles.row}>
          <TouchableOpacity
            style={[
              styles.checkbox,
              workMode === "presentiel" && styles.selectedCheckbox,
            ]}
            onPress={() => handleWorkMode("presentiel")}
          >
            {workMode === "presentiel" && (
              <FontAwesome name="check" size={20} color="#fff" />
            )}
          </TouchableOpacity>
          <Text style={styles.checkboxLabel}>{t("On-site Work")}</Text>
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            style={[
              styles.checkbox,
              workMode === "remote" && styles.selectedCheckbox,
            ]}
            onPress={() => handleWorkMode("remote")}
          >
            {workMode === "remote" && (
              <FontAwesome name="check" size={20} color="#fff" />
            )}
          </TouchableOpacity>
          <Text style={styles.checkboxLabel}>{t("Remote Work")}</Text>
        </View>
      </View>
      <AppButton
        style={styles.button}
        title={t("I've started")}
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
  text: {
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
    borderRadius: 5,
    width: 25,
    height: 25,
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
    color: colors.white,
  },
  button: {
    justifyContent: "flex-end",
    marginEnd: 50,
    backgroundColor: colors.beige,
    width: "90%",
  },
});

export default PointageUser;
