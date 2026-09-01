import { Button, StyleSheet, Text, View, TextInput } from 'react-native';
import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AsyncStorageExample = () => {
  const [data, setData] = useState('');
  const [getData, setGetData] = useState('');

  const saveData = async () => {
    await AsyncStorage.setItem('key', data);
  };

  const getStoredData = async () => {
    const value = await AsyncStorage.getItem('key');
    setGetData(value);
  };

  return (
    <View>
      <Text>Hello</Text>

      <TextInput
        placeholder="Enter data"
        onChangeText={setData}
      />

      <Button title="Set Data" onPress={saveData} />

      <Button title="Get Data" onPress={getStoredData} />

      <Text>{getData}</Text>
    </View>
  );
};

export default AsyncStorageExample;

const styles = StyleSheet.create({});