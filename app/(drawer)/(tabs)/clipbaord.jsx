import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
} from "react-native";
import * as Clipboard from "expo-clipboard";

const ClipboardScreen = () => {
  const [textToCopy, setTextToCopy] = useState("");
  const [copiedText, setCopiedText] = useState("");

  // Copy text to clipboard
  const handleTextToCopy = async () => {
    if (textToCopy.trim() === "") {
      Alert.alert("Error", "Please enter some text to copy!");
      return;
    }

    await Clipboard.setStringAsync(textToCopy);
    Alert.alert("Success", "Text copied successfully!");
  };

  // Paste text from clipboard
  const handlePasteText = async () => {
    const text = await Clipboard.getStringAsync();

    if (text.trim() === "") {
      Alert.alert("Clipboard", "Clipboard is empty!");
      setCopiedText("");
      return;
    }

    setCopiedText(text);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Clipboard Demo</Text>

      <TextInput
        style={styles.input}
        placeholder="Type something to copy..."
        value={textToCopy}
        onChangeText={setTextToCopy}
      />

      <Pressable style={styles.button} onPress={handleTextToCopy}>
        <Text style={styles.buttonText}>Copy Text</Text>
      </Pressable>

      <Pressable style={styles.button} onPress={handlePasteText}>
        <Text style={styles.buttonText}>Paste From Clipboard</Text>
      </Pressable>

      <Text style={styles.result}>Pasted Text:</Text>

      <Text style={styles.output}>
        {copiedText === "" ? "No text available" : copiedText}
      </Text>
    </View>
  );
};

export default ClipboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    padding: 20,
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
  },

  input: {
    width: "90%",
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#fff",
    marginBottom: 20,
  },

  button: {
    width: "90%",
    backgroundColor: "#007AFF",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 10,
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  result: {
    marginTop: 25,
    fontSize: 18,
    fontWeight: "bold",
  },

  output: {
    marginTop: 10,
    fontSize: 16,
    color: "#333",
  },
});