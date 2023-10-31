import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './Login';
import SignUp from './SignUp';
import HomeScreen from './HomeScreen';
import { StyleSheet, Text, View } from "react-native";
import ManageBookings from './ManageBookings';
import Logout from './Logout';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//import TabNavigator from './TabNavigator';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Home" options={{ headerShown: false }} component={HomeScreen}  />
      </Stack.Navigator>
    
  
  <NavigationContainer>
    </NavigationContainer>
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
        else if (route.name === 'Login') {
          iconName = focused ? 'ios-person' : 'ios-person-outline';
        }


        // You can return any component that you like here!
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: 'tomato',
      tabBarInactiveTintColor: 'gray',
    })}
    >
    <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
    <Tab.Screen name="Manage Bookings" component={ManageBookings} options={{ headerShown: false }} />
    <Tab.Screen name="Logout" component={Logout} options={{ headerShown: false }} />
    <Tab.Screen name="Login" component={Login} />
    
  </Tab.Navigator>
  </NavigationContainer>
  
  
 ) 
      
}

export default Navigation;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
