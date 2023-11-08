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
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LogoutScreen from "./Logout";
import UpcomingBookings from "./UpcomingBookings";
import AIRooomFinder from "./AIRoomFinder";
import Confirmation from "./Confirmation";
import Login from "./Login";
import { useAppContext } from "./AppContext";
import { UserContext } from "./global/UserContext";
// import LinearGradient from "react-native-linear-gradient";
import { LinearGradient } from "expo-linear-gradient";
import Strings from "./constants/Strings";
import axios from "axios";
import Arrays from "./constants/Arrays";
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

  //startTime = selectedTime
  const {
    selectedDate,
    setSelectedDate,
    selectedBuilding,
    setSelectedBuilding,
  } = useAppContext();
  const [index, setIndex] = useState(0);
  const [isStartTimePickerVisible, setStartTimePickerVisible] = useState(false); // State to control the visibility of the date-time picker
  const [isEndTimePickerVisible, setEndTimePickerVisible] = useState(false); // State to control the visibility of the date-time picker
  const [startTime, setStartTime] = useState(null); // State to store the selected date
  const [endTime, setEndTime] = useState(null);
  const [selectedDates, setSelectedDates] = useState({});
  const [text, setText] = useState("");
  const [roomCapacity, setRoomCapacity] = useState("");
  const inputRef = useRef(null);
  const [isLoad, setIsLoad] = useState(false);
  const [markedDates, setMarkedDates] = useState({});

  // const { val, setVal } = useContext(MyContext);

  const [reloadFlag, setReloadFlag] = useState(false);

  const { bookings, setBookings } = useContext(UserContext);
  const { userId, setUserId } = useContext(UserContext);
  const { forceUpdate, setForceUpdate } = useContext(UserContext);
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

  // const handleRefresh = () => {
  //   HomeScreen.forceUpdate();
  // };

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

  /*
  const handleFindRoomPress = () => {
    resetSelections();
    navigation.navigate("Confirmation");
  };
  */

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

  const handleBuildingPress = () => {
    alert(`Selected: ${buildingName}`);
  };

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
              backgroundColor: "red",
              padding: 0,
            }}
          >
            <CampusMap1
              setSelectedBuilding={selectedBuilding}
              onBuildingPress={setSelectedBuilding}
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
      // console.log("Selected start Time has been updated:", startTime);
      // console.log("Selected start Time:", startTime, "Type:", typeof startTime);
    }
  }, [startTime]);

  useEffect(() => {
    if (endTime !== null) {
      // console.log("Selected end Time has been updated:", endTime);
      // console.log("Selected end Time:", endTime, "Type:", typeof endTime);
    }
  }, [endTime]);

  const handleTimePicked = (time) => {
    console.log(time);
    if (time instanceof Date) {
      // console.log("Start Time:", time);
      const timeString = time.toLocaleTimeString();

      setStartTime(timeString);
    } else {
      console.error("Invalid time received:", time);
    }
    hideStartTimePicker();
  };

  const handleEndTimePicked = (time) => {
    // console.log("End Time:", time); // Log the entire time object
    if (time instanceof Date) {
      const timeString = time.toLocaleTimeString();
      // console.log("Selected end Time String:", timeString); // Log the time string
      setEndTime(timeString); // This should be a string
      //console.log('Selected Time:', selectedTime, 'Type:', typeof selectedTime);
    } else {
      console.error("Invalid time received:", time);
    }
    hideEndTimePicker();
  };

  useEffect(() => {
    if (selectedBuilding !== null) {
      // console.log("Selected Building has been updated:", selectedBuilding);
      // console.log("Selected Building String:", selectedBuilding); // Log the dateString
      // ... any other code you want to run when selectedDate changes
    }
  }, [selectedBuilding]);

  useEffect(() => {
    if (selectedDate !== null) {
    }
  }, [selectedDate]);

  const handleDateSelection = (day) => {
    // console.log("Selected Day:", day); // Log the entire day object
    if (day && day.dateString) {
      //console.log("Selected Date String:", day.dateString);  // Log the dateString
      setSelectedDate(day.dateString); // This should be a string
      setSelectedBuilding(" ");
    } else {
      console.error("Invalid day object received:", day);
    }
    // ... rest of your code
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
    var isAccessible = (accessibility = true
      ? (params.accessibility = true)
      : undefined);
    var hasUtilities = (utilities = true
      ? (params.utilities = true)
      : undefined);

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

  //FIX DATE OBJECT
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
    console.log(params);

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
      //NEED TO REPLACE THESE WITH THE ACTUAL VALUES
      const allAvailRooms = await getAvailableRoomsForDateTime(
        "2023-11-06",
        "5:00pm",
        "6:00pm"
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

      const newBooking = await createNewBooking(
        selectedRoom._id,
        "5:00pm",
        "6:00pm",
        "2023-11-06"
      );

      await modifyAvailability(availabilityId[0].id, "5:00pm", "6:00pm");

      reloadBookingData(
        new Date(newBooking.date),
        selectedRoom.room_num,
        selectedRoom.location,
        selectedRoom.accessibility,
        selectedRoom.utilities,
        selectedRoom.capacity,
        newBooking._id,
        selectedRoom._id
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
    room_id
  ) => {
    let bookingObj = {
      id: bookings[bookings.length - 1].id++,
      dateText: "Sunday, November 6",
      dateObj: dateObj,
      time: "5:00pm" + " - " + "6:00pm",
      room_num: room_num,
      location: location,
      accessibility: accessibility,
      utilities: utilities,
      capacity: capacity,
      bookingId: bookingId,
      room_id: room_id,
    };
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
        <View style={{ flex: 6.5 }}>
          <TabView //this is the tab for 'Date' and 'Location'
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            renderTabBar={renderTabBar}
            style={{ flex: 1 }} // Fixed height
          />

          <View
            style={{
              backgroundColor: "white",
              alignItems: "center",
              height: "30%",
              marginBottom: -33,
            }}
          >
            {isDateTabActive && (
              <View style={styles.card}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    // alignItems: "center",
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

                  {selectedDate &&
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
                    )}
                </View>
              </View>
            )}
          </View>

          <View></View>

          <DateTimePickerModal
            isVisible={isStartTimePickerVisible}
            mode="time"
            minuteInterval={30}
            onConfirm={handleTimePicked}
            onCancel={hideStartTimePicker} //will hide time picker if you press cancel
          />
          <DateTimePickerModal
            isVisible={isEndTimePickerVisible}
            mode="time"
            minuteInterval={30}
            onConfirm={handleEndTimePicked}
            onCancel={hideEndTimePicker} //will hide time picker if you press cancel
          />

          <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
            accessible={false}
          >
            <View style={{ backgroundColor: "#FF7F50" }}>
              {isLocationTabActive && (
                <View
                  style={{
                    justifyContent: "space-between",
                    backgroundColor: "white",
                    marginBottom: -20,
                    marginTop: -120,
                  }}
                >
                  <View
                    style={{ paddingLeft: 10, marginTop: 0 }}
                    onPress={() => inputRef.current.focus()}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-around",
                        marginBottom: -5,
                      }}
                    >
                      <TouchableOpacity
                        style={[
                          styles.filterButton,
                          isWhiteboardSelected && styles.selectedButton,
                        ]}
                        onPress={() =>
                          setIsWhiteboardSelected(!isWhiteboardSelected)
                        }
                      >
                        <Text style={{ fontSize: 12 }}>Whiteboard</Text>
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
                        <Text style={{ fontSize: 12 }}>Accessible</Text>
                      </TouchableOpacity>

                      <TextInput //this is for the capacity thing
                        ref={inputRef}
                        value={roomCapacity}
                        onChangeText={handleInputChange}
                        keyboardType="numeric"
                        placeholder="Capacity (1-8 ppl)"
                        style={{
                          borderWidth: 1,
                          textAlign: "center",
                          padding: 5,
                          marginBottom: 16,
                          borderColor: "transparent",
                          borderBottomColor: "#ccc",
                          width: "40%",
                        }}
                      />

                      {showError && (
                        <Text style={{ color: "red", marginTop: 8 }}>
                          Enter a number between 1-8.
                        </Text>
                      )}
                    </View>
                  </View>

                  <View
                    style={{
                      height: 70,
                      flexDirection: "column",
                      position: "relative",
                      marginLeft: 10,
                      justifyContent: "space-between",
                      //alignItems: "center",
                      backgroundColor: "white",
                    }}
                  >
                    {startTime && selectedDate && endTime && (
                      <>
                        <View
                          style={{
                            justifyContent: "center",
                            position: "absolute",
                            flexDirection: "row",
                            alignItems: "center",
                            marginBottom: 0,
                            marginTop: 0,
                          }}
                        >
                          <TouchableOpacity
                            style={{
                              padding: 15,
                              marginTop: 0,
                              //marginBottom: 4,
                              backgroundColor: "#3E92CC",
                              borderRadius: 10,
                            }}
                            onPress={() => {
                              console.log("------------");
                              console.log(
                                "Selected start Time:",
                                startTime,
                                "Type:",
                                typeof startTime
                              );
                              console.log(
                                "Selected end Time:",
                                endTime,
                                "Type:",
                                typeof endTime
                              );
                              console.log(
                                "Selected Building:",
                                selectedBuilding,
                                "Type:",
                                typeof selectedBuilding
                              );
                              console.log("Accesible is:", {
                                isAccessibleSelected,
                              });

                              console.log(
                                "Selected Date:",
                                selectedDate,
                                "Type:",
                                typeof selectedDate
                              );

                              {
                                handleFindRoomPress;
                              }
                            }}
                          >
                            <Text style={{ fontSize: 12, color: "white" }}>
                              Find Room
                            </Text>
                          </TouchableOpacity>

                          <Text style={{ marginRight: 16 }}>
                            Start Time: {startTime}
                          </Text>
                          <Text style={{ marginRight: 16 }}>
                            Start Time: {endTime}
                          </Text>
                          <Text style={{ marginRight: 16 }}>
                            Selected Building: {selectedBuilding}{" "}
                          </Text>
                        </View>
                      </>
                    )}
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
    padding: 30,
    marginBottom: 10,
    borderRadius: 20, // Adjust for desired corner radius
    backgroundColor: "white",
    shadowColor: "#000",
    height: "70%",
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
    borderWidth: 1,
    marginBottom: 15,
    borderRadius: 10,
    borderColor: "#ccc",
  },
  selectedButton: {
    backgroundColor: "#CE8D66",
  },
  gradientButton: {
    padding: 10,
    borderRadius: 10,
    height: "100%",
  },
});
