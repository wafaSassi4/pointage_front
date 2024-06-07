import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import axios from "axios";
import colors from "../config/colors";
import { useTranslation } from "react-i18next";

function PresentielEmployees() {
  const { t } = useTranslation();
  const [presentEmployees, setPresentEmployees] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPresentEmployees = async () => {
      try {
        const response = await axios.get(
          "https://gcrbjwsr-3000.euw.devtunnels.ms/employees/presentiel"
        );
        if (response.data && response.data.length > 0) {
          setPresentEmployees(response.data);
        } else {
          setPresentEmployees([]);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des employés :", error);
        setError(error.message);
      }
    };
    fetchPresentEmployees();
  }, []);

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Une erreur s'est produite :</Text>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <ImageBackground
      blurRadius={50}
      style={styles.background}
      source={require("../assets/a2.png")}
    >
      <View style={styles.container}>
        <Text style={styles.title}>{t("presentEmployeesListTitle")}</Text>
        {presentEmployees.length === 0 ? (
          <Text style={styles.noEmployeeText}>{t("noEmployeePresent")}</Text>
        ) : (
          presentEmployees.map((employee, index) => (
            <View style={styles.employeeItem} key={index}>
              <Text style={styles.fullname}>{employee.fullname}</Text>
            </View>
          ))
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: colors.caramel,
  },
  employeeItem: {
    padding: 10,
    backgroundColor: "#f0f0f0",
    marginBottom: 10,
  },
  fullname: {
    fontSize: 20,
    fontStyle: "italic",
  },
  errorText: {
    fontSize: 16,
    color: "red",
  },
  noEmployeeText: {
    fontSize: 16,
    fontStyle: "italic",
  },
});

export default PresentielEmployees;
