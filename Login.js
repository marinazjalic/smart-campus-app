import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Keyboard,
} from "react-native";
import SignUp from "./SignUp";
import ActivityIndicator from "react-native";
import axios from "axios";
//import Navigation from './Navigation';

function Login({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const bookings_arr = [];
  let booking_id = 0;

  const handleLogin = () => {
    validateCredentials();
    console.log("reached");
    // getUserID();

    Keyboard.dismiss();
    navigation.navigate("Home", this.state);
  };

  //function called on login
  const validateCredentials = () => {
    const params = JSON.stringify({
      username: username,
      password: password,
    });

    axios
      .post("http://192.168.50.163:3000/users/validate-credentials", params, {
        headers: {
          "content-type": "application/json",
        },
      })
      .then((response) => {
        if (response.data == true) {
          // navigation.navigate("Home");
          // setUsername(username)
          //navigate to home page here
          console.log("valid user");
        } else if (response.data == false) {
          //display some kind of error message indicating invalid credentials
          console.log("incorrect pw");
        } else {
          //display error message indicating that the user doesn't exist - "did you mean to sign up?"
          console.log("user does not exist");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //move to home page, this should be called once the user has logged in and the state has changed
  const getUserID = () => {
    axios
      .get("http://192.168.50.163:3000/users/get-id", {
        params: {
          user: username,
        },
      })
      .then((response) => {
        getUpcomingBookings(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getUpcomingBookings = (userID) => {
    axios
      .get("http://192.168.50.163:3000/bookings/by-user", {
        params: {
          user_id: userID,
        },
      })
      .then((response) => {
        console.log("here");
        for (let i = 0; i < response.data.length; i++) {
          booking_id++;
          //will need to do some kind of conversion here with the times
          let time_slot =
            response.data[i].start_time + " - " + response.data[i].end_time;

          let parsedDate = response.data[i].date.toString().split("-");
          //   //also want to add other properties here like room num
          let booking_obj = {
            id: booking_id.toString(),
            date:
              parsedDate[1] +
              "-" +
              parsedDate[2].split("T")[0] +
              "-" +
              parsedDate[0],
            time: time_slot,
            location: "", //need to get this info from different api
          };
          bookings_arr.push(booking_obj);
        }

        // console.log(bookings_arr);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSignUp = () => {
    //navigation.navigate('SignUp'); //navigate to sign up page
    console.log("Email:", username);
    console.log("Password:", password);
    Keyboard.dismiss();
  };

  // const getContent = () => {
  //   return <ActivityIndicator size="large" />;
  // };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.container}>
        {/* {getContent()} */}
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
            <Button
              title="Sign up"
              onPress={() => navigation.navigate("SignUp")}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

//STYLESHEET

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  topTextContainer: {
    flex: 1, // Take up some vertical space
    justifyContent: "center", // Center vertically
  },
  topText: {
    textAlign: "center",
    fontSize: 24,
    //paddingTop: 60,
    paddingBottom: 20,
  },
  centeredContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  verticalCenter: {
    flex: 1,
    justifyContent: "center",
  },

  inputContainer: {
    width: "100%", // Adjust as needed
  },
  input: {
    //borderWidth: 1,
    height: 50,
    width: 270,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    padding: 10,
    marginBottom: 10,
  },
  lineInput: {
    borderWidth: 0,
  },
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
