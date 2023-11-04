import * as React from "react";
import {
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Button,
  StyleSheet,
  Keyboard,
} from "react-native";
import Navigation from "./Navigation";
import { useState } from "react";
import Login from "./Login";
import axios from "axios";

export default function SignUp({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = () => {
    checkIfUserIsAvail();
    Keyboard.dismiss();
    // navigation.popToTop();
  };

  /* checks if username is available during sign up and creates a new user if available.
  if not, display message indicating username is not available */
  const checkIfUserIsAvail = () => {
    axios
      .get("http://192.168.50.163:3000/users/is-existing", {
        params: {
          user: username,
        },
      })
      .then((response) => {
        if (response.data == false) {
          createNewUser();
          //navigate to home page here
        } else {
          //display error message saying username is taken
        }
      })
      .catch((error) => {
        console.log("Error");
      });
  };

  /* function for creating a new user */
  const createNewUser = () => {
    const params = JSON.stringify({
      username: username,
      password: password,
    });

    axios
      .post("http://192.168.50.163:3000/users/add-user", params, {
        headers: {
          "content-type": "application/json",
        },
      })
      .then((response) => {
        console.log("DONE");
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
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
            <Button title="Sign up" onPress={handleSignUp} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
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
    alignItems: "center",
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
