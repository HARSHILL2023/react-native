import { StyleSheet, Text, View,Button } from 'react-native'
import { CameraView, useCameraPermissions, useMicrophonePermissions } from 'expo-camera'
import React, { useRef, useState } from 'react'
import { useVideoPlayer,VideoView } from 'expo-video';

const cameraa = () => {
  const cameraRef = useRef(null);
  const[cameraPermission,requestCameraPermission]=useCameraPermissions();
  const[microPhonePermission,requestMicroPhonePermission]=useMicrophonePermissions();
  const[video,setVideo]=useState(null)
  const player =useVideoPlayer(video);

  if(!cameraPermission || !microPhonePermission){
    return (
      <View />
    )
  }
  if(!cameraPermission?.granted ||!microPhonePermission?.granted ){
    return (
      <view>
        <Button onPress={requestCameraPermission} title='give camera permission'/>
        <View />
        <Button onPress={requestMicroPhonePermission} title='give mic permission'/>
      </view>
    )
  }
  const handlestartVideo= async()=>{
    const result=await cameraRef.current.recordAsync();
    setVideo(result);
  }
  const handleStopVideo=async()=>{
    await cameraRef.current.stopRecording()
  }
  return (
    <View style={{flex:1}}>
     <CameraView ref={cameraRef} style={{flex:1}}/>
     <Button onclick={handlestartVideo} title='start video' />
     <Button onclick={handleStopVideo} title='stop video' />
     {video && <VideoView player={player} style={{height:300, width:'100%'}} />}
    </View>
    
  )
}

export default cameraa

const styles = StyleSheet.create({})