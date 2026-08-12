// import React, { useState } from "react";
// import {
//   View,
//   Button,
//   Text,
//   Alert,
//   ScrollView,
//   TextInput,
// } from "react-native";
// import * as Location from "expo-location";

// const Answer = () => {
//   const [crrlocation, setcrrlocation] = useState(null);
//   const [lastlocationn, setlastLocationn] = useState(null);
//   const [address, setaddress] = useState(null);

//   const [search, setsearch] = useState("");
//   const [searchedLocation, setsearchedLocation] = useState(null);

//   const handlepermission = async () => {
//     const permission = await Location.requestForegroundPermissionsAsync();

//     if (!permission.granted) {
//       Alert.alert("Permission Denied", "Please allow location permission.");
//       return;
//     }

//     Alert.alert("Permission Granted");
//     console.log("Permission accessed");
//   };

//   const CurrentLocation = async () => {
//     const permission = await Location.requestForegroundPermissionsAsync();

//     if (!permission.granted) {
//       Alert.alert("Permission Required");
//       return;
//     }

//     const position = await Location.getCurrentPositionAsync({});
//     setcrrlocation(position);

//     console.log(position);
//   };

//   const lastlocation = async () => {
//     const permission = await Location.requestForegroundPermissionsAsync();

//     if (!permission.granted) {
//       return;
//     }

//     const llastlocation = await Location.getLastKnownPositionAsync({});

//     if (!llastlocation) {
//       Alert.alert("No Last Known Location Found");
//       return;
//     }

//     console.log(llastlocation);

//     setlastLocationn(llastlocation);
//   };

//   const currentaddress = async () => {
//     const permission = await Location.requestForegroundPermissionsAsync();

//     if (!permission.granted) {
//       alert("No permission granted");
//       return;
//     }

//     if (!crrlocation) {
//       alert("Get current location first");
//       return;
//     }

//     const temp = await Location.reverseGeocodeAsync({
//       latitude: crrlocation.coords.latitude,
//       longitude: crrlocation.coords.longitude,
//     });

//     setaddress(temp);
//     console.log(temp);
//   };

//   const findsearch = async () => {
//     const permission = await Location.requestForegroundPermissionsAsync();

//     if (!permission.granted) {
//       alert("Permission denied");
//       return;
//     }

//     const finded = await Location.geocodeAsync(search);

//     if (finded.length === 0) {
//       alert("Location not found");
//       return;
//     }

//     setsearchedLocation(finded[0]);

//     console.log(finded);
//   };

//   return (
//     <ScrollView style={{ flex: 1, backgroundColor: "black", padding: 20 }}>
//       <Button
//         title="Request Permission"
//         onPress={handlepermission}
//       />

//       <View style={{ height: 20 }} />

//       <Button
//         title="Get Current Location"
//         onPress={CurrentLocation}
//       />

//       <View style={{ height: 20 }} />

//       <Button
//         title="Get Last Known Location"
//         onPress={lastlocation}
//       />

//       <View style={{ height: 20 }} />

//       <Button
//         title="Print Address"
//         onPress={currentaddress}
//       />

//       <View style={{ height: 20 }} />

//       <Button
//         title="Refresh Current Location"
//         onPress={CurrentLocation}
//       />

//       <View style={{ height: 20 }} />

//       <TextInput
//         placeholder="Enter State Name"
//         placeholderTextColor="gray"
//         value={search}
//         onChangeText={(text) => setsearch(text)}
//         style={{
//           borderWidth: 1,
//           borderColor: "white",
//           color: "white",
//           padding: 10,
//           borderRadius: 5,
//         }}
//       />

//       <View style={{ height: 15 }} />

//       <Button
//         title="Search Latitude & Longitude"
//         onPress={findsearch}
//       />

//       {crrlocation && (
//         <>
//           <Text style={{ color: "white", marginTop: 20 }}>
//             Latitude: {crrlocation.coords.latitude}
//           </Text>

//           <Text style={{ color: "white" }}>
//             Longitude: {crrlocation.coords.longitude}
//           </Text>

//           <Text style={{ color: "white" }}>
//             Accuracy: {crrlocation.coords.accuracy}
//           </Text>

//           <Text style={{ color: "white" }}>
//             Heading: {crrlocation.coords.heading}
//           </Text>

//           <Text style={{ color: "white" }}>
//             Timestamp: {crrlocation.timestamp}
//           </Text>
//         </>
//       )}

//       {lastlocationn && (
//         <>
//           <Text style={{ color: "white", marginTop: 20 }}>
//             Last Latitude: {lastlocationn.coords.latitude}
//           </Text>

//           <Text style={{ color: "white" }}>
//             Last Longitude: {lastlocationn.coords.longitude}
//           </Text>
//         </>
//       )}

//       {address && (
//         <>
//           <Text style={{ color: "white", marginTop: 20 }}>
//             Name: {address[0]?.name}
//           </Text>

//           <Text style={{ color: "white" }}>
//             Street: {address[0]?.street}
//           </Text>

//           <Text style={{ color: "white" }}>
//             City: {address[0]?.city}
//           </Text>

//           <Text style={{ color: "white" }}>
//             District: {address[0]?.district}
//           </Text>

//           <Text style={{ color: "white" }}>
//             State: {address[0]?.region}
//           </Text>

//           <Text style={{ color: "white" }}>
//             Country: {address[0]?.country}
//           </Text>
// q
//           <Text style={{ color: "white" }}>
//             Postal Code: {address[0]?.postalCode}
//           </Text>
//         </>
//       )}

//       {searchedLocation && (
//         <>
//           <Text style={{ color: "white", marginTop: 20 }}>
//             Search Result
//           </Text>

//           <Text style={{ color: "white" }}>
//             Latitude: {searchedLocation.latitude}
//           </Text>

//           <Text style={{ color: "white" }}>
//             Longitude: {searchedLocation.longitude}
//           </Text>
//         </>
//       )}
//     </ScrollView>
//   );
// };

// export default Answer;