import React, { useState } from "react";
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AsyncStorageExample = () => {
  const [name, setName] = useState("");
  const [savedData, setSavedData] = useState("");

  // Save Data
  const handleSaveData = async () => {
    try {
      await AsyncStorage.setItem("userName", name);
      Alert.alert("Success", "Data saved successfully!");
      setName(""); // Clear input after saving
    } catch (error) {
      console.log("Error saving data:", error);
    }
  };

  // Get Data
  const handleGetData = async () => {
    try {
      const value = await AsyncStorage.getItem("userName");

      if (value !== null) {
        setSavedData(value);
        Alert.alert("Saved Data", value);
      } else {
        Alert.alert("No Data", "No data found!");
      }
    } catch (error) {
      console.log("Error getting data:", error);
    }
  };

  // Clear Data
  const handleClearData = async () => {
    try {
      await AsyncStorage.removeItem("userName");
      setSavedData("");
      Alert.alert("Success", "Data cleared successfully!");
    } catch (error) {
      console.log("Error clearing data:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>AsyncStorage Example</Text>

      <TextInput
        style={styles.input}
        placeholder="Write something..."
        value={name}
        onChangeText={setName}
      />

      <View style={styles.button}>
        <Button title="Save Data" onPress={handleSaveData} />
      </View>

      <View style={styles.button}>
        <Button title="Get Data" onPress={handleGetData} />
      </View>

      <View style={styles.button}>
        <Button title="Clear Data" color="red" onPress={handleClearData} />
      </View>

      {savedData ? (
        <Text style={styles.savedText}>Saved Data: {savedData}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  button: {
    width: "100%",
    marginVertical: 8,
  },
  savedText: {
    marginTop: 20,
    fontSize: 18,
    color: "green",
    fontWeight: "bold",
  },
});

export default AsyncStorageExample;