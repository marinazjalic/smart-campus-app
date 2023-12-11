import React, { useState, useContext } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Button } from "react-native-elements";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LogoutScreen from "./Logout";
import UpcomingBookings from "./UpcomingBookings";
import AIRooomFinder from "./AIRoomFinder";
import HomeScreen from "./HomeScreen";
import App from "./App";
import { LinearGradient } from "expo-linear-gradient";
import Svg, { Path } from "react-native-svg";
import { UserContext } from "./global/UserContext";
import axios from "axios";
import Arrays from "./constants/Arrays";
import Strings from "./constants/Strings";

function Suggestions({ navigation }) {
  const { predictionObj, setPredictionObj } = useContext(UserContext);
  const { userId, setUserId } = useContext(UserContext);
  const { bookings, setBookings } = useContext(UserContext);
  const { forceUpdate, setForceUpdate } = useContext(UserContext);
  const [reloadFlag, setReloadFlag] = useState(false);
  function handleHomeButtonPress() {
    navigation.navigate("Home");
  }

  function handleReserveRoomPress() {
    createAndModifyBooking();
  }

  function Icon() {
    return (
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width="100"
        height="100"
        viewBox="0 0 16 16"
      >
        <Path
          fill="#0099ff"
          d="M8 1c3.9 0 7 3.1 7 7s-3.1 7-7 7-7-3.1-7-7 3.1-7 7-7zm0-1C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8z"
        ></Path>
        <Path
          fill="#0099ff"
          d="M7 6a1 1 0 11-2 0 1 1 0 012 0zM11 6a1 1 0 11-2 0 1 1 0 012 0zM11.3 12.3c-.7-1.1-2-1.8-3.3-1.8s-2.6.7-3.3 1.8l-.8-.6c.9-1.4 2.4-2.2 4.1-2.2s3.2.8 4.1 2.2l-.8.6z"
        ></Path>
      </Svg>
    );
  }

  const createNewBooking = async (room_id, start_time, end_time, date) => {
    const params = JSON.stringify({
      user_id: userId,
      room_id: room_id,
      start_time: start_time,
      end_time: end_time,
      date: date,
    });

    const response = await axios.post(
      `http://${Strings.ip_address}:3000/bookings/add`,
      params,
      {
        headers: {
          "content-type": "application/json",
        },
      }
    );

    const newBooking = await response.data;
    return newBooking;
  };

  const modifyAvailability = async (availID, start_time, end_time) => {
    var params = JSON.stringify({
      id: availID,
      status: "booked",
      start_time: start_time,
      end_time: end_time,
    });

    const response = await axios.post(
      `http://${Strings.ip_address}:3000/availability/get-by-id`,
      params,
      {
        headers: {
          "content-type": "application/json",
        },
      }
    );

    const result = await response.data;
    return result;
  };

  createAndModifyBooking = async () => {
    const newBooking = await createNewBooking(
      predictionObj.roomId,
      predictionObj.startTime,
      predictionObj.endTime,
      predictionObj.selectedDate
    );

    await modifyAvailability(
      predictionObj.availabilityId,
      predictionObj.startTime,
      predictionObj.endTime
    );

    const newDate = new Date(predictionObj.selectedDate);
    const formattedDate =
      Arrays.weekdays[newDate.getDay() + 1] +
      ", " +
      Arrays.months[newDate.getMonth()] +
      " " +
      Number(newDate.getDate() + 1).toString();

    reloadBookingData(new Date(newBooking.date), newBooking._id, formattedDate);
  };

  const reloadBookingData = (dateObj, bookingId, dateText) => {
    let objId;
    if (bookings.length > 0) {
      objId = bookings[bookings.length - 1].id++;
    } else {
      objId = 0;
    }
    let bookingObj = {
      id: objId,
      dateText: dateText,
      dateObj: dateObj,
      time: predictionObj.time,
      room_num: predictionObj.room_num,
      location: predictionObj.location,
      accessibility: predictionObj.accessibility,
      utilities: predictionObj.utilities,
      capacity: predictionObj.capacity,
      bookingId: bookingId,
      room_id: predictionObj.roomId,
    };
    var bookings_arr = bookings;
    bookings_arr.push(bookingObj);
    const sortBookings = bookings_arr.sort((a, b) => a.dateObj - b.dateObj);
    setBookings(sortBookings);
    setReloadFlag(!reloadFlag);
    setForceUpdate(!forceUpdate);

    Alert.alert(
      "Booking Confirmed!",
      "You have successfully booked this room.",
      [{ text: "OK", onPress: () => navigation.navigate("Home") }],
      { cancelable: false }
    );
  };

  return (
    <View
      style={{
        flex: 3,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <View style={styles.topContainer}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: "34%",
          }}
        >
          <Icon />
        </View>

        <Text style={styles.titleText}>Sorry...</Text>
        <Text style={styles.subtitleText}>
          There are no available rooms that meet your criteria.
        </Text>
      </View>
      <View style={styles.divider}></View>
      <View style={styles.bottomContainer}>
        <View style={styles.detailsContainer}>
          <Text style={styles.detailsTitle}>
            Do you want to book this room instead?
          </Text>
          <Text style={styles.detailsText}>Date: {predictionObj.dateText}</Text>
          <Text style={styles.detailsText}>Time: {predictionObj.time}</Text>
          <Text style={styles.detailsText}>
            Location: {predictionObj.location}
          </Text>
          <Text style={styles.detailsText}>Room: {predictionObj.room_num}</Text>
          <Text style={styles.detailsText}>
            Capacity: {predictionObj.capacity}
          </Text>
          <Text style={styles.detailsText}>
            This room is accessible and contains a whiteboard.
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={handleReserveRoomPress}
          >
            <LinearGradient
              colors={["#0073e6", "#3399ff", "#80bfff"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.gradientButton}
            >
              <Text style={styles.buttonText}>Reserve Room</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={handleHomeButtonPress}
          >
            {/* <Text style={styles.buttonText}>Return Home</Text> */}
            <LinearGradient
              colors={["#0073e6", "#3399ff", "#80bfff"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.gradientButton}
            >
              <Text style={styles.buttonText}>Return Home</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default Suggestions;

const styles = StyleSheet.create({
  container: {
    flex: 3,
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  card: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
    marginBottom: 10,
    borderRadius: 20, // Adjust for desired corner radius
    backgroundColor: "white",
    shadowColor: "#000",
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
    color: "#000", // Adjust text color as needed
  },
  topContainer: {
    backgroundColor: "white",
    height: "40%",
    width: "100%",
  },
  bottomContainer: {
    backgroundColor: "white",
    height: "70%",
    width: "100%",
  },
  titleText: {
    color: "#0099ff",
    fontFamily: "Avenir",
    fontSize: 30,
    marginTop: "4.5%",
    marginLeft: "41%",

    // textAlign: "center",
  },
  subtitleText: {
    color: "#0099ff",
    fontFamily: "Avenir",
    fontSize: 20,
    // marginTop: "4.5%",
    textAlign: "center",
  },
  divider: {
    height: 1,
    width: "93%",
    backgroundColor: "#0099ff",
  },
  detailsTitle: {
    color: "#999999",
    fontFamily: "Avenir",
    fontWeight: "bold",
    fontSize: 18,
    paddingTop: 20,
    // paddingLeft: 12,
    textAlign: "center",
  },
  detailsContainer: {
    backgroundColor: "white",
    height: "47%",
    width: "93%",
    marginLeft: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.99,
    borderRadius: 20,
    marginTop: 30,
  },
  buttonStyle: {
    width: "40%",
    height: "68%",
    backgroundColor: "blue",
    marginLeft: "3%",
    marginTop: "5%",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.99,
    marginRight: "10%",
  },
  gradientButton: {
    height: "100%",
    borderRadius: 20,
  },
  buttonText: {
    fontFamily: "Avenir",
    fontSize: 18,
    color: "white",
    textAlign: "center",
    paddingTop: 12,
    fontWeight: "bold",
  },
  detailsText: {
    color: "#999999",
    fontFamily: "Avenir",
    // fontWeight: "bold",
    fontSize: 14,
    paddingTop: 20,
    // paddingLeft: 12,
    // textAlign: "center",
    marginLeft: 12,
  },
  confirmButton: {
    width: "30%",
    height: "9%",
    // backgroundColor: "red",
    marginLeft: 65,
    marginTop: 50,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.99,
  },
  buttonContainer: {
    height: "10%",
    // backgroundColor: "red",
    width: "90%",
    flexDirection: "row",
    marginLeft: "5%",
    marginTop: "5%",
  },
});
