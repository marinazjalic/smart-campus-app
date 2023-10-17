import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const imageSourceMap = require('./campus1.jpg');

export default function ClickableImage() {
  return (
    <View style={styles.container}>
      <Image source={imageSourceMap} style={styles.image} />
      <TouchableOpacity
        style={styles.clickableArea1}
        onPress={() => Alert.alert('Law Building')}
      />
      <TouchableOpacity
        style={styles.clickableArea2}
        onPress={() => Alert.alert('Leddy Library (Main)')}
      />
      <TouchableOpacity
      style={styles.clickableArea3}
      onPress={() => Alert.alert('Leddy Library West')}
      />
     <TouchableOpacity
      style={styles.clickableArea4}
      onPress={() => Alert.alert('Odette Building')}
      />
      <TouchableOpacity
        style={styles.clickableArea5}
        onPress={() => Alert.alert('Engineering')}
      />
      {/* Add more touchables for more clickable areas */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  clickableArea1: {
    position: 'absolute',
    top: 50,  // Adjust according to your needs
    left: 50, // Adjust according to your needs
    width: 50,  // Adjust according to your needs
    height: 50, // Adjust according to your needs
    backgroundColor: 'rgba(255, 0, 0, 0.5)' // Uncomment this to see the clickable area
  },
  clickableArea2: {
    position: 'absolute',
    top: 150,  // Adjust according to your needs
    left: 150, // Adjust according to your needs
    width: 50,  // Adjust according to your needs
    height: 50, // Adjust according to your needs
    // backgroundColor: 'rgba(0, 255, 0, 0.5)' // Uncomment this to see the clickable area
  },
  clickableArea3: {
    position: 'absolute',
    top: 150,  // Adjust according to your needs
    left: 150, // Adjust according to your needs
    width: 50,  // Adjust according to your needs
    height: 50, // Adjust according to your needs
    // backgroundColor: 'rgba(0, 255, 0, 0.5)' // Uncomment this to see the clickable area
  }
});
