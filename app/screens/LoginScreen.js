import React, { useState, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import Screen from "../components/Screen";
import AppForm from "../components/Forms/AppForm.js";
import AppFormField from "../components/Forms/AppFormField";
import SubmitButton from "../components/Forms/SubmitButton";
import * as Yup from "yup";
import colors from "../config/colors";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(6).label("Password"),
});

function LoginScreen(props) {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useFocusEffect(
    React.useCallback(() => {
      setEmail("");
      setPassword("");
      return () => {};
    }, [])
  );
  const handleSubmit = async (values) => {
    try {
      const res = await axios.post(
        "https://gcrbjwsr-3000.euw.devtunnels.ms/user/login",
        {
          email: values.email,
          password: values.password,
        }
      );
      const userInfo = res.data;

      await AsyncStorage.setItem("userId", userInfo._id);
      await AsyncStorage.setItem("fullname", userInfo.fullname);
      await AsyncStorage.setItem("userToken", userInfo.token);
      await AsyncStorage.setItem("email", userInfo.email);

      console.log("Connected successfully");
      navigation.navigate("FonctionaliterUser");
    } catch (error) {
      console.error("Account does not exist", error);
      alert("Login Failed!");
    }
  };
  const handleForgetPassword = () => {
    navigation.navigate("ForgetPassword");
  };

  return (
    <ImageBackground
      style={styles.background}
      source={require("../assets/a2.png")}
    >
      <Screen style={styles.container}>
        <Image style={styles.logo} source={require("../assets/logoF.png")} />
        <AppForm
          initialValues={{ email: "", password: "" }}
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
          <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="lock"
            name="password"
            placeholder={t("Password")}
            secureTextEntry
            textContentType="password"
          />
          <SubmitButton title={t("Connexion")} />
        </AppForm>
        <TouchableOpacity onPress={handleForgetPassword}>
          <Text style={styles.forget}>{t("Mot de passe oublié ?")}</Text>
        </TouchableOpacity>
      </Screen>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  background: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    alignContent: "stretch",
  },
  logo: {
    height: 100,
    width: 100,
    alignSelf: "center",
    marginBottom: 20,
    marginTop: 80,
  },
  forget: {
    color: colors.marron,
    fontSize: 15,
    fontStyle: "italic",
    marginTop: 50,
    alignSelf: "center",
  },
});

export default LoginScreen;
