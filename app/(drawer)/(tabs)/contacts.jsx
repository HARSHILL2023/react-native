import { StyleSheet, Text, View, Button, FlatList, Image, TextInput, Pressable } from 'react-native'
import React, {useState } from 'react'
import * as Contacts from "expo-contacts"

const ContactsApp = () => {
  const [allContacts, setAllContacts] = useState([]);
  const [permission, setPermission] = useState(null);
  const [searchContact, setSearchContact] = useState("");

  const handleReqPermission = async () => {
    const contactsPermission = await Contacts.requestPermissionsAsync();

    if (contactsPermission) {
      setPermission(contactsPermission)
    }

    if (!contactsPermission.granted) {
      alert('Permission to access contacts was denied');
      return;
    }

    const getContacts = await Contacts.getContactsAsync({
      sort: Contacts.SortTypes.FirstName,
    });

    if (getContacts && getContacts.data) {
      console.log(getContacts)
      setAllContacts(getContacts.data);
    }
  }


  const deleteContact = (id) => {
    setAllContacts(prev => prev.filter(c => c.id !== id));
  };

  const handleSearchContacts = allContacts.filter((ele) => {
    const name = ele.name?.toLowerCase().split(' ').join('') || '';
    const phone = ele.phoneNumbers?.[0]?.number.split(' ').join('') || '';

    return (
      name.includes(searchContact.toLowerCase().trim()) || phone.includes(searchContact)
    );
  });

  return (
    <View style={styles.container}>
      <View style={[styles.headerTop, styles.header]}>
        <Text style={styles.title}>Contacts</Text>
      </View>

      <TextInput 
        placeholder='Search Contact...'
        style={styles.input}
        value={searchContact}
        onChangeText={setSearchContact}
      />

      <FlatList
        data={handleSearchContacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemBox}>
            <View style={styles.contactDetails}>
              {
                item.image ? <Image style={styles.profile} source={item.image}/> : <Text style={styles.imgBag}>{item?.firstName?.[0]}</Text>
              }
              <View style={styles.textContainer}>
                <Text style={styles.itemText}>{item.name}</Text>
                <Text style={styles.subText}>{item?.phoneNumbers?.[0]?.number || 'No number'}</Text>
              </View>
            </View>

            <Pressable style={styles.deleteButton} onPress={() => deleteContact(item.id)}>
              <Text style={styles.deleteText}>Delete</Text>
            </Pressable>
          </View>
        )}
      />

      {permission && permission.granted === true ?
        <Button title="Refresh Contacts" onPress={handleReqPermission} /> :
        <Button title="Request Permission" onPress={handleReqPermission} />
      }
    </View>
  )
}

export default ContactsApp

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "white",
    paddingTop: 50,
  },
  header: {
    marginBottom: 16,
    marginTop: 10,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  itemBox: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ececec',
    flexDirection: 'row',       
    justifyContent: 'space-between', 
    alignItems: 'center',
  },
  contactDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  textContainer: {
    marginLeft: 12,
    flex: 1,
  },
  itemText: {
    fontSize: 16,
    fontWeight: '600',
  },
  subText: {
    fontSize: 14,
    color: '#666',
  },
  profile:{
    width:40,
    height:40,
    borderRadius: 20,
  },
  imgBag:{
    backgroundColor:"blue",
    width:40,
    height:40,
    borderRadius: 20,
    color: 'white',
    textAlign: 'center',
    lineHeight: 40,
    fontWeight: 'bold',
    fontSize: 16,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#333333',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },

  deleteButton: {
    backgroundColor: '#ff3b30',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  deleteText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  }
})