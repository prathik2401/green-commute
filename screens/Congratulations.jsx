import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";

const Congratulations = ({ navigation }) => {
  const handleGoHome = () => {
    navigation.navigate("HomePage");
  };

  const growAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  useEffect(() => {
    Animated.timing(growAnim, {
      toValue: 2,
      duration: 2000,
      useNativeDriver: false, // Add this line
    }).start();
  }, [growAnim]);

  return (
    <View style={styles.container}>
      <Text style={styles.congratsText}>
        Congratulations on joining the challenge!
      </Text>
      <Animated.Image
        style={{ ...styles.leaf, transform: [{ scale: growAnim }] }}
        source={require("../assets/images/leaf.png")}
      />
      <View style={styles.footer}>
        <TouchableOpacity onPress={handleGoHome} style={styles.homeButton}>
          <Text style={styles.buttonText}>Go to Home Page</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "rgba(119, 188, 63, 0.18)",
    paddingBottom: 50,
    paddingTop: 50,
  },
  leaf: {
    width: 150,
    height: 100,
    alignSelf: "center",
  },
  congratsText: { fontSize: 24, textAlign: "center", marginTop: 120 },
  footer: { width: "80%", alignSelf: "center", marginBottom: 50 },
  homeButton: { backgroundColor: "#77BC3F", padding: 10, borderRadius: 20 },
  buttonText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "900",
    fontSize: 16,
    letterSpacing: 1,
  },
});

export default Congratulations;
