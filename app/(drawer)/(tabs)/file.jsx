import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Paths, File, Directory } from "expo-file-system";
const file = () => {

  const handleClick = async() => {


    const obj={
      mssg:"hello back"
    }
    const file = new File(Paths.document, "notes.txt");

    if (!file.exists) {
      file.create
    }

    file.write(JSON.stringify(obj));

    const res=await file.text();

    console.log(res);
    console.log(JSON.parse(res));
    console.log(typeof(res));
  }
  return (
    <View>
      <Button onPress={handleClick} title='create the file and indert text'/>
    </View>
  )
}

export default file

const styles = StyleSheet.create({})