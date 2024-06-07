import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import axios from "axios";
import { useTranslation } from "react-i18next";

function CongeEmployee() {
  const { t } = useTranslation();
  const [congeEmployees, setCongeEmployees] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCongeEmployees = async () => {
      try {
        const response = await axios.get(
          "https://gcrbjwsr-3000.euw.devtunnels.ms/conge/employesConge"
        );
        if (response.data && response.data.length > 0) {
          setCongeEmployees(response.data);
        } else {
          setCongeEmployees([]);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des employés :", error);
        setError(error.message);
      }
    };
    fetchCongeEmployees();
  }, []);

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{t("Error_occurred")}:</Text>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <ImageBackground
      blurRadius={10}
      style={styles.background}
      source={require("../assets/a2.png")}
    >
      <View style={styles.container}>
        <Text style={styles.title}>
          {t("Employee_working_on_leave_today")}:
        </Text>
        {congeEmployees.length === 0 ? (
          <Text style={styles.noEmployeeText}>
            {t("No_employee_on_leave_today")}.
          </Text>
        ) : (
          congeEmployees.map((conge, index) => (
            <View style={styles.employeeItem} key={index}>
              <Text style={styles.fullname}>{conge.nomPrenom}</Text>
            </View>
          ))
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  background: {
    flex: 1,
    justifyContent: "flex-start",
    alignContent: "stretch",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 20,
  },
  employeeItem: {
    padding: 10,
    backgroundColor: "#f0f0f0",
    marginBottom: 10,
  },
  fullname: {
    fontSize: 20,
    fontStyle: "normal",
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

export default CongeEmployee;
