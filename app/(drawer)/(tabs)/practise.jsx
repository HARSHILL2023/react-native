import { StyleSheet, Text, View,Button, Alert } from 'react-native'
import React from 'react'
import { File,Directory,Paths } from 'expo-file-system'


const practise = () => {
  
  const download=async()=>{

    try{
    const folder=new Directory(Paths.document,"videos");
    const url="https://www.kcra.com/article/texas-circuit-breaker-roller-coaster-stuck-video/73982473";


    folder.create({
      idempotent:true
    })

    const file=await File.downloadFileAsync(
      url,
      folder,
      {
        idempotent:true,
        signal:controller.signal,

        onProgress:([byWritten,totalBytes])=>{
          if(totalBytes>0){
            const per=byWritten/totalBytes * 100;
            console.log(Math.round(per));
          }
        }
      }
    )
    Alert.alert("Download Succesfully");    
  }
  catch(err){
    console.log(err);
  }
}
  
  return (
    <View>
      <Button title='Download' onPress={handledownload}/>
    </View>
  )
}

export default practise

const styles = StyleSheet.create({})