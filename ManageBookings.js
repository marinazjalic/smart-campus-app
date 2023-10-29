import React, { useState } from 'react';
import { View, TouchableOpacity, Alert, Text, FlatList, StyleSheet, Button } from 'react-native';
/*
const bookingsData = [
  { id: '1', date: '2023-10-15', building: 'Leddy Main', canceled: false},
  { id: '2', date: '2023-10-18', building: 'Engineering', canceled: false },
  { id: '3', date: '2023-10-18', building: 'Odette', canceled: false },
  { id: '4', date: '2023-10-18', building: 'Law', canceled: false },
  { id: '5', date: '2023-10-18', building: 'Leddy West', canceled: false },
  { id: '6', date: '2023-10-18', building: 'Law', canceled: false },
  { id: '7', date: '2023-10-18', building: 'Engineering', canceled: false },
  { id: '8', date: '2023-10-18', building: 'Leddy Main', canceled: false },
  { id: '9', date: '2023-10-18', building: 'Odette', canceled: false }
  // tester
];
*/

const ManageBookings = () => {
  //const [bookings, setBookings] = useState(bookingsData);
  const [bookingsData, setBookings] = useState([
    { id: '1', date: '2023-10-15', building: 'Leddy Main', canceled: false},
  { id: '2', date: '2023-10-18', building: 'Engineering', canceled: false },
  { id: '3', date: '2023-10-18', building: 'Odette', canceled: false },
  { id: '4', date: '2023-10-18', building: 'Law', canceled: false },
  { id: '5', date: '2023-10-18', building: 'Leddy West', canceled: false },
  { id: '6', date: '2023-10-18', building: 'Law', canceled: false },
  { id: '7', date: '2023-10-18', building: 'Engineering', canceled: false },
  { id: '8', date: '2023-10-18', building: 'Leddy Main', canceled: false },
  { id: '9', date: '2023-10-18', building: 'Odette', canceled: false }
  ])

  
  

  const handleCancelBooking = (bookingId) => {
    console.log('Cancel button pressed for bookingId:', bookingId);
    Alert.alert(
      "Cancel Booking",
      "Are you sure you want to cancel the booking?",
      [
        {
          text: "No",
          onPress: () => console.log("Booking not canceled"),
          style: "cancel"
        },
        { 
          text: "Yes", onPress: () => {
          console.log("Booking canceled"); 
          const updatedBookings = bookingsData.filter(booking => booking.id !== bookingId);
          setBookings(updatedBookings);
          }
        }
      ]
    );
/*
    const updatedBookings = bookingsData.map((bookings) => {
      if (bookings.id === bookingId) {
        return { ...bookings, canceled: true };
      }
      return bookings;
    });
    */
    const activeBookings = bookingsData.filter((booking) => !booking.canceled);
    return setBookings(activeBookings);
  };

  const renderItem = ({ item }) => (
    <View style={{ backgroundColor: 'white', alignItems: 'center' }}>
    <View style={styles.bookingPanel}>
      <Text>Date: {item.date}</Text>
      <Text>Building: {item.building}</Text>
      {item.canceled ? (
      <Text style={styles.canceledText}>Canceled</Text>
    ) : (
      <TouchableOpacity
        onPress={() => handleCancelBooking(item.id)} // Call a function to cancel the booking
        style={styles.cancelButton}
      >
        <Text style={styles.cancelButtonText}>Cancel</Text>
      </TouchableOpacity>
    )}
    
      
      {/* Add more booking details as needed */}

    </View>
    </View>
  );

  return (
  
    <View style={styles.container}>
    
      <FlatList
        data={bookingsData}
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
    backgroundColor: 'white'
  },
  bookingPanel: {
    width: '95%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 35,
    marginLeft: 1,
    marginBottom: 10,
    borderRadius: 20, // Adjust for desired corner radius
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.99,
    elevation: 10,
  },
  canceledText: {
    color: 'red',
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: 'white',
    padding: 5,
    border: 'red',
    flexDirection: 'row',
    width: '30%',
    borderRadius: 4,
  },
  cancelButtonText: {
    color: 'red',
    fontWeight: 'bold',
  },
  modifyButton: {
    backgroundColor: 'white',
    padding: 5,
    border: 'black',
    width: '20%',
    flexDirection: 'row',
    borderRadius: 4,
  },
  modifyText : {
    color: 'black'

  }
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