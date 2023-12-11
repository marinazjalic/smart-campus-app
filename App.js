// import { ContextProvider, MyContext } from "./MyContext";

// import { UserContext, UserProvider } from "./global/UserContext";
//import { createStackNavigator } from '@react-navigation/stack';
import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, Alert, View } from "react-native";
import HomeScreen from "./HomeScreen";
import ManageBookings from "./ManageBookings";
import Logout from "./Logout";
import Login from "./Login";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import AIRoomFinder from "./AIRoomFinder";
import Confirmation from "./Confirmation";
import SuggestionScreen from "./SuggestionScreen";
import { createStackNavigator } from "@react-navigation/stack";
import SignUp from "./SignUp";
import { AppProvider } from "./AppContext";
import { ContextProvider, MyContext } from "./MyContext";
import { LinearGradient } from "expo-linear-gradient";
import { LogBox } from "react-native";
import { UserContext, UserProvider } from "./global/UserContext";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
LogBox.ignoreLogs(["Warning: ..."]);

LogBox.ignoreAllLogs();
console.disableYellowBox = true;

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "ios-home" : "ios-home-outline";
          } else if (route.name === "Logout") {
            iconName = focused ? "ios-close" : "ios-close-outline";
          } else if (route.name == "Manage Bookings") {
            iconName = focused
              ? "ios-information-circle"
              : "ios-information-circle-outline";
          } else if (route.name === "Logout") {
            iconName = focused ? "ios-person" : "ios-person-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#0099ff",
        tabBarInactiveTintColor: "#999999",
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Manage Bookings"
        component={ManageBookings}
        options={{
          headerShown: true,
          headerTintColor: "white",
          headerTitleStyle: {
            fontFamily: "Avenir",
            fontSize: 18,
            fontWeight: "bold",
          },
          headerBackground: () => (
            <LinearGradient
              colors={["#0059b3", "#3399ff", "#99ccff"]}
              style={{ flex: 1 }}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Logout"
        component={Logout}
        options={{ headerShown: false }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();

            Alert.alert("Logout", "Are you sure you want to logout?", [
              {
                text: "No",
                style: "cancel",
              },
              {
                text: "Yes",
                onPress: () => navigation.navigate("Login"),
              },
            ]);
          },
        })}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <AppProvider>
      <UserProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen
              name="Home"
              component={TabNavigator}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Confirmation" component={Confirmation} />
            <Stack.Screen
              name="SignUp"
              component={SignUp}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Suggestions"
              component={SuggestionScreen}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </UserProvider>
    </AppProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
