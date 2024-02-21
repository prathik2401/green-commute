import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
} from "react-native";

export function SignUpPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require("../assets/images/green-commute-logos.jpeg")}
          style={styles.logoFormat}
        ></Image>
      </View>
      <View style={{ alignItems: "center" }}>
        <Text style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>
          Sign Up
        </Text>
      </View>
      <Text style={styles.textGeneral}>Username</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your username"
        placeholderTextColor="gray"
        value={username}
        onChangeText={setUsername}
      />
      <Text style={styles.textGeneral}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your Email"
        placeholderTextColor="gray"
        value={email}
        onChangeText={setEmail}
      />
      <Text style={styles.textGeneral}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Password"
        placeholderTextColor="gray"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Text>Sign Up</Text>
      <TouchableOpacity style={styles.button} onPress={{}}>
        <Text>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  imageContainer: {
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 60,
  },
  logoFormat: {
    width: 150,
    height: 75,
    marginBottom: 40,
  },
  input: {
    backgroundColor: "#333",
    color: "#fff",
    borderRadius: 30,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#40A2E3",
    padding: 15,
    borderRadius: 30,
    alignItems: "center",
  },
  textGeneral: {
    color: "white",
    marginBottom: 10,
    marginTop: 20,
  },
});
