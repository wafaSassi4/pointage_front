import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import colors from "../config/colors";
import axios from "axios";

function RemoteEmployees() {
  const [remoteEmployees, setRemoteEmployees] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRemoteEmployees = async () => {
      try {
        const response = await axios.get(
          "http://192.168.1.35:3000/employees/remote"
        );
        if (response.data && response.data.length > 0) {
          setRemoteEmployees(response.data);
        } else {
          setRemoteEmployees([]);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des employés :", error);
        setError(error.message);
      }
    };
    fetchRemoteEmployees();
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
      source={require("../assets/welcomebackground.jpg")}
    >
      <View style={styles.container}>
        <Text style={styles.title}>
          Liste des employés travaillant en remote aujourd'hui :
        </Text>
        {remoteEmployees.length === 0 ? (
          <Text style={styles.noEmployeeText}>
            Aucun employé travail à distance aujourd'hui.
          </Text>
        ) : (
          remoteEmployees.map((employee, index) => (
            <View style={styles.employeeItem} key={index}>
              <Text style={styles.fullname}>{employee.fullname}</Text>
              <Text style={styles.fullname}>{employee.email}</Text>
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
    padding: 20,
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
    fontSize: 18,
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

export default RemoteEmployees;
