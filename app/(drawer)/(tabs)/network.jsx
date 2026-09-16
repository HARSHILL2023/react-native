import { View, Text, Button } from "react-native"
import * as Network from "expo-network"
import { useState } from "react";

export default function network() {
    const[ip,setip]=useState()
    const state=Network.useNetworkState();
    const handleGetNetwork =async () => { 
        const res=Network.getIpAddressAsync();
        const air =await Network.isAirplaneModeEnabledAsync();
        console.log(air);
        console.log(res);
        if(res){
            setip(res);
        }
    };

    return (
        <View style={{flex:1,justifyContent:"center",alignItems:"center",backgroundColor:"green"}}>
        <Text >Network Class</Text>
        <Text>{state.type}</Text>
        <Text>{String(state.isConnected)}</Text>
        <Text>{String(state.isInternetReachable)}</Text>
        <Button title="click these to give me your ip" onPress={handleGetNetwork}/>
        <View  style={{height:20}}/>
        <Text>here is your ip: {ip}</Text>
        </View>
    )

}