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
import Svg, { Path } from 'react-native-svg';

//const Stack1 = createStackNavigator();


function Confirmation({ navigation, route }) {
  const { startTime, endTime, selectedDate, isAccessibleSelected, isWhiteboardSelected, roomCapacity, selectedBuilding } = route.params;

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

    const RoomFeatures = ({ isAccessibleSelected, isWhiteboardSelected }) => {
      return (
        <View style={{ flexDirection: 'row'}}>
          
          {/* Render Accessible Icon if isAccessible is true */}
          {isAccessibleSelected && <IconAcessible />}
          
          {/* Render Whiteboard Icon if isWhiteboard is true */}
          {isWhiteboardSelected && <IconWhiteboard />}
        </View>
      );
    };

    function IconAcessible() {
      return (
        <Svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 32 32"
        >
          <Path d="M22.621 23.668a1.245 1.245 0 00-1.69.496l-.003.006c-1.512 2.749-4.389 4.581-7.694 4.581a8.751 8.751 0 01-5.272-15.736l.022-.016a1.25 1.25 0 10-1.505-1.996l.003-.002c-2.744 2.074-4.499 5.332-4.499 9 0 6.213 5.037 11.25 11.25 11.25 4.248 0 7.947-2.355 9.861-5.831l.029-.058a1.25 1.25 0 00-.495-1.69l-.006-.003zm8.592 1.029a1.25 1.25 0 00-1.524-.908l.009-.002-2.885.721-2.701-7.912a1.255 1.255 0 00-1.184-.846h-8.855l-.385-2.5H18a1.25 1.25 0 000-2.5h-4.697L12.7 6.83a3.311 3.311 0 10-2.493.38l.023.005 1.534 9.975c.095.604.612 1.06 1.235 1.06h9.033l2.783 8.154a1.255 1.255 0 001.495.807l-.009.002 4-1a1.252 1.252 0 00.908-1.525l.002.009z"></Path>
        </Svg>
      );
    }


    function IconPerson() {
      return (
        <Svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 32 32"
        >
          < Path d="M16 15.503A5.041 5.041 0 1016 5.42a5.041 5.041 0 000 10.083zm0 2.215c-6.703 0-11 3.699-11 5.5v3.363h22v-3.363c0-2.178-4.068-5.5-11-5.5z"></Path>
        </Svg>
      );
    }

    function IconWhiteboard() {
      return (
        <Svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          className="bi bi-easel"
          viewBox="0 0 16 16"
        >
          <Path d="M8 0a.5.5 0 01.473.337L9.046 2H14a1 1 0 011 1v7a1 1 0 01-1 1h-1.85l1.323 3.837a.5.5 0 11-.946.326L11.092 11H8.5v3a.5.5 0 01-1 0v-3H4.908l-1.435 4.163a.5.5 0 11-.946-.326L3.85 11H2a1 1 0 01-1-1V3a1 1 0 011-1h4.954L7.527.337A.5.5 0 018 0zM2 3v7h12V3H2z"></Path>
        </Svg>
      );
    }


    return(
        <View style={{ flex: 3, backgroundColor:'#3A5683', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
            <View style={styles.container}>
            <View style={styles.card}>
            <Text style={{fontSize: 24, marginTop:60, marginBottom:5}}>RESERVED</Text>
            <View style={{ flexDirection: 'row'}}>
              <RoomFeatures isAccessibleSelected={isAccessibleSelected} isWhiteboardSelected={isWhiteboardSelected} />
          <Text> Location: {selectedBuilding}</Text>

          </View>
          <View style={{ flexDirection: 'row' }}>
          <IconPerson />
          <Text> {roomCapacity} </Text>
          </View>
          
          <Text style= {{ marginBottom: 30}}>{selectedDate}</Text>
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
      backgroundColor: '#3A5683',
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
