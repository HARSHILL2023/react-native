import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import * as ImagePicketr from "expo-image-picker";
import * as Sharing from "expo-sharing";
import * as DocumentPicker from "expo-document-picker";
const share = () => {

    const shareFile=async()=>{
        const res= await DocumentPicker.getDocumentAsync({
        type: "*/*",
      });
        
    if (res.canceled) {
      return;
    }
    await Sharing.shareAsync(res.assets[0].uri)
    }




    const handleImagePicker = async () => {
        const res = await ImagePicketr.launchImageLibraryAsync({
            mediaTypes: ["images"],
            allowsEditing: true,
            quality: 1,
        });

        console.log(res)

        if (res.canceled) {
            return;
        }

        await Sharing.shareAsync(res.assets[0].uri)
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>share</Text>
            <Pressable style={styles.button} onPress={handleImagePicker}>
                <Text style={styles.buttonText}>Pick Image</Text>
            </Pressable>
             <Pressable style={styles.button} onPress={shareFile}>
                <Text style={styles.buttonText}>Pick File</Text>
            </Pressable>
        </View>
    )
}

export default share

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: "center",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 40,
    },
    button: {
        padding: 18,
        borderRadius: 12,
        alignItems: "center",
        backgroundColor: "yellow"
    },
    buttonText: {
        fontSize: 17,
        fontWeight: "600",
    },

});