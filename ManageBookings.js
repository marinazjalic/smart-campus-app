import React, { useState, useContext } from "react";
import {
  View,
  TouchableOpacity,
  Alert,
  Text,
  FlatList,
  StyleSheet,
  Button,
} from "react-native";
import { UserContext } from "./global/UserContext";
import axios from "axios";
import { Card } from "react-native-elements";
import Strings from "./constants/Strings";
import Svg, { Path } from "react-native-svg";

const ManageBookings = () => {
  const { bookings, setBookings } = useContext(UserContext);
  const { forceUpdate, setForceUpdate } = useContext(UserContext);
  const handleCancelBooking = (bookingId) => {
    console.log("Cancel button pressed for bookingId:", bookingId);
    Alert.alert(
      "Cancel Booking",
      "Are you sure you want to cancel the booking?",
      [
        {
          text: "No",
          onPress: () => {
            console.log("Booking not canceled");
          },
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            var bookingObj = bookings.filter((obj) => {
              return obj.bookingId == bookingId;
            });

            cancelUserBooking(
              bookingId,
              bookingObj[0].room_id,
              bookingObj[0].dateObj,
              bookingObj[0].time
            );
          },
        },
      ]
    );
  };

  /* async function to delete a booking from the database */
  const deleteBooking = async (bookingID) => {
    try {
      const response = await axios.delete(
        `http://${Strings.ip_address}:3000/bookings/delete-booking`,
        {
          params: {
            id: bookingID,
          },
        }
      );

      const result = await response.data;
      return result;
    } catch (error) {
      console.log("error");
    }
  };

  //function to delete the selected booking from DB
  const cancelUserBooking = async (bookingId, room_id, date, time) => {
    var newTime = time.split(" - ");
    console.log("dae");
    console.log(bookingId);
    const isDeleted = await deleteBooking(bookingId);
    if (isDeleted) {
      console.log("Reached");
      const availObj = await getAvailabilityID(room_id, date, time);
      console.log(availObj);
      var result = await modifyCancelledBooking(
        availObj._id,
        newTime[0],
        newTime[1]
      );
      const updatedBookings = bookings.filter((booking) => {
        return booking.bookingId != bookingId;
      });
      setBookings(updatedBookings);
    }
  };

  const getAvailabilityID = async (room_id, date) => {
    //var offset = date.getMonth() + 1 == 11 && date.getDate() > 5 ? 5 : 4;

    var newDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      0 - 5,
      0,
      0,
      0
    );

    const response = await axios.get(
      `http://${Strings.ip_address}:3000/availability/get-by-room`,
      {
        params: {
          room_id: room_id,
          date: newDate.toString(),
        },
      }
    );

    const availObj = await response.data;
    return availObj[0];
  };

  const modifyCancelledBooking = async (availID, start_time, end_time) => {
    var params = JSON.stringify({
      id: availID,
      status: "cancelled",
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

  const IconPerson = () => {
    return (
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width="19"
        height="19"
        viewBox="0 0 32 32"
        fill="#ababab"
      >
        <Path d="M16 15.503A5.041 5.041 0 1016 5.42a5.041 5.041 0 000 10.083zm0 2.215c-6.703 0-11 3.699-11 5.5v3.363h22v-3.363c0-2.178-4.068-5.5-11-5.5z"></Path>
      </Svg>
    );
  };

  function Wheelchair() {
    return (
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width="19"
        height="19"
        viewBox="0 0 32 32"
        fill="#ababab"
      >
        <Path d="M22.621 23.668a1.245 1.245 0 00-1.69.496l-.003.006c-1.512 2.749-4.389 4.581-7.694 4.581a8.751 8.751 0 01-5.272-15.736l.022-.016a1.25 1.25 0 10-1.505-1.996l.003-.002c-2.744 2.074-4.499 5.332-4.499 9 0 6.213 5.037 11.25 11.25 11.25 4.248 0 7.947-2.355 9.861-5.831l.029-.058a1.25 1.25 0 00-.495-1.69l-.006-.003zm8.592 1.029a1.25 1.25 0 00-1.524-.908l.009-.002-2.885.721-2.701-7.912a1.255 1.255 0 00-1.184-.846h-8.855l-.385-2.5H18a1.25 1.25 0 000-2.5h-4.697L12.7 6.83a3.311 3.311 0 10-2.493.38l.023.005 1.534 9.975c.095.604.612 1.06 1.235 1.06h9.033l2.783 8.154a1.255 1.255 0 001.495.807l-.009.002 4-1a1.252 1.252 0 00.908-1.525l.002.009z"></Path>
      </Svg>
    );
  }

  function Whiteboard() {
    return (
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        className="bi bi-easel"
        viewBox="0 0 16 16"
        fill="#ababab"
      >
        <Path d="M8 0a.5.5 0 01.473.337L9.046 2H14a1 1 0 011 1v7a1 1 0 01-1 1h-1.85l1.323 3.837a.5.5 0 11-.946.326L11.092 11H8.5v3a.5.5 0 01-1 0v-3H4.908l-1.435 4.163a.5.5 0 11-.946-.326L3.85 11H2a1 1 0 01-1-1V3a1 1 0 011-1h4.954L7.527.337A.5.5 0 018 0zM2 3v7h12V3H2z"></Path>
      </Svg>
    );
  }

  const renderItem = ({ item }) => (
    <View style={styles.bookingCard}>
      <View style={styles.bookingPanel}>
        <View style={styles.dateContainer}>
          <View style={styles.dateContainer2}>
            <Text style={styles.headerText}>{item.dateText}</Text>
          </View>
        </View>

        <View style={styles.headerStyle}></View>

        <View style={styles.splitBooking}>
          <View style={styles.splitLeft}>
            <Text style={styles.timeText}>{item.time}</Text>
            <Text style={styles.buildingText}>{item.location}</Text>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.roomNumText}>Room {item.room_num} </Text>
              <View style={styles.iconContainer}>
                {item.accessibility && <Wheelchair />}
                {item.utilities && <Whiteboard />}
              </View>
            </View>
          </View>
          <View style={styles.splitRight}>
            <View style={styles.capacityContainer}>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.capacityText}>{item.capacity}</Text>
                <IconPerson />
              </View>
            </View>
            {item.canceled ? (
              <Text style={styles.canceledText}>Canceled</Text>
            ) : (
              <TouchableOpacity
                onPress={() => handleCancelBooking(item.bookingId)} // Call a function to cancel the booking
                style={styles.cancelButton}
              >
                <Text style={styles.cancelButtonText}>CANCEL</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={bookings}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
    height: "80%",
  },
  newPanel: {
    width: "95%",
    backgroundColor: "blue",
    height: "80%",
  },
  bookingPanel: {
    width: "95%",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 1,
    borderRadius: 20,
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
  canceledText: {
    color: "white",
    fontWeight: "bold",
    fontFamily: "Avenir",
  },
  cancelButton: {
    backgroundColor: "#0099ff",
    padding: 5,
    border: "red",
    marginLeft: 50,
    borderRadius: 15,
    marginTop: 25,
    width: "65%",

    marginBottom: 15,
  },
  cancelButtonText: {
    color: "white",
    fontWeight: "bold",
    fontFamily: "Avenir",
    paddingLeft: 5,
    fontSize: 12,
  },
  modifyButton: {
    backgroundColor: "white",
    padding: 5,
    border: "black",
    width: "20%",
    flexDirection: "row",
    borderRadius: 4,
  },
  modifyText: {
    color: "black",
  },
  bookingHeader: {
    width: "100%",
  },
  headerStyle: {
    width: "90%",
    height: "1%",
    backgroundColor: "#cccccc",
  },
  splitLeft: {
    paddingLeft: 9,
    width: "60%",
  },
  bookingCard: {
    backgroundColor: "white",
    alignItems: "center",
    marginBottom: 10,
  },
  headerText: {
    fontSize: 19,
    paddingRight: 105,
    paddingTop: 5,
    color: "#0099ff",
    fontFamily: "Avenir",
    fontWeight: "bold",
  },
  buildingText: {
    color: "#999999",
    fontFamily: "Avenir",
    fontSize: 15,
  },
  roomNumText: {
    color: "#999999",
    fontFamily: "Avenir",
    fontSize: 20,
  },
  splitBooking: {
    width: "95%",
    flexDirection: "row",
  },
  splitRight: {
    width: "30%",
  },
  capacityContainer: {},
  capacityText: {
    fontFamily: "Avenir",
    fontSize: 15,
    marginLeft: "80%",
    color: "#999999",
  },
  dateContainer: {
    backgroundColor: "white",
    width: "96%",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  dateContainer2: {
    paddingLeft: 10,
  },
  timeText: {
    fontFamily: "Avenir",
    fontSize: 16,
    color: "#999999",
  },
  iconContainer: {
    flexDirection: "row",
    paddingTop: 4,
  },
});

export default ManageBookings;
