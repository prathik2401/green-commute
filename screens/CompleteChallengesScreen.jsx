import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";

const CompletedChallengesScreen = ({ navigation, route }) => {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const { UserID } = route.params;

  useEffect(() => {
    const fetchUserChallenges = async () => {
      try {
        const response = await fetch(
          `http://192.168.58.128:3000/userChallenges?UserID=${UserID}`
        );
        if (response.ok) {
          const data = await response.json();
          setChallenges(data);
        } else {
          console.error(
            "Failed to fetch user challenges:",
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error fetching user challenges:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserChallenges();
  }, [UserID]);

  const handleJoinChallenge = async (ChallengeID) => {
    try {
      const response = await fetch(
        "http://192.168.58.128:3000/completeChallenge",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ChallengeID: ChallengeID,
            UserID: UserID,
          }),
        }
      );

      if (!response.ok) {
        console.error("Failed to complete challenge:", response.statusText);
        return;
      }

      const updatedChallenges = challenges.map((challenge) =>
        challenge.ChallengeID === ChallengeID
          ? { ...challenge, completed: true }
          : challenge
      );
      setChallenges(updatedChallenges);

      const updatedCompletedChallenges = updatedChallenges
        .filter((challenge) => challenge.completed)
        .map((challenge) => challenge.ChallengeID);
      saveCompletedChallenges(updatedCompletedChallenges);
      navigation.navigate("HomePage");
    } catch (error) {
      console.error("Error completing challenge:", error);
    }
  };

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

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Enrolled Challenges</Text>
        {challenges.map((challenge, index) => (
          <View key={`${challenge.ChallengeID}-${index}`} style={styles.card}>
            <View style={styles.challengeInfo}>
              <Text style={styles.challengeText}>
                {challenge.ChallengeName}
              </Text>
              <Text style={styles.description}>{challenge.Description}</Text>
              <Text style={styles.ecoPoints}>
                Eco Points: {challenge.EcoPoints}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => handleJoinChallenge(challenge.ChallengeID)}
              style={[
                styles.challengeButton,
                challenge.completed
                  ? { backgroundColor: "#FF5733" }
                  : { backgroundColor: "#77BC3F" },
              ]}
              disabled={challenge.completed} // Disable button if challenge is already completed
            >
              <Text style={styles.challengeButtonText}>
                {challenge.completed ? "Completed" : "Complete"}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default CompletedChallengesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F7",
    alignItems: "center",
    justifyContent: "center",
  },
  scrollContainer: {
    flexGrow: 1,
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
    paddingVertical: 5,
    paddingHorizontal: 20,
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
  title: {
    fontSize: 30,
  },
});
