import React, { useContext } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Button } from "react-native-elements";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LogoutScreen from "./Logout";
import UpcomingBookings from "./UpcomingBookings";
import AIRooomFinder from "./AIRoomFinder";
import HomeScreen from "./HomeScreen";
import App from "./App";
import { LinearGradient } from "expo-linear-gradient";
import Svg, { Path } from "react-native-svg";
import { UserContext } from "./global/UserContext";

//const Stack1 = createStackNavigator();

function Confirmation({ navigation }) {
  // const { latestBookingID, set}
  const { latestBookingObj, setLatestBookingObj } = useContext(UserContext);
  /*
  <NavigationContainer>
      <Stack1.Navigator initialRouteName="Home">
        <Stack1.Screen name="Home" component={HomeScreen} />
        <Stack1.Screen name="App" component={App} />
        <Stack1.Screen name="Room" component={AIRooomFinder} />
        <Stack1.Screen name="Confirmation" component={Confirmation} /> 
        <Stack1.Screen name="Logout" component={LogoutScreen} />
      </Stack1.Navigator>
    </NavigationContainer>
  */
  function handleHomeButtonPress() {
    navigation.navigate("Home");
  }

  function Success() {
    return (
      <View style={{ backgroundColor: "" }}>
        <Svg
          xmlns="http://www.w3.org/2000/svg"
          width="100"
          height="100"
          viewBox="0 0 32 32"
          fill="#0099ff"
        >
          <Path d="M16 3C8.82 3 3 8.82 3 16s5.82 13 13 13 13-5.82 13-13S23.18 3 16 3zm7.258 9.307l-9.486 9.485a.61.61 0 01-.861 0l-.191-.191-.001.001L7.5 16.346a.61.61 0 010-.862l1.294-1.293a.61.61 0 01.862 0l3.689 3.716 7.756-7.756a.61.61 0 01.862 0l1.294 1.294a.609.609 0 01.001.862z"></Path>
        </Svg>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 3,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <View style={styles.topContainer}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: "10%",
          }}
        >
          <Success />
        </View>

        <Text style={styles.confirmedText}>Booking Confirmed</Text>
      </View>
      <View style={styles.divider}></View>
      <View style={styles.bottomContainer}>
        <View style={styles.detailsContainer}>
          <Text style={styles.detailsTitle}>DETAILS</Text>
          <Text style={styles.detailsText}>
            Date: {latestBookingObj.dateText}
          </Text>
          <Text style={styles.detailsText}>Time: {latestBookingObj.time}</Text>
          <Text style={styles.detailsText}>
            Location: {latestBookingObj.location}
          </Text>
          <Text style={styles.detailsText}>
            Room: {latestBookingObj.room_num}
          </Text>
          <Text style={styles.detailsText}>
            Capacity: {latestBookingObj.capacity}
          </Text>
          {latestBookingObj.utilities && (
            <Text style={styles.detailsText}>
              This room is equipped with a whiteboard and power outlet.
            </Text>
          )}
          {latestBookingObj.accessibility && (
            <Text style={styles.detailsText}>
              This room is wheelchair accessible.
            </Text>
          )}
        </View>
        <TouchableOpacity
          style={styles.homeButton}
          onPress={handleHomeButtonPress}
        >
          <LinearGradient
            colors={["#0073e6", "#3399ff", "#80bfff"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradientButton}
          >
            <Text style={styles.buttonText}>Return Home</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      {/* <View style={styles.container}>
            <View style={styles.card}>
            <Text style={{fontSize: 24, marginTop:60, marginBottom:5}}>RESERVED</Text>
            <View style={{ flexDirection: 'row'}}>
              <RoomFeatures isAccessibleSelected={isAccessibleSelected} isWhiteboardSelected={isWhiteboardSelected} />
          <Text> Location: {selectedBuilding}</Text>

          </View>
          <View style={{ flexDirection: 'row' }}>
          <IconPerson />
          <Text> {roomCapacity} </Text>
          </View>
          
          <Text style= {{ marginBottom: 30}}>{selectedDate}</Text>
          <Button title='Go home' onPress={() => navigation.navigate('Home')} color="#0B7DF1" />

        </View>

      </View> */}
    </View>
  );
}

export default Confirmation;

const styles = StyleSheet.create({
  container: {
    flex: 3,
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  card: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
    marginBottom: 10,
    borderRadius: 20, // Adjust for desired corner radius
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.99,
    elevation: 10,
  },
  text: {
    fontSize: 16, // Adjust the font size as needed
    color: "#000", // Adjust text color as needed
  },
  topContainer: {
    backgroundColor: "white",
    height: "30%",
    width: "100%",
  },
  bottomContainer: {
    backgroundColor: "white",
    height: "70%",
    width: "100%",
  },
  confirmedText: {
    color: "#0099ff",
    fontFamily: "Avenir",
    fontSize: 30,
    marginTop: "4.5%",
    textAlign: "center",
  },
  divider: {
    height: 1,
    width: "93%",
    backgroundColor: "#0099ff",
  },
  detailsTitle: {
    color: "#999999",
    fontFamily: "Avenir",
    fontWeight: "bold",
    fontSize: 18,
    paddingTop: 20,
    // paddingLeft: 12,
    textAlign: "center",
  },
  detailsContainer: {
    backgroundColor: "white",
    height: 318,
    width: "93%",
    marginLeft: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.99,
    borderRadius: 20,
    marginTop: 30,
  },
  homeButton: {
    width: "70%",
    height: "9%",
    // backgroundColor: "red",
    marginLeft: 65,
    marginTop: 50,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.99,
  },
  gradientButton: {
    height: "100%",
    borderRadius: 20,
  },
  buttonText: {
    fontFamily: "Avenir",
    fontSize: 18,
    color: "white",
    textAlign: "center",
    paddingTop: 12,
    fontWeight: "bold",
  },
  detailsText: {
    color: "#999999",
    fontFamily: "Avenir",
    // fontWeight: "bold",
    fontSize: 14,
    paddingTop: 20,
    // paddingLeft: 12,
    // textAlign: "center",
    marginLeft: 12,
  },
});
