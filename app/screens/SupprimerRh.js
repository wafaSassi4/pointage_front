import React from "react";
import { StyleSheet, Alert, ImageBackground } from "react-native";
import * as Yup from "yup";
import axios from "axios";
import { useTranslation } from "react-i18next";
import Screen from "../components/Screen";
import AppForm from "../components/Forms/AppForm";
import AppFormField from "../components/Forms/AppFormField";
import SubmitButton from "../components/Forms/SubmitButton";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
});

function SupprimerRH() {
  const { t } = useTranslation();

  const handleDelete = async (values) => {
    const { email } = values;
    Alert.alert(
      t("confirmationTitle"),
      t("confirmationMessage", { email }),
      [
        {
          text: t("noOption"),
          onPress: () => console.log("Suppression annulée"),
          style: "cancel",
        },
        {
          text: t("yesOption"),
          onPress: () => deleteEmployee(email),
        },
      ],
      { cancelable: false }
    );
  };

  const deleteEmployee = async (email) => {
    try {
      const response = await axios.delete(
        `https://gcrbjwsr-3000.euw.devtunnels.ms/rh/supprimerRh?email=${email}`
      );
      console.log(response.data);
    } catch (error) {
      console.error("Erreur lors de la suppression de l'employé :", error);
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
          initialValues={{ email: "" }}
          onSubmit={handleDelete}
          validationSchema={validationSchema}
        >
          <AppFormField
            autoCorrect={false}
            icon="email"
            name="email"
            placeholder={t("emailPlaceholder")}
            keyboardType="email-address"
          />

          <SubmitButton title={t("deleteButton")} />
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

export default SupprimerRH;
