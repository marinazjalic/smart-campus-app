import * as React from 'react';
import { Text, View, ScrollView, TextInput, TouchableOpacity, Button, StyleSheet, Keyboard } from 'react-native';
import Navigation from './Navigation';
import { useState } from 'react';
import Login from './Login';

export default function SignUp({ navigation }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const handleSignUp = () => {
        console.log('Email:', username);
        console.log('Password:', password);
        Keyboard.dismiss();
        navigation.popToTop();
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
    <TouchableOpacity
        style= {{ padding:16, marginTop: 6, width:'20%', backgroundColor: '#3E92CC', borderRadius: 10}}
        onPress={handleSignUp}
      >
        <Text style={{ fontSize:12}}>Sign up</Text>
  </TouchableOpacity>
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
      backgroundColor: 'white',
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
      alignItems: 'center',
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



  