import React, { useEffect, useState, useContext } from "react";
import {
  Text,
  View,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Keyboard,
  ImageBackground,
  Dimensions,
} from "react-native";
import SignUp from "./SignUp";
import ActivityIndicator from "react-native";
import axios from "axios";
import { UserContext } from "./global/UserContext";
import Strings from "./constants/Strings";
import { TouchableOpacity } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import { LogBox } from "react-native";
//import Navigation from './Navigation';

function Login({ navigation }) {
  LogBox.ignoreLogs(["Warning: ..."]);
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [data, setData] = useState(null);

  const { bookings, setBookings } = useContext(UserContext);
  const { userId, setUserId } = useContext(UserContext);

  const bookings_arr = [];
  let booking_id = 0;

  const resetSelections = () => {
    setUsername("");
    setPassword("");
  };

  const handleLogin = () => {
    validateCredentials();
    Keyboard.dismiss();
  };

  const validateCredentials = () => {
    const params = JSON.stringify({
      username: username,
      password: password,
    });

    axios
      .post(
        `http://${Strings.ip_address}:3000/users/validate-credentials`,
        params,
        {
          headers: {
            "content-type": "application/json",
          },
        }
      )
      .then((response) => {
        if (response.data == true) {
          getUserID();
        } else if (response.data == false) {
          //display some kind of error message indicating invalid credentials
          console.log("incorrect pw");
        } else {
          //display error message indicating that the user doesn't exist
          console.log("user does not exist");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getUserID = () => {
    axios
      .get(`http://${Strings.ip_address}:3000/users/get-id`, {
        params: {
          user: username,
        },
      })
      .then((response) => {
        setUserId(response.data);
        getUserBookings(response.data);
        navigation.navigate("Home", {
          screen: "Home",
          params: { userBookings: bookings_arr },
        });
        resetSelections();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /*function to get user bookings and room details for each booking.
  combine the details into an object to make the bookings array */
  const getUserBookings = async (userID) => {
    const upcomingBookings = await getUpcomingBookings(userID);
    for (let i = 0; i < upcomingBookings.length; i++) {
      booking_id++;
      let time_slot =
        upcomingBookings[i].start_time + " - " + upcomingBookings[i].end_time;
      let parsedDate = upcomingBookings[i].date.toString().split("-");
      let newDate = new Date(upcomingBookings[i].date.split("T")[0]);

      let formattedDate =
        weekdays[newDate.getDay() + 1] +
        ", " +
        months[parsedDate[1] - 1] +
        " " +
        (Number(newDate.getDate()) + 1).toString();
      const room_details = await getRoomDetails(upcomingBookings[i].room_id);

      let booking_obj = {
        id: booking_id.toString(),
        dateText: formattedDate,
        dateObj: new Date(upcomingBookings[i].date),
        time: time_slot,
        room_num: room_details.room_num,
        location: room_details.location,
        accessibility: room_details.accessibility,
        utilities: room_details.utilities,
        capacity: room_details.capacity,
        bookingId: upcomingBookings[i]._id,
        room_id: upcomingBookings[i].room_id,
      };
      bookings_arr.push(booking_obj);
    }
    setBookings(bookings_arr);
    setData(bookings_arr);
  };

  //function to get all bookings associated to user
  const getUpcomingBookings = async (userID) => {
    const response = await axios.get(
      `http://${Strings.ip_address}:3000/bookings/by-user`,
      {
        params: {
          user_id: userID,
        },
      }
    );
    const data = await response.data;
    return data;
  };

  const handleSignUp = () => {
    console.log("Email:", username);
    console.log("Password:", password);

    Keyboard.dismiss();
  };

  const getRoomDetails = async (roomID) => {
    const response = await axios.get(
      `http://${Strings.ip_address}:3000/rooms/get-room`,
      {
        params: {
          id: roomID,
        },
      }
    );

    const obj = await response.data;
    return obj;
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
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
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
      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Dont have an account?</Text>
        <TouchableOpacity
          // style={styles.signupButton}
          onPress={() => navigation.navigate("SignUp")}
        >
          <Text style={styles.signBtnText}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "white",
  },
  topTextContainer: {
    flex: 1, // Take up some vertical space
    justifyContent: "center", // Center vertically
  },
  topText: {
    textAlign: "center",
    fontSize: 24,
    color: "white",
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
    width: "100%",
    alignItems: "center",
  },
  emailInput: {
    height: "15%",
    width: "63%",
    marginTop: "93%",
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
    height: "15%",
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
  lineInput: {
    borderWidth: 0,
  },
  loginButton: {
    marginLeft: "18%",
    marginTop: "4%",
    backgroundColor: "#004d99",
    borderRadius: 20,
    width: "63%",
    height: "36%",
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.23,
  },
  buttonText: {
    fontSize: 15,
    color: "white",
    textAlign: "center",
    fontFamily: "Avenir",
    fontWeight: "bold",
    paddingTop: 13,
  },
  signupText: {
    color: "#0099ff",
    paddingLeft: "25%",
    paddingTop: 15,
    fontFamily: "Avenir",
    fontSize: 16,
  },
  backgroundContainer: {
    // backgroundColor: "#336699",
    alignItems: "center",
    flex: 1,
  },
  topContainer: {
    // backgroundColor: "red",
    height: "60%",
    width: "100%",
  },
  bottomContainer: {
    height: "33%",
    width: "100%",
    backgroundColor: "white",
  },
  gradientButton: {
    height: "100%",
    width: "100%",
    borderRadius: 20,
  },
  signupContainer: {
    backgroundColor: "white",
    height: "12%",
    width: "100%",
    flexDirection: "row",
  },
  signupButton: {
    // padding: 16,
    // marginLeft: 75,
    // marginTop: 15,
    // paddingHorizontal: 20,
    // backgroundColor: "#004d99",
    borderRadius: 20,
    width: 75,
    height: 50,
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.23,
  },
  signBtnText: {
    fontSize: 15,
    color: "#0099ff",
    textAlign: "center",
    fontFamily: "Avenir",
    fontWeight: "bold",
    paddingTop: 15,
    paddingLeft: 5,
  },
  forgotText: {
    color: "white",
    marginLeft: 150,
    marginTop: 5,
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
