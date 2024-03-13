import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";

import Toast from "react-native-toast-message";

export function LoginPage({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const data = {
      Email: email,
      Password: password,
    };
    try {
      const response = await fetch("http://192.168.0.101:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    
      if (response.ok) {
        const { UserName, FirstName, LastName, Email } = await response.json(); // Destructure user object
        Toast.show({
          type: "success",
          text1: "Successfully Logged In!",
          text2: "You are now logged in.", // update this message as needed
        });
        navigation.navigate("HomePage", {
          UserName,
          FirstName,
          LastName,
          Email,
        }); // Pass user data with corrected property names
      } else {
        const errorText = await response.text(); // read the response body here if the response is not ok
        console.log(errorText);
        Toast.show({
          type: "error",
          text1: "Error",
          text2: errorText,
        });
      }
    } catch (error) {
      console.error("Error:", error);
      console.log(error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.message,
      });
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require("../assets/images/green-commute-logos-white.png")}
          style={styles.logoFormat}
        ></Image>
        <Image
          source={require("../assets/images/bike-icon.png")}
          style={styles.bikeicon}
        ></Image>
      </View>
      <View style={styles.blank}>
        <Text style={styles.welcomeText}>Welcome Back!</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#50623A"
        value={email}
        onChangeText={setEmail}
        cursorColor={"#DBE7C9"}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        placeholderTextColor="#50623A"
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
      <Text style={styles.signUpText}>
        Don't have an account?{" "}
        <Text
          style={{ color: "#294B29" }}
          onPress={() => navigation.navigate("SignupPage")}
        >
          Sign Up
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F7",
    alignItems: "center",
  },
  logoFormat: {
    marginTop: 60,
    width: 400,
    height: 50,
  },
  imageContainer: {
    width: "100%",
    alignItems: "center",
    backgroundColor: "#77BC3F",
  },
  bikeicon: {
    width: 150,
    height: 100,
    marginLeft: 200,
  },
  blank: {
    height: 180,
    width: "100%",
    backgroundColor: "#F8F8F7",
    marginTop: -22,
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 50,
  },
  welcomeText: {
    fontSize: 40,
    color: "#77BC3F",
    marginTop: 50,
    marginRight: 100,
    fontWeight: "900",
  },
  loginText: {
    width: "100%",
    marginLeft: 32,
  },
  input: {
    color: "black",
    width: "80%",
    height: 50,
    borderRadius: 10,
    marginBottom: 22,
    paddingHorizontal: 15,
    backgroundColor: "rgba(119, 188, 63, 0.32)",
    fontSize: 16,
  },
  loginButton: {
    width: "40%",
    height: "5%",
    marginBottom: 12,
    paddingHorizontal: 8,
    backgroundColor: "#77BC3F",
    borderRadius: 20,
    marginTop: 20,
    justifyContent: "center",
  },
  loginButtonText: {
    color: "white",
    textAlign: "center",
    lineHeight: 40,
    fontSize: 20,
    fontWeight: "700",
    letterSpacing: 1.8,
  },
  signUpText: {
    paddingTop: 15,
    color: "#77BC3F",
    fontSize: 14,
  },
});
