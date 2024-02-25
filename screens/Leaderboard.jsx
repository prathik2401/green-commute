import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

const Leaderboard = ({ navigation }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchLeaderboardData();
  }, []);

  const fetchLeaderboardData = async () => {
    // Replace with your server API and endpoint
    const response = await fetch("https://your-server.com/api/leaderboard");
    const json = await response.json();
    setData(json);
  };

  const renderItem = ({ item }) => (
    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
      <Text>{item.username}</Text>
      <Text>{item.ecoPoints}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>Leaderboard</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F7",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Leaderboard;
