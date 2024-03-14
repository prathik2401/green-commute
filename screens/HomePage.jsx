import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  BackHandler,
} from "react-native";
import FooterNavigation from "./FooterNavigation";
import UserComponent from "./ProfilePage";
import Achievements from "./Achievements";

const HomePage = ({ navigation, route }) => {
  const moveAnim = useRef(new Animated.Value(0)).current;
  const [showUser, setShowUser] = useState(false);
  const [user, setUser] = useState(null);
  const [showAchievements, setShowAchievements] = useState(false);

  useEffect(() => {
    const backAction = () => {
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    if (route.params) {
      const { UserName, FirstName, LastName, Email, UserID } = route.params;
      setUser({ UserName, FirstName, LastName, Email, UserID });
    }
  }, [route.params]);

  const handleProfileButtonPress = () => {
    setShowUser(true);
  };

  const handleHomeButtonPress = () => {
    setShowUser(false);
    setShowAchievements(false);
  };

  const handleAchievementsButtonPress = () => {
    setShowAchievements(true);
  };

  const handleJoinChallenge = () => {
    navigation.navigate("Challenges", {
      UserID: user?.UserID,
    });
  };

  return (
    <View style={styles.container}>
      {!showUser && !showAchievements ? (
        <>
          <Animated.View style={{ transform: [{ translateY: moveAnim }] }}>
            <Text style={styles.title}>Welcome to</Text>
            <Text style={styles.greenCommuteTitle}>
              The Green Commute Challenge!
            </Text>
          </Animated.View>
          <Text style={styles.description}>
            Join us in making commuting more{" "}
            <Text style={styles.highlightText}>eco-friendly</Text>. Participate
            in challenges,{" "}
            <Text style={styles.highlightText}>earn eco-points</Text>, and climb
            the leaderboard!
          </Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.longbutton}
              onPress={() =>
                navigation.navigate("CompletedChallengesScreen", {
                  UserID: user?.UserID,
                })
              }
            >
              <Text style={styles.buttonText}>Track Your Progress</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.shortbutton}
              onPress={handleJoinChallenge}
            >
              <Text style={styles.buttonText}>Challenges</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.bottomshortbutton}
              onPress={handleAchievementsButtonPress}
            >
              <Text style={styles.buttonText}>Achievements</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.bottomlongbutton}
              onPress={() => navigation.navigate("Leaderboard")}
            >
              <Text style={styles.buttonText}>Leaderboard</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : !showAchievements ? (
        <UserComponent
          user={user}
          onDelete={() => {}}
          navigation={navigation} // Pass the navigation prop to UserComponent
        />
      ) : (
        <Achievements userID={user?.UserID} />
      )}
      <FooterNavigation
        navigation={navigation}
        onUserButtonPress={handleProfileButtonPress}
        onHomeButtonPress={handleHomeButtonPress}
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
  title: {
    fontSize: 38,
    fontWeight: "bold",
    color: "#294B29",
    marginTop: 25,
  },
  greenCommuteTitle: {
    fontSize: 38,
    fontWeight: "bold",
    color: "#77BC3F",
    marginBottom: 30,
  },
  description: {
    fontSize: 16,
    color: "#77BC3F",
    marginBottom: 30,
    paddingHorizontal: 30,
    textAlign: "center",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    padding: 10,
  },
  longbutton: {
    width: 220,
    height: 150,
    backgroundColor: "#426821",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 4,
    borderRadius: 10,
  },
  shortbutton: {
    width: 150,
    height: 150,
    backgroundColor: "#77BC3F",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 4,
    borderRadius: 10,
  },
  bottomlongbutton: {
    width: 220,
    height: 150,
    backgroundColor: "#FFB000",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 4,
    borderRadius: 10,
  },
  bottomshortbutton: {
    width: 150,
    height: 150,
    backgroundColor: "#C07F00",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 4,
    borderRadius: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
    flexWrap: "wrap",
    textAlign: "center",
  },
  highlightText: {
    color: "darkgreen",
    fontWeight: "bold",
  },
});

export default HomePage;
