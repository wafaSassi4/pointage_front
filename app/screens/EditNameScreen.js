import React, { useState } from "react";
import { StyleSheet, ImageBackground } from "react-native";
import AppForm from "../components/Forms/AppForm";
import Screen from "../components/Screen";
import AppFormField from "../components/Forms/AppFormField";
import SubmitButton from "../components/Forms/SubmitButton";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Nom"),
});

const EditNameScreen = ({ currentName, onSave }) => {
  const [newName, setNewName] = useState(currentName);

  const handleSubmit = (values) => {
    onSave(values.name);
  };

  return (
    <ImageBackground
      blurRadius={50}
      style={styles.background}
      source={require("../assets/welcomebackground.jpg")}
    >
      <Screen style={styles.container}>
        <AppForm
          initialValues={{ name: currentName }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <AppFormField
            autoCorrect={false}
            icon="account"
            name="name"
            placeholder="Nom"
          />
          <SubmitButton title="Enregistrer" />
        </AppForm>
      </Screen>
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
