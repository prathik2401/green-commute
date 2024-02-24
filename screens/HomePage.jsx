import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from "react-native";

const HomePage = ({ navigation }) => {
  const moveAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  useEffect(() => {
    Animated.timing(moveAnim, {
      toValue: -100, // Move upwards by 100 units
      duration: 1500, // Duration of the animation
      useNativeDriver: true, // Use native driver for better performance
    }).start();
  }, [moveAnim]);

  return (
    <View style={styles.container}>
      <Animated.View style={{ transform: [{ translateY: moveAnim }] }}>
        <Text style={styles.title}>
          Welcome to The Green Commute Challenge!
        </Text>
      </Animated.View>
      <Text style={styles.description}>
        Join us in making commuting more eco-friendly. Participate in
        challenges, earn eco-points, and climb the leaderboard!
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("CommutePlanner")}
      >
        <Text style={styles.buttonText}>Plan Your Commute</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Challenges")}
      >
        <Text style={styles.buttonText}>View Challenges</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Leaderboard")}
      >
        <Text style={styles.buttonText}>View Leaderboard</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Achievements")}
      >
        <Text style={styles.buttonText}>View Achievements</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8F8F7",
  },
  title: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#294B29",
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: "#294B29",
    marginBottom: 40,
    paddingHorizontal: 10,
    textAlign: "center",
  },
  button: {
    marginBottom: 20,
    backgroundColor: "#294B29",
    borderRadius: 10,
    padding: 10,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
});

export default HomePage;
