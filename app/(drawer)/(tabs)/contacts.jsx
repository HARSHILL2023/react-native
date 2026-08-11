import { View , Text , Button , StyleSheet , ScrollView , FlatList } from "react-native";
import React, { useState } from "react";
import * as Contacts from "expo-contacts";

const contacts = () => {

  const [contacts , setCotancts] = useState([]);

  const handleRequest = async () => {
    const permission = await Contacts.requestPermissionsAsync();

    if(!permission.granted){
      alert("First grant Permission");
      return;
    }

    console.log(permission);
  };
  
  const handleGetContact = async () => {
    const getContact = await Contacts.getContactsAsync();
    setContacts(getContact.data);
    console.log(getContact);
  };

  const clearContact = async () => {
    setContacts([]);
  }

  return (

    <ScrollView style={styles.container} >
      <Text style={{justifyContent:"center" , alignItems:"center", fontWeight:"bold"}}>Conatacts</Text>
      <Button title="Request" onPress={handleRequest} />
      <View style={{height:40}} />
      <Button title="Contacts" onPress={handleGetContact} />
      <Button title="clear" onPress={clearContact} />


      // Using Map

      {/* {contacts.map((contacts) => (
        <View key={contacts.id} > 
          <Text>Name : {contacts.name}</Text>
          <Text>Number : {contacts.phoneNumbers?.[0]?.number}</Text>
        </View>
      ))} */}

      // using Flatlist - only load Ui when scroll load more

      <FlatList
        data = {contacts}
        keyExtractor = {(item) => item.id}
        renderItem = {({ item }) => (
          <View> 
          <Text>Name : {item.name}</Text>
          <Text>Number : {item.phoneNumbers?.[0]?.number}</Text>
        </View>
        )}
      />


    </ScrollView>

  )

}

export default contacts;

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: "teal",
  }
});