import React from "react";
import { StyleSheet, Alert, ImageBackground } from "react-native";
import * as Yup from "yup";
import axios from "axios";
import { useTranslation } from "react-i18next";
import Screen from "../components/Screen";
import AppPass from "../components/AppPass";
import AppFormField from "../components/Forms/AppFormField";
import SubmitButton from "../components/Forms/SubmitButton";

const validationSchema = Yup.object().shape({
  fullname: Yup.string().required().label("Fullname"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

function AjouterRh({ navigation }) {
  const { t } = useTranslation();

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const response = await axios.post(
        "https://gcrbjwsr-3000.euw.devtunnels.ms/rh/ajouterRh",
        values
      );
      if (response.status === 201) {
        Alert.alert(t("Success"), t("Rh_Added_Successfully"));
        resetForm();
        navigation.goBack();
      } else {
        Alert.alert(t("Error"), t("Error_Adding_Rh"));
      }
    } catch (error) {
      console.error(error);
      Alert.alert(t("Error"), t("Server_Communication_Error"));
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
            placeholder={t("Name")}
            name="fullname"
          />

          <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            icon="email"
            placeholder={t("Email")}
          />

          <AppPass
            autoCapitalize="none"
            autoCorrect={false}
            icon="lock"
            placeholder={t("Password")}
            textContentType="password"
          />

          <SubmitButton title={t("Add_Rh")} onPress={handleSubmit} />
        </AppForm>
      </Screen>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: "auto",
  },
  background: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "stretch",
  },
});

export default AjouterRh;
