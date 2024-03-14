import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

const CommutePlanner = ({ navigation }) => {
  const [transportMode, setTransportMode] = useState("bicycle");

  const handlePlanCommute = () => {
    navigation.navigate("HomePage", { transportMode });
  };

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={transportMode}
        onValueChange={(itemValue) => setTransportMode(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Bicycle" value="bicycle" />
        <Picker.Item label="Walking/Running" value="walking" />
        <Picker.Item label="Public Transport" value="publicTransport" />
        <Picker.Item label="Carpool" value="carpool" />
      </Picker>
      <TouchableOpacity style={styles.button} onPress={handlePlanCommute}>
        <Text style={styles.buttonText}>Create Commute</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  picker: {
    width: "80%",
    height: 50,
    marginBottom: 30,
    backgroundColor: "rgba(119, 188, 63, 0.32)",
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

export default CommutePlanner;
