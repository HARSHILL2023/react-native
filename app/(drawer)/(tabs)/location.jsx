import React, { useEffect, useRef, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import * as Location from "expo-location";

export default function LocationScreen() {
  const [location, setLocation] = useState(null);
  const statRef = useRef(null);

  const handleStartTracker = async () => {
    const permission = await Location.requestForegroundPermissionsAsync();

    if (!permission.granted) {
      alert("Permission to access location was denied");
      return;
    }

    statRef.current = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        timeInterval: 2000, // update every 2 seconds
        distanceInterval: 1, // update every 1 meter
      },
      (resLocation) => {
        console.log(resLocation);
        setLocation(resLocation);
      }
    );
  };

  const handleStopTracker = () => {
    if (statRef.current) {
      statRef.current.remove();
      statRef.current = null;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Location Tracker</Text>

      {location ? (
        <View style={styles.locationBox}>
          <Text style={styles.text}>
            Latitude: {location.coords.latitude.toFixed(6)}
          </Text>
          <Text style={styles.text}>
            Longitude: {location.coords.longitude.toFixed(6)}
          </Text>
          <Text style={styles.text}>
            Accuracy: {location.coords.accuracy} m
          </Text>
        </View>
      ) : (
        <Text style={styles.text}>No location yet...</Text>
      )}

      <View style={styles.buttonRow}>
        <Button title="Start Tracking" onPress={handleStartTracker} />
        <Button title="Stop Tracking" onPress={handleStopTracker} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#006d77", // deep teal
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 25,
    color: "#edf6f9", // soft white
    textAlign: "center",
  },
  locationBox: {
    marginBottom: 25,
    padding: 20,
    backgroundColor: "#83c5be", // light teal
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // Android shadow
    width: "90%",
  },
  text: {
    fontSize: 16,
    color: "#073b4c", // dark navy
    marginBottom: 8,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginTop: 15,
  },
  buttonWrapper: {
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 8,
    overflow: "hidden", // ensures button respects rounded corners
  },
});