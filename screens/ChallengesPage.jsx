import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";

const Challenges = ({ navigation }) => {
  const [challenges, setChallenges] = useState([]);

  useEffect(() => {
    // Fetch challenges from MySQL database
    // This is a placeholder, replace with actual fetch request
    fetch("http://your-api-url/challenges")
      .then((response) => response.json())
      .then((data) => setChallenges(data))
      .catch((error) => console.error(error));
  }, []);

  const handleJoinChallenge = (challengeId) => {
    // Navigate to ChallengeDetails page with the selected challengeId
    navigation.navigate("ChallengeDetails", { challengeId });
  };

  return (
    <View>
      {challenges.map((challenge) => (
        <View key={challenge.id}>
          <Text>{challenge.name}</Text>
          <Text>{challenge.rules}</Text>
          <Text>{challenge.scores}</Text>
          <TouchableOpacity onPress={() => handleJoinChallenge(challenge.id)}>
            <Text>Join Challenge</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

export default Challenges;
