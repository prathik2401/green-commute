import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const Challenges = ({ navigation, route }) => {
  const [challenges, setChallenges] = useState([]);
  const { UserID } = route.params; // Retrieve UserID from route.params

  useEffect(() => {
    // Retrieve challenges data when the component mounts
    fetch("http://192.168.58.128:3000/challenges")
      .then((response) => response.json())
      .then((data) => setChallenges(data))
      .catch((error) => console.error(error));
  }, []);

  const handleJoinChallenge = async (Challenge_ID) => {
    console.log(UserID); // Logging UserID to verify it's available
    try {
      if (!UserID) {
        console.error("User is not logged in.");
        return;
      }

      // Make a POST request to join the challenge
      const response = await fetch("http://192.168.58.128:3000/joinChallenge", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Challenge_ID: Challenge_ID,
          UserID: UserID, // Pass UserID to the POST request body
        }),
      });

      if (!response.ok) {
        // Handle error response
        console.error("Failed to join challenge:", response.statusText);
        return;
      }

      // Navigate to the Congratulations page upon successful completion
      navigation.navigate("Congratulations");
    } catch (error) {
      console.error("Error joining challenge:", error);
    }
  };

  return (
    <View style={styles.container}>
      {challenges.map((challenge) => (
        <View key={challenge.Challenge_ID} style={styles.card}>
          <View style={styles.challengeInfo}>
            <Text style={styles.challengeText}>{challenge.ChallengeName}</Text>
            <Text style={styles.description}>{challenge.Description}</Text>
            <Text style={styles.ecoPoints}>
              Eco Points: {challenge.EcoPoints}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => handleJoinChallenge(challenge.Challenge_ID)}
            style={styles.challengeButton}
          >
            <Text style={styles.challengeButtonText}>Join</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

export default Challenges;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F7",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    borderWidth: 1,
    borderColor: "#000",
    padding: 10,
    margin: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    backgroundColor: "rgba(119, 188, 63, 0.18)",
    borderRadius: 10,
  },
  challengeInfo: {
    flex: 1,
  },
  challengeText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  ecoPoints: {
    fontSize: 16,
    color: "#294B29",
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    color: "#294B29",
    marginBottom: 10,
    fontStyle: "italic",
  },
  challengeButton: {
    backgroundColor: "#77BC3F",
    paddingVertical: 5, // Adjusted padding vertically
    paddingHorizontal: 20, // Adjusted padding horizontally
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },

  challengeButtonText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "900",
    fontSize: 16,
  },
});
