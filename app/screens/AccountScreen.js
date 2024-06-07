import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useTranslation } from "react-i18next";

import ListItem from "../components/ListItem";
import ListItemSeparator from "../components/ListItemSeparator";
import colors from "../config/colors";
import Icon from "../components/Icon";
import Screen from "../components/Screen";

const menuItems = [
  {
    title: "Edit Name",
    icon: {
      name: "account-edit",
      backgroundColor: colors.primary,
    },
    screen: "EditNameRH",
  },
  {
    title: "Edit Password",
    icon: {
      name: "account-key",
      backgroundColor: colors.secondary,
    },
    screen: "EditPasswordRH",
  },
  {
    title: "Delete RH",
    icon: {
      name: "account-remove",
      backgroundColor: colors.medium,
    },
    screen: "SupprimerRH",
  },
  {
    title: "Change Language",
    icon: {
      name: "account-tie-outline",
      backgroundColor: colors.caramel,
    },
    screen: "ModifierLanguage",
  },
];

function AccountScreen(props) {
  const { t } = useTranslation();
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const navigation = useNavigation();

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

  const handleMenuItemPress = (screen) => {
    if (screen) {
      navigation.navigate(screen);
    }
  };

  const handleLogout = async () => {
    Alert.alert(
      t("logoutConfirmationTitle"),
      t("logoutConfirmationMessage"),
      [
        {
          text: t("logoutConfirmationCancel"),
          onPress: () => console.log("Déconnexion annulée"),
          style: "cancel",
        },
        {
          text: t("logoutConfirmationConfirm"),
          onPress: async () => {
            try {
              const res = await axios.post(
                "https://gcrbjwsr-3000.euw.devtunnels.ms/user/logout"
              );
              if (res.status === 200) {
                await AsyncStorage.removeItem("userId");
                await AsyncStorage.removeItem("userToken");
                await AsyncStorage.removeItem("fullname");

                navigation.reset({
                  index: 0,
                  routes: [{ name: "Login" }],
                });
              }
            } catch (error) {
              console.error("Erreur lors de la déconnexion", error);
              alert(t("logoutFailedMessage"));
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <ImageBackground
      blurRadius={10}
      style={styles.background}
      source={require("../assets/a2.jpg")}
    >
      <Screen style={styles.screen}>
        <View style={styles.container}>
          <ListItem
            title={fullname}
            subTitle={email}
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
                  title={t(item.title)}
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
          title={t("logoutTitle")}
          IconComponent={<Icon name="logout" backgroundColor="#ffe66d" />}
          onPress={handleLogout}
        />
      </Screen>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  screen: {},
  container: {
    marginVertical: 20,
  },
  background: {
    flex: 1,
    justifyContent: "flex-start",
    alignContent: "stretch",
  },
});

export default AccountScreen;
