import * as React from "react";
import {
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Button,
  Image,
  StyleSheet,
  Keyboard,
  Alert,
} from "react-native";
import Navigation from "./Navigation";
import { useState } from "react";
import Login from "./Login";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import Strings from "./constants/Strings";
// import { handle } from "express/lib/application";

export default function SignUp({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = () => {
    console.log("Password:", password, "Confirm Password:", confirmPassword);
    if (password == confirmPassword) {
      checkIfUserIsAvail();
    } else {
      Alert.alert(
        "Error",
        "Passwords do not match.",
        [{ text: "OK", style: "cancel" }],
        { cancelable: true }
      );
    }
    Keyboard.dismiss();
  };

  const handleReturnToLogin = () => {
    navigation.navigate("Login");
  };

  const resetSelections = () => {
    setUsername("");
    setPassword("");
    setConfirmPassword("");
  };

  /* checks if username is available during sign up and creates a new user if available.
  if not, display message indicating username is not available */
  const checkIfUserIsAvail = () => {
    axios
      .get(`http://${Strings.ip_address}:3000/users/is-existing`, {
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
      .post(`http://${Strings.ip_address}:3000/users/add-user`, params, {
        headers: {
          "content-type": "application/json",
        },
      })
      .then((response) => {
        resetSelections();
        navigation.navigate("Login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View style={styles.backgroundContainer}>
      <LinearGradient
        colors={["#004d99", "#3399ff", "#99ccff"]}
        style={{ height: "60%", width: "100%" }}
      >
        <View style={styles.topContainer}>
          <Image
            source={require("./assets/logo.png")}
            style={{
              width: "69%",
              height: "20%",
              marginTop: "60%",
              marginLeft: "15%",
              resizeMode: "contain",
            }}
          />
          <TextInput
            placeholder="Enter your email"
            placeholderTextColor={"white"}
            autoCapitalize="none"
            value={username}
            onChangeText={(text) => setUsername(text)}
            style={styles.emailInput}
          />
          <TextInput
            placeholder="Enter your password"
            placeholderTextColor={"white"}
            secureTextEntry={true}
            value={password}
            onChangeText={(text) => setPassword(text)}
            style={styles.pwInput}
          />
          <TextInput
            placeholder="Confirm password"
            placeholderTextColor={"white"}
            secureTextEntry={true}
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
            style={styles.pwInput}
          />
        </View>
      </LinearGradient>
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.signupButton} onPress={handleSignUp}>
          <LinearGradient
            colors={["#3399ff", "#80bfff"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradientButton}
          >
            <Text style={styles.buttonText}>Sign Up</Text>
          </LinearGradient>
        </TouchableOpacity>
        <View style={styles.returnContainer}>
          <View style={styles.dividerLeft}></View>
          <Text style={styles.textStyle}>or</Text>
          <View style={styles.dividerRight}></View>
        </View>
        <TouchableOpacity
          style={styles.signupButton}
          onPress={handleReturnToLogin}
        >
          <LinearGradient
            colors={["#3399ff", "#80bfff"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradientButton}
          >
            <Text style={styles.buttonText}>Login</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundContainer: {
    alignItems: "center",
    flex: 1,
  },
  bottomContainer: {
    backgroundColor: "white",
    height: "40%",
    width: "100%",
  },
  topContainer: {
    topContainer: {
      height: "60%",
      width: "100%",
    },
  },
  emailInput: {
    height: "10%",
    width: "63%",
    // marginTop: "25%",
    borderBottomWidth: 1,
    borderBottomColor: "white",
    marginLeft: "18%",
    padding: 10,
    marginBottom: 10,
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.23,
    fontFamily: "Avenir",
    color: "white",
  },
  pwInput: {
    height: "8%",
    width: "63%",
    borderBottomWidth: 1,
    borderBottomColor: "white",
    marginLeft: "18%",
    padding: 10,
    marginBottom: 10,
    fontFamily: "Avenir",
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.23,
    color: "white",
  },
  signupButton: {
    marginLeft: "18%",
    marginTop: "4%",
    backgroundColor: "#004d99",
    borderRadius: 20,
    width: "63%",
    height: "12%",
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.23,
  },
  gradientButton: {
    height: "100%",
    width: "100%",
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 15,
    color: "white",
    textAlign: "center",
    fontFamily: "Avenir",
    fontWeight: "bold",
    paddingTop: 13,
  },

  returnContainer: {
    backgroundColor: "white",
    width: "100%",
    height: "10%",
    marginTop: 25,
    flexDirection: "row",
  },
  dividerLeft: {
    height: 1,
    width: "42%",
    backgroundColor: "#cccccc",
    marginTop: 10,
    marginLeft: 20,
  },
  dividerRight: {
    height: 1,
    width: "42%",
    backgroundColor: "#cccccc",
    marginTop: 10,
    marginRight: 20,
  },

  textStyle: {
    fontFamily: "Avenir",
    color: "#cccccc",
    fontSize: 15,
    marginRight: 5,
    marginLeft: 5,
  },
});
