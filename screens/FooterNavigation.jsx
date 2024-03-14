import { View, TouchableOpacity, StyleSheet } from "react-native";
import { AntDesign, Entypo, Foundation } from "@expo/vector-icons";

const FooterNavigation = ({
  navigation,
  onUserButtonPress,
  onHomeButtonPress,
}) => {
  return (
    <View style={styles.footer}>
      <TouchableOpacity style={styles.footerButton} onPress={onHomeButtonPress}>
        <Foundation
          name="home"
          size={24}
          color="white"
          style={{ width: 30, textAlign: "center" }}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.footerButton} onPress={onUserButtonPress}>
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
