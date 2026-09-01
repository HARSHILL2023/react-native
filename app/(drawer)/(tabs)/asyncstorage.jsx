import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");

  const saveData = async () => {
   
    const user = {
      name: name,
      email: email,
      age: age,
    };

    const stringData = JSON.stringify(user);

    
    await AsyncStorage.setItem("user", stringData);

    console.log("Data saved");
  };

  const getData = async () => {
   
    const data = await AsyncStorage.getItem("user");

    if (data) {
     
      const user = JSON.parse(data);

      console.log("Name:", user.name);
      console.log("Email:", user.email);
      console.log("Age:", user.age);
    }
  };

  return (
    <View style={{ padding: 40, gap: 15 }}>

      <Text>Name</Text>
      <TextInput
        placeholder="Enter name"
        value={name}
        onChangeText={setName}
        style={{
          borderWidth: 1,
          padding: 10,
        }}
      />

      <Text>Email</Text>
      <TextInput
        placeholder="Enter email"
        value={email}
        onChangeText={setEmail}
        style={{
          borderWidth: 1,
          padding: 10,
        }}
      />

      <Text>Age</Text>
      <TextInput
        placeholder="Enter age"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
        style={{
          borderWidth: 1,
          padding: 10,
        }}
      />

      <Button
        title="Save Data"
        onPress={saveData}
      />

      <Button
        title="Get Data"
        onPress={getData}
      />

    </View>
  );
}