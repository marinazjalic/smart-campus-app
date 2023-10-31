import React from 'react';
import { Text, View, StyleSheet} from 'react-native';
import { Button } from 'react-native-elements';
import Confirmation from './Confirmation';

function AIRoomFinder({ navigation }) {

    function handleReservation() {
            //bring you to confirmation page here
    }
    function handleGoBack() {
        //goes back to home page
    }

    return(
        <View style={{ flex: 3, backgroundColor:'white', justifyContent: 'center', alignItems: 'center' }}>
            <View style={styles.container}>
            
            <View style={styles.card}>
            <Text style={{fontSize: 24, marginTop:60 }}>Sorry,</Text>
            <Text style={{fontSize: 18 }}>there are no available rooms</Text>
            <Text style={{fontSize: 18, marginBottom: 20}}>with those preferences...</Text>
        
        
          <Text style={styles.text}>Would you like to book this instead?</Text>
          <Text> Room location</Text>
          <Text style= {{ marginBottom: 30}}>Day and time</Text>
          <Button title='Reserve room' onPress={() => navigation.navigate('Confirmation')} color="#0B7DF1" style={{marginBottom:10}}/>
          <Button title='Go back' onPress={handleGoBack} color="#0B7DF1" />

        </View>

      </View>
      </View>
        
    );
}

export default AIRoomFinder;

const styles = StyleSheet.create({
    container: {
      flex: 3,
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
