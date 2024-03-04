import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const ChallengeDescription = ({ navigation, route }) => {
  const [challenge, setChallenge] = useState(null);

  useEffect(() => {
    const { ChallengeID } = route.params;
    fetch(`http:// 192.168.98.192:3000/challenges/${ChallengeID}`) // Replace with your server's IP and port
      .then((response) => response.json())
      .then((data) => setChallenge(data[0]))
      .catch((error) => console.error(error));
  }, []);

  const handleJoinChallenge = () => {
    navigation.navigate("Congratulations", {
      ChallengeID: challenge.ChallengeID,
    });
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
