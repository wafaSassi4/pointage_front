import React from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import * as Yup from "yup";
import axios from "axios";
import colors from "../config/colors";
import SubmitButton from "../components/Forms/SubmitButton";
import AppForm from "../components/Forms/AppForm";
import AppFormField from "../components/Forms/AppFormField";
import { useNavigation } from "@react-navigation/native";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
});

function ForgetPassword(props) {
  const navigation = useNavigation();
  const handleSubmit = (values) => {
    axios
      .post("http://192.168.1.35:3000/user/forget-password", {
        email: values.email,
      })
      .then((response) => {
        console.log("Votre demande a été envoyée avec succès");
        navigation.navigate("confirmation");
      })
      .catch((error) => {
        console.error("Échec de la demande", error);
        alert("Echec de la connexion !");
      });
  };

  return (
    <ImageBackground
      blurRadius={50}
      style={styles.background}
      source={require("../assets/welcomebackground.jpg")}
    >
      <View style={styles.container}>
        <Text style={styles.Entete}>Trouvez votre compte</Text>
        <Text style={styles.text}>Entrer votre adresse mail</Text>
        <AppForm
          initialValues={{ email: "" }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="email"
            keyboardType="email-address"
            name="email"
            placeholder="Email"
            textContentType="emailAddress"
          />
          <Text style={styles.text}>
            Vous recevrez peut-etre des notifications de notre part sur votre
            boite mail et par texto à des fins de sécurité et de connexion
          </Text>
          <SubmitButton title="Continuer" />
        </AppForm>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    padding: 15,
  },
  background: {
    flex: 1,
    justifyContent: "flex-start",
  },
  Entete: {
    fontSize: 30,
    fontStyle: "italic",
    color: colors.caramel,
    marginStart: 15,
  },
  text: {
    fontSize: 20,
    color: colors.grisCalire,
    marginTop: 15,
  },
});

export default ForgetPassword;
