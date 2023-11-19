import React, { useState, useEffect, useRef, useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  Button,
  Image,
  Dimensions,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Alert,
} from "react-native";
import { TabView, TabBar } from "react-native-tab-view";
import { Calendar } from "react-native-calendars";
import { TouchableOpacity } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker"; // Import the date-time picker
import CampusMap1 from "./CampusMap1";
import { useNavigation } from "@react-navigation/native";
import Checkbox from "./Checkbox";
import Svg, { Path, parse } from "react-native-svg";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LogoutScreen from "./Logout";
import UpcomingBookings from "./UpcomingBookings";
import AIRooomFinder from "./AIRoomFinder";
import Confirmation from "./Confirmation";
import Login from "./Login";
import Dialog from "react-native-dialog";
import { useAppContext } from "./AppContext";
import { UserContext } from "./global/UserContext";
// import LinearGradient from "react-native-linear-gradient";
import { LinearGradient } from "expo-linear-gradient";
import Strings from "./constants/Strings";
import Arrays from "./constants/Arrays";
import axios from "axios";
// import Arrays from "./constants/Arrays";
// import {getUserBookings} from ./
import { Picker } from "@react-native-picker/picker";

const Stack = createStackNavigator();
// var networkInfo = require("react-native-network-info");
// import {NetworkIn }
import { NetworkInfo } from "react-native-network-info";

const HomeScreen = ({ navigation, route }) => {
  //const navigation = useNavigation();
  // console.log("HomeScreen route params:", route.params);

  //this is how you get username from the Login page, after you use navigation.navigate('Home', {username} over there)
  //for example you can print the username somewhere on HomeScreen
  const username = route.params?.username;
  const BASE_URL = 'http://Aleksandar.pythonanywhere.com'; // Replace with your PythonAnywhere URL


  //startTime = selectedTime
  const { selectedDate, setSelectedDate } = useAppContext();
  const [index, setIndex] = useState(0);
  const [isStartTimePickerVisible, setStartTimePickerVisible] = useState(false); // State to control the visibility of the date-time picker
  const [isEndTimePickerVisible, setEndTimePickerVisible] = useState(false); // State to control the visibility of the date-time picker
  const [startTime, setStartTime] = useState(null); // State to store the selected date
  const [endTime, setEndTime] = useState(null);
  const [selectedBuilding, setSelectedBuilding] = useState("");
  const [selectedDates, setSelectedDates] = useState({});
  const [text, setText] = useState("");
  const [roomCapacity, setRoomCapacity] = useState("");
  const inputRef = useRef(null);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [isLoad, setIsLoad] = useState(false);
  const [markedDates, setMarkedDates] = useState({});

  // const { val, setVal } = useContext(MyContext);

  const [reloadFlag, setReloadFlag] = useState(false);

  const { bookings, setBookings } = useContext(UserContext);
  const { userId, setUserId } = useContext(UserContext);
  const { forceUpdate, setForceUpdate } = useContext(UserContext);
  const { latestBookingObj, setLatestBookingObj } = useContext(UserContext);
  const [showError, setShowError] = useState(false);
  const [isWhiteboardSelected, setIsWhiteboardSelected] = useState(false);
  const [isAccessibleSelected, setIsAccessibleSelected] = useState(false);

  const resetSelections = () => {
    setSelectedDate("");
    setStartTime("");
    setEndTime("");
    setSelectedBuilding("");
    setRoomCapacity("");
    setIsWhiteboardSelected(false);
    setIsAccessibleSelected(false);
  };

  const handleCancel = () => {
    setDialogVisible(false);
  };

  const getInitialTime = () => {
    if (startTime === null) {
    }
    const now = new Date();
    now.setHours(12, 30); // Set to 4:30 AM

    return now;
  };

  const handleOk = () => {
    const numCapacity = parseInt(roomCapacity, 10);

    if (numCapacity >= 1 && numCapacity <= 8) {
      setRoomCapacity(numCapacity);
      setDialogVisible(false);
    } else {
      console.warn("Invalid capacity value:", numCapacity);
    }

    // Reset the capacity after closing the dialog
    // setRoomCapacity("");
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
        const dateString = date.toISOString().split("T")[0];
        next14Days[dateString] = { selected: true, selectedColor: "black" };
      }

      setMarkedDates(next14Days);
    };

    generateNext14Days(); // call the function to generate the next 14 days on component mount
  }, []);

  const handleFindRoomPress = () => {
    /*
    handleRoomReservations(
      selectedBuilding,
      roomCapacity,
      isAccessibleSelected,
      isWhiteboardSelected,
      startTime,
      endTime
    );
*/
getPrediction('Leddy', 10, 0)
.then(prediction => {
  console.log('Received prediction:', prediction);
  // Handle the prediction result here
})
.catch(error => {
  console.error('Prediction error:', error);
});

    // resetSelections();
    // navigation.navigate("Confirmation");
  };

  const getPrediction = async (building, capacity, utilities) => {
    try {
      const response = await axios.post(`${BASE_URL}/predict`, {
        building,
        capacity,
        utilities
      });
      console.log('Prediction:', response.data.prediction);
      return response.data.prediction;
    } catch (error) {
      console.error('Error while fetching prediction:', error);
    }
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
  /*
  const handleInputChange = (text) => {
    if (text >= 1 && text <= 8) {
      setRoomCapacity(text);
    }
  };
  */

  const [routes] = useState([
    { key: "date", title: "Date" },
    { key: "location", title: "Location" },
  ]);

  const handleBuildingPress1 = (buildingName) => {
    setSelectedBuilding(buildingName);
  };

  function Filter() {
    return (
      <View style={{ marginTop: 18 }}>
        <Svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="40"
          fill="none"
          viewBox="0 0 24 24"
        >
          <Path
            fill="silver"
            fillRule="evenodd"
            d="M9.907 4a48.047 48.047 0 00.186 0c.369 0 .731-.001 1.054.085a2.5 2.5 0 011.768 1.768c.086.323.086.685.085 1.054V7h8a1 1 0 110 2h-8v.093c0 .369.001.731-.085 1.054a2.5 2.5 0 01-1.768 1.768c-.323.086-.685.086-1.054.085h-.186c-.369 0-.731.001-1.054-.085a2.5 2.5 0 01-1.768-1.768C7 9.824 7 9.462 7 9.093V9H5a1 1 0 010-2h2v-.093c0-.369-.001-.731.085-1.054a2.5 2.5 0 011.768-1.768C9.176 4 9.538 4 9.907 4zm-.408 2.005c-.107.005-.132.013-.128.012a.5.5 0 00-.354.354.834.834 0 00-.012.128C9 6.61 9 6.759 9 7v2c0 .242 0 .39.005.501.005.107.013.132.012.128a.5.5 0 00.354.354c-.004-.001.02.007.128.012.112.005.26.005.501.005.242 0 .39 0 .501-.005.107-.005.132-.013.128-.012a.5.5 0 00.354-.354c-.001.004.007-.02.012-.128C11 9.39 11 9.241 11 9V7c0-.242 0-.39-.005-.501-.005-.107-.013-.132-.012-.128m-1.484-.366C9.61 6 9.759 6 10 6l-.501.005zM10 6c.242 0 .39 0 .501.005L10 6zm.501.005c.094.005.125.011.128.012l-.128-.012zm.129.012zM15.907 12h.186c.369 0 .731-.001 1.054.085a2.5 2.5 0 011.768 1.768c.086.323.086.685.085 1.054V15h2a1 1 0 110 2h-2v.093c0 .369.001.731-.085 1.054a2.5 2.5 0 01-1.768 1.768c-.323.086-.685.086-1.054.085h-.186c-.369 0-.731.001-1.054-.085a2.5 2.5 0 01-1.768-1.768C13 17.824 13 17.462 13 17.093V17H5a1 1 0 110-2h8v-.093c0-.369-.001-.731.085-1.054a2.5 2.5 0 011.768-1.768c.323-.086.685-.086 1.054-.085zm-.408 2.005c-.107.005-.132.013-.128.012a.5.5 0 00-.354.354c.001-.004-.007.021-.012.128C15 14.61 15 14.759 15 15v2c0 .242 0 .39.005.501.005.107.013.132.012.128a.5.5 0 00.354.354c-.004-.001.021.007.128.012.112.005.26.005.501.005.242 0 .39 0 .501-.005.107-.005.132-.013.128-.012a.5.5 0 00.354-.354c-.001.004.007-.02.012-.128C17 17.39 17 17.241 17 17v-2c0-.242 0-.39-.005-.501-.005-.107-.013-.132-.012-.128a.5.5 0 00-.354-.354c.004.001-.021-.007-.128-.012C16.39 14 16.241 14 16 14c-.242 0-.39 0-.501.005z"
            clipRule="evenodd"
          ></Path>
        </Svg>
      </View>
    );
  }

  const today = new Date();
  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 30); //changed this to 30
  const disabledDates = {};

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // months are zero-indexed
    const day = date.getDate();
    return `${year}-${month.toString().padStart(2, "0")}-${day
      .toString()
      .padStart(2, "0")}`;
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
      case "date":
        return (
          <View
            style={{
              flex: 1,
              margin: 0,
              padding: 0,
              backgroundColor: "white",
              // borderRadius: 10,
              overflow: "hidden",
            }}
          >
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
                style={{
                  height: screenHeight * 0.38,
                  borderTopWidth: 1,
                  borderTopColor: "white",
                  marginBottom: 30,
                }}
                onDayPress={(day) => handleDateSelection(day)}
                markedDates={selectedDates}
              />
            }
          </View>
        );
      case "location":
        return (
          <View
            style={{
              width: "100%",
              height: "80%",
              flex: 1,
              margin: 0,
              backgroundColor: "white",
              padding: 0,
            }}
          >
            <CampusMap1
              //onBuildingPress={setSelectedBuilding}
              selectedBuilding={selectedBuilding}
              //onBuildingPress={setSelectedBuilding}
              onBuildingPress={handleBuildingPress1}
            ></CampusMap1>
            {/**/}
          </View>
        );
      default:
        return null;
    }
  };

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: "#3399ff" }}
      style={{
        backgroundColor: "white", //added more styling here
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
      }}
      activeColor={"#3399ff"} //COLOR FOR DATE/LOC TAB BAR
      inactiveColor={"gray"}
    />
  );

  const screenHeight = Dimensions.get("window").height;
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
    }
  }, [startTime]);

  useEffect(() => {
    if (endTime !== null) {
    }
  }, [endTime]);

  const handleTimePicked = (time) => {
    if (time instanceof Date) {
      const timeString = time.toLocaleTimeString();
      const parsedTime = parseTimeString(timeString);
      setStartTime(parsedTime);
      hideStartTimePicker();
    } else {
      console.error("Invalid time received:", time);
    }
  };

  const handleEndTimePicked = (time) => {
    if (time instanceof Date) {
      const timeEndString = time.toLocaleTimeString();
      const parsedTime = parseTimeString(timeEndString);
      setEndTime(parsedTime);
      hideEndTimePicker();
    } else {
      console.error("Invalid time received:", time);
    }
  };

  const parseTimeString = (timeString) => {
    var timeArr = timeString.split(":");
    var suffix = timeArr[2].split(" ")[1];
    suffix = suffix == "PM" ? "pm" : "am";
    const newTime = timeArr[0] + ":" + timeArr[1] + suffix;
    return newTime;
  };

  useEffect(() => {
    if (selectedBuilding !== null) {
    }
  }, [selectedBuilding]);

  useEffect(() => {
    if (selectedDate !== null) {
    }
  }, [selectedDate]);

  const handleDateSelection = (day) => {
    if (day && day.dateString) {
      const newStyle = { selected: true, selectedColor: "#0099ff" };
      setSelectedDate(day.dateString);
      setSelectedDates({ [day.dateString]: newStyle });
    } else {
      console.error("Invalid day object received:", day);
    }
  };

  /* return array of room objects that match the criteria provided */
  const filterRoomsByCriteria = async (
    location,
    capacity,
    accessibility,
    utilities
  ) => {
    var params = {
      location: location,
      capacity: capacity,
    };
    var isAccessible =
      accessibility == true ? (params.accessibility = true) : undefined;
    var hasUtilities =
      utilities == true ? (params.utilities = true) : undefined;

    const response = await axios.get(
      `http://${Strings.ip_address}:3000/rooms/filter-rooms`,
      {
        params,
      }
    );
    const results = await response.data;
    return results;
  };

  /* returns all rooms that are available for the given time range and date */
  const getAvailableRoomsForDateTime = async (date, start_time, end_time) => {
    const response = await axios.get(
      `http://${Strings.ip_address}:3000/availability/filter-availability`,
      {
        params: {
          date: date,
          start_time: start_time,
          end_time: end_time,
        },
      }
    );
    const roomIds = await response.data;
    return roomIds;
  };

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

  //call this after successfully creating the booking
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

  /* handles finding a room that meets criteria and is available.
  creates a new booking for the best match and modifies the availability record */
  const handleRoomReservations = async (
    location,
    capacity,
    accessibility,
    utilities,
    start_time,
    end_time
  ) => {
    const filteredRooms = await filterRoomsByCriteria(
      location,
      capacity,
      accessibility,
      utilities
    );
    /*if there's a room that matches criteria, check if there's availability for the time range */
    if (filteredRooms.length >= 1) {
      const allAvailRooms = await getAvailableRoomsForDateTime(
        selectedDate,
        startTime,
        endTime
      );
      const allAvailRoomIds = allAvailRooms.map((obj) => {
        return obj.room_id;
      });
      const potentialRooms = filteredRooms.filter((room) =>
        allAvailRoomIds.includes(room._id)
      );
      const sortByCapacity = potentialRooms.sort(
        (a, b) => a.capacity - b.capacity
      );
      const selectedRoom = sortByCapacity[0];
      const availabilityId = allAvailRooms.filter(
        (room) => room.room_id == selectedRoom._id
      );

      console.log("SELECTED ROOM");
      console.log(selectedRoom);
      console.log(availabilityId);
      const newDate = new Date(selectedDate);
      const formattedDate =
        Arrays.weekdays[newDate.getDay() + 1] +
        ", " +
        Arrays.months[newDate.getMonth()] +
        " " +
        Number(newDate.getDate() + 1).toString();

      const newBooking = await createNewBooking(
        selectedRoom._id,
        startTime,
        endTime,
        selectedDate
      );
      await modifyAvailability(availabilityId[0].id, startTime, endTime);
      reloadBookingData(
        new Date(newBooking.date),
        selectedRoom.room_num,
        selectedRoom.location,
        selectedRoom.accessibility,
        selectedRoom.utilities,
        selectedRoom.capacity,
        newBooking._id,
        selectedRoom._id,
        formattedDate
      );
    }
  };

  const reloadBookingData = (
    dateObj,
    room_num,
    location,
    accessibility,
    utilities,
    capacity,
    bookingId,
    room_id,
    dateText
  ) => {
    let bookingObj = {
      id: bookings[bookings.length - 1].id++,
      dateText: dateText,
      dateObj: dateObj,
      time: startTime + " - " + endTime,
      room_num: room_num,
      location: location,
      accessibility: accessibility,
      utilities: utilities,
      capacity: capacity,
      bookingId: bookingId,
      room_id: room_id,
    };
    setLatestBookingObj(bookingObj);
    var bookings_arr = bookings;
    bookings_arr.push(bookingObj);
    const sortBookings = bookings_arr.sort((a, b) => a.dateObj - b.dateObj);
    setBookings(sortBookings);

    setReloadFlag(!reloadFlag);
    setForceUpdate(!forceUpdate);

    navigation.navigate("Confirmation");
  };

  return (
    <LinearGradient
      colors={["#0059b3", "#99ccff", "#ffcc66"]}
      style={{ flex: 1 }}
    >
      <View style={{ flex: 1 }}>
        {/* <LinearGradient colors={["#4c669f", "#3b5998", "#192f6a"]}> */}
        {
          //nothing goes here
        }
        {/* <LinearGradient colors={["#4c669f", "#3b5998", "#192f6a"]}> */}
        <View style={{ flex: 3.5 }}>
          {
            //title for Upcoming Bookings
            <UpcomingBookings></UpcomingBookings>
            //<Text style={{fontSize: 20, marginTop: '20%', marginLeft: '3%'}}>Upcoming Bookings</Text>
            //followed by panels for Upcoming bookings
          }
        </View>
        {/* </LinearGradient> */}
        <View
          style={{
            flex: 6.5,
            backgroundColor: "white",
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
          }}
        >
          <TabView //this is the tab for 'Date' and 'Location'
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            renderTabBar={renderTabBar}
            style={{ flex: 1 }} // Fixed height
          />

          {isDateTabActive && (
            <View style={styles.card}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  style={{
                    // padding: 16,
                    marginTop: 6,
                    // marginRight: 2,
                    // marginBottom: 1,
                    // backgroundColor: "#3E92CC",
                    borderRadius: 10,
                    marginRight: 50,
                    width: "40%",
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 1,
                      height: 2,
                    },
                    height: "80%",
                    shadowOpacity: 0.23,
                  }}
                  onPress={setStartTimePickerVisible}
                >
                  <LinearGradient
                    colors={["#3399ff", "#80bfff"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.gradientButton}
                    // #0059b3", "#99ccff"
                  >
                    <Text
                      style={{
                        color: "white",
                        textAlign: "center",
                        fontFamily: "Avenir",
                        fontSize: 15,
                        fontWeight: "bold",
                      }}
                    >
                      Start Time
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    // padding: 16,
                    marginTop: 6,
                    // marginLeft: 2,
                    // marginBottom: 1,
                    backgroundColor: "#3E92CC",
                    borderRadius: 10,
                    width: "40%",
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 1,
                      height: 2,
                    },
                    height: "80%",
                    shadowOpacity: 0.23,
                  }}
                  onPress={setEndTimePickerVisible}
                >
                  <LinearGradient
                    colors={["#3399ff", "#80bfff"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.gradientButton}
                  >
                    <Text
                      style={{
                        color: "white",
                        textAlign: "center",
                        fontFamily: "Avenir",
                        fontSize: 15,
                        fontWeight: "bold",
                      }}
                    >
                      End Time
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>

                {/* {selectedDate &&
                  startTime &&
                  endTime && ( //if date and time are selected, show them both
                    <View style={{ alignItems: "center" }}>
                      <Text style={{ marginRight: 16, marginLeft: 4 }}>
                        Start Time: {startTime}
                      </Text>
                      <Text style={{ marginRight: 16, marginLeft: 4 }}>
                        End Time: {endTime}
                      </Text>
                      <Text
                        style={{
                          marginRight: 16,
                          marginLeft: 4,
                          marginBottom: 0,
                        }}
                      >
                        Date: {selectedDate}{" "}
                      </Text>
                    </View>
                  )} */}
              </View>
            </View>
          )}

          <DateTimePickerModal
            isVisible={isStartTimePickerVisible}
            mode="time"
            minuteInterval={30}
            onConfirm={handleTimePicked}
            onCancel={hideStartTimePicker} //will hide time picker if you press cancel
            date={getInitialTime()}
          />
          <DateTimePickerModal
            isVisible={isEndTimePickerVisible}
            mode="time"
            minuteInterval={30}
            onConfirm={handleEndTimePicked}
            onCancel={hideEndTimePicker} //will hide time picker if you press cancel
            date={getInitialTime()}
          />

          <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
            accessible={false}
          >
            <View>
              {isLocationTabActive && (
                <View
                  style={{
                    justifyContent: "space-between",
                    backgroundColor: "white",
                    //flex:0.227,
                    marginBottom: "-111%",
                    //marginTop: "1%",
                  }}
                >
                  <View
                    style={{
                      paddingLeft: 0,
                      marginTop: 0,
                      alignItems: "center",
                    }}
                    onPress={() => inputRef.current.focus()}
                  >
                    <View style={styles.card2}>
                      <View
                        style={
                          {
                            // flexDirection: "column",
                            // backgroundColor: "blue",
                          }
                        }
                      >
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-around",
                            // backgroundColor: "red",
                            marginTop: 20,
                          }}
                        >
                          <Filter style={{ marginTop: 0 }} />
                          <TouchableOpacity
                            style={[
                              styles.filterButton,
                              isWhiteboardSelected && styles.selectedButton,
                            ]}
                            onPress={() =>
                              setIsWhiteboardSelected(!isWhiteboardSelected)
                            }
                          >
                            <Text style={{ fontSize: 12, color: "#999999" }}>
                              Whiteboard
                            </Text>
                          </TouchableOpacity>

                          <TouchableOpacity
                            style={[
                              styles.filterButton,
                              isAccessibleSelected && styles.selectedButton,
                            ]}
                            onPress={() =>
                              setIsAccessibleSelected(!isAccessibleSelected)
                            }
                          >
                            <Text
                              style={{
                                fontSize: 12,
                                color: "#999999",
                              }}
                            >
                              Accessible
                            </Text>
                          </TouchableOpacity>

                          <TouchableOpacity
                            style={styles.filterButton}
                            onPress={() => setDialogVisible(true)}
                          >
                            <Text
                              style={{
                                fontSize: 12,
                                justifyContent: "center",
                                color: "#999999",
                              }}
                            >
                              Capacity
                            </Text>
                          </TouchableOpacity>

                          <Dialog.Container visible={dialogVisible}>
                            <Dialog.Title>Room Capacity</Dialog.Title>
                            <Dialog.Description>
                              Enter the room capacity (1-8).
                            </Dialog.Description>
                            <Dialog.Input
                              keyboardType="numeric"
                              onChangeText={(text) => setRoomCapacity(text)}
                              value={roomCapacity}
                            />
                            <Dialog.Button
                              label="Cancel"
                              onPress={handleCancel}
                            />
                            <Dialog.Button label="OK" onPress={handleOk} />
                          </Dialog.Container>
                        </View>

                        <View
                          style={{
                            height: 70,
                            flexDirection: "column",
                            position: "relative",
                            marginLeft: 10,
                            justifyContent: "space-between",
                            alignItems: "center",
                            // backgroundColor: "red",
                          }}
                        >
                          {startTime && selectedDate && endTime && (
                            <>
                              <TouchableOpacity
                                style={{
                                  // padding: 15,
                                  // marginTop: 0,
                                  // marginBottom: 0,
                                  backgroundColor: "#3E92CC",
                                  borderRadius: 10,
                                  height: "55%",
                                  width: "50%",
                                }}
                                onPress={() => {
                                  {
                                    handleFindRoomPress();
                                  }
                                }}
                              >
                                <LinearGradient
                                  colors={["#3399ff", "#80bfff"]}
                                  start={{ x: 0, y: 0 }}
                                  end={{ x: 1, y: 0 }}
                                  style={styles.findRoomGradient}
                                  // #0059b3", "#99ccff"
                                >
                                  <Text
                                    style={{
                                      fontSize: 15,
                                      color: "white",
                                      fontFamily: "Avenir",
                                      textAlign: "center",
                                      marginTop: "5%",
                                    }}
                                  >
                                    Find Room
                                  </Text>
                                </LinearGradient>
                              </TouchableOpacity>
                            </>
                          )}
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              )}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </LinearGradient>
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
    width: "95%",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "3%",
    padding: 30,
    marginBottom: 10,
    borderRadius: 20, // Adjust for desired corner radius
    backgroundColor: "white",
    shadowColor: "#000",
    height: "22%",
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.23,
    // shadowRadius: 2.99,
    elevation: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  cardContent: {
    marginTop: 8,
    fontSize: 14,
  },
  filterButton: {
    padding: 10,
    justifyContent: "center",
    //width:'27%',
    marginLeft: 20,
    justifyContent: "space-around",
    borderWidth: 1,
    marginTop: 20,
    marginBottom: 10,
    borderRadius: 10,
    borderColor: "#ccc",
    // backgroundColor: "red",
  },
  selectedButton: {
    backgroundColor: "#99ccff",
    borderColor: "transparent",
  },
  gradientButton: {
    padding: 10,
    borderRadius: 10,
    height: "100%",
  },
  card2: {
    width: "95%",
    //justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    //padding: 2,
    marginBottom: 0,
    borderRadius: 20, // Adjust for desired corner radius
    backgroundColor: "white",
    shadowColor: "#000",
    height: "59%",

    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.23,
    // shadowRadius: 2.99,
    elevation: 1,
  },
  findRoomGradient: {
    // padding: 15,
    // marginTop: 0,
    // marginBottom: 0,
    backgroundColor: "#3E92CC",
    borderRadius: 10,
    height: "100%",
    width: "100%",
  },
});
