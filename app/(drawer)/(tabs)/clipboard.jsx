import { Button, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import * as Clipboard from 'expo-clipboard';

const ClipboardExample = () => {
    const [text, settext] = useState(null);
    const [copied, setcopied] = useState(null);
    const handleCopyText = async () => {
        await Clipboard.setStringAsync(text);
        console.log({ text });
    };
    const handleGetCopiedText = async () => {
        const check=await Clipboard.hasStringAsync();
        const res = await Clipboard.getStringAsync();

        if(check){
             setcopied(res);
        }
        else{
            alert("nothing to paste")
        }
        console.log(res);
       
    }

    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'aqua',
            }}
        >

            <TextInput onChangeText={settext} placeholder='Enter text to copy' value={text} />
            <Button title="Copy Text" onPress={handleCopyText} />
            <View style={{ height: 40 }} />
            <Button title='get copied text' onPress={handleGetCopiedText} />
            <Text>{copied}</Text>
        </View>
    );
};

export default ClipboardExample;