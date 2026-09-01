import { StyleSheet, Text, View, Button } from 'react-native';
import React from 'react';
import * as SecureStore from 'expo-secure-store';

const SecureStoreExample = () => {

  const saveToken = async () => {
    await SecureStore.setItemAsync('token', 'abc123');
  };

  const getToken = async () => {
    const token = await SecureStore.getItemAsync('token');
    console.log(token);
  };

  const deleteToken = async () => {
    await SecureStore.deleteItemAsync('token');
  };

  return (
    <View>
      <Text>Hello</Text>

      <Button title="Save Token" onPress={saveToken} />
      <Button title="Get Token" onPress={getToken} />
      <Button title="Delete Token" onPress={deleteToken} />
    </View>
  );
};

export default SecureStoreExample;

const styles = StyleSheet.create({});