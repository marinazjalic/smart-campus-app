/*
import * as React from 'react';
import Navigation from './Navigation';
import { NavigationContainer } from '@react-navigation/native';


export default function App() {
  return (
    <NavigationContainer>
      <Navigation />
      </NavigationContainer>
    
  );
}

/*
import React from 'react';
import Navigation from './Navigation'; // Adjust the path as needed

const App = ({ navigate}) => {
  return (
  <Navigation />
  );
}

export default App;
*/

import React from 'react';
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, Alert, View } from "react-native";
import HomeScreen from './HomeScreen';
import ManageBookings from './ManageBookings';
import Logout from './Logout';
import Login from './Login';
import { NavigationContainer } from '@react-navigation/native';
import {createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
//import { createStackNavigator } from '@react-navigation/stack';



const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'ios-home'
                : 'ios-home-outline';
            } else if (route.name === 'Logout') {
              iconName = focused ? 'ios-close' : 'ios-close-outline';
            }else if (route.name == 'Manage Bookings') {
              iconName = focused ? 'ios-information-circle' : 'ios-information-circle-outline';
            }
            else if (route.name === 'Logout') {
              iconName = focused ? 'ios-person' : 'ios-person-outline';
            }


            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'blue',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Tab.Screen name="Manage Bookings" component={ManageBookings} options={{ headerShown: true}} />
        <Tab.Screen 
        name="Logout" 
        component={Logout} 
        listeners={({ navigation }) => ({
          tabPress: e => {
            // Prevent default action
            e.preventDefault();
            
            Alert.alert(
              "Logout",
              "Are you sure you want to logout?",
              [
                {
                  text: "No",
                  style: "cancel"
                },
                {
                  text: "Yes",
                  onPress: () => navigation.navigate('Login')
                }
              ]
            );
          },
        })}
        />
        
      </Tab.Navigator>
    </NavigationContainer>
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
