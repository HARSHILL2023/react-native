import { StyleSheet, Text, View,Button, FlatList,Image } from 'react-native'
import React, { useState } from 'react'
import * as Contacts from "expo-contacts";
const practise = () => {
    const [contact, setContacts] = useState(null);


    const getpermision = async () => {
        const permission = await Contacts.requestPermissionsAsync()

        if (!permission.granted) {
            alert("Permission required first")
            return;
        }

        alert("permission grandted");

    }

    const getContact = async () => {

        const contact = await Contacts.getContactsAsync({
            sort: Contacts.SortTypes.FirstName
        })

        setContacts(contact.data);
    }


    return (
        <View style={styles.container}>
       
             <Text style={styles.title}>Contacts</Text>
       
             <Button title="Request" onPress={getpermision} />
       
             <View style={{ height: 20 }} />
       
             <Button title="Contacts" onPress={getContact} />
       
             <View style={{ height: 20 }} />

             <FlatList 
             data={contact}
             keyExtractor={(item)=>item.id}
             renderItem={({item})=>(
                <View>
                    <Text>{item.name}</Text>
                    <Text>{item?.phoneNumber?.[0]?.number || "no number" }</Text>
                    <Text>{item.image && (
                        <View>
                            <Image style={{height:20,width:20}} source={{uri: item.image.uri}}/>
                        </View>
                    ) }</Text>
                    

                </View>
             )}
             />
             </View>
        
    )
}

export default practise

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "teal",
  },

  title: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    margin: 20,
  },

  contact: {
    backgroundColor: "white",
    padding: 10,
    margin: 5,
  },
});