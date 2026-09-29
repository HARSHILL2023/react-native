import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
  import { Paths,File,Directory } from "expo-file-system"


const file = () => {

  const handlefile = () => {
    
  const newFolder=new Directory (Paths.document,"image")

  console.log(newFolder);

  newFolder.create({idempotent:true});

  const newFile=new File(newFolder,"thuu");

  console.log(newFile.uri);
  
  try {
  const contents = newFolder.list();
  console.log(contents);
      }
 catch (error) {
  console.error(error);
}
  
} 
  
  return (

    <View style={styles.view} >
      <Text>File system</Text>
      <Pressable onPress={handlefile} style={{ flex: 1, backgroundColor: "black", color: "white", height: 0.2 }}>
        <Text style={{ color: "white" }}>dont click here</Text>
      </Pressable>
    </View>

  ) 
}

export default file

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "green"
  }
})