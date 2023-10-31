import React, { useState } from 'react';
import { Text, View, TextInput, Button, StyleSheet, ScrollView, Keyboard  } from 'react-native';
import SignUp from './SignUp';
import App from './App';
//import HomeScreen from './HomeScreen';
//import Navigation from './Navigation';

function Login({ navigation }) {  
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');


const handleLogin = () => {
    // Handle the login logic here, e.g., send the data to a server
    console.log('Email:', username);
    console.log('Password:', password);
    Keyboard.dismiss();
    navigation.navigate('Home', this.state);
  };

  const handleSignUp = () => {
    //navigation.navigate('SignUp'); //navigate to sign up page
    console.log('Email:', username);
    console.log('Password:', password);
    Keyboard.dismiss();
  };

return (
    <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        > 
    <View style={styles.container}>
    <View style={styles.centeredContent}>
    <Text style={styles.topText}>Welcome to Smart Campus</Text>
    <View style={styles.inputContainer}>
    <TextInput
        placeholder="Enter your email"
        value={username}
        onChangeText={(text) => setUsername(text)}
        style={styles.input}
  />
  <TextInput
    placeholder="Enter your password"
    secureTextEntry={true} // Mask the input for passwords
    value={password}
    onChangeText={(text) => setPassword(text)}
    style={styles.input}
  />
  <Button title="Login" onPress={handleLogin} />
  <Button title="Sign up" onPress={() => navigation.navigate('SignUp')} />
</View>
</View>
</View>
</ScrollView>
);
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    topTextContainer: {
        flex: 1, // Take up some vertical space
        justifyContent: 'center', // Center vertically
      },
    topText: {
        textAlign:'center',
        fontSize: 24,
        //paddingTop: 60,
        paddingBottom: 20,
    },
    centeredContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
    verticalCenter: {
        flex: 1,
        justifyContent: 'center',
    },
    
    inputContainer: {
      width: '100%', // Adjust as needed
    },
    input: {
      //borderWidth: 1,
      height: 50,
      width:270,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
      padding: 10,
      marginBottom: 10,
    },
    lineInput: {
        borderWidth: 0,
    }
  });

  export default Login;
/*
const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
  });
  */