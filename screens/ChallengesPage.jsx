import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Challenges = ({ navigation, route }) => {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const { UserID } = route.params; // Retrieve UserID from route.params

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const response = await fetch("http://192.168.58.128:3000/challenges");
        if (response.ok) {
          const data = await response.json();
          setChallenges(data);
        } else {
          console.error("Failed to fetch challenges:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching challenges:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChallenges();
  }, []);

  useEffect(() => {
    const loadCompletedChallenges = async () => {
      try {
        const completedChallenges = await AsyncStorage.getItem(
          "completedChallenges"
        );
        if (completedChallenges !== null) {
          const parsedChallenges = JSON.parse(completedChallenges);
          // Update the completed state of challenges in the local state
          setChallenges((prevChallenges) =>
            prevChallenges.map((challenge) => ({
              ...challenge,
              completed: parsedChallenges.includes(challenge.ChallengeID),
            }))
          );
        }
      } catch (error) {
        console.error("Error loading completed challenges:", error);
      }
    };

    loadCompletedChallenges();
  }, []);

  const saveCompletedChallenges = async (completedChallenges) => {
    try {
      await AsyncStorage.setItem(
        "completedChallenges",
        JSON.stringify(completedChallenges)
      );
    } catch (error) {
      console.error("Error saving completed challenges:", error);
    }
  };

  const handleJoinChallenge = async (ChallengeID) => {
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
          ChallengeID: ChallengeID,
          UserID: UserID, // Pass UserID to the POST request body
        }),
      });

      if (!response.ok) {
        // Handle error response
        console.error("Failed to join challenge:", response.statusText);
        return;
      }

      // Update the completed state of the challenge in the local state
      setChallenges((prevChallenges) =>
        prevChallenges.map((challenge) =>
          challenge.ChallengeID === ChallengeID
            ? { ...challenge, completed: true }
            : challenge
        )
      );

      // Save the updated completed challenges to AsyncStorage
      const updatedCompletedChallenges = challenges
        .filter((challenge) => challenge.completed)
        .map((challenge) => challenge.ChallengeID);
      saveCompletedChallenges(updatedCompletedChallenges);

      // Navigate to the Congratulations page upon successful completion
      navigation.navigate("Congratulations");
    } catch (error) {
      console.error("Error joining challenge:", error);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {challenges.map((challenge) => (
        <View key={challenge.ChallengeID} style={styles.card}>
          <View style={styles.challengeInfo}>
            <Text style={styles.challengeText}>{challenge.ChallengeName}</Text>
            <Text style={styles.description}>{challenge.Description}</Text>
            <Text style={styles.ecoPoints}>
              Eco Points: {challenge.EcoPoints}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => handleJoinChallenge(challenge.ChallengeID)}
            style={[
              styles.challengeButton,
              setTimeout(() => {
                challenge.completed && { backgroundColor: "red" };
              }, 1000),
            ]}
            disabled={challenge.completed}
          >
            <Text style={styles.challengeButtonText}>
              {challenge.completed ? "Joining" : "Join"}
            </Text>
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
    paddingVertical: 5, // Adjusted padding vertically
    paddingHorizontal: 20, // Adjusted padding horizontally
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#77BC3F", // Green color
  },
  challengeButtonText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "900",
    fontSize: 16,
  },
});
