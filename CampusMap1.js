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
          handleBuildingPress("Engineering Building");
        }}
      >
        <Text style={{ color: "white" }}>CEI</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          width: "15%",
          height: "46%",
          top: "21%",
          left: "40%",
          position: "absolute",
          borderRadius: 10,
          backgroundColor: "#D5D5D5",
          borderColor: "transparent",
          borderWidth: 1,
        }}
      />
      <TouchableOpacity
        style={{
          width: "15%",
          height: "21%",
          top: "21%",
          left: "8%",
          position: "absolute",
          borderRadius: 10,
          backgroundColor: "#D5D5D5",
          borderColor: "transparent",
          borderWidth: 1,
        }}
      />

      <TouchableOpacity
        style={{
          width: "15%",
          height: "21%",
          top: "45%",
          left: "8%",
          position: "absolute",
          borderRadius: 10,
          backgroundColor: "#D5D5D5",
          borderColor: "transparent",
          borderWidth: 1,
        }}
      />
      <TouchableOpacity
        style={{
          width: "15%",
          height: "14%",
          top: "27%",
          left: "77%",
          position: "absolute",
          borderRadius: 10,
          backgroundColor: "#D5D5D5",
          borderColor: "transparent",
          borderWidth: 1,
        }}
      />
      <TouchableOpacity
        style={{
          width: "15%",
          height: "10%",
          top: "16%",
          left: "77%",
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
    width: "15%",
    height: "16%",
    top: "67.5%",
    left: "77%",
    position: "absolute",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0099ff",
    borderColor: "transparent",
    borderWidth: 1,
  },
  CEIButtonSelect: {
    width: "15%",
    height: "16%",
    top: "67.5%",
    left: "77%",
    position: "absolute",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#06BCF2",
    borderColor: "transparent",
    borderWidth: 1,
  },
  OdetteButton: {
    width: "15%",
    height: "20%",
    top: "43%",
    left: "77%",
    position: "absolute",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0099ff",
    borderColor: "transparent",
    borderWidth: 1,
  },
  OdetteButtonSelected: {
    width: "15%",
    height: "20%",
    top: "43%",
    left: "77%",
    position: "absolute",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#06BCF2",
    borderColor: "transparent",
    borderWidth: 1,
  },
  LeddyButton: {
    width: "18%",
    height: "12%",
    top: "3%",
    left: "25%",
    position: "absolute",
    borderColor: "transparent",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: "#0099ff",
  },
  LeddyButtonSelected: {
    width: "18%",
    height: "12%",
    top: "3%",
    left: "25%",
    position: "absolute",
    borderColor: "transparent",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: "red",
  },
  LawButton: {
    width: "30%",
    height: "12%",
    top: "3%",
    left: "50%",
    position: "absolute",
    backgroundColor: "#0099ff",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "transparent",
    borderWidth: 1,
  },
  LawButtonSelected: {
    width: "30%",
    height: "12%",
    top: "3%",
    left: "50%",
    position: "absolute",
    backgroundColor: "#06BCF2",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "transparent",
    borderWidth: 1,
  },
  textContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});
