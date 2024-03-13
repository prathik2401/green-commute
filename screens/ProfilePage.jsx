import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const UserComponent = ({ user = {}, onDelete }) => {
  if (!user) {
    return (
      <View style={{ padding: 20 }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const { FirstName, LastName, Email, UserName } = user;

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
      <TouchableOpacity style={styles.button} onPress={onDelete}>
        <Text style={styles.buttonText}>Delete User</Text>
      </TouchableOpacity>
    </View>
  );
};

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
