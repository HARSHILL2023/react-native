import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useRef, useState } from 'react'
import {CameraView,useCameraPermission} from "expo-camera";

const Practise = () => {

    const [cameraPermission,requestCameraPermission]=useCameraPermission();
    
    if(!cameraPermission?.granted){
        return(
            <View>
                    <Button title='grant permission' onPress={requestCameraPermission}/>

            </View>
        )
    }
    const cameraRef=useRef(null);
  return (
    <View style={{flex:1}}>
    <CameraView style={{flex:1}} ref={cameraRef}/>
    </View>
  )
}

export default Practise

const styles = StyleSheet.create({})