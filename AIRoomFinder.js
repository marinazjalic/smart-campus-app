import React, { useContext } from "react";
import { Text, View, StyleSheet, Alert } from "react-native";
import { Button } from "react-native-elements";
import Confirmation from "./Confirmation";
import { TouchableOpacity } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import { UserContext } from "./global/UserContext";
import axios from "axios";

function AIRoomFinder({ navigation }) {
  function handleConfirm() {
    //bring you to confirmation page here
    // Example of calling the getPrediction function
    getPrediction("Leddy", 10, 0)
      .then((prediction) => {
        console.log("Received prediction:", prediction);
        // Handle the prediction result here
      })
      .catch((error) => {
        console.error("Prediction error:", error);
      });

    /*
      Alert.alert(
        "Booking Confirmed!",
        "You have successfully booked this room",
        [
            { text: "OK", onPress: () => navigation.navigate("Home") }
        ],
        { cancelable: false }
    );
    */
  }

  function handleGoBack() {
    navigation.navigate("Home");
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
        <Text style={styles.confirmedText}>Sorry...</Text>
        {/* <Text style={styles.confirmedText}>
          There are no rooms available with those preferences.
        </Text> */}
      </View>
      <View style={styles.divider}></View>
      <View style={styles.bottomContainer}>
        <View style={styles.detailsContainer}>
          <Text style={styles.detailsTitle}>DETAILS</Text>
          <Text style={styles.detailsText}></Text>
          <Text style={styles.detailsText}>Date: ...</Text>
          <Text style={styles.detailsText}>Time: ...</Text>
          <Text style={styles.detailsText}>Location: ...</Text>
          <Text style={styles.detailsText}>Room: ...</Text>
          <Text style={styles.detailsText}>Capacity: ...</Text>
          <Text style={styles.detailsText}>
            This room is equipped with a whiteboard, power outlet and is
            accessible.
          </Text>
        </View>

        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
          <LinearGradient
            colors={["#0073e6", "#3399ff", "#80bfff"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradientButton}
          >
            <Text style={styles.buttonText}>Confirm Booking</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity style={styles.homeButton} onPress={handleGoBack}>
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
    </View>
  );
}

export default AIRoomFinder;

const styles = StyleSheet.create({
  container: {
    flex: 3,
    width: "90%",
    //height: "90%",
    //marginTop: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  card: {
    width: "100%",
    //height: "90%",
    //marginTop: 30,
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
    height: "8%",
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
    marginTop: "4%",
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
    height: 350,
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
  confirmButton: {
    width: "70%",
    height: "25%",
    // backgroundColor: "red",
    marginLeft: 65,
    marginTop: 40,
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
  homeButton: {
    width: "70%",
    height: "30%",
    // backgroundColor: "red",
    marginLeft: 65,
    marginTop: -15,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.99,
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
