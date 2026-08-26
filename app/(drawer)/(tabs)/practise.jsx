import { StyleSheet, Text, View ,Share, Button} from 'react-native'
import React, { useState } from 'react'
import * as Sharing from "expo-sharing";
import * as ImagePicketr from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
const practise = () => {
  
  const handletextShare=async()=>{
    Share.share({
      message:`anand ko kuch nahi ata`
    });
  }

  const handleImageShare=async()=>{
    const res=await ImagePicketr.launchImageLibraryAsync({
      mediaTypes:["images"],
      allowsEditing:false,
      quality:1,
    });

    if(res.canceled){
      return;
    }

    Sharing.shareAsync(res.assets[0].uri)
  }
  const handlefileShare=async()=>{
    const res=DocumentPicker.getDocumentAsync({
      type:"*/*"
    })
    if(res.canceld){
      return;
    }
    await Sharing.shareAsync(res.assets[0].uri);
  }
  return (
    <View style={{flex:1}}>
      <Text>Share</Text>
      <Button onPress={handletextShare} title='share text'/> 
      <Button onPress={handleImageShare} title='share photo'/> 
      <Button onPress={handlefileShare} title='share file'/> 
         </View>
  )
}

export default practise

const styles = StyleSheet.create({})