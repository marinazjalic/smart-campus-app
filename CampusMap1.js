import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  Dimensions,
} from "react-native";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const tabHeight = 0.65 * screenHeight;
const imageHeight = 0.7 * tabHeight;
//onst [selectedBuilding, setSelectedBuilding] = useState({});

// const imageSource = require("./assets/campus1.jpg"); // Replace with your image path
//const imageSource = require("./assets/test2.png"); // Replace with your image path
const imageSource = require("./assets/pic9.png");

export default function CampusMap1({ selectedBuilding, onBuildingPress }) {
  const [isCEISelected, setIsCEISelected] = useState(false);
  const [isOdetteSelected, setIsOdetteSelected] = useState(false);
  const [isLawSelected, setIsLawSelected] = useState(false);
  const [isLeddySelected, setIsLeddySelected] = useState(false);

  const handleBuildingPress = (buildingName) => {
    //selectedBuilding={buildingName};
    onBuildingPress(buildingName);

    /*
    if(buildingName === "CEI"){
      setIsCEISelected(!(isCEISelected))
    }
    else if(buildingName === "Law"){
      setIsLawSelected(!(isLawSelected))
    }
    else if(buildingName === "Leddy"){
      setIsLeddySelected(!(isLeddySelected))
    }
    else {
      setIsOdetteSelected(!(isOdetteSelected))

    }
    */

    // Do anything else you need with the selected building name.
    // For example, send it to a backe`nd or store it
  };

  return (
    <View
      style={{ width: screenWidth, height: imageHeight, position: "relative" }}
    >
      <Image source={imageSource} style={{ width: "100%", height: "90%" }} />
      <View style={styles.textContainer}>
        <Text
          style={{
            bottom: "20%",
            left: "10%",
            color: "grey",
            fontSize: 12,
            position: "absolute",
          }}
        >
          Building: {selectedBuilding}
        </Text>
      </View>

      <TouchableOpacity
        style={[styles.LawButton, isLawSelected && styles.LawButtonSelected]}
        onPress={() => {
          handleBuildingPress("Law");
        }}
      >
        <Text style={{ color: "white" }}>Law</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.LeddyButton,
          isLeddySelected && styles.LeddyButtonSelected,
        ]}
        onPress={() => {
          handleBuildingPress("Leddy Library");
        }}
      >
        <Text style={{ color: "white" }}>Leddy</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.OdetteButton,
          isOdetteSelected && styles.OdetteButtonSelected,
        ]}
        onPress={() => {
          handleBuildingPress("Odette");
        }}
      >
        <Text style={{ color: "white" }}>Odette</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.CEIButton, isCEISelected && styles.CEIButtonSelect]}
        onPress={() => {
          handleBuildingPress("CEI");
        }}
      >
        <Text style={{ color: "white" }}>CEI</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          width: "15%", // Example value, replace with calculated percentage for building "Leddy"
          height: "46%", // Example value
          top: "21%", // Example value
          left: "40%", // Example value
          position: "absolute",
          borderRadius: 10,
          backgroundColor: "#D5D5D5",
          borderColor: "transparent",
          borderWidth: 1,
        }}
      />
      <TouchableOpacity
        style={{
          width: "15%", // Example value, replace with calculated percentage for building "Leddy"
          height: "21%", // Example value
          top: "21%", // Example value
          left: "8%", // Example value
          position: "absolute",
          borderRadius: 10,
          backgroundColor: "#D5D5D5",
          borderColor: "transparent",
          borderWidth: 1,
        }}
      />

      <TouchableOpacity
        style={{
          width: "15%", // Example value, replace with calculated percentage for building "Leddy"
          height: "21%", // Example value
          top: "45%", // Example value
          left: "8%", // Example value
          position: "absolute",
          borderRadius: 10,
          backgroundColor: "#D5D5D5",
          borderColor: "transparent",
          borderWidth: 1,
        }}
      />
      <TouchableOpacity
        style={{
          width: "15%", // Example value, replace with calculated percentage for building "Leddy"
          height: "14%", // Example value
          top: "27%", // Example value
          left: "77%", // Example value
          position: "absolute",
          borderRadius: 10,
          backgroundColor: "#D5D5D5",
          borderColor: "transparent",
          borderWidth: 1,
        }}
      />
      <TouchableOpacity
        style={{
          width: "15%", // Example value, replace with calculated percentage for building "Leddy"
          height: "10%", // Example value
          top: "16%", // Example value
          left: "77%", // Example value
          position: "absolute",
          borderRadius: 10,
          backgroundColor: "#D5D5D5",
          borderColor: "transparent",
          borderWidth: 1,
        }}
      />

      {/* Repeat for other buildings or touchable areas */}
    </View>
  );
}
const styles = StyleSheet.create({
  CEIButton: {
    width: "15%", // Example value, replace with calculated percentage for building "Leddy"
    height: "16%", // Example value
    top: "67.5%", // Example value
    left: "77%", // Example value
    position: "absolute",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0099ff",
    borderColor: "transparent",
    borderWidth: 1,
  },
  CEIButtonSelect: {
    width: "15%", // Example value, replace with calculated percentage for building "Leddy"
    height: "16%", // Example value
    top: "67.5%", // Example value
    left: "77%", // Example value
    position: "absolute",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#06BCF2",
    borderColor: "transparent",
    borderWidth: 1,
  },
  OdetteButton: {
    width: "15%", // Example value, replace with calculated percentage for building "Leddy"
    height: "20%", // Example value
    top: "43%", // Example value
    left: "77%", // Example value
    position: "absolute",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0099ff",
    borderColor: "transparent",
    borderWidth: 1,
  },
  OdetteButtonSelected: {
    width: "15%", // Example value, replace with calculated percentage for building "Leddy"
    height: "20%", // Example value
    top: "43%", // Example value
    left: "77%", // Example value
    position: "absolute",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#06BCF2",
    borderColor: "transparent",
    borderWidth: 1,
  },
  LeddyButton: {
    width: "18%", // Example value, replace with calculated percentage for building "Leddy"
    height: "12%", // Example value
    top: "3%", // Example value
    left: "25%", // Example value
    position: "absolute",
    borderColor: "transparent",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: "#0099ff",
  },
  LeddyButtonSelected: {
    width: "18%", // Example value, replace with calculated percentage for building "Leddy"
    height: "12%", // Example value
    top: "3%", // Example value
    left: "25%", // Example value
    position: "absolute",
    borderColor: "transparent",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: "red",
  },
  LawButton: {
    width: "30%", // Example value, replace with calculated percentage for building "Law"
    height: "12%", // Example value
    top: "3%", // Example value
    left: "50%", // Example value
    position: "absolute",
    backgroundColor: "#0099ff",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "transparent",
    borderWidth: 1,
  },
  LawButtonSelected: {
    width: "30%", // Example value, replace with calculated percentage for building "Law"
    height: "12%", // Example value
    top: "3%", // Example value
    left: "50%", // Example value
    position: "absolute",
    backgroundColor: "#06BCF2",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "transparent",
    borderWidth: 1,
  },
  textContainer: {
    position: "absolute", // Position the text container absolutely
    top: 0, // Align to the top of the container
    left: 0, // Align to the left of the container
    right: 0, // Align to the right of the container
    bottom: 0, // Align to the bottom of the container
    justifyContent: "center", // Center the text vertically
    alignItems: "center", // Center the text horizontally
  },
});
