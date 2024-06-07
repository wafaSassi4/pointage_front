import React from "react";
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
import AppFormField from "../components/Forms/AppFormField";
import axios from "axios";
import SubmitButton from "../components/Forms/SubmitButton";
import AppForm from "../components/Forms/AppForm";
import { useTranslation } from "react-i18next";

const validationSchema = Yup.object().shape({
  nomPrenom: Yup.string().required().label("Nom et Prénom"),
  email: Yup.string().required().email().label("Email"),
  dateDebut: Yup.string().required().label("Date de début"),
  dateFin: Yup.string().required().label("Date de fin"),
});

function DemandeConge({ navigation }) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);

    try {
      const email = await AsyncStorage.getItem("email");
      const response = await axios.post(
        "https://gcrbjwsr-3000.euw.devtunnels.ms/conge/demande-conge",
        { email, ...values }
      );
      console.log(response.data);
      navigation.goBack();
      Alert.alert(t("successTitle1"), t("successMessage1"));
    } catch (error) {
      console.error("Erreur lors de l'envoi de la demande de congé:", error);
      Alert.alert(t("errorTitle1"), error.response.data.message);
    } finally {
      setLoading(false);
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
          <Text style={styles.title}>{t("Demande Congé")}</Text>
          <AppForm
            initialValues={{
              dateDebut: "",
              dateFin: "",
            }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            <AppFormField
              autoCapitalize="none"
              autoCorrect={false}
              icon="calendar"
              name="dateDebut"
              placeholder={t("startDatePlaceholder1")}
            />
            <AppFormField
              autoCapitalize="none"
              autoCorrect={false}
              icon="calendar"
              name="dateFin"
              placeholder={t("endDatePlaceholder1")}
            />
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={values.typeConge}
                onValueChange={(itemValue) =>
                  setFieldValue("typeConge", itemValue)
                }
                onBlur={() => setFieldTouched("typeConge")}
              >
                <Picker.Item
                  label={t("annualPaidLeave")}
                  value="Congés payés annuels"
                />
                <Picker.Item label={t("sickLeave")} value="Congé maladie" />
                <Picker.Item
                  label={t("maternityPaternityLeave")}
                  value="Congé de maternité/paternité"
                />
                <Picker.Item
                  label={t("parentalLeave")}
                  value="Congé parental"
                />
                <Picker.Item
                  label={t("sabbaticalLeave")}
                  value="Congé sabbatique"
                />
                <Picker.Item
                  label={t("unpaidLeave")}
                  value="Congé sans solde"
                />
                <Picker.Item
                  label={t("familyEventLeave")}
                  value="Congé pour événements familiaux"
                />
                <Picker.Item
                  label={t("trainingLeave")}
                  value="Congé de formation"
                />
                <Picker.Item
                  label={t("researchInnovationLeave")}
                  value="Congé pour recherche ou innovation"
                />
                <Picker.Item
                  label={t("familySolidarityLeave")}
                  value="Congé de solidarité familiale"
                />
                <Picker.Item
                  label={t("movingLeave")}
                  value="Congé de déménagement"
                />
                <Picker.Item
                  label={t("volunteerHumanitarianLeave")}
                  value="Congé pour activité bénévole ou humanitaire"
                />
              </Picker>
            </View>
            {touched.typeConge && errors.typeConge && (
              <Text style={styles.error}>{errors.typeConge}</Text>
            )}

            <SubmitButton title={t("Envoyer")} loading={loading} />
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
    marginBottom: 20,
    fontWeight: "bold",
    color: colors.marron,
    fontStyle: "italic",
    marginTop: 30,
    textAlign: "center",
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
  pickerContainer: {
    backgroundColor: colors.claire,
    borderRadius: 25,
    width: "100%",
    padding: 10,
    marginVertical: 10,
  },
  error: {
    color: "red",
    fontSize: 14,
    marginLeft: 10,
  },
});

export default DemandeConge;
