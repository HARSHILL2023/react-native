import { Button, StyleSheet, Text, View, TextInput, Alert } from 'react-native';
import React, { useState } from 'react';
import * as LocalAuth from "expo-local-authentication";
import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";
const Auth = () => {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const handlelogin = async () => {
        if (username == "admin" && password == "1234") {
            await SecureStore.setItemAsync("token", "abc123");
            await SecureStore.setItemAsync("biometric", "true");
            Alert.alert("Sucess", "Login doned");
        }
        else {
            Alert.alert("Error", "invalid admin or password")
        }
    };
    const handleBiometric = async () => {
        const token = await SecureStore.getItemAsync("token")
        const bimoetric = await SecureStore.getItemAsync("biometric")

        if (!token || bimoetric !== "true") {
            Alert.alert("succes", "Login with emial and password first");
            return;
        }

        const hasHardware = await LocalAuth.hasHardwareAsync();

        if (!hasHardware) {
            alert("buy a expensive phone ");
            return;

        }
        const ischeck = LocalAuth.isEnrolledAsync();

        if (!ischeck) {
            alert("buy a new expensive phone ")
            return;
        }
        const res = await LocalAuth.authenticateAsync({
            promptMessage: "Login wiht message"
        })

        if (res.success) {
            router.replace("/");
        }
    }
    const handleClick = async () => {
        const types =
            await LocalAuth.getEnrolledLevelAsync()

        console.log(types);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Biometric Login</Text>



            <TextInput


                placeholder="Enter name"
                onChangeText={setUserName}
                value={username}
                style={styles.input}
            />

            <TextInput
                placeholder="Enter password"
                onChangeText={setPassword}
                value={password}
                style={styles.input}
                keyboardType="email-address"
            />




            <View>
                <Button title="Authenticate" onPress={handlelogin} color="#5b5e5d" />
            </View>
            <View>
                <Button title="Biometric" onPress={handleBiometric} color="#2410ac" />
            </View>
              <View>
                <Button title="click me " onPress={handleClick} color="#2410ac" />
            </View>
        </View>
    );
};

export default Auth;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f9f9f9",
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 30,
        color: "#333",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 12,
        marginVertical: 10,
        width: "90%",
        borderRadius: 8,
        backgroundColor: "#fff",
        fontSize: 16,
    },
    buttonContainer: {
        marginVertical: 10,
        width: "90%",
        borderRadius: 8,
        overflow: "hidden",
    },
});
