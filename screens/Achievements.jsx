import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

const Achievements = ({ userID }) => {
  const [achievementsData, setAchievementsData] = useState([]);
  console.log(userID);
  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const response = await fetch(
          `http://192.168.0.101:3000/userbadge/${userID}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setAchievementsData(data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchAchievements();
  }, [userID]);

  return (
    <View style={styles.container}>
      {achievementsData.map((achievement, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.title}>{achievement.BadgeName}</Text>
          <Text style={styles.description}>{achievement.Description}</Text>
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
