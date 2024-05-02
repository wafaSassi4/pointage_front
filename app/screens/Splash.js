import React, { useEffect, useRef } from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Splash = () => {
  const navigation = useNavigation();
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      navigation.replace("WelcomScreen");
    }, 3000);

    return () => clearTimeout(timerRef.current);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../assets/welcomebackground.jpg")}
      />
      <Text style={styles.title}>Bienvenue dans mon application</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    color: "#333",
  },
});

export default Splash;
