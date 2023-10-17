import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, Button, Image, TextInput, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import { Calendar } from 'react-native-calendars';
import { TouchableOpacity } from 'react-native';
import { Dimensions } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker'; // Import the date-time picker
import  CampusMap1  from './CampusMap1';
import Checkbox from './Checkbox';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LogoutScreen from './Logout';
const Stack = createStackNavigator();


const HomeScreen = ({ navigation }) => {
  const [index, setIndex] = useState(0);
  const [isTimePickerVisible, setTimePickerVisible] = useState(false); // State to control the visibility of the date-time picker
  const [selectedTime, setSelectedTime] = useState(null); // State to store the selected date
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDates, setSelectedDates] = useState({});
  const [selectedStyle, setSelectedStyle] = useState({});
  const [selectedBuilding, setSelectedBuilding] = useState({});
  const [isCheckbox1Checked, setIsCheckbox1Checked] = useState(false);
  const [isCheckbox2Checked, setIsCheckbox2Checked] = useState(false);
  const [roomCapacity, setRoomCapacity] = useState('');
  const [showError, setShowError] = useState(false);
  const inputRef = useRef(null);
  const [markedDates, setMarkedDates] = useState({});

//i couldnt get stack container for the longest time but i tried it here and it works?
<NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Logout" component={LogoutScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    
    const renderBookingPanel = (booking) => {
      return (
        <View key={booking.id} style={styles.bookingPanel}>
          <Text>Date: {booking.date}</Text>
          <Text>Building: {booking.building}</Text>
          {/* Add more booking details as needed */}
        </View>
      );
    };
    


  useEffect(() => {
    // Function to generate the next 14 days
    const generateNext14Days = () => {
      const today = new Date();
      const next14Days = {};

      for (let i = 0; i < 14; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        const dateString = date.toISOString().split('T')[0];
        next14Days[dateString] = { selected: true, selectedColor: 'black' };
      }

      setMarkedDates(next14Days);
    };

    generateNext14Days(); // call the function to generate the next 14 days on component mount
  }, []);

  const handleFindRoomPress = () => {
    // 
    console.log('Find Room button pressed');
  };
  
  const handleInputChange = (value) => {
    setRoomCapacity(value);
  
    // validate the entered value
    const numberValue = parseInt(value, 10);
    if (numberValue < 1 || numberValue > 8 || isNaN(numberValue)) {
      setShowError(true);
    } else {
      setShowError(false);
    }
  };
  


  const [routes] = useState([
    { key: 'date', title: 'Date' },
    { key: 'location', title: 'Location' },
  ]);

  const handleBuildingPress = (buildingName) => {
    alert(`Selected: ${buildingName}`);
  };

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'date':
        return (
          <View style={{ flex: 1, margin: 0, padding: 0 }}>
            {
              <Calendar
              // clendar props and customization options here
              style={{ height: screenHeight * 0.38, borderTopWidth: 1, borderTopColor: 'gray', marginBottom: 30 }}
              onDayPress={(day) => handleDateSelection(day)} markedDates={selectedDates}
            />
            }
          </View>
        );
      case 'location':
        return (
          <View style={{ width: "100%", height: "70%", flex:1, margin: 0, padding:0 }}>
            <CampusMap1
              selectedBuilding={selectedBuilding} 
              onBuildingPress={setSelectedBuilding}
            />
          {/**/ }
          </View>
        );
      default:
        return null;
    }
  };

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: 'blue' }}
      style={{ backgroundColor: 'white' }}
      activeColor={'blue'}
      inactiveColor={'gray'}
    />
  );

  const screenHeight = Dimensions.get('window').height;
  const isDateTabActive = index === 0; // Check if the 'Date' tab is active
  const isTimeTabActive = index === 0;
  const isLocationTabActive = index == 1;

  const showTimePicker = () => {
    setTimePickerVisible(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisible(false);
  };

  const handleTimePicked = (time) => {
    // Handle the selected time here
    setSelectedTime(time.toLocaleTimeString()); // Format and store the selected time
    hideTimePicker();
  };

  const handleDateSelection = (day) => {
    const selectedDay = new Date(day.dateString);
    const today = new Date();
    const fourteenDaysLater = new Date(today);
    fourteenDaysLater.setDate(today.getDate() + 14);

    if ((selectedDay >= today && selectedDay < fourteenDaysLater) || selectedDay == today.getDate() || selectedDay == today.getDate() -1 ) {
      //setSelectedDate(day.dateString);
      if (selectedDate) {
        const updatedSelectedDates = { ...selectedDates };
        delete updatedSelectedDates[selectedDate];
        setSelectedDates(updatedSelectedDates);
      }
  
      // make a new style for the selected date
      const newStyle = {
        selected: true,
        selectedColor: 'blue',
      };
  
      // update state with the selected date and style
      setSelectedDate(day.dateString);
      setSelectedStyle(newStyle);
  
      // update the marked dates state
      setSelectedDates({ [day.dateString]: newStyle });
      
    } else {
      // if user doesnt pick a day within 14 days, nothing happens they just cant pick it
    }
  };
 
  
  return (
    <View style={{ flex: 1}}>
      {
      //nothing goes here
      }
      <View style={{ flex: 3.5}}>
        { //title for Upcoming Bookings
          <Text style={{fontSize: 20, marginTop: '20%', marginLeft: '3%'}}>Upcoming Bookings</Text>
         //followed by panels for Upcoming bookings
         
      
        }{/* Rest of your HomeScreen content */}
    

        
        </View>
        <View style={{ flex: 6.5 }}>
        <TabView //this is the tab for 'Date' and 'Location'
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          renderTabBar={renderTabBar}
          style={{ flex: 1 }}  // Fixed height
        />
        
        <View>
        {isDateTabActive && (  
          <View style={{ justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Button title="Select a Time" onPress={showTimePicker} /> 
          
          {selectedDate && selectedTime && (  //if date and time are selected, show them both
          <View>
          <Text style={{ marginRight: 16 }} >Selected Time: {selectedTime}</Text>
          <Text style={{ marginRight: 16 }}>Selected Date: {selectedDate} </Text>
        </View>
          )}
        </View>  
        </View> 
  )}
  </View>
       
       <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleTimePicked}
        onCancel={hideTimePicker}  //will hide time picker if you press cancel
      />


      
    
    <View>
    {isLocationTabActive && (

      <View style={{ justifyContent: 'space-between' }}>  
      <View style={{padding: 15, marginTop:6 }} onPress={() => inputRef.current.focus()}>
      <View style={{marginBottom: 5 }}>
      <TextInput //this is for the capacity thing
        ref = {inputRef}
        value={roomCapacity}
        onChangeText={handleInputChange}
        keyboardType="numeric"
        placeholder="Capacity (1-8 ppl)"
        style={{borderWidth: 1, padding: 5, borderColor:'transparent', borderBottomColor: '#ccc', width: '40%'}}
      />
        {showError && <Text style={{ color: 'red', marginTop: 8 }}>Enter a number between 1-8.</Text>} 
        </View>
      
      <Checkbox //checkboxes
            label = "Whiteboard"
            checked={isCheckbox1Checked}
            onToggle={() => setIsCheckbox1Checked(!isCheckbox1Checked)}
            />
      <Checkbox 
            label = "Accessible"
            checked={isCheckbox2Checked}
            onToggle={() => setIsCheckbox2Checked(!isCheckbox2Checked)}
            />
        </View>
      
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Button title="Select a Time" onPress={showTimePicker} />


      {selectedBuilding && selectedTime && (  //if building and time are selected, show both to the user, the user presses Find a Room which brings them to Logout (for now)
      <View> 
      <Button title="Find Room" onPress={() => navigation.navigate('Logout')} color="#ADD8E6" style={{ marginTop: -20}} /> 
      <Text style={{ marginRight: 16 }} >Selected Time: {selectedTime}</Text>
      <Text style={{ marginRight: 16 }}>Selected Building: {selectedBuilding} </Text>
    </View>
      )}
      </View>
  </View>
    )}
</View>
  </View>
  </View>
  );
};




export default HomeScreen;


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
  });
