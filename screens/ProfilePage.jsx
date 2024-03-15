import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import axios from "axios";

const UserComponent = ({ user = {}, onDelete, navigation }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      // Send DELETE request to server to delete the user
      await axios.delete(`http://192.168.0.101:3000/users/${user.UserID}`);
      setLoading(false);
      // Display toast message
      ToastAndroid.show("User deleted successfully", ToastAndroid.SHORT);
      // Call onDelete callback if provided
      if (onDelete) {
        onDelete();
        navigation.navigate("LoginPage");
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
      ToastAndroid.show("Failed to delete user", ToastAndroid.SHORT);
    }
  };

  if (!user) {
    return (
      <View style={{ padding: 20 }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const { FirstName, LastName, Email, UserName, UserID } = user;
  console.log(user);

  return (
    <View style={styles.container}>
      <Text
        style={{
          textAlign: "center",
          fontSize: 34,
          fontWeight: "900",
          marginBottom: 30,
          color: "#77BC3F",
        }}
      >
        The Green Commute
      </Text>
      <Text style={styles.headingText}>User Details</Text>
      <Text style={styles.text}>First Name: {FirstName}</Text>
      <Text style={styles.text}>Last Name: {LastName}</Text>
      <Text style={styles.text}>Username: {UserName}</Text>
      <Text style={styles.text}>Email: {Email}</Text>
      <Text style={styles.text}>UserID: {UserID}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={handleDelete}
        disabled={loading}
      >
        <Text style={styles.buttonText}>Delete User</Text>
      </TouchableOpacity>
    </View>
  );
};

// Styles...
const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#F8F8F7",
    borderRadius: 5,
    justifyContent: "center",
  },
  headingText: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 50,
    color: "#426821",
  },
  text: {
    fontSize: 18,
    marginBottom: 15,
    color: "#333",
  },
  button: {
    backgroundColor: "red",
    paddingVertical: 15,
    marginTop: 20,
    borderRadius: 5,
    marginHorizontal: 20,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  imageContainer: {
    paddingTop: 50,
    marginBottom: 60,
    backgroundColor: "#77BC3F",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginTop: -80,
  },
  logoFormat: {
    width: 200,
    height: 30,
    marginBottom: 40,
  },
});

export default UserComponent;
