import React from "react";
import { StyleSheet, View, FlatList, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ListItem from "../components/ListItem";
import ListItemSeparator from "../components/ListItemSeparator";
import colors from "../config/colors";
import Icon from "../components/Icon";
import Screen from "../components/Screen";

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

function Seetings(props) {
  const navigation = useNavigation();

  const handleMenuItemPress = (screen) => {
    if (screen) {
      navigation.navigate(screen);
    }
  };

  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        <ListItem
          title="Wafa Sassi"
          subTitle="wafasassi213@gmail.com"
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

export default Seetings;
