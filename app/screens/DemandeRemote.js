import AppText from "../components/AppText";
import React from "react";
import { Text, StyleSheet, ImageBackground, Alert } from "react-native";
import AppButton from "../components/AppButton";
import colors from "../config/colors";
import * as Yup from "yup";
import Screen from "../components/Screen";
import AppTextInput from "../components/AppTextInput";
import { Formik } from "formik";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import moment from "moment";

function validateDates(date) {
  return moment(date, "DD/MM/YYYY", true).isValid();
}

const validationSchema = Yup.object().shape({
  nomPrenom: Yup.string().required().label("nomPrenom"),
  email: Yup.string().required().email().label("email"),
  date: Yup.string().required().label("date"),
});
function DemandeRemote(props) {
  const navigation = useNavigation();

  const handleEnvoyer = async (values) => {
    const { nomPrenom, email, date } = values;
    try {
      const response = await axios.post(
        "http://192.168.1.35:3000/remote/submit",
        { nomPrenom, email, date }
      );
      console.log(response.data);
      navigation.goBack();
      Alert.alert("Demande de congé envoyée avec succès!");
    } catch (error) {
      console.error("Erreur lors de l'envoi de la demande ", error);
      Alert.alert(
        "Erreur",
        "Une erreur s'est produite. Veuillez réessayer plus tard."
      );
    }
  };

  return (
    <ImageBackground
      blurRadius={50}
      style={styles.background}
      source={require("../assets/welcomebackground.jpg")}
    >
      <Screen style={styles.container}>
        <Formik
          initialValues={{ nomPrenom: "", email: "", date: "" }}
          onSubmit={handleEnvoyer}
          validationSchema={validationSchema}
        >
          {({ handleChange, handleSubmit, errors, touched }) => (
            <>
              <Text style={styles.title}>Demande de travail en remote</Text>

              <AppTextInput
                autoCapitalize="none"
                autoCorrect={false}
                icon="user"
                placeholder="Nom et Prénom"
                onChangeText={handleChange("nomPrenom")}
                style={styles.input}
              />
              <AppText style={{ color: "red" }}>{errors.nomPrenom}</AppText>

              <AppTextInput
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Email"
                icon="email"
                keyboardType="email-address"
                onChangeText={handleChange("email")}
                style={styles.input}
              />
              <AppText style={{ color: "red" }}>{errors.email}</AppText>

              <AppTextInput
                autoCapitalize="none"
                autoCorrect={false}
                icon="calendar"
                placeholder="JJ/MM/AAAA"
                keyboardType="numeric"
                onChangeText={(text) => {
                  if (text.length === 2 || text.length === 5) {
                    text += "-";
                  }
                  handleChange("date")(text);
                }}
                style={styles.input}
              />
              <AppText style={{ color: "red" }}>{errors.date}</AppText>

              <AppButton
                style={styles.Button}
                title="Envoyer"
                onPress={handleSubmit}
              />
            </>
          )}
        </Formik>
      </Screen>
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
  input: {
    borderColor: "#ddd",
    borderWidth: 1,
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

export default DemandeRemote;
