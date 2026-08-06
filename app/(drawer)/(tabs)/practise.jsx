import { Alert, StyleSheet, Text, View, Button } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import * as Location from "expo-location"
import MapView, { Marker } from 'react-native-maps'

const practise = () => {
    const [location, setLocation] = useState(null);
    const [lastlocation, setlastLocation] = useState(null);
    const [crrlocation, setcrrlocation] = useState(null);


    async function handlepermission() {
        const permission = await Location.requestForegroundPermissionsAsync();
        if (!permission.granted) {
            Alert.alert("request denied");
            return;
        }

    }
    async function hanleloaction() {
        const crrlocation = await Location.getCurrentPositionAsync();

        if (crrlocation) {
            setLocation(crrlocation.coords)
        }

    }

    async function lastLocation() {
        const lstlocation = await Location.getLastKnownPositionAsync();
        if (lstlocation) {
            setlastLocation(lstlocation.coords);
        }
        else {
            console.log("no last location is find")
        }


    }

    const statref = useRef(null);


    async function handlestart() {
        const permission = await Location.requestForegroundPermissionsAsync();
        if (!permission.granted) {
            return;
        }
        statref.current = await Location.watchPositionAsync({
            accuracy: Location.Accuracy.Highest,
            timeInterval: 2000,
            distanceInterval: 1
        }, (crrlocation) => {
            setcrrlocation(crrlocation.coords)
        });
    }

    async function handlestop() {
        if (statref.current) {
            statref.current.remove();
            statref.current = null;
        }
    }
    useEffect(() => {
        handlepermission()
        hanleloaction()
        lastLocation()

    }, [])
    return (
        <View style={{ flex: 1 }}>
            <Button title='start tracking' onPress={handlestart} />
            <Button title='stop tracking' onPress={handlestop} />
            <Text style={{ flex: 1, color: "white" }}>{location?.latitude}</Text>
            <Text style={{ flex: 1, color: "white" }}>{lastlocation?.latitude}</Text>
            <Text style={{ flex: 1, color: "white" }}>{crrlocation?.latitude}</Text>
           {location && (
  <MapView
    style={{ flex: 1 }}
    region={{
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    }}
  >
    <Marker
      coordinate={{
        latitude: location.latitude,
        longitude: location.longitude,
      }}
    />
  </MapView>
)}

        </View>
    )
}

export default practise

const styles = StyleSheet.create({})