import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Settings from "./app/screens/Settings";
import EditNameScreen from "./app/screens/EditNameScreen";
import EditPassword from "./app/screens/EditPassword";
import LoginScreen from "./app/screens/LoginScreen";
import FonctionaliterUser from "./app/screens/FonctionaliterUser";
import PointageUser from "./app/screens/PointageUser";
import DispoConge from "./app/screens/DispoConge";
import Consulterdisposition from "./app/screens/Consulterdisposition";
import WelcomeScreen from "./app/screens/WelcomScreen";
import DemandeConge from "./app/screens/DemandeConge";
import GererConge from "./app/screens/GererConge";
import ModifierConge from "./app/screens/ModifierConge";
import SupprimerConge from "./app/screens/SupprimerConge";
import Chrono from "./app/screens/Chrono";
import ForgetPassword from "./app/screens/ForgetPassword";
import Confirmation from "./app/screens/Confirmation";
import EditProfilePhoto from "./app/screens/EditPhotoProfil";
import Splash from "./app/screens/Splash";
import DemandeRemote from "./app/screens/DemandeRemote";
import RemoteEmployees from "./app/screens/RemoteEmployees";
import PresentielEmployees from "./app/screens/PresentielEmployees";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="splash"
          component={Splash}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="welcome"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="FonctionaliterUser"
          component={FonctionaliterUser}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
        <Stack.Screen name="confirmation" component={Confirmation} />
        <Stack.Screen name="GererConge" component={GererConge} />
        <Stack.Screen name="DemandeConge" component={DemandeConge} />
        <Stack.Screen name="ModifierConge" component={ModifierConge} />
        <Stack.Screen name="SupprimerConge" component={SupprimerConge} />
        <Stack.Screen name="PointageUser" component={PointageUser} />
        <Stack.Screen name="Chrono" component={Chrono} />
        <Stack.Screen name="DemandeRemote" component={DemandeRemote} />
        <Stack.Screen name="DispositionUser" component={Consulterdisposition} />
        <Stack.Screen
          name="PresentielEmployees"
          component={PresentielEmployees}
        />
        <Stack.Screen name="RemoteEmployees" component={RemoteEmployees} />
        <Stack.Screen name="DispoConge" component={DispoConge} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="EditName" component={EditNameScreen} />
        <Stack.Screen name="EditPassword" component={EditPassword} />
        <Stack.Screen name="EditPhotoProfil" component={EditProfilePhoto} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
