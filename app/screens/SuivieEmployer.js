import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ImageBackground,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import axios from "axios";
import { useTranslation } from "react-i18next";
import AppFormField from "../components/Forms/AppFormField";
import AppForm from "../components/Forms/AppForm";
import SubmitButton from "../components/Forms/SubmitButton";
import Screen from "../components/Screen";
import colors from "../config/colors";

function SuivieEmployer() {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [employeeInfo, setEmployeeInfo] = useState(null);
  const [todayDate, setTodayDate] = useState(
    new Date().toLocaleDateString("fr-FR")
  ); // Date d'aujourd'hui

  const handleFollow = async () => {
    try {
      const response = await axios.get(
        `https://gcrbjwsr-3000.euw.devtunnels.ms/employees/getEmployeeInfoForToday/${name}`
      );
      setEmployeeInfo(response.data);
    } catch (error) {
      console.error("Error fetching employee info: ", error);
      Alert.alert(t("errorTitle"), t("errorMessage"));
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <ImageBackground
        blurRadius={10}
        style={styles.background}
        source={require("../assets/a2.png")}
      >
        <Screen style={styles.container}>
          <View style={styles.dateContainer}>
            <Text style={styles.dateText}>
              {t("todayDateLabel")}: {todayDate}
            </Text>
          </View>
          <AppForm initialValues={{ fullname: "" }} onSubmit={handleFollow}>
            <AppFormField
              autoCorrect={false}
              name="fullname"
              placeholder={t("employeeNamePlaceholder")}
              onChangeText={(text) => setName(text)}
              value={name}
            />
            <SubmitButton title={t("followEmployeeButton")} />
          </AppForm>
          <View style={styles.container}>
            {employeeInfo && (
              <View style={styles.employeeInfoContainer}>
                <Text style={styles.employeeInfoTitle}>
                  {t("employeeInfoTitle")}
                </Text>
                {employeeInfo.map((employee, index) => (
                  <View key={index} style={styles.employeeEntryContainer}>
                    <View style={styles.entriesContainer}>
                      {employee.entries.map((entry, entryIndex) => (
                        <View key={entryIndex} style={styles.entryContainer}>
                          <Text>
                            {t("employeeNameLabel")}: {entry.fullname}
                          </Text>
                          <Text>
                            {t("entryTimeLabel")}: {entry.entryTime}
                          </Text>
                          <Text>
                            {t("exitTimeLabel")}: {entry.exitTime}
                          </Text>
                          <Text>
                            {t("hoursWorkedLabel")}: {entry.hoursWorked}
                          </Text>
                          <Text>
                            {t("workModeLabel")}: {entry.workMode}
                          </Text>
                        </View>
                      ))}
                    </View>
                  </View>
                ))}
              </View>
            )}
          </View>
        </Screen>
      </ImageBackground>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginTop: 120,
  },
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch",
  },
  dateContainer: {
    marginBottom: 20,
  },
  dateText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  employeeEntryContainer: {
    marginTop: 20,
    borderWidth: 3,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 15,
  },
  employeeInfoTitle: {
    fontWeight: "bold",
    fontSize: 25,
    marginBottom: 10,
    color: colors.beige,
  },
  employeeInfoContainer: {
    marginTop: 10,
    padding: 10,
  },
});

export default SuivieEmployer;
