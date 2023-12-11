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
import DateTimePickerModal from "react-native-modal-datetime-picker";
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
import { LinearGradient } from "expo-linear-gradient";
import Strings from "./constants/Strings";
import Arrays from "./constants/Arrays";
import axios from "axios";
import { Picker } from "@react-native-picker/picker";
import { LogBox } from "react-native";

const Stack = createStackNavigator();

const HomeScreen = ({ navigation, route }) => {
  const username = route.params?.username;
  const BASE_URL = "http://Aleksandar.pythonanywhere.com"; // Replace with your PythonAnywhere URL

  const { selectedDate, setSelectedDate } = useAppContext();
  const [index, setIndex] = useState(0);
  const [isStartTimePickerVisible, setStartTimePickerVisible] = useState(false);
  const [isEndTimePickerVisible, setEndTimePickerVisible] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [selectedBuilding, setSelectedBuilding] = useState("");
  const [selectedDates, setSelectedDates] = useState({});
  const [text, setText] = useState("");
  const [roomCapacity, setRoomCapacity] = useState("");
  const inputRef = useRef(null);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [isLoad, setIsLoad] = useState(false);
  const [markedDates, setMarkedDates] = useState({});
  let predictionFlag = false;
  let predictionCount = 0;

  const [reloadFlag, setReloadFlag] = useState(false);

  const { bookings, setBookings } = useContext(UserContext);
  const { userId, setUserId } = useContext(UserContext);
  const { forceUpdate, setForceUpdate } = useContext(UserContext);
  const { latestBookingObj, setLatestBookingObj } = useContext(UserContext);
  const { isPredictionMade, setIsPredictionMade } = useContext(UserContext);
  const { predictionObj, setPredictionObj } = useContext(UserContext);

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
    setSelectedDates({});
  };

  const handleCancel = () => {
    setDialogVisible(false);
  };

  const getInitialTime = () => {
    if (startTime === null) {
    }
    const now = new Date();
    now.setHours(12, 30);

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
  };

  const renderBookingPanel = (booking) => {
    return (
      <View key={booking.id} style={styles.bookingPanel}>
        <Text>Date: {booking.date}</Text>
        <Text>Building: {booking.building}</Text>
      </View>
    );
  };

  useEffect(() => {
    // Function to generate the next 14 days - changed to 30
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

    generateNext14Days();
  }, []);

  const handleFindRoomPress = async () => {
    handleRoomReservations(
      selectedBuilding,
      roomCapacity,
      isAccessibleSelected,
      isWhiteboardSelected,
      startTime,
      endTime
    );
    resetSelections();
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
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${month.toString().padStart(2, "0")}-${day
      .toString()
      .padStart(2, "0")}`;
  };

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
              overflow: "hidden",
            }}
          >
            {
              <Calendar
                minDate={formatDate(today)}
                maxDate={formatDate(maxDate)}
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
              selectedBuilding={selectedBuilding}
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
        backgroundColor: "white",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
      }}
      activeColor={"#3399ff"}
      inactiveColor={"gray"}
    />
  );

  const screenHeight = Dimensions.get("window").height;
  const isDateTabActive = index === 0;
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

  useEffect(() => {}, [isPredictionMade]);

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

      /* if there is a room but no availability for those date/times, make a prediction */
      if (potentialRooms.length == 0) {
        predictionCount++;
        if (predictionCount <= 3) {
          await handlePredictionData(location, capacity, utilities);
        } else {
          Alert.alert("Room Unavailable", "Sorry, all rooms are booked.", [
            { text: "OK", onPress: () => resetSelections() },
          ]);
        }
      } else {
        const sortByCapacity = potentialRooms.sort(
          (a, b) => a.capacity - b.capacity
        );
        const selectedRoom = sortByCapacity[0];
        const availabilityId = allAvailRooms.filter(
          (room) => room.room_id == selectedRoom._id
        );
        const parseDate = selectedDate.split("-");
        const newDate = new Date(
          parseDate[0],
          Number(parseDate[1]) - 1,
          parseDate[2]
        );

        const formattedDate =
          Arrays.weekdays[newDate.getDay()] +
          ", " +
          Arrays.months[newDate.getMonth()] +
          " " +
          newDate.getDate();

        /* we can only reserve the room automatically if it meets all user requirements */
        if (!predictionFlag) {
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
        } else if (predictionFlag) {
          // prediction made, and room was found
          let predictedRoom = {
            roomId: selectedRoom._id,
            dateText: formattedDate,
            time: startTime + " - " + endTime,
            room_num: selectedRoom.room_num,
            location: selectedRoom.location,
            accessibility: selectedRoom.accessibility,
            utilities: selectedRoom.utilities,
            capacity: selectedRoom.capacity,
            selectedDate: selectedDate,
            startTime: startTime,
            endTime: endTime,
            availabilityId: availabilityId[0].id,
          };
          setPredictionObj(predictedRoom);
          predictionFlag = false;
          predictionCount = 0;
          navigation.navigate("Suggestions");
        }
      }
    } else {
      predictionCount++;
      if (predictionCount <= 3) {
        await handlePredictionData(location, capacity, utilities);
      } else {
        //call an alert here for further error handling
        Alert.alert("Room Unavailable", "Sorry, all rooms are booked.", [
          { text: "OK", onPress: () => resetSelections() },
        ]);
      }
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
    let id;
    if (bookings.length == 0) {
      id = 0;
    } else {
      id = bookings[bookings.length - 1].id++;
    }
    let bookingObj = {
      id: id,
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

  const getPrediction = async (building, capacity, utilities) => {
    try {
      const response = await axios.post(`${BASE_URL}/predict`, {
        building,
        capacity,
        utilities,
      });
      return response.data.prediction;
    } catch (error) {
      console.error("Error while fetching prediction:", error);
    }
  };

  const handlePredictionData = async (
    location,
    capacity,
    utilities,
    accessibility,
    start_time,
    end_time
  ) => {
    const utilitiesEncoded = utilities == true ? 1 : 0;
    predictionFlag = true;
    if (location.includes("Leddy")) {
      location = "Leddy";
    }
    const prediction = await getPrediction(location, capacity, utilities);

    if (prediction != utilities) {
      if (prediction == "Leddy") {
        location = "Leddy Library";
      } else {
        location = prediction;
      }
    }
    if (prediction == utilities) {
      utilities = !utilities;
    }

    handleRoomReservations(
      location,
      capacity,
      accessibility,
      utilities,
      start_time,
      end_time
    );
  };

  return (
    <LinearGradient
      colors={["#0059b3", "#99ccff", "#ffcc66"]}
      style={{ flex: 1 }}
    >
      <View style={{ flex: 1 }}>
        <View style={{ flex: 3.5 }}>
          {<UpcomingBookings></UpcomingBookings>}
        </View>
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
            style={{ flex: 1 }}
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
                    marginTop: 6,
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
                    marginTop: 6,
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
              </View>
            </View>
          )}

          <DateTimePickerModal
            isVisible={isStartTimePickerVisible}
            mode="time"
            minuteInterval={30}
            onConfirm={handleTimePicked}
            onCancel={hideStartTimePicker}
            date={getInitialTime()}
          />
          <DateTimePickerModal
            isVisible={isEndTimePickerVisible}
            mode="time"
            minuteInterval={30}
            onConfirm={handleEndTimePicked}
            onCancel={hideEndTimePicker}
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
                    marginBottom: "-111%",
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
                          }}
                        >
                          {startTime && selectedDate && endTime && (
                            <>
                              <TouchableOpacity
                                style={{
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
    borderRadius: 20,
    backgroundColor: "white",
    shadowColor: "#000",
    height: "22%",
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.23,
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
    marginLeft: 20,
    justifyContent: "space-around",
    borderWidth: 1,
    marginTop: 20,
    marginBottom: 10,
    borderRadius: 10,
    borderColor: "#ccc",
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
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 0,
    borderRadius: 20,
    backgroundColor: "white",
    shadowColor: "#000",
    height: "59%",

    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.23,
    elevation: 1,
  },
  findRoomGradient: {
    backgroundColor: "#3E92CC",
    borderRadius: 10,
    height: "100%",
    width: "100%",
  },
});
