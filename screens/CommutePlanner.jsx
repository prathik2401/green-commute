// Import necessary components
import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";

// Define the CommutePlanner component
const CommutePlanner = ({ navigation }) => {
  const [startLocation, setStartLocation] = useState("");
  const [destination, setDestination] = useState("");

  const handlePlanCommute = () => {
    navigation.navigate("HomePage", { startLocation, destination }); //Have to implement a screen for this
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter your starting location"
        value={startLocation}
        onChangeText={setStartLocation}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your destination"
        value={destination}
        onChangeText={setDestination}
      />
      <TouchableOpacity style={styles.button} onPress={handlePlanCommute}>
        <Text style={styles.buttonText}>Create Commute</Text>
      </TouchableOpacity>
    </View>
  );
};

// Define the styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  input: {
    color: "black",
    width: "80%",
    height: 50,
    borderRadius: 10,
    marginBottom: 30,
    paddingHorizontal: 15,
    backgroundColor: "rgba(119, 188, 63, 0.32)",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#77BC3F",
    padding: 10,
    borderRadius: 10,
    width: "45%",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    textAlign: "center",
  },
});

// Export the component
export default CommutePlanner;
