import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Settings from "./app/screens/Settings";
import EditNameScreen from "./app/screens/EditNameScreen";
import EditPassword from "./app/screens/EditPassword";
import LoginScreen from "./app/screens/LoginScreen";
import FonctionaliterUser from "./app/screens/FonctionaliterUser";
import PointageUser from "./app/screens/PointageUser";
import Consulterdisposition from "./app/screens/Consulterdisposition";
import WelcomeScreen from "./app/screens/WelcomScreen";
import DemandeConge from "./app/screens/DemandeConge";
import GererConge from "./app/screens/GererConge";
import ModifierConge from "./app/screens/ModifierConge";
import SupprimerConge from "./app/screens/SupprimerConge";
import Chrono from "./app/screens/Chrono";
import ForgetPassword from "./app/screens/ForgetPassword";
import Confirmation from "./app/screens/Confirmation";
import Splash from "./app/screens/Splash";
import DemandeRemote from "./app/screens/DemandeRemote";
import RemoteEmployees from "./app/screens/RemoteEmployees";
import PresentielEmployees from "./app/screens/PresentielEmployees";
import ModifierLanguage from "./app/screens/ModifierLanguage";
import GererRemote from "./app/screens/GererRemote";
import LoginRh from "./app/screens/LoginRh";
import GererEmployer from "./app/screens/GererEmployer";
import VacationManagement from "./app/screens/VacationManagement";
import SupprimerRh from "./app/screens/SupprimerRh";
import EditPasswordRh from "./app/screens/EditPasswordRh";
import EditNameRH from "./app/screens/EditNameRH";
import AjouterRh from "./app/screens/AjouterRh";
import EmployeeHistory from "./app/screens/EmployeeHistory";
import AjouterEmployer from "./app/screens/AjouterEmployer";
import ModifierEmployer from "./app/screens/ModifierConge";
import SuivieEmployer from "./app/screens/SuivieEmployer";
import AccountScreen from "./app/screens/AccountScreen";
import PointerRH from "./app/screens/PointerRH";
import Supprimer from "./app/screens/Supprimer";
import CongeEmployee from "./app/screens/CongeEmployee";
import { LanguageProvider } from "./app/screens/LanguageContext"; // Importez le fournisseur de langue

const Stack = createStackNavigator();

const App = () => {
  return (
    <LanguageProvider>
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
          <Stack.Screen name="ForgetPassword" component={ForgetPassword} 
            options={{ headerShown: false }} />
          <Stack.Screen name="confirmation" component={Confirmation} 
            options={{ headerShown: false }}/>
          <Stack.Screen name="GererConge" component={GererConge} 
            options={{ headerShown: false }}/>
          <Stack.Screen name="DemandeConge" component={DemandeConge}
            options={{ headerShown: false }} />
          <Stack.Screen name="ModifierConge" component={ModifierConge} 
            options={{ headerShown: false }} />
          <Stack.Screen name="SupprimerConge" component={SupprimerConge} 
            options={{ headerShown: false }}/>
          <Stack.Screen name="PointageUser" component={PointageUser} 
            options={{ headerShown: false }} />
          <Stack.Screen name="Chrono" component={Chrono} 
            options={{ headerShown: false }}/>
          <Stack.Screen name="DemandeRemote" component={DemandeRemote} 
            options={{ headerShown: false }}/>
          <Stack.Screen
            name="DispositionUser"
            component={Consulterdisposition}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PresentielEmployees"
            component={PresentielEmployees}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="RemoteEmployees" component={RemoteEmployees}
            options={{ headerShown: false }} />
          <Stack.Screen name="Settings" component={Settings} 
            options={{ headerShown: false }}/>
          <Stack.Screen name="EditNameScreen" component={EditNameScreen} 
            options={{ headerShown: false }} />
          <Stack.Screen name="EditPassword" component={EditPassword} 
            options={{ headerShown: false }}/>
          <Stack.Screen name="ModifierLanguage" component={ModifierLanguage}
            options={{ headerShown: false }} />
          <Stack.Screen name="GererRemote" component={GererRemote} 
            options={{ headerShown: false }} />
          <Stack.Screen
            name="LoginRh"
            component={LoginRh}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PointerRH"
            component={PointerRH}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="EmployeeHistory" component={EmployeeHistory} 
            options={{ headerShown: false }} />
          <Stack.Screen
            name="VacationManagement"
            component={VacationManagement}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AjouterRh"
            component={AjouterRh}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="GererEmployer"
            component={GererEmployer}
            options={{ headerShown: false }}
          /><Stack.Screen
          name="ModifierEmployer"
          component={ModifierEmployer}
          options={{ headerShown: false }}
        />
          <Stack.Screen
            name="SuivieEmployer"
            component={SuivieEmployer}
            options={{ headerShown: false }}
          />{" "}
          <Stack.Screen
            name="AjouterEmployer"
            component={AjouterEmployer}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ModifierEmployer"
            component={ModifierEmployer}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="EditNameRH"
            component={EditNameRH}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="EditPasswordRH"
            component={EditPasswordRh}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SupprimerRH"
            component={SupprimerRh}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AccountScreen"
            component={AccountScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Supprimer"
            component={Supprimer}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CongeEmployee"
            component={CongeEmployee}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </LanguageProvider>
  );
};

export default App;
