import { View, Text, Pressable,Alert } from "react-native";

function home() {
    return (
        <View style={{
            flex: 1, backgroundColor: "red",
            justifyContent: "center", alignItems: "center"
        }}>
           <Pressable onPress={()=>Alert.alert("hello","my name is harshil")}>
            <Text>click me</Text>
           </Pressable>

            
        </View>
    )
}

export default home;