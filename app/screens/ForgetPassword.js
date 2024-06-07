import React from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import * as Yup from "yup";
import axios from "axios";
import colors from "../config/colors";
import AppForm from "../components/Forms/AppForm";
import AppFormField from "../components/Forms/AppFormField";
import SubmitButton from "../components/Forms/SubmitButton";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
});

function ForgetPassword(props) {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const handleSubmit = (values) => {
    axios
      .post("https://gcrbjwsr-3000.euw.devtunnels.ms/user/forget-password", {
        email: values.email,
      })
      .then((response) => {
        console.log("Votre demande a été envoyée avec succès");
        navigation.navigate("confirmation");
      })
      .catch((error) => {
        console.error("Échec de la demande", error);
        Alert.alert(t("error"), t("passwordChangeError"));
      });
  };

  return (
    <ImageBackground
      blurRadius={50}
      style={styles.background}
      source={require("../assets/a2.png")}
    >
      <View style={styles.container}>
        <Text style={styles.Entete}>{t("Trouvez votre compte")}</Text>
        <Text style={styles.text}>{t("Entrer votre adresse mail")}</Text>
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
            placeholder={t("Email")}
            textContentType="emailAddress"
          />
          <Text style={styles.text}>
            {t(
              "Vous recevrez peut-etre des notifications de notre part sur votre boite mail et par texto à des fins de sécurité et de connexion"
            )}
          </Text>
          <SubmitButton title={t("Continuer")} />
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
