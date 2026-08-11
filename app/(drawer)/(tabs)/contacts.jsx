import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  Image
} from "react-native";

import React, { useState } from "react";
import * as Contacts from "expo-contacts";

const ContactsScreen = () => {
  const [contacts, setContacts] = useState([]);


  const handleRequest = async () => {
    const permission = await Contacts.requestPermissionsAsync();

    if (!permission.granted) {
      alert("First grant Permission");
      return;
    }

    console.log(permission);
  };

  const handleGetContact = async () => {
    const getContact = await Contacts.getContactsAsync({
        sort:Contacts.SortTypes.FirstName
    });

    setContacts(getContact.data);

    console.log(getContact);

    
        };

  const clearContact = () => {
    setContacts([]);
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Contacts</Text>

      <Button title="Request" onPress={handleRequest} />

      <View style={{ height: 20 }} />

      <Button title="Contacts" onPress={handleGetContact} />

      <View style={{ height: 20 }} />

      <Button title="Clear" onPress={clearContact} />

     

      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.contact}>
            <Text>Name: {item.name}</Text>
            <Text>Number: {item.phoneNumbers?.[0]?.number || 'No number'}</Text>
            {
            item.image && (
                 <Image style={{width:20,height:30}} source={{uri : item.image.uri}}/>
                )
            }
             {
            !item.image && (
                 <Text>{item.name[0]}</Text>
                )
            }

           
          </View>
        )}
      />

    </View>
  );
};

export default ContactsScreen;

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