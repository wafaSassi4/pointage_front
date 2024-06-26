import React, { useState, useEffect } from "react";
import { StyleSheet, Alert, ImageBackground } from "react-native";
import * as Yup from "yup";
import Screen from "../components/Screen";
import AppForm from "../components/Forms/AppForm";
import AppFormField from "../components/Forms/AppFormField";
import SubmitButton from "../components/Forms/SubmitButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

const validationSchema = Yup.object().shape({
  currentPassword: Yup.string().required().label("Mot de passe actuel"),
  newPassword: Yup.string().required().min(6).label("Nouveau mot de passe"),
  confirmPassword: Yup.string()
    .oneOf(
      [Yup.ref("newPassword"), null],
      "Les mots de passe doivent correspondre"
    )
    .label("Confirmation du nouveau mot de passe"),
});

function EditPassword() {
  const { t } = useTranslation();
  const [userId, setUserId] = useState("");

  const navigation = useNavigation();

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

  const handlePasswordChange = async (values) => {
    const { currentPassword, newPassword } = values;

    if (!userId) {
      Alert.alert(t("error"), t("userIdUnavailable"));
      return;
    }

    try {
      const response = await axios.put(
        "https://gcrbjwsr-3000.euw.devtunnels.ms/user/edit-password",
        {
          userId,
          currentPassword,
          newPassword,
        }
      );

      console.log(response.data);
      Alert.alert(t("success"), t("passwordChangedSuccessfully"));
      navigation.navigate("FonctionaliterUser");
    } catch (error) {
      console.error(error.response ? error.response.data : error);
      Alert.alert(t("error"), t("passwordChangeError"));
    }
  };

  return (
    <ImageBackground
      blurRadius={50}
      style={styles.background}
      source={require("../assets/a2.png")}
    >
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Screen style={styles.container}>
          <AppForm
            initialValues={{
              currentPassword: "",
              newPassword: "",
              confirmPassword: "",
            }}
            onSubmit={handlePasswordChange}
            validationSchema={validationSchema}
          >
            <AppFormField
              autoCorrect={false}
              icon="lock"
              name="currentPassword"
              placeholder={t("currentPassword")}
              secureTextEntry
            />
            <AppFormField
              autoCorrect={false}
              icon="lock"
              name="newPassword"
              placeholder={t("newPassword")}
              secureTextEntry
            />
            <AppFormField
              autoCorrect={false}
              icon="lock"
              name="confirmPassword"
              placeholder={t("confirmPassword")}
              secureTextEntry
            />
            <SubmitButton title={t("save")} />
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
  },
  container: {
    padding: 10,
    marginTop: "auto",
  },
});

export default EditPassword;
