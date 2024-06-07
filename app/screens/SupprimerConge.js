import React from "react";
import {
  Alert,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
} from "react-native";
import colors from "../config/colors";
import * as Yup from "yup";
import Screen from "../components/Screen";
import AppForm from "../components/Forms/AppForm";
import AppFormField from "../components/Forms/AppFormField";
import SubmitButton from "../components/Forms/SubmitButton";
import axios from "axios";
import { useTranslation } from "react-i18next";

const validationSchema = Yup.object().shape({
  nomPrenom: Yup.string().required().label("Nom et Prénom"),
  email: Yup.string().required().email().label("Email"),
  dateDebut: Yup.string().required().label("Date début"),
  dateFin: Yup.string().required().label("Date fin"),
});

function SupprimerConge({ navigation }) {
  const { t } = useTranslation();
  const handleSubmit = async (values) => {
    try {
      // Correction ici : Assurez-vous que la structure de données envoyée correspond à celle attendue par votre API.
      const response = await axios.delete(
        "https://gcrbjwsr-3000.euw.devtunnels.ms/conge/supprimer-conge",
        {
          data: values,
        }
      );

      console.log(response.data);
      Alert.alert(t("successTitle"), t("deleteSuccess"));
      navigation.goBack();
    } catch (error) {
      console.error("Erreur lors de la suppression du congé:", error);
      // Amélioration ici : Affichage d'un message d'erreur plus informatif pour l'utilisateur.
      let errorMessage = t("deleteError");
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        errorMessage = error.response.data.message;
      }
      Alert.alert(t("errorTitle"), errorMessage);
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
          <Text style={styles.title}>{t("Supprimer Congé")}</Text>
          <AppForm
            initialValues={{
              nomPrenom: "",
              email: "",
              dateDebut: "",
              dateFin: "",
            }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            <AppFormField
              name="nomPrenom"
              placeholder={t("Name and Surname")}
              icon="account"
            />
            <AppFormField
              name="email"
              placeholder={t("Email")}
              icon="email"
              keyboardType="email-address"
            />
            <AppFormField
              name="dateDebut"
              placeholder={t("startDatePlaceholder1")}
              icon="calendar-range"
            />
            <AppFormField
              name="dateFin"
              placeholder={t("endDatePlaceholder1")}
              icon="calendar-range"
            />
            <SubmitButton title={t("Supprimer")} />
          </AppForm>
        </Screen>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-start",
    padding: 20,
  },
  container: {
    padding: 10,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: "bold",
    color: colors.marron,
    fontStyle: "italic",
    marginTop: 50,
  },
});

export default SupprimerConge;
