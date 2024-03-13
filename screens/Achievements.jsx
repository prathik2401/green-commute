import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

const Achievements = ({UserId}) => {
  const [achievementsData, setAchievementsData] = useState([]);

  useEffect(() => {
    fetch(`http://192.168.0.101:3000/achievements?UserId=${UserId}`) // Replace with your server's IP and endpoint
      .then((response) => response.json())
      .then((data) => setAchievementsData(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <View style={styles.container}>
      {achievementsData.map((achievement, index) => (
        <View key={achievement.achievements_id} style={styles.card}>
          <Text style={styles.title}>{achievement.achievements_title}</Text>
          <Text style={styles.description}>
            {achievement.achievements_description}
          </Text>
        </View>
      ))}
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
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    fontSize: 16,
  },
});

export default Achievements;
