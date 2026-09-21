import { useState } from "react";
import { View, Text, Button, TextInput, StyleSheet } from "react-native";
import * as SecureStore from "expo-secure-store";
import * as LocalAuth from "expo-local-authentication";
import { router } from "expo-router";

const Login = () => {
  const [name, setname] = useState(null);
  const [pass, setpass] = useState(null);

  const handleLogin = async () => {
    if (name == "harshil" && pass == "123") {
      await SecureStore.setItemAsync("name", "harshil");
      await SecureStore.setItemAsync("biomteric", "true");
      alert("logined")
    } else {
      alert("name or pass is wrong check again");
    }
  };

  const handleBiomrtic = async () => {
    const token = await SecureStore.getItemAsync("name");
    const check = await SecureStore.getItemAsync("Biometric");

    if (!token || check != "true") {
      alert("something went wrong");
    }

    const hardware = await LocalAuth.hasHardwareAsync();
    if (!hardware) {
      alert("buy a new phone");
      return;
    }

    const isavailable = await LocalAuth.isEnrolledAsync();
    if (!isavailable) {
      alert("buy a new phone");
      return;
    }

    const auth = await LocalAuth.authenticateAsync({
      promptMessage: "biometric login",
    });

    if (auth.success) {
      router.replace("/home");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔐 Login</Text>

      <TextInput
        placeholder="Enter your name"
        onChangeText={setname}
        style={styles.input}
      />
      <TextInput
        placeholder="Enter your password"
        onChangeText={setpass}
        style={styles.input}
        secureTextEntry
      />

      <View style={styles.buttonContainer}>
        <Button title="Verify Login" onPress={handleLogin} color="#4A90E2" />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Login with Biometric"
          onPress={handleBiomrtic}
          color="#4A90E2"
        />
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    marginVertical: 10,
    width: "90%",
    borderRadius: 8,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 15,
    width: "90%",
    borderRadius: 8,
    overflow: "hidden",
  },
});
