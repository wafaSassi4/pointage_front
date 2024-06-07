import React from "react";
import { StyleSheet, Alert, Text, ImageBackground } from "react-native";
import * as Yup from "yup";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import Screen from "../components/Screen";
import AppForm from "../components/Forms/AppForm";
import AppFormField from "../components/Forms/AppFormField";
import SubmitButton from "../components/Forms/SubmitButton";
import { useTranslation } from "react-i18next";

const validationSchema = Yup.object().shape({
  fullname: Yup.string().required().label("fullname"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

function AjouterEmployer() {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post(
        "https://gcrbjwsr-3000.euw.devtunnels.ms/user/ajouterEmploye",
        values
      );
      if (response.status === 201) {
        Alert.alert("Success", t("Employee_Added_Successfully"));
        navigation.goBack();
      } else {
        Alert.alert("Error", t("Error_Adding_Employee"));
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", t("Server_Communication_Error"));
    }
  };

  return (
    <ImageBackground
      blurRadius={10}
      style={styles.background}
      source={require("../assets/a2.png")}
    >
      <Screen style={styles.container}>
        <AppForm
          initialValues={{ fullname: "", email: "", password: "" }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <AppFormField
            autoCorrect={false}
            icon="account"
            name="fullname"
            placeholder={t("Name")}
          />
          <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="email"
            keyboardType="email-address"
            name="email"
            placeholder={t("Email")}
            textContentType="emailAddress"
          />
          <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="lock"
            name="password"
            placeholder={t("Password")}
            secureTextEntry
            textContentType="password"
          />
          <SubmitButton title={t("Add_Employer")} />
        </AppForm>
      </Screen>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: 210,

    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch",
  },
});

export default AjouterEmployer;
