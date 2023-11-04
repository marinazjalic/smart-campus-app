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
              bookingObj[0].date.toString(), //i think this needs to be changed to dateObj ???
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
    const isDeleted = await deleteBooking(bookingId);
    if (isDeleted) {
      const availObj = await getAvailabilityID(room_id, date, time);
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
    console.log("room_num" + room_id);
    console.log("Date" + date);
    var date = date.split("-");

    var offset = (date[0] == "11" && date[1]) > "05" ? 5 : 4;
    var newDate = new Date(date[2], date[0] - 1, date[1], 0 - offset, 0, 0, 0);

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
            <Text style={styles.roomNumText}>Room {item.room_num}</Text>
          </View>
          <View style={styles.splitRight}>
            <View style={styles.capacityContainer}>
              <Text style={styles.capacityText}>{item.capacity}</Text>
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

        {/* Add more booking details as needed */}
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
    // padding: 25,
    marginLeft: 1,
    // marginBottom: 10,
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
    // flexDirection: "row",
    width: "65%",
    // borderRadius: 4,
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
    // backgroundColor: "red",
    paddingLeft: 9,
    width: "60%",
  },
  bookingCard: {
    backgroundColor: "white",
    alignItems: "center",
    marginBottom: 10,
  },
  headerText: {
    fontSize: 20,
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
  capacityContainer: {
    // backgroundColor: "grey",
  },
  capacityText: {
    fontFamily: "Avenir",
    fontSize: 15,
    marginLeft: 100,
    color: "#0099ff",
  },
  dateContainer: {
    backgroundColor: "white",
    // opacity: 80,
    width: "96%",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,

    // borderRadius: 20,
  },
  dateContainer2: {
    paddingLeft: 10,
  },
  timeText: {
    fontFamily: "Avenir",
    fontSize: 16,
    color: "#999999",
    // fontWeight: "bold",
  },
});

export default ManageBookings;

/*
function ManageBookings() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Manage Bookings now </Text>
      </View>
    );
  }

  export default ManageBookings;
  */
