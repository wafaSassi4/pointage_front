import React from "react";
import { useState, useEffect } from "react";
import { StyleSheet, View, FlatList, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ListItem from "../components/ListItem";
import ListItemSeparator from "../components/ListItemSeparator";
import colors from "../config/colors";
import Icon from "../components/Icon";
import Screen from "../components/Screen";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const menuItems = [
  {
    title: "Modifier le nom",
    icon: {
      name: "account-edit",
      backgroundColor: colors.primary,
    },
    screen: "EditName",
  },
  {
    title: "Modifier le mot de passe",
    icon: {
      name: "account-key",
      backgroundColor: colors.secondary,
    },
    screen: "EditPassword",
  },
  {
    title: "Changer la profile photo",
    icon: {
      name: "account-tie-outline",
      backgroundColor: colors.caramel,
    },
    screen: "EditPhotoProfil",
  },
];

function Settings(props) {
  const [fullname, setFullname] = useState("");

  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchFullname = async () => {
      try {
        const storedFullname = await AsyncStorage.getItem("fullname");
        if (storedFullname) {
          setFullname(storedFullname);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchFullname();

    const fetchEmail = async () => {
      try {
        const storedEmail = await AsyncStorage.getItem("email");
        if (storedEmail) {
          setEmail(storedEmail);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchEmail();
  }, []);
  const navigation = useNavigation();

  const handleMenuItemPress = (screen) => {
    if (screen) {
      navigation.navigate(screen);
    }
  };

  const handleLogout = async () => {
    try {
      const res = await axios.post("http://192.168.1.35:3000/user/logout");
      if (res.status === 200) {
        // Supprimez les données d'authentification stockées localement
        await AsyncStorage.removeItem("userId");
        await AsyncStorage.removeItem("userToken");
        await AsyncStorage.removeItem("fullname");

        // Réinitialisez l'état de la navigation pour nettoyer l'historique de la pile
        navigation.reset({
          index: 0,
          routes: [{ name: "Login" }],
        });
      }
    } catch (error) {
      console.error("Erreur lors de la déconnexion", error);
      // Affichez un message d'erreur si la déconnexion échoue
      alert("La déconnexion a échoué, veuillez réessayer.");
    }
  };

  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        <ListItem
          title={fullname}
          subtitle={email}
          image={require("../assets/pdp.jpg")}
        />
      </View>
      <View style={styles.container}>
        <FlatList
          data={menuItems}
          keyExtractor={(menuItem) => menuItem.title}
          ItemSeparatorComponent={ListItemSeparator}
          renderItem={({ item }) => (
            <TouchableOpacity>
              <ListItem
                onPress={() => handleMenuItemPress(item.screen)}
                title={item.title}
                IconComponent={
                  <Icon
                    name={item.icon.name}
                    backgroundColor={item.icon.backgroundColor}
                  />
                }
              />
            </TouchableOpacity>
          )}
        />
      </View>
      <ListItem
        title="Déconnexion"
        IconComponent={<Icon name="logout" backgroundColor="#ffe66d" />}
        onPress={handleLogout}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.claire,
  },
  container: {
    marginVertical: 20,
  },
});

export default Settings;
