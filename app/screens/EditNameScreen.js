import React, { useState, useEffect } from "react";
import { StyleSheet, ImageBackground, Alert } from "react-native";
import AppForm from "../components/Forms/AppForm";
import AppFormField from "../components/Forms/AppFormField";
import SubmitButton from "../components/Forms/SubmitButton";
import Screen from "../components/Screen";
import * as Yup from "yup";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Nom"),
});

const EditNameScreen = ({ currentName, onSave }) => {
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

  const handleNameChange = async (values) => {
    const { name } = values;

    if (!userId) {
      Alert.alert("Erreur", "ID utilisateur non disponible.");
      return;
    }

    try {
      const response = await axios.put(
        "https://gcrbjwsr-3000.euw.devtunnels.ms/user/edit-name",
        {
          userId,
          name,
        }
      );

      console.log(response.data);
      Alert.alert(t("success"), t("nameChangedSuccessfully"));
      navigation.navigate("FonctionaliterUser");
    } catch (error) {
      console.error(error.response ? error.response.data : error);
      Alert.alert(t("error"), t("nameChangeError"));
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
            initialValues={{ name: currentName }}
            onSubmit={handleNameChange}
            validationSchema={validationSchema}
          >
            <AppFormField
              autoCorrect={false}
              icon="account"
              name="name"
              placeholder={t("name")}
            />
            <SubmitButton title={t("save")} />
          </AppForm>
        </Screen>
      </ScrollView>
    </ImageBackground>
  );
};

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

export default EditNameScreen;
