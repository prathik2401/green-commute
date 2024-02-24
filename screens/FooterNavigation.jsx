import { View, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialCommunityIcons, AntDesign, Entypo } from "@expo/vector-icons";

const FooterNavigation = ({ navigation }) => {
  return (
    <View style={styles.footer}>
      <TouchableOpacity
        style={styles.footerButton}
        onPress={() => navigation.navigate("UserProfile")}
      >
        <MaterialCommunityIcons name="sword-cross" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.footerButton}
        onPress={() => navigation.navigate("Challenges")}
      >
        <Entypo name="bar-graph" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.footerButton}
        onPress={() => navigation.navigate("Challenges")}
      >
        <AntDesign name="user" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    position: "absolute",
    bottom: 0,
    padding: 10,
    backgroundColor: "rgba(119, 188, 63, 0.2)",
  },
  footerButton: {
    backgroundColor: "rgba(119, 188, 63, 0.8)",
    padding: 10,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  footerButtonText: {
    color: "white",
    fontSize: 12,
    textAlign: "center",
  },
});

export default FooterNavigation;
