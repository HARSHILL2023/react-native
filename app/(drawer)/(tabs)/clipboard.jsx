import { Button, Text, View } from 'react-native';
import React from 'react';
import * as Clipboard from 'expo-clipboard';

const ClipboardExample = () => {
  const handleCopyText = async () => {
    await Clipboard.setStringAsync('hello');
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'aqua',
      }}
    >
      <Text>hello</Text>
      <Button title="Copy Text" onPress={handleCopyText} />
    </View>
  );
};

export default ClipboardExample;