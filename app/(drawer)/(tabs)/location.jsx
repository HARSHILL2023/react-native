import { View, Text, Button } from 'react-native';
import React, { useState, useRef } from 'react';
import * as Location from "expo-location";
export default seeLocation = () => {
  const [location, setlocation] = useState(null);
  const stateref = useRef(null);

  const handleStart = async () => {
    const permission = await Location.requestForegroundPermissionsAsync()

    if (!permission.granted) {
      return;
    }
    staterefef.current = await Location.watchPositionAsync({
      accuracy:Location.Accuracy.High
    }, (crrlocation) => {
      console.log(crrlocation);

      setlocation(crrlocation);
    });


  }
  const handelStop = () => {
    if (stateref.current) {
      stateref.current.remove();
      stateref.current = null;
    }
  }

  return (
    <View>
      <Button title='start loaction' onPress={handleStart} />
      <Button title='stop loaction' onPress={handelStop} />
      {location && (
        <>
          <Text>{location.coords.latitude}</Text>
          <Text>{location.coords.longitude}</Text>
        </>
      )}
    </View>

  )

}