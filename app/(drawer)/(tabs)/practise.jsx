import { View, Button } from "react-native";
import { Linking } from "react-native";

export default function App() {

  const makeCall = () => {
    Linking.openURL("tel:9876543210");
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button
        title="Call"
        onPress={makeCall}
      />
    </View>
  );
}