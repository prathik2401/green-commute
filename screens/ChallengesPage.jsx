import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const Challenges = ({ navigation }) => {
  const [challenges, setChallenges] = useState([]);

  useEffect(() => {
    fetch("http://192.168.29.213:3000/challenges") // Go to cmd, type ipconfig, and find the IPv4 Address for your computer. Replace it here.
      .then((response) => response.json())
      .then((data) => setChallenges(data))
      .catch((error) => console.error(error));
  }, []);

  const handleJoinChallenge = (ChallengeID) => {
    navigation.navigate("ChallengeDescription", { ChallengeID, navigation });
  };

  return (
    <View style={styles.container}>
      {challenges.map((challenge) => (
        <View key={challenge.ChallengeID} style={styles.card}>
          <Text style={styles.challengeText}>{challenge.ChallengeName}</Text>
          <TouchableOpacity
            onPress={() => handleJoinChallenge(challenge.ChallengeID)}
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
    justifyContent: "space-around",
    width: "90%",
    backgroundColor: "rgba(119, 188, 63, 0.18)",
    borderRadius: 10,
  },
  challengeText: {
    fontSize: 20,
    marginTop: 6.5,
    fontWeight: "bold",
  },
  challengeButton: {
    backgroundColor: "#77BC3F",
    padding: 10,
    borderRadius: 5,
    width: 80,
  },
  challengeButtonText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "900",
    fontSize: 16,
  },
});