import { Button, StyleSheet, Text, View,TextInput } from 'react-native'
import React, { useState } from 'react'
import { Paths, File, Directory } from "expo-file-system";

const file = () => {
  const[data,setdata]=useState(null);
  const[getdata,setgetdata]=useState(null);
  const handleClick = async() => {


    
    const file = new File(Paths.document, "notes.txt");

    if (!file.exists) {
      file.create();
    }

    file.write(JSON.stringify(data));

    const res=await file.text();
    
    const ress=JSON.parse(res)
    setgetdata(ress);

  }
  return (
   <View style={styles.container}>
  <TextInput 
    style={styles.input} 
    onChangeText={setdata} 
    placeholder="Enter text" 
  />
  <View style={styles.button}>
    <Button onPress={handleClick} title="Create file and insert text" />
  </View>
  <Text style={styles.text}>{getdata}</Text>
</View>

  )
}

export default file;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  input: {
    width: "90%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  button: {
    marginVertical: 10,
    width: "90%",
    borderRadius: 8,
    overflow: "hidden",
  },
  text: {
    marginTop: 20,
    fontSize: 18,
    color: "#333",
    fontWeight: "500",
  },
});
   