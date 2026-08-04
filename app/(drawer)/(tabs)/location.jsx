import { Button, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import * as Location from 'expo-location';

const LocationScreen = () => {
  const [latitude, setLatitude] = useState(null);

  const handlePermission = async () => {
    const result = await Location.requestForegroundPermissionsAsync();
    console.log(result);
  };

  const getCurrentLocation = async () => {
    const currentLocation = await Location.getCurrentPositionAsync({});

    console.log(currentLocation);

    setLatitude(currentLocation.coords.latitude);
  };

  return (
    <View>
      <Button title="Get Permission" onPress={handlePermission} />
      <Button title="Get Location" onPress={getCurrentLocation} />
      <Text style={{color:"white"}}>{latitude}</Text>
    </View>
  );
};

export default LocationScreen;

const styles = StyleSheet.create({});