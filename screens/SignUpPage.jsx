import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
} from "react-native";

export function SignUpPage({ navigation }) {
  const[fname,setFname]=useState("");
  const[lname,setLname]=useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async () => {
    const data = {
      UserName: username,
      FirstName: fname,
      LastName: lname,
      Email: email,
      Password: password
    };
    const response = await fetch('http://192.168.98.192:3000/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  
    if (response.ok) {
      console.log("MySQL connected ")
    } else {
      console.log("MySQL not connected")
    }
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require("../assets/images/green-commute-logos-white.png")}
          style={styles.logoFormat}
        ></Image>
      </View>
      <View style={styles.blank}>
        <Text style={styles.welcomeText}>Welcome!</Text>
      </View>
      <View style={{ alignItems: "center" }}>
        <Text style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>
          Sign Up
        </Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Enter your First Name"
        placeholderTextColor="gray"
        value={fname}
        onChangeText={setFname}
      />

<TextInput
        style={styles.input}
        placeholder="Enter your Last Name"
        placeholderTextColor="gray"
        value={lname}
        onChangeText={setLname}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your username"
        placeholderTextColor="gray"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your Email"
        placeholderTextColor="gray"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Password"
        placeholderTextColor="gray"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <Text style={styles.signUpText}>
        Already have an account?{" "}
        <Text
          style={{ color: "#294B29" }}
          onPress={() => navigation.navigate("LoginPage")}
        >
          Sign In
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
  imageContainer: {
    paddingTop: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 60,
    backgroundColor: "#77BC3F",
    width: "100%",
  },
  logoFormat: {
    width: 350,
    height: 75,
    marginBottom: 40,
  },
  welcomeText: {
    fontSize: 40,
    color: "#77BC3F",
    marginRight: 150,
    fontWeight: "900",
    marginBottom: 50,
  },
  input: {
    color: "black",
    width: "80%",
    height: 50,
    borderRadius: 10,
    marginBottom: 30,
    paddingHorizontal: 15,
    backgroundColor: "rgba(119, 188, 63, 0.32)",
    fontSize: 16,
  },
  button: {
    width: "40%",
    height: "5%",
    marginBottom: 12,
    paddingHorizontal: 8,
    backgroundColor: "#77BC3F",
    borderRadius: 20,
    marginTop: 20,
    justifyContent: "center",
  },
  signUpText: {
    paddingTop: 15,
    color: "#77BC3F",
    fontSize: 14,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    lineHeight: 40,
    fontSize: 20,
    fontWeight: "700",
    letterSpacing: 1.8,
  },
});
