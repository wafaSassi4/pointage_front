import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Alert,
  ImageBackground,
  ScrollView,
} from "react-native";
import { useTranslation } from "react-i18next"; // Importer la fonction de traduction
import * as Yup from "yup";
import axios from "axios";
import Screen from "../components/Screen";
import AppForm from "../components/Forms/AppForm";
import AppFormField from "../components/Forms/AppFormField";
import SubmitButton from "../components/Forms/SubmitButton";

const validationSchema = Yup.object().shape({
  fullname: Yup.string().required().label("Name"),
  email: Yup.string().required().email().label("Email"),
 
});

function ModifierEmploye() {
  const { t } = useTranslation(); 
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const handleModifyEmployee = async () => {
    setLoading(true);
    setError(null); // Réinitialiser l'erreur
    try {
      const response = await axios.post(
        "https://gcrbjwsr-3000.euw.devtunnels.ms/user/modifierEmploye",
        formData
      );

      if (response.status === 200) {
        console.log("Employé modifié avec succès !");
        Alert.alert(t("Success"), t("Employee successfully modified!"));
        navigation.goBack();
      }
    } catch (error) {
      console.error("Erreur lors de la modification de l'employé :", error);
      setError(t("An error occurred while modifying the employee."));
      
    }finally{
      setLoading(false);
    }
  };

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  return (
    <ImageBackground
      blurRadius={10}
      style={styles.background}
      source={require("../assets/a2.png")}
    >
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Screen style={styles.container}>
          <AppForm
            initialValues={formData}
            onSubmit={handleModifyEmployee}
            validationSchema={validationSchema}
          >
            <AppFormField
              autoCorrect={false}
              icon="account"
              name="name"
              placeholder={t("Name")}
              onChangeText={(value) => handleChange("fullname", value)}
            />
            <AppFormField
              autoCapitalize="none"
              autoCorrect={false}
              icon="email"
              keyboardType="email-address"
              name="email"
              placeholder={t("Email")}
              textContentType="emailAddress"
              onChangeText={(value) => handleChange("email", value)}
            />
            <AppFormField
              autoCapitalize="none"
              autoCorrect={false}
              icon="lock"
              name="password"
              placeholder={t("Password")}
              secureTextEntry
              textContentType="password"
              onChangeText={(value) => handleChange("password", value)}
            />
            <AppFormField
              autoCapitalize="none"
              autoCorrect={false}
              icon="lock"
              name="confirmPassword"
              placeholder={t("Confirm Password")}
              secureTextEntry
              textContentType="password"
              onChangeText={(value) => handleChange("confirmPassword", value)}
            />
            <SubmitButton title={t("Modify Employee")} />
          </AppForm>
        </Screen>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: 180,
  },
  background: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "stretch",
  },
});

export default ModifierEmploye;
