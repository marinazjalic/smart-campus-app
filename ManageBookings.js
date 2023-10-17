import React, { useState } from 'react';
import { View, TouchableOpacity, Text, FlatList, StyleSheet, Button } from 'react-native';
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

const ManageBookings = () => {
  const [bookings, setBookings] = useState(bookingsData);

  const handleMod = (bookingId) => {
    {} 
  }

  const handleCancelBooking = (bookingId) => {
    console.log('Cancel button pressed for bookingId:', bookingId);
    const updatedBookings = bookingsData.map((bookings) => {
      if (bookings.id === bookingId) {
        return { ...bookings, canceled: true };
      }
      return bookings;
    });
    const activeBookings = bookingsData.filter((booking) => !booking.canceled);
    return setBookings(activeBookings);
  };

  const renderItem = ({ item }) => (
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
    <TouchableOpacity
        onPress={() => handleMod(item.id)} // Call a function to cancel the booking
        style={styles.modifyButton}
      >
        <Text style={styles.cancelModifyText}>Modify</Text>
      </TouchableOpacity>
      {/* Add more booking details as needed */}

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
  },
  bookingPanel: {
    backgroundColor: 'white',
    padding: 10,
    justifyContent: 'space-between',
    marginVertical: 14,
    borderRadius: 6,
    borderWidth: 3,
    borderColor: '#ddd',
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
    width: '20%',
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