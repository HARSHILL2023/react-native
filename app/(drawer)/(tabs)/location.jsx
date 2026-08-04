import { Button, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as Location from 'expo-location';

const LocationScreen = () => {
  const [latitude, setLatitude] = useState(null);
  const [lastLocation, setLastLocation] = useState(null);


  const handlePermission = async () => {
    const result = await Location.requestForegroundPermissionsAsync();

    if (!result.granted) {
      alert("Permission Denied");
      return;
    }

    const location = await Location.getLastKnownPositionAsync();

    if (location) {
      console.log(location);
      setLastLocation(location.coords.latitude);
    }
  };

  const prevLocation = async () => {
    const res = await Location.getLastKnownPositionAsync();

    if (res) {
      console.log(res);
      setLastLocation(res.coords.latitude);
    } else {
      console.log("No last known location");
    }
      return(
      <View>
        {lastLocation}
      </View>
      )
  };

 
  const getCurrentLocation = async () => {
    const result = await Location.getCurrentPositionAsync({});

    if (result) {
      console.log(result);
      setLatitude(result.coords.latitude);
    }
    return(
      <View>
        {latitude}
      </View>
    )
  };

  useEffect(()=>{
    handlePermission();
    getCurrentLocation();
    prevLocation();
  },[])
  return (
    <View>
      {/* <Button title="Get Permission" onPress={handlePermission} />
      <Button title="Get Current Location" onPress={getCurrentLocation} />
      <Button title="Get Last Location" onPress={prevLocation} /> */}

      <Text style={{ color: "white" }}>
        Current Latitude: {latitude}
      </Text>

      <Text style={{ color: "white" }}>
        Last Latitude: {lastLocation}
      </Text>
    </View>
  );
};

export default LocationScreen;

const styles = StyleSheet.create({});