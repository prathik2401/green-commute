import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    fetch("http://192.168.0.101:3000/leaderboard") // Replace with your server's IP and endpoint
      .then((response) => response.json())
      .then((data) => setLeaderboardData(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Text style={styles.headingStyle}>Leaderboard</Text>
        {leaderboardData.map((entry, index) => (
          <View
            key={index}
            style={
              index === 0
                ? styles.cardFirst
                : index < 10
                ? styles.cardTop10
                : styles.card
            }
          >
            <Text style={styles.rank}>{index + 1}</Text>
            <Text style={styles.name}>{entry.UserName}</Text>
            <Text style={styles.points}>{entry.TotalEcoPoints}</Text>
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
    backgroundColor: "#F8F8F7",
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    padding: 10,
    borderRadius: 18,
    backgroundColor: "rgba(119, 188, 63, 0.32)",
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
  headingStyle: {
    fontSize: 30,
    fontWeight: "900",
    marginBottom: 20,
    textAlign: "center",
    color: "#77BC3F",
    marginTop: 50,
  },
  cardTop10: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    padding: 10,
    borderRadius: 18,
    backgroundColor: "#77BC3F",
  },
  cardFirst: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    padding: 10,
    borderRadius: 18,
    backgroundColor: "#FFB000",
  },
});

export default Leaderboard;
