import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, Button, Image, Dimensions, TextInput, TouchableWithoutFeedback, Keyboard, ScrollView, Alert } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import { Calendar } from 'react-native-calendars';
import { TouchableOpacity } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker'; // Import the date-time picker
import  CampusMap1  from './CampusMap1';
import { useNavigation } from '@react-navigation/native';
import Checkbox from './Checkbox';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LogoutScreen from './Logout';
import UpcomingBookings from './UpcomingBookings';
import AIRooomFinder from './AIRoomFinder';
import Confirmation from './Confirmation';
import Login from './Login';
import { useAppContext } from './AppContext';

const Stack = createStackNavigator();

const HomeScreen = ({ navigation, route }) => { 
  //const navigation = useNavigation();
  console.log('HomeScreen route params:', route.params);
  

  //this is how you get username from the Login page, after you use navigation.navigate('Home', {username} over there)
  //for example you can print the username somewhere on HomeScreen
  const username = route.params?.username;


  //startTime = selectedTime
  const { selectedDate, setSelectedDate, selectedBuilding, setSelectedBuilding } = useAppContext();
  const [index, setIndex] = useState(0);
  const [isStartTimePickerVisible, setStartTimePickerVisible] = useState(false); // State to control the visibility of the date-time picker
  const [isEndTimePickerVisible, setEndTimePickerVisible] = useState(false); // State to control the visibility of the date-time picker
  const [startTime, setStartTime] = useState(null); // State to store the selected date
  const [endTime, setEndTime] = useState(null);
  //const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDates, setSelectedDates] = useState({});
  const [selectedStyle, setSelectedStyle] = useState({});
  //const [selectedBuilding, setSelectedBuilding] = useState({});
  const [isCheckbox1Checked, setIsCheckbox1Checked] = useState(false);
  const [isCheckbox2Checked, setIsCheckbox2Checked] = useState(false);
  const [roomCapacity, setRoomCapacity] = useState('');
  const [showError, setShowError] = useState(false);
  const inputRef = useRef(null);
  const [markedDates, setMarkedDates] = useState({});

  const resetSelections = () => {
    setSelectedDate('');
    setStartTime('');
    setEndTime('');
    setSelectedBuilding('');
    setIsCheckbox1Checked(false);
    setIsCheckbox2Checked(false);
  };
  
/*
//i couldnt get stack container for the longest time but i tried it here and it works?
<NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Room" component={AIRooomFinder} />
        <Stack.Screen name="Confirmation" component={Confirmation} /> 
        <Stack.Screen name="Logout" component={LogoutScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    */
    
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

  const handleBuildingPress = () => {
    alert(`Selected: ${buildingName}`);
  };

  const today = new Date();
  const maxDate = new Date();
  maxDate.setDate(today.getDate() +14);
  const disabledDates = {};

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // months are zero-indexed
    const day = date.getDate();
    return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  };
/*
  const handleDateSelection = (day) => {
    const selectedDay = new Date(day.dateString);
    selectedDay.setHours(0, 0, 0, 0);
    const todayMidnight = new Date(today);
    todayMidnight.setHours(0, 0, 0, 0);

    if (selectedDay >= todayMidnight && selectedDay <= maxDate) {
      const newStyle = { selected: true, selectedColor: 'blue' };
      setSelectedDate(day.dateString);
      setSelectedDates({ [day.dateString]: newStyle });
    }
  };
  */

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'date':
        return (
          <View style={{ flex: 1, margin: 0, padding: 0, backgroundColor: 'white', borderRadius: 10, overflow: 'hidden' }}>
            {
              <Calendar
              minDate={formatDate(today)}
              maxDate={formatDate(maxDate)}
              //markingType={'custom'}
              //markedDates1 = {disabledDates}
              /*markedDates={{
                [selectedDate]: {selected: true, selectedColor: 'blue'}
              }}
              
              markedDates={{
                ...selectedDates,
                ...Array.from({ length: 15 }, (_, i) => new Date(new Date().setDate(today.getDate() + i)))
                  .reduce((acc, date) => {
                    const formattedDate = formatDate(date);
                    if (!selectedDates[formattedDate]) {
                      acc[formattedDate] = { customStyles: { container: { backgroundColor: 'white' }, text: { color: 'black' } } };
                    }
                    return acc;
                  }, {}),
              }}
              
              dayComponent={({date, state }) => {
                const dayToCheck = new Date(date.year, date.month -1, date.day);
                isSelected = formatDate(dayToCheck) === selectedDate;
                const isDisabled = dayToCheck < today || dayToCheck > maxDate;
                
                return (
                  <View>
                    <Text style={{ color: isDisabled ? 'darkgrey' : 'black'}}>
                      {date.day}
                    </Text>
                    </View>
                    
                  
                );
                
              }*/
              // clendar props and customization options here
            style={{ height: screenHeight * 0.38, borderTopWidth: 1, borderTopColor: 'gray', marginBottom: 30 }}
             onDayPress={(day) => handleDateSelection(day)} markedDates={selectedDates}
              />
          }
          </View>
        );
      case 'location':
        return (
          <View style={{ width: "100%", height: "70%", flex:1, margin: 0, padding:0, backgroundColor: 'white' }}>
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
      indicatorStyle={{ backgroundColor: '#0B7DF1' }}
      style={{ backgroundColor: 'white' }}
      activeColor={'#0B7DF1'}
      inactiveColor={'gray'}
    />
  );

  const screenHeight = Dimensions.get('window').height;
  const isDateTabActive = index === 0; // Check if the 'Date' tab is active
  const isTimeTabActive = index === 0;
  const isLocationTabActive = index == 1;

  const showStartTimePicker = () => {
    setStartTimePickerVisible(true);
  };

  const showEndTimePicker = () => {
    setEndTimePickerVisible(true);
  };

  const hideStartTimePicker = () => {
    setStartTimePickerVisible(false);
  };

  const hideEndTimePicker = () => {
    setEndTimePickerVisible(false);
  };

  useEffect(() => {
    if (startTime !== null) {
      console.log('Selected start Time has been updated:', startTime);
      console.log('Selected start Time:', startTime, 'Type:', typeof startTime);

    }
  }, [startTime]);

  useEffect(() => {
    if (endTime !== null) {
      console.log('Selected end Time has been updated:', endTime);
      console.log('Selected end Time:', endTime, 'Type:', typeof endTime);

    }
  }, [endTime]);

  const handleTimePicked = (time) => {
    console.log("Start Time:", time);  // Log the entire time object
    if (time instanceof Date) {
      const timeString = time.toLocaleTimeString();
      console.log("Selected start Time String:", timeString);  // Log the time string
      setStartTime(timeString);  // This should be a string
      //console.log('Selected Time:', selectedTime, 'Type:', typeof selectedTime);
    } else {
      console.error("Invalid time received:", time);
    }
    hideStartTimePicker();
  };


  const handleEndTimePicked = (time) => {
    console.log("End Time:", time);  // Log the entire time object
    if (time instanceof Date) {
      const timeString = time.toLocaleTimeString();
      console.log("Selected end Time String:", timeString);  // Log the time string
      setEndTime(timeString);  // This should be a string
      //console.log('Selected Time:', selectedTime, 'Type:', typeof selectedTime);
    } else {
      console.error("Invalid time received:", time);
    }
    hideEndTimePicker();
  };
  
  useEffect(() => {
    if (selectedBuilding !== null) {
      console.log('Selected Building has been updated:', selectedBuilding);
      console.log("Selected Building String:", selectedBuilding);  // Log the dateString
      // ... any other code you want to run when selectedDate changes
    }
  }, [selectedBuilding]);


  useEffect(() => {
    if (selectedDate !== null) {
      console.log('Selected Building has been updated:', selectedBuilding);
      console.log('Selected start Time:', startTime, 'Type:', typeof startTime);
      console.log('Selected end Time:', endTime, 'Type:', typeof endTime);
      console.log('Selected Building:', selectedBuilding, 'Type:', typeof selectedBuilding);
      console.log('Selected Date:', selectedDate, 'Type:', typeof selectedDate);
      console.log('Selected Date has been updated:', selectedDate);
      console.log("Selected Date String:", selectedDate);  // Log the dateString
      // ... any other code you want to run when selectedDate changes
    }
  }, [selectedDate]);

  const handleDateSelection = (day) => {
    console.log("Selected Day:", day);  // Log the entire day object
    if (day && day.dateString) {
      //console.log("Selected Date String:", day.dateString);  // Log the dateString
      setSelectedDate(day.dateString);  // This should be a string
      setSelectedBuilding(" ");
    } else {
      console.error("Invalid day object received:", day);
    }
    // ... rest of your code
  };
  
  return (
    <View style={{ flex: 1}}>
      {
      //nothing goes here
      }
      <View style={{ flex: 3.5}}>
        { //title for Upcoming Bookings
        <UpcomingBookings>

        </UpcomingBookings>
          //<Text style={{fontSize: 20, marginTop: '20%', marginLeft: '3%'}}>Upcoming Bookings</Text>
         //followed by panels for Upcoming bookings 
         

        }

        </View>

        <View style={{ flex: 6.5 }}>
        <TabView //this is the tab for 'Date' and 'Location'
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          renderTabBar={renderTabBar}
          style={{ flex: 1 }}  // Fixed height
        />
        
        <View style={{ backgroundColor: 'white', alignItems: 'center', height:'30%', marginBottom:-30}}>  
        {isDateTabActive && (  
          <View style={styles.card}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Button title="Start Time" onPress={setStartTimePickerVisible} style={{marginBottom:1}} /> 
          
          <Button title="End Time" onPress={setEndTimePickerVisible} /> 
          
          {selectedDate && startTime && endTime && (  //if date and time are selected, show them both
          <View style={{ alignItems: 'center'}}>
          <Text style={{ marginRight: 16}} >Start Time: {startTime}</Text>
          <Text style={{ marginRight: 16 }} >End Time: {endTime}</Text>
          <Text style={{ marginRight: 16, marginBottom:0 }}>Selected Date: {selectedDate} </Text>
        
          
          
        </View>
          )}
        </View>  
        </View> 
  )}
  </View>
       
       <DateTimePickerModal
        isVisible={isStartTimePickerVisible}
        mode="time"
        minuteInterval={30}
        onConfirm={handleTimePicked}
        onCancel={hideStartTimePicker}  //will hide time picker if you press cancel
      />
        <DateTimePickerModal
        isVisible={isEndTimePickerVisible}
        mode="time"
        minuteInterval={30}
        onConfirm={handleEndTimePicked}
        onCancel={hideEndTimePicker}  //will hide time picker if you press cancel
      />

    
    <View> 
    {isLocationTabActive && (

      <View style={{ justifyContent: 'space-between', backgroundColor: 'white' }}>  
      <View style={{ paddingLeft: 10, marginTop:0 }} onPress={() => inputRef.current.focus()}>
      <View style={{ marginBottom: 5 }}>
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
      
      <View style={{ flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', backgroundColor:'white' }}>
      
      { //if building and time are selected, show both to the user, the user presses Find a Room which brings them to Logout (for now)
      //onPress={() => navigation.navigate('Logout')} for the find a room button
      //try console logs to see specifically where error is, try converting to strin
}
      {startTime && selectedDate && endTime && (
      <View style= {{ alignItems: 'center'}}>
      <Button title="Find Room" onPress={() => {
      console.log('------------');
      console.log('Selected start Time:', startTime, 'Type:', typeof startTime);
      console.log('Selected end Time:', endTime, 'Type:', typeof endTime);
      console.log('Selected Building:', selectedBuilding, 'Type:', typeof selectedBuilding);
      console.log('Selected Date:', selectedDate, 'Type:', typeof selectedDate);
 
      resetSelections();
      navigation.navigate('Confirmation')}} color="#0B7DF1" style={{ marginTop: -20}} /> 
      <Text style={{ marginRight: 16 }} >Start Time: {startTime}</Text>
      <Text style={{ marginRight: 16 }} >Start Time: {endTime}</Text>
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
      backgroundColor: "#F8F8F8",
      alignItems: "center",
      justifyContent: "center",
    },
    card: {
      width: '95%',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 30,
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
    cardTitle: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    cardContent: {
      marginTop: 8,
      fontSize: 14,
    },
});
