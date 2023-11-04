import React from 'react';
import { Text, View, StyleSheet} from 'react-native';
import { Button } from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LogoutScreen from './Logout';
import UpcomingBookings from './UpcomingBookings';
import AIRooomFinder from './AIRoomFinder';
import HomeScreen from './HomeScreen';
import App from './App';
//const Stack1 = createStackNavigator();


function Confirmation({ navigation }) {
/*
  <NavigationContainer>
      <Stack1.Navigator initialRouteName="Home">
        <Stack1.Screen name="Home" component={HomeScreen} />
        <Stack1.Screen name="App" component={App} />
        <Stack1.Screen name="Room" component={AIRooomFinder} />
        <Stack1.Screen name="Confirmation" component={Confirmation} /> 
        <Stack1.Screen name="Logout" component={LogoutScreen} />
      </Stack1.Navigator>
    </NavigationContainer>
  */
    function handleGoBackHome() {
        

    }

    return(
        <View style={{ flex: 3, backgroundColor:'white', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
            <View style={styles.container}>
            <View style={styles.card}>
            <Text style={{fontSize: 24, marginTop:60}}>RESERVED</Text>
          <Text> Room location</Text>
          <Text style= {{ marginBottom: 30}}>Day and time</Text>
          <Button title='Go home' onPress={() => navigation.navigate('Home')} color="#0B7DF1" />

        </View>

      </View>
      </View>
        
    );
}

export default Confirmation;

const styles = StyleSheet.create({
    container: {
      flex: 3,
      width:'90%',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fff',
    },
    card: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30,
        marginBottom: 10,
        borderRadius: 20, // Adjust for desired corner radius
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: {
          width: 1,
          height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.99,
        elevation: 10,
      },
    text: {
      fontSize: 16, // Adjust the font size as needed
      color: '#000', // Adjust text color as needed
    },
  });
