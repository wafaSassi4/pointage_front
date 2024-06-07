import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { useTranslation } from "react-i18next"; // Importer la fonction useTranslation pour la traduction
import colors from "../config/colors";

const EmployeeTable = () => {
  const { t } = useTranslation(); // Initialiser la fonction t pour obtenir les traductions
  const [allEmployees, setAllEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [filteredDate, setFilteredDate] = useState("");
  const [filteredDatePlaceholder, setFilteredDatePlaceholder] = useState(""); // Ajouter un placeholder dynamique pour le champ de date filtrée

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(
          "https://gcrbjwsr-3000.euw.devtunnels.ms/employees/getAllEmployees/"
        );
        setAllEmployees(response.data);
        setFilteredEmployees(response.data); // Initialize filtered employees with all employees
      } catch (error) {
        console.error("Erreur lors de la récupération des employés :", error);
      }
    };

    fetchEmployees();
  }, []);

  useEffect(() => {
    // Mettre à jour le placeholder en fonction de la langue sélectionnée
    setFilteredDatePlaceholder(t("filterByDate"));
  }, [t]);

  const handleFilterByDate = () => {
    // Convertir filteredDate en format "jj/mm/aaaa"
    const [day, month, year] = filteredDate.split("/");
    const formattedFilteredDate = `${day.padStart(2, "0")}/${month.padStart(
      2,
      "0"
    )}/${year}`;

    // Filtrer les employés par la date fournie
    const filteredEmployees = allEmployees.filter((employee) =>
      employee.entries.some((entry) => employee.date === formattedFilteredDate)
    );
    setFilteredEmployees(filteredEmployees);
  };

  const formatDate = (dateString) => {
    const [day, month, year] = dateString.split("/");
    return `${day.padStart(2, "0")}/${month.padStart(2, "0")}/${year}`;
  };

  return (
    <ImageBackground
      blurRadius={10}
      style={styles.background}
      source={require("../assets/a2.png")}
    >
      <View style={styles.container}>
        <TextInput
          style={styles.textField}
          placeholder={filteredDatePlaceholder}
          value={filteredDate}
          onChangeText={(text) => setFilteredDate(text)}
        />
        <TouchableOpacity style={styles.button} onPress={handleFilterByDate}>
          <Text style={styles.buttonText}>{t("filter")}</Text>
        </TouchableOpacity>
        <ScrollView style={styles.tableContainer}>
          <View>
            <View style={styles.headerRow}>
              <Text style={styles.headerCell}>{t("date")}</Text>
              <Text style={styles.headerCell}>{t("name")}</Text>
              <Text style={styles.headerCell}>{t("entryDate")}</Text>
              <Text style={styles.headerCell}>{t("exitDate")}</Text>
              <Text style={styles.headerCell}>{t("workMode")}</Text>
              <Text style={styles.headerCell}>{t("hoursWorked")}</Text>
            </View>
            {filteredEmployees.map((employee) =>
              employee.entries.map((entry, index) => (
                <View key={`${employee._id}-${index}`} style={styles.row}>
                  <Text style={styles.cell}> {employee.date}</Text>
                  <Text style={styles.cell}>{entry.fullname}</Text>
                  <Text style={styles.cell}>{entry.entryTime}</Text>
                  <Text style={styles.cell}>{entry.exitTime}</Text>
                  <Text style={styles.cell}>{entry.workMode}</Text>
                  <Text style={styles.cell}>{entry.hoursWorked}</Text>
                </View>
              ))
            )}
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  textField: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 20,
  },
  button: {
    marginBottom: 10,
    backgroundColor: colors.beige,
    padding: 10,
    alignItems: "center",
    borderRadius: 5,
  },
  background: {
    flex: 1,
    justifyContent: "flex-start",
    alignContent: "stretch",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  tableContainer: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 20,
  },
  cell: {
    flex: 1,
    padding: 5,
  },
  headerRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 10,
    backgroundColor: colors.claire,
  },
  headerCell: {
    flex: 1,
    padding: 5,
    fontWeight: "bold",
  },
});

export default EmployeeTable;
