import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import React, { useState } from 'react';
import * as SecureStore from 'expo-secure-store';

const SecureStoreExample = () => {
  const[key,setkey]=useState(null);
  const[value,setValue]=useState(null);

  const saveToken = async () => {
    await SecureStore.setItemAsync(key, value);
  };

  const getToken = async () => {
    const token = await SecureStore.getItemAsync(key);
    console.log(token);
  };

  const deleteToken = async () => {
    await SecureStore.deleteItemAsync(key);
  };

  return (
    <View>
      <Text>Hello</Text>
      <TextInput 
      placeholder='enter key'
      value={key}
      onChangeText={setkey}
      />
      <TextInput 
      placeholder='enter value'
      value={value}
      onChangeText={setValue}

      />

      <Button title="Save Token" onPress={saveToken} />
      <Button title="Get Token" onPress={getToken} />
      <Button title="Delete Token" onPress={deleteToken} />
    </View>
  );
};

export default SecureStoreExample;

const styles = StyleSheet.create({});