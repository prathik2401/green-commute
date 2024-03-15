import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const ChallengeDescription = ({ navigation, route }) => {
  const [challenge, setChallenge] = useState(null);
  const [userID, setUserID] = useState(null);

  useEffect(() => {
    const { Challenge_ID } = route.params;
    fetch(`http://192.168.0.101:3000/challenges/${Challenge_ID}`)
      .then((response) => response.json())
      .then((data) => setChallenge(data[0]))
      .catch((error) => console.error(error));
  }, []);

  const handleJoinChallenge = () => {
    if (challenge && userID) {
      fetch("http://192.168.0.101:3000/joinChallenge", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Challenge_ID: challenge.Challenge_ID,
          UserID: userID,
        }),
      })
        .then((response) => {
          if (response.ok) {
            console.log("User joined challenge successfully");
            navigation.navigate("Congratulations", {
              Challenge_ID: challenge.Challenge_ID,
            });
          } else {
            console.error("Failed to join challenge");
          }
        })
        .catch((error) => console.error(error));
    }
  };

  return (
    <View style={styles.container}>
      {challenge && (
        <View style={styles.card}>
          <Text style={styles.challengeText}>{challenge.ChallengeName}</Text>
          <Text style={styles.challengeDescriptionStyle}>
            {challenge.Description}
          </Text>
          <TouchableOpacity
            onPress={handleJoinChallenge}
            style={styles.challengeButton}
          >
            <Text style={styles.buttonText}>Join Challenge</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
    backgroundColor: "#F8F8F7",
  },
  card: {
    padding: 10,
    backgroundColor: "rgba(119, 188, 63, 0.18)",
    marginBottom: 10,
    borderRadius: 10,
  },
  challengeText: {
    fontSize: 31,
    fontWeight: "bold",
    paddingBottom: 10,
    marginTop: 10,
  },
  challengeButton: {
    backgroundColor: "#77BC3F",
    padding: 10,
    borderRadius: 5,
    width: "37%",
    height: 50,
    alignSelf: "center",
    justifyContent: "center",
  },
  buttonText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "900",
    fontSize: 16,
  },
  challengeDescriptionStyle: { fontSize: 18, paddingBottom: 20 },
});

export default ChallengeDescription;
