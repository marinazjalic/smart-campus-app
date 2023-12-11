import React from "react";
import { View, Image, StyleSheet, TouchableOpacity, Alert } from "react-native";

const imageSourceMap = require("./campus1.jpg");
export default function ClickableImage() {
  return (
    <View style={styles.container}>
      <Image source={imageSourceMap} style={styles.image} />
      <TouchableOpacity
        style={styles.clickableArea1}
        onPress={() => Alert.alert("Law Building")}
      />
      <TouchableOpacity
        style={styles.clickableArea2}
        onPress={() => Alert.alert("Leddy Library (Main)")}
      />
      <TouchableOpacity
        style={styles.clickableArea3}
        onPress={() => Alert.alert("Leddy Library West")}
      />
      <TouchableOpacity
        style={styles.clickableArea4}
        onPress={() => Alert.alert("Odette Building")}
      />
      <TouchableOpacity
        style={styles.clickableArea5}
        onPress={() => Alert.alert("Engineering")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  clickableArea1: {
    position: "absolute",
    top: 50,
    left: 50,
    width: 50,
    height: 50,
  },
  clickableArea2: {
    position: "absolute",
    top: 150,
    left: 150,
    width: 50,
    height: 50,
  },
  clickableArea3: {
    position: "absolute",
    top: 150,
    left: 150,
    width: 50,
    height: 50,
  },
});
