import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    fetch("http://192.168.29.213:3000/leaderboard") // Replace with your server's IP and endpoint
      .then((response) => response.json())
      .then((data) => setLeaderboardData(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <View style={styles.container}>
      <SafeAreaView>
        {leaderboardData.map((entry, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.rank}>{index + 1}</Text>
            <Text style={styles.name}>{entry.user_name}</Text>
            <Text style={styles.points}>{entry.points}</Text>
          </View>
        ))}
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  rank: {
    fontSize: 18,
  },
  name: {
    fontSize: 18,
  },
  points: {
    fontSize: 18,
  },
});

export default Leaderboard;
