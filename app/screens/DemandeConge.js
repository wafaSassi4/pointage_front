import React from "react";
import { Text, StyleSheet, ImageBackground } from "react-native";
import AppButton from "../components/AppButton";
import colors from "../config/colors";
import * as Yup from "yup";
import Screen from "../components/Screen";
import AppText from "../components/AppText/AppText";
import AppTextInput from "../components/AppTextInput";
import AppFormField from "../components/Forms/AppFormField";
import { Formik } from "formik";
import { useNavigation } from "@react-navigation/native";

function DemandeConge(props) {
  const navigation = useNavigation();

  const validationSchema = Yup.object().shape({
    nomPrenom: Yup.string().required().label("nomPrenom"),
    email: Yup.string().required().email().label("email"),
    dateDebut: Yup.date().required().label("datedebut"),
    dateFin: Yup.date().required().label("datefin"),
  });
  const handleEnvoyer = (values) => {
    console.log(values);
    navigation.navigate("CongeEnvoyer");
  };
  return (
    <ImageBackground
      blurRadius={50}
      style={styles.background}
      source={require("../assets/welcomebackground.jpg")}
    >
      <Screen style={styles.container}>
        <Formik
          initialValues={{
            nomPrenom: "",
            email: "",
            dateDebut: "",
            dateFin: "",
          }}
          onSubmit={handleEnvoyer}
          validationSchema={validationSchema}
        >
          {({ handleChange, handleSubmit, errors, touched }) => (
            <>
              <Text style={styles.title}>Demande Congé !</Text>
              <AppFormField
                autoCapitalize="none"
                autoCorrect={false}
                icon="user"
                keyboardType="Account"
                name="nomPrenom"
                placeholder="Nom et Prénom"
                textContentType="Account"
                onChangeText={handleChange("nomPrenom")}
                onBlur={() => setFieldTouched("nomPrenom")}
                error={errors.nomPrenom}
                touched={touched.nomPrenom}
              />
              <AppFormField
                autoCapitalize="none"
                autoCorrect={false}
                icon="email"
                keyboardType="email-address"
                name="email"
                placeholder="Email"
                textContentType="emailAddress"
                onChangeText={handleChange("email")}
                onBlur={() => setFieldTouched("email")}
                error={errors.email}
                touched={touched.email}
              />

              <AppFormField
                autoCapitalize="none"
                autoCorrect={false}
                icon="calendar"
                keyboardType="date"
                name="datedebut"
                placeholder="Donner la date de début"
                textContentType="emailAddress"
                onChangeText={handleChange("datedebut")}
                onBlur={() => setFieldTouched("datedebut")}
                error={errors.dateDebut}
                touched={touched.dateDebut}
              />

              <AppFormField
                autoCapitalize="none"
                autoCorrect={false}
                icon="calendar"
                keyboardType="date"
                name="datefin"
                placeholder="Donner la date de fin"
                textContentType="date"
                onChangeText={handleChange("datefin")}
                onBlur={() => setFieldTouched("datefin")}
                error={errors.dateFin}
                touched={touched.dateFin}
              />
              <AppButton
                style={styles.Button}
                title="Demande Congé"
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

export default DemandeConge;
