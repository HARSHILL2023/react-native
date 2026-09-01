// import {View,Text, Button} from "react-native";
// import  AsyncStorage from "@react-native-async-storage/async-storage"
// const practise=()=>{
//     const handleSetData = async()=>{
//       await AsyncStorage.setItem('name','harshil');
//       console.log("data saved succesfully");
//     }
//     const handleGetdata=async()=>{
//      const res=await AsyncStorage.getItem('name');
//       console.log(res);
//     }
//     const handledeletedata=async()=>{
//       await AsyncStorage.removeItem('name');
//       console.log("data deleted succesfully");
//         }



//   return (
//     <View>
//       <Button title="set data" onPress={handleSetData}/>
//       <Button title="get data" onPress={handleGetdata}/>
//     </View>
//   )
// }




import { View, Text, Button, TextInput } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";

const Practise = () => {

  const [key, setKey] = useState("");
  const [value, setValue] = useState("");

  const handleSetData = async () => {
    await AsyncStorage.setItem(key, value);
    console.log("data saved successfully");
  };

  const handleGetdata = async () => {
    const res = await AsyncStorage.getItem(key);
    console.log(res);
  };

  const handledeletedata = async () => {
    await AsyncStorage.removeItem(key);
    console.log("data deleted successfully");
  };

  return (
    <View>

      <TextInput
        placeholder="Enter key"
        value={key}
        onChangeText={setKey}
      />

      <TextInput
        placeholder="Enter value"
        value={value}
        onChangeText={setValue}
      />

      <Button title="Set Data" onPress={handleSetData} />
      <Button title="Get Data" onPress={handleGetdata} />
      <Button title="Delete Data" onPress={handledeletedata} />

    </View>
  );
};

export default Practise;

