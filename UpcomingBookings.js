import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import { Card } from 'react-native-elements';

const bookings = [
  { id: '1', date: '2023-10-23', time: '2:00 PM', location: 'Room 212 Odette' },
  { id: '2', date: '2023-10-24', time: '10:00 AM', location: 'Room 200 Leddy Main' },
  { id: '3', date: '2023-10-24', time: '4:00 PM', location: 'Room 100 Eng' },
  { id: '4', date: '2023-10-25', time: '7:00 PM', location: 'Room 32 Law' },
  { id: '5', date: '2023-10-26', time: '5:00 PM', location: 'Room B 312 Leddy West' },

];

const UpcomingBookings = () => {
  return (
    <View style={{ height: '70%', marginTop: '16%' }}>
      <Text style={{ fontSize: 18, color: '#0B7DF1', fontWeight: '700', height: '15%', /*fontWeight: 'bold',*/ marginLeft: 10}}>Upcoming Bookings</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 10 }}>
        {bookings.map((booking) => (
          <View key={booking.id} style={{ marginLeft: 10 }}>
            <Card containerStyle={{ padding: 25, borderRadius: 5, borderColor: '#0B7DF1'}}>
              <Card.Title>{booking.date}</Card.Title>
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
