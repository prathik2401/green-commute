import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

const UserComponent = ({ user = { user }, onDelete }) => {
  if (!user) {
    return (
      <View style={{ padding: 20 }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const { fname, lname, email, username } = user;
  const handleDeleteUser = () => {
    // Send a DELETE request to the server
    fetch(`http://192.168.0.101:3000/users/${user.id}`, { method: 'DELETE' })
      .then(response => {
        if (response.ok) {
          // The user was successfully deleted
          alert('User deleted');
          // Here you can navigate to another screen or update the state
        } else {
          // The server responded with a status other than 200
          console.error('Failed to delete user:', response);
          alert('Failed to delete user');
        }
      })
      .catch(error => {
        // An error occurred while trying to send the request
        console.error('Network error:', error);
        alert('Network error');
      });
  };

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
      <Text style={styles.text}>First Name: {fname}</Text>
      <Text style={styles.text}>Last Name: {lname}</Text>
      <Text style={styles.text}>Username: {username}</Text>
      <Text style={styles.text}>Email: {email}</Text>
      <TouchableOpacity style={styles.button} onPress={handleDeleteUser}>
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
