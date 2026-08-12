// import { Button, StyleSheet, Text, View } from 'react-native'
// import React, { useState } from 'react'
// import * as Location from 'expo-location';
// const map = () => {
//     const[data,setdata]=useState(null);
//     const[latitude,setlatitude]=useState(null);
//     const[longitude,setlongitude]=useState(null);
//     // const handleGetadress=async()=>{
//     //     const permission=await Location.requestForegroundPermissionsAsync()

//     //     if(!permission?.granted){
//     //         alert("permission denied")
//     //         return;
//     //     }

//     //     const currentLocation=await Location.getCurrentPositionAsync();
//     //     console.log(currentLocation);
//     //     const getAddress=await Location.reverseGeocodeAsync({
//     //       latitude:currentLocation.coords.latitude,
//     //       longitude:currentLocation.coords.longitude
//     //     })
//     //    setdata(getAddress[0])
//     //    console.log(getAddress[0])

        
       
//     //   }

//     const handleGetadress=async()=>{
//       const address = await Location.geocodeAsync("gujrat","ahemdabad")

//       console.log(address);
     
//       setlongitude(address[0].longitude)
//     }
//   return (
//     <View style={{flex:1,justifyContent:"center",alignItems:"center",backgroundColor:"teal"}}>
//       <Button title='get adress' onPress={handleGetadress}/>
//     <Text>{data?.city}</Text>
//     <Text>{data?.country}</Text>
//     <Text>{data?.formattedAddress}</Text>
//     <Text>{latitude}</Text>
//     <Text>{longitude}</Text>
    
//     </View>
//   )
// }

// export default map

// const styles = StyleSheet.create({})