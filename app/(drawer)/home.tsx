import { View, Text } from "react-native";

function home() {
    return (
        <View style={{
            flex: 1, backgroundColor: "red",
            justifyContent: "center", alignItems: "center"
        }}>
            <Text style={{fontSize:50}}>hello</Text>

            
        </View>
    )
}

export default home;