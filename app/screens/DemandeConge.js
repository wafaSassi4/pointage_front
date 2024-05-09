import React from "react";
import {
  Text,
  StyleSheet,
  ImageBackground,
  Alert,
  ScrollView,
} from "react-native";
import colors from "../config/colors";
import * as Yup from "yup";
import Screen from "../components/Screen";
import AppFormField from "../components/Forms/AppFormField";
import axios from "axios";
import SubmitButton from "../components/Forms/SubmitButton";
import AppForm from "../components/Forms/AppForm";

const validationSchema = Yup.object().shape({
  nomPrenom: Yup.string().required().label("Nom et Prénom"),
  email: Yup.string().required().email().label("Email"),
  dateDebut: Yup.string().required().label("Date de début"),
  dateFin: Yup.string().required().label("Date de fin"),
});


function DemandeConge({ navigation }) {
  const handleSubmit = async (values) => {
    const { nomPrenom, email, dateDebut, dateFin } = values;

    try {
      const response = await axios.post(
        "http://192.168.1.35:3000/conge/demande-conge",
        { nomPrenom, email, dateDebut, dateFin }
      );
      console.log(response.data);
      navigation.goBack();
      Alert.alert("Demande de congé envoyée avec succès!");
    } catch (error) {
      console.error("Erreur lors de l'envoi de la demande de congé:", error);
      Alert.alert(error.response.data.message);
    }
  };

  return (
    <ImageBackground
      blurRadius={50}
      style={styles.background}
      source={require("../assets/welcomebackground.jpg")}
    >
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Screen style={styles.container}>
          <Text style={styles.title}>Demande Congé</Text>
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
              autoCapitalize="none"
              autoCorrect={false}
              icon="lock"
              name="nomPrenom"
              placeholder="Nom et Prénom"
            />
            <AppFormField
              autoCapitalize="none"
              autoCorrect={false}
              icon="email"
              keyboardType="email-address"
              name="email"
              placeholder="Email"
              textContentType="emailAddress"
            />
            <AppFormField
              autoCapitalize="none"
              autoCorrect={false}
              icon="calendar"
              name="dateDebut"
              placeholder="JJ/MM/AAAA"
            />
            <AppFormField
              autoCapitalize="none"
              autoCorrect={false}
              icon="calendar"
              name="dateFin"
              placeholder="JJ/MM/AAAA"
            />

            <SubmitButton title="Envoyer" />
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
  scrollView: {
    flexGrow: 1,
    justifyContent: "center",
  },
  container: {
    padding: 10,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: "bold",
    color: colors.marron,
    fontStyle: "italic",
    marginTop: 30,
    textAlign: "center",
  },
  input: {
    borderColor: "#ddd",
    padding: 5,
    marginBottom: 5,
    fontSize: 20,
  },
  Button: {
    backgroundColor: colors.beige,
    marginBottom: 30,
    justifyContent: "center",
  },
});

export default DemandeConge;
