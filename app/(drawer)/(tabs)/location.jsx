// import { Text , View , StyleSheet , Button  } from "react-native";
// import React , { useEffect, useRef, useState } from "react";
// import * as Location from 'expo-location';

// const example = () =>{

//     const [location,setLocation] = useState(null);
    

//     const handleRequst= async () =>{
//         const result = await Location.requestForegroundPermissionsAsync();

//         console.log(result);
      
//         await lastLocation();
//         await handleLocation();
//     }

//     const handleLocation = async() =>{
//         const currentLocation = await Location.getCurrentPositionAsync()

//         setLocation(currentLocation.coords);
//         console.log(currentLocation.coords);
//     }

//     const lastLocation = async () => {

//         const lastPostion = await Location.getLastKnownPositionAsync();

//         if(lastPostion){
//         setLocation(lastPostion.coords)
//         console.log(lastPostion.coords);
//         } else{
//             console.log("No last known Posstion");
//         }

//     }

    

//     const startRef = useRef(null);

//     const handleStartTracker = async () => {
//         const permission = await Location.getForegroundPermissionsAsync();

//         if(!permission.granted){
//             return;
//         }

//         startRef.current = await Location.watchPositionAsync({
//             accuracy:Location.Accuracy.Highest,
//             timeInterval:2000,
//             distanceInterval:1,
//         }, (resLocation) => {
//             console.log(resLocation);
//             setLocation(resLocation);
//         });
//     };

//     const handleStopTracker = () => {
//         if(startRef.current) {
//             startRef.current.remove();
//             startRef.current = null;
//         }
//     }

//     useEffect(()=>{
//         handleRequst();
//     },[])

//     return(
//         <View style={styles.container}>
//             <Button title="Request" onPress={handleRequst} />
            
//             <View style={{height:40}} />

//             <Button title="Get Location" onPress={handleLocation} /> 

            

//             <View style={{height:40}} />
             
//             <Button title="Start Traking" onPress={handleStartTracker} />

//             <Button title="Stop Traking" onPress={handleStopTracker} />

//             {location && (
//             <View> 
//                 <Text>
//                     Latitude : {location.latitude}
//                 </Text>

//                 <Text>
//                     Longitude: {location.longitude}
//                 </Text>
                
//                 <Text>
//                     Accuracy : {location.accuracy}
//                 </Text>
//             </View>
//             )}

//             {/* <Text style={{fontWeight:"bold"}} > Saved Location </Text> */}

//             {/* {saveLocation && (
//                 <View> 
//                 <Text>
//                     Latitude : {saveLocation.latitude}
//                 </Text>

//                 <Text>
//                     Longitude: {saveLocation.longitude}
//                 </Text>
                
//                 <Text>
//                     Accuracy : {saveLocation.accuracy}
//                 </Text>
//             </View>
//             )} */}

//             <Button title="Clear Location" onPress={()=> setLocation(null)} />

//         </View>
//     )


// }
// export default example;

// const styles = StyleSheet.create({
//     container:{
//     backgroundColor: "teal",
//     flex:1,
//     justifyContent:"center",
//     alignItems:'center',
//   }
// })