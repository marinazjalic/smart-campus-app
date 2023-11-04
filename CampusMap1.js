import React, { useState } from "react";
import { View, TouchableOpacity, Image, Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const tabHeight = 0.65 * screenHeight;
const imageHeight = 0.7 * tabHeight;
//onst [selectedBuilding, setSelectedBuilding] = useState({});

// const imageSource = require("./assets/campus1.jpg"); // Replace with your image path
const imageSource = require("./assets/test2.png"); // Replace with your image path

export default function CampusMap({ selectedBuilding, onBuildingPress }) {
  const handleBuildingPress = (buildingName) => {
    onBuildingPress(buildingName);
    console.log(
      "Selected Building:",
      selectedBuilding,
      "Type:",
      typeof selectedBuilding
    );

    // Do anything else you need with the selected building name.
    // For example, send it to a backend or store it
  };

  return (
    <View
      style={{ width: screenWidth, height: imageHeight, position: "relative" }}
    >
      <Image source={imageSource} style={{ width: "100%", height: "90%" }} />

      <TouchableOpacity
        style={{
          width: "10.5%", // Example value, replace with calculated percentage for building "Law"
          height: "15%", // Example value
          top: "25%", // Example value
          left: "9%", // Example value
          position: "absolute",
          borderColor: "transparent",
          borderWidth: 1, // This is optional, just to see the borders of the touchable area
        }}
        onPress={() => {
          handleBuildingPress("Law");
        }}
      />

      <TouchableOpacity
        style={{
          width: "11%", // Example value, replace with calculated percentage for building "Leddy"
          height: "14%", // Example value
          top: "28%", // Example value
          left: "23%", // Example value
          position: "absolute",
          borderColor: "transparent",
          borderWidth: 1,
        }}
        onPress={() => {
          handleBuildingPress("Leddy Main");
        }}
      />
      <TouchableOpacity
        style={{
          width: "14.5%", // Example value, replace with calculated percentage for building "Leddy"
          height: "12%", // Example value
          top: "43%", // Example value
          left: "19.5%", // Example value
          position: "absolute",
          borderColor: "transparent",
          borderWidth: 1,
        }}
        onPress={() => {
          handleBuildingPress("Leddy West");
        }}
      />

      <TouchableOpacity
        style={{
          width: "14%", // Example value, replace with calculated percentage for building "Leddy"
          height: "13.5%", // Example value
          top: "8%", // Example value
          left: "64.5%", // Example value
          position: "absolute",
          borderColor: "transparent",
          borderWidth: 1,
        }}
        onPress={() => {
          handleBuildingPress("Odette Building");
        }}
      />

      <TouchableOpacity
        style={{
          width: "11%", // Example value, replace with calculated percentage for building "Leddy"
          height: "21.5%", // Example value
          top: "4%", // Example value
          left: "85%", // Example value
          position: "absolute",
          borderColor: "transparent",
          borderWidth: 1,
        }}
        onPress={() => {
          handleBuildingPress("Engineering");
        }}
      />

      {/* Repeat for other buildings or touchable areas */}
    </View>
  );
}
