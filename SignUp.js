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
import { LinearGradient } from "expo-linear-gradient";
// import { handle } from "express/lib/application";

export default function SignUp({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = () => {
    checkIfUserIsAvail();
    Keyboard.dismiss();
    // navigation.popToTop();
  };

  const handleReturnToLogin = () => {
    navigation.navigate("Login");
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
    <View style={styles.backgroundContainer}>
      <LinearGradient
        colors={["#004d99", "#3399ff", "#99ccff"]}
        style={{ height: "60%", width: "100%" }}
      >
        <View style={styles.topContainer}>
          <TextInput
            placeholder="Enter your email"
            placeholderTextColor={"white"}
            value={username}
            onChangeText={(text) => setUsername(text)}
            style={styles.emailInput}
          />
          <TextInput
            placeholder="Enter your password"
            placeholderTextColor={"white"}
            secureTextEntry={true} // Mask the input for passwords
            value={password}
            onChangeText={(text) => setPassword(text)}
            style={styles.pwInput}
          />
          <TextInput
            placeholder="Confirm password"
            placeholderTextColor={"white"}
            secureTextEntry={true} // Mask the input for passwords
            value={password}
            onChangeText={(text) => setPassword(text)}
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
            // #0059b3", "#99ccff"
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
            // #0059b3", "#99ccff"
          >
            <Text style={styles.buttonText}>Login</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
    // <ScrollView
    //   contentContainerStyle={styles.container}
    //   keyboardShouldPersistTaps="handled"
    // >
    //   <View style={styles.container}>
    //     <View style={styles.centeredContent}>
    //       <Text style={styles.topText}>Welcome to Smart Campus</Text>
    //       <View style={styles.inputContainer}>
    //         <TextInput
    //           placeholder="Enter your email"
    //           value={username}
    //           onChangeText={(text) => setUsername(text)}
    //           style={styles.input}
    //         />
    //         <TextInput
    //           placeholder="Enter your password"
    //           secureTextEntry={true} // Mask the input for passwords
    //           value={password}
    //           onChangeText={(text) => setPassword(text)}
    //           style={styles.input}
    //         />
    //         <Button title="Sign up" onPress={handleSignUp} />
    //       </View>
    //     </View>
    //   </View>
    // </ScrollView>
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

  //additional styling here
  backgroundContainer: {
    // backgroundColor: "#336699",
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
      // backgroundColor: "red",
      height: "60%",
      width: "100%",
    },
  },
  emailInput: {
    //borderWidth: 1,
    height: 50,
    width: 270,
    marginTop: 345,
    borderBottomWidth: 1,
    borderBottomColor: "white",
    // borderWidth: 1,
    // borderRadius: 20,
    marginLeft: 75,
    // borderColor: "white",
    padding: 10,
    marginBottom: 10,
    // backgroundColor: "white",
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.23,
    fontFamily: "Avenir",
    color: "white",
    // opacity: 0.5,
  },
  pwInput: {
    height: 50,
    width: 270,
    // marginTop: 345,
    borderBottomWidth: 1,
    borderBottomColor: "white",
    // borderWidth: 1,
    // borderRadius: 20,
    marginLeft: 75,
    // borderColor: "white",
    padding: 10,
    marginBottom: 10,
    fontFamily: "Avenir",
    // opacity: 0.7,
    // backgroundColor: "white",
    shadowOffset: {
      width: 1,
      height: 2,
    },

    shadowOpacity: 0.23,
    color: "white",
    // opacity: 0.5,
  },
  signupButton: {
    // padding: 16,
    marginLeft: 75,
    marginTop: 15,
    // paddingHorizontal: 20,
    backgroundColor: "#004d99",
    borderRadius: 20,
    width: 270,
    height: 50,
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
    // marginLeft: 10,
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
