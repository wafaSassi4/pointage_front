import React from "react";
import { Text, StyleSheet, ImageBackground } from "react-native";
import AppButton from "../components/AppButton";
import colors from "../config/colors";
import * as Yup from "yup";
import Screen from "../components/Screen";
import AppText from "../components/AppText/AppText";
import AppTextInput from "../components/AppTextInput";
import { Formik } from "formik";
import { useNavigation } from "@react-navigation/native";

function DemandeRemote(props) {
  const navigation = useNavigation();

  const validationSchema = Yup.object().shape({
    nomPrenom: Yup.string().required().label("nomPrenom"),
    email: Yup.string().required().email().label("email"),
    poste: Yup.string().required().label("poste"),
    date: Yup.string().required().label("date"),
  });
  const handleEnvoyer = (values) => {
    console.log(values);
    navigation.navigate("DemandeEnvoyer");
  };
  return (
    <ImageBackground
      blurRadius={50}
      style={styles.background}
      source={require("../assets/welcomebackground.jpg")}
    >
      <Screen style={styles.container}>
        <Formik
          initialValues={{ nomPrenom: "", email: "", poste: "", date: "" }}
          onSubmit={handleEnvoyer}
          validationSchema={validationSchema}
        >
          {({ handleChange, handleSubmit, errors, touched }) => (
            <>
              <Text style={styles.title}>Demande de travail en remote</Text>

              <AppTextInput
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Nom et Prénom"
                icon="user"
                onChangeText={handleChange("nomPrenom")}
                style={styles.input}
              />
              <AppText style={{ color: "red" }}>{errors.nomPrenom}</AppText>

              <AppTextInput
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Email"
                keyboardType="email-address"
                onChangeText={handleChange("email")}
                icon="email"
                style={styles.input}
              />
              <AppText style={{ color: "red" }}>{errors.email}</AppText>

              <AppTextInput
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Poste"
                onChangeText={handleChange("poste")}
                icon="briefcase"
                style={styles.input}
              />
              <AppText style={{ color: "red" }}>{errors.poste}</AppText>

              <AppTextInput
                autoCorrect={false}
                placeholder="Date de travail"
                icon="calendar"
                onChangeText={handleChange("date")}
                style={styles.input}
              />
              <AppText style={{ color: "red" }}>{errors.date}</AppText>

              <AppButton
                style={styles.Button}
                title="Envoyer"
                onPress={handleEnvoyer}
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
    padding: 5,
    marginBottom: 5,
  },
  Button: {
    backgroundColor: colors.beige,
    marginBottom: 30,
    justifyContent: "center",
  },
});

export default DemandeRemote;
