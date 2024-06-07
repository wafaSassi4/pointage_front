import React from "react";
import { StyleSheet, Alert, ImageBackground, ScrollView } from "react-native";
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

function Supprimer() {
  const { t } = useTranslation();

  const handleDelete = async (values) => {
    const { email } = values;
    Alert.alert(
      t("confirmation"),
      t("confirmDeleteMessage", { email }),
      [
        {
          text: "Non",
          onPress: () => console.log("Suppression annulée"),
          style: "cancel",
        },
        {
          text: "Oui",
          onPress: () => deleteEmployee(email),
        },
      ],
      { cancelable: false }
    );
  };

  const deleteEmployee = async (email) => {
    try {
      const response = await axios.delete(
        `https://gcrbjwsr-3000.euw.devtunnels.ms/user/supprimerEmploye?email=${email}`
      );
      console.log(response.data);
      // Gérer toute action supplémentaire après la suppression réussie
    } catch (error) {
      console.error("Erreur lors de la suppression de l'employé :", error);
      // Gérer les erreurs
    }
  };

  return (
    <ImageBackground
      blurRadius={10}
      style={styles.background}
      source={require("../assets/a2.png")}
    >
      <ScrollView contentContainerStyle={styles.scrollView}>
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

            <SubmitButton title={t("deleteEmployeeButton")} />
          </AppForm>
        </Screen>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: 290,
  },
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch",
  },
});

export default Supprimer;
