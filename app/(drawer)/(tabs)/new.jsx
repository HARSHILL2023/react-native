import React, { use, useRef, useState } from 'react'
import { View, Text, Image, Button } from 'react-native'
import { CameraView, useCameraPermissions, useMicrophonePermissions } from 'expo-camera'
import Slider from '@react-native-community/slider'

export default function Camerafunction() {
  const [permission, requestpermissions] = useCameraPermissions();
  const cameraRef = useRef(null);
  const [photo, setphoto] = useState(null);
  const [flash, setflash] = useState("off");
  const [zoom, setzoom] = useState(0);
  const videoref=useRef(null);
  const[cameraPermission,requestCamerapermission]=useCameraPermissions()
  const[micPermission,requestMicPermission]=useMicrophonePermissions();
  if(!cameraPermission?.granted || !micPermission){
    return<View />
  }
  const handleStartRecording= async ()=>{
    
  }
  const handleStopRecording=async ()=>{
    
  }
  if (!permission?.granted) {
    return (
      <View>
        <Button title='grant permission' onPress={requestpermissions} />
      </View>
    )
  }
  const handlephoto = async () => {
    const result = await cameraRef.current.takePictureAsync({
      shutterSound:false
    });

    if (result) {
      setphoto(result.uri)
    }
  }
  return (
    <View>
      <Text>
        Camera
      </Text>
      <CameraView ref={cameraRef} zoom={zoom} flash={flash} />
      <Slider minimumValue={0} maximumValue={1} value={zoom} onValueChange={setzoom} />
      <Button onPress={handlephoto} title='setphoto' />
      <Button title='change flash' onPress={() => setflash(flash === "on" ? "off" : "on")} />
      <Button title='start recording' onPress={handleStartRecording} />


      {photo && <View>
        <Image source={{ uri: photo }} />
      </View>}
    </View>
  )
}
