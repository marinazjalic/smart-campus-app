import React, { useContext } from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";
import { Card } from "react-native-elements";
import axios from "axios";
import { UserContext } from "./global/UserContext";

const UpcomingBookings = () => {
  const { bookings, setBookings } = useContext(UserContext);
  return (
    <View style={{ height: "70%", marginTop: "16%" }}>
      <Text
        style={{
          fontSize: 20,
          color: "white",
          fontWeight: "700",
          height: "15%",
          paddingLeft: 20,
          fontFamily: "Avenir",
          fontWeight: "bold",
          marginLeft: 10,
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
                height: "86%",
                width: 287,
              }}
            >
              <Card.Title style={styles.dateText}>
                {booking.dateText}
              </Card.Title>
              <Card.Divider />
              <Text style={styles.detailsText}>Time: {booking.time}</Text>
              <Text style={styles.detailsText}>
                Location: {booking.location}
              </Text>
            </Card>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default UpcomingBookings;

const styles = StyleSheet.create({
  dateText: {
    color: "#3399ff",
    fontWeight: "bold",
    fontFamily: "Avenir",
    fontSize: 16,
  },
  detailsText: {
    color: "#999999",
    fontFamily: "Avenir",
    fontWeight: "300",
  },
});
