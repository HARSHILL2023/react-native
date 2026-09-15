import { useState } from "react";
import { View, Text, Button, Alert, TextInput, StyleSheet } from "react-native";
import * as SecureStore from "expo-secure-store";
import * as LocalAuth from "expo-local-authentication";
import { router } from "expo-router";
const App = () => {
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");

  const login = async () => {
    if (name === "harshil" && pass === "1234") {
      await SecureStore.setItemAsync("token", "harshil");
      await SecureStore.setItemAsync("biometric", "true");
      Alert.alert("Success", "You are logged in!");
    } else {
      Alert.alert("Failed", "Wrong username or password");
    }
  };

  const biometric = async()=>{
    const name=await SecureStore.getItemAsync("token");
    const cbiometric= await SecureStore.getItemAsync("biometric");

    if(!name ||  cbiometric!=="true"){
      alert("please login with email  first");
      return;
    }

    
    
    const checkhardware=await LocalAuth.hasHardwareAsync();

    if(!checkhardware){
      alert("buy a new phone");
      return;
    }
     const check= await LocalAuth.isEnrolledAsync();

     if(!check){
      alert("buy a new phone");
      return;
     }

     const checkbiometric=await LocalAuth.authenticateAsync({
      promptMessage:"login with biometric"
     });

     if(checkbiometric.success){
      alert("login succesfully done");
      router.replace('/');
     }


  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔐 Secure Login</Text>

      <TextInput
        placeholder="Enter your name"
        onChangeText={setName}
        value={name}
        style={styles.input}
      />

      <TextInput
        placeholder="Enter your password"
        onChangeText={setPass}
        value={pass}
        secureTextEntry
        style={styles.input}
      />

      <View style={styles.buttonContainer}>
        <Button title="Login" onPress={login} color="#4A90E2" />
        <Button title="BIOMETRIC" onPress={biometric} color="#4A90E2" />
      </View>
    </View>
  );
};

export default App;

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
    marginTop: 20,
    width: "90%",
    borderRadius: 8,
    overflow: "hidden",
  },
});
