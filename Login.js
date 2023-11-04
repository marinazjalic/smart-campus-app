import React, { useState } from 'react';
import { Text, View, ActivityIndicator, TextInput, Button, StyleSheet, ScrollView, Keyboard  } from 'react-native';
import SignUp from './SignUp';
import App from './App';
import { TouchableOpacity } from 'react-native-gesture-handler';
//import HomeScreen from './HomeScreen';
//import Navigation from './Navigation';

function Login({ navigation }) {  
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const [isLoading, setIsLoading] = useState(false);



const handleLogin = async () => {
    // Handle the login logic here, e.g., send the data to a server
    setIsLoading(true);
    console.log('Email:', username);
    console.log('Password:', password);
    Keyboard.dismiss();
    setTimeout(() => {
      setIsLoading(false);
      // Proceed with  navigation
      navigation.navigate('Home', { username });
    }, 3000);

    console.log('Navigating with username:', username);
    //navigation.navigate('Home', { username });
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
  <TouchableOpacity
        style= {{ padding:16, marginTop:10, paddingHorizontal:20, backgroundColor: '#3E92CC', borderRadius: 10}}
        onPress={handleLogin}
      >
        <Text style={{ fontSize:12, color: 'white'}}>Login</Text>
  </TouchableOpacity>
<>
  {isLoading && <ActivityIndicator size="small" color="#0000ff" />}
  </>
  <TouchableOpacity
        style= {{ padding:16, marginTop: 6, backgroundColor: '#3E92CC', borderRadius: 10}}
        onPress={() => navigation.navigate('SignUp')}
      >
        <Text style={{ fontSize:12, color:'white'}}>Sign up</Text>
  </TouchableOpacity>
  <Text style={{marginBottom:4, marginTop:6}}>Don't have an account?</Text>



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