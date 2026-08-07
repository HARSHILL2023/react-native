import React, { useState } from "react";
import { View, Button, Text, Alert,ScrollView } from "react-native";
import * as Location from "expo-location";

const Answer = () => {
    const [crrlocation, setcrrlocation] = useState(null);
    const [lastlocationn, setlastLocationn] = useState(null);
    const [address, setaddress] = useState(null);

    const handlepermission = async () => {
        const permission = await Location.requestForegroundPermissionsAsync();

        if (!permission.granted) {
            Alert.alert("Permission Denied", "Please allow location permission.");
            return;
        }

        Alert.alert("Permission Granted");
        console.log("Permission accessed");
    };

    const CurrentLocation = async () => {
        const permission = await Location.requestForegroundPermissionsAsync();

        if (!permission.granted) {
            Alert.alert("Permission Required");
            return;
        }

        const position = await Location.getCurrentPositionAsync({});
        setcrrlocation(position);


        console.log(position);
    };

    const lastlocation = async () => {
        const permission = await Location.requestForegroundPermissionsAsync();

        if (!permission.granted) {
            return;
        }

        const llastlocation = await Location.getLastKnownPositionAsync({});

        if (!llastlocation) {
            return (
                <View>
                    <Text>No Last Known Location Found</Text>
                </View>
            )
        }
        console.log(llastlocation);

        setlastLocationn(llastlocation);
    }

    const currentaddress = async () => {
        const permission = await Location.requestForegroundPermissionsAsync();

        if (!permission.granted) {
            alert("no permission granted");
            return;
        }

        const temp = await Location.reverseGeocodeAsync({
            latitude: crrlocation.coords.latitude,
            longitude: crrlocation.coords.longitude,
        });

        setaddress(temp);
        console.log(temp)
    }
    return (
        <ScrollView >
            <Button
                title="Request Permission"
                onPress={handlepermission}
            />

            <View style={{ height: 20 }} />

            <Button
                title="Get Current Location"
                onPress={CurrentLocation}
            />

            <View style={{ height: 20 }} />


            <Button
                title="Get Last Known Location"
                onPress={lastlocation}
            />

            <View style={{ height: 20 }} />

            <Button
                title="print Address"
                onPress={currentaddress}
            />
            <Button 
            title="refresh"
            onPress={CurrentLocation}
            />
            {crrlocation && (
                <>
                    <Text style={{ color: "white", marginTop: 20 }}>
                        Latitude: {crrlocation.coords.latitude}
                    </Text>

                    <Text style={{ color: "white" }}>
                        Longitude: {crrlocation.coords.longitude}
                    </Text>

                    <Text style={{ color: "white", }}>
                        acurracy: {crrlocation.coords.accuracy}
                    </Text>

                    <Text style={{ color: "white", }}>
                        Heading: {crrlocation.coords.heading}
                    </Text>
                    <Text style={{ color: "white", }}>
                        Timestamp: {crrlocation.timestamp}
                    </Text>

                </>
            )}
            {lastlocationn && (
                <>
                    <Text style={{ color: "white", marginTop: 20 }}>
                        Latitude: {lastlocationn.coords.latitude}
                    </Text>

                    <Text style={{ color: "white" }}>
                        Longitude: {lastlocationn.coords.longitude}
                    </Text>
                </>
            )}
            {address && (
                <>
                    <Text style={{ color: "white", marginTop: 20 }}>
                        Name: {address[0]?.name}
                    </Text>

                    <Text style={{ color: "white" }}>
                        Street: {address[0]?.street}
                    </Text>
                    <Text style={{ color: "white", }}>
                        City: {address[0]?.city}
                    </Text>

                    <Text style={{ color: "white" }}>
                        District: {address[0]?.district}
                    </Text>
                    <Text style={{ color: "white", }}>
                        state: {address[0]?.region}
                    </Text>

                    <Text style={{ color: "white" }}>
                        Country: {address[0]?.country}
                    </Text>
                     <Text style={{ color: "white" }}>
                        Postal Code: {address[0]?.postalCode}
                    </Text>

                </>
            )}
        </ScrollView>
    );
};

export default Answer;