import React, { useContext } from "react";
import { View, ScrollView, Text } from "react-native";
import { Card } from "react-native-elements";
import axios from "axios";
import { UserContext } from "./global/UserContext";

// const bookings = [
//   { id: "1", date: "2023-10-23", time: "2:00 PM", location: "Room 212 Odette" },
//   {
//     id: "2",
//     date: "2023-10-24",
//     time: "10:00 AM",
//     location: "Room 200 Leddy Main",
//   },
//   { id: "3", date: "2023-10-24", time: "4:00 PM", location: "Room 100 Eng" },
//   { id: "4", date: "2023-10-25", time: "7:00 PM", location: "Room 32 Law" },
//   {
//     id: "5",
//     date: "2023-10-26",
//     time: "5:00 PM",
//     location: "Room B 312 Leddy West",
//   },
// ];

const UpcomingBookings = () => {
  const { bookings, setBookings } = useContext(UserContext);
  return (
    <View style={{ height: "70%", marginTop: "16%" }}>
      <Text
        style={{
          fontSize: 18,
          color: "white",
          fontWeight: "700",
          height: "15%",
          paddingLeft: 20,
          /*fontWeight: 'bold',*/ marginLeft: 10,
        }}
      >
        Upcoming Bookings
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginTop: 10 }}
      >
        {bookings.map((booking) => (
          <View key={booking.id} style={{ marginLeft: 10 }}>
            <Card
              containerStyle={{
                padding: 25,
                borderRadius: 18,
                borderColor: "white",
                shadowColor: "#000",
                shadowOffset: {
                  width: 1,
                  height: 2,
                },
                shadowOpacity: 0.23,
                shadowRadius: 2.99,
              }}
            >
              <Card.Title>{booking.dateText}</Card.Title>
              <Card.Divider />
              <Text>Time: {booking.time}</Text>
              <Text>Location: {booking.location}</Text>
            </Card>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default UpcomingBookings;
