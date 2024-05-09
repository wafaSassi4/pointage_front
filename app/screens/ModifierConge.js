import React from "react";
import { useState,useEffect } from "react";
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
import AppForm from "../components/Forms/AppForm";
import AppFormField from "../components/Forms/AppFormField";
import SubmitButton from "../components/Forms/SubmitButton";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const validationSchema = Yup.object().shape({
  nomPrenom: Yup.string().required().label("nom et Prenom"),
  email: Yup.string().required().email().label("email"),
  NVdateDebut: Yup.string().required().label("nouvelle date debut"),
  NVdateFin: Yup.string().required().label("nouvelle date fin"),
});

function ModifierConge({ navigation }) {
  const [userId, setUserId] = useState("");
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem("userId");
        if (storedUserId) {
          setUserId(storedUserId);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserId();
  }, []);
  const handleSubmit = async (values) => {
    const { nomPrenom, email, NVdateDebut, NVdateFin } = values;
    if (!userId) {
      Alert.alert("Erreur", "ID utilisateur non disponible.");
      return;
    }
    try {
      const response = await axios.put(
        "http://192.168.1.35:3000/conge/modifier-conge",
        { nomPrenom, email, NVdateDebut, NVdateFin }
      );
      console.log(response.data);
      navigation.goBack();
      Alert.alert("Modification de congé envoyée avec succès!");
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
          <Text style={styles.title}>Modifier Congé</Text>
          <AppForm
            initialValues={{
              nomPrenom: "",
              email: "",
              NVdateDebut: "",
              NVdateFin: "",
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
              name="NVdateDebut"
              placeholder="JJ/MM/AAAA"
            />
            <AppFormField
              autoCapitalize="none"
              autoCorrect={false}
              icon="calendar"
              name="NVdateFin"
              placeholder="JJ/MM/AAAA"
            />

            <SubmitButton title="Modifier" />
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
    marginBottom: 10,
    fontWeight: "bold",
    color: colors.marron,
    fontStyle: "italic",
    marginTop: 50,
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

export default ModifierConge;
