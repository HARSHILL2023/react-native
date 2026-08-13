import { useState } from "react"; 
 
import { 
  View, 
  Text, 
  Button, 
  FlatList, 
  StyleSheet, 
  Image, 
  TextInput, 
  Alert, 
  TouchableOpacity, 
} from "react-native"; 
 
import * as Contacts from "expo-contacts"; 
 
export default function Contact() { 
  const [contacts, setContacts] = useState([]); 
  const [search, setSearch] = useState(""); 
 
  // New states for adding contact 
  const [name, setName] = useState(""); 
  const [phoneNumber, setPhoneNumber] = useState(""); 
 
  // Request permission 
  const requestPermission = async () => { 
    const perm = await Contacts.requestPermissionsAsync(); 
 
    if (!perm.granted) { 
      Alert.alert("Permission Denied"); 
    } else { 
      Alert.alert("Success", "Contact permission granted"); 
    } 
  }; 
 
  // Get contacts 
  const getContacts = async () => { 
    const permission = await Contacts.requestPermissionsAsync(); 
 
    if (!permission.granted) { 
      Alert.alert("Permission Denied"); 
      return; 
    } 
 
    const result = await Contacts.getContactsAsync({ 
      sort: Contacts.SortTypes.FirstName, 
    }); 
 
    setContacts(result.data); 
  }; 
 
  // Add contact 
  const addContact = async () => { 
  if (!name.trim() || !phoneNumber.trim()) { 
    Alert.alert("Error", "Please enter name and phone number"); 
    return; 
  } 
 
  const permission = await Contacts.requestPermissionsAsync(); 
 
  if (!permission.granted) { 
    Alert.alert("Permission Denied"); 
    return; 
  } 
 
  try { 
    const contact = { 
      contactType: Contacts.ContactTypes.Person, 
 
      // Use firstName instead of name 
      firstName: name.trim(), 
 
      phoneNumbers: [ 
        { 
          label: "mobile", 
          number: phoneNumber.trim(), 
        }, 
      ], 
    }; 
 
    await Contacts.addContactAsync(contact); 
 
    Alert.alert("Success", "Contact added successfully"); 
  
   setName(""); 
    setPhoneNumber(""); 
 
    const result = await Contacts.getContactsAsync({ 
      sort: Contacts.SortTypes.FirstName, 
    }); 
 
    setContacts(result.data); 
  } catch (error) { 
    console.log(error); 
 
    Alert.alert( 
      "Error", 
      "Could not add contact" 
    ); 
  } 
}; 
 
 
  const deleteContact = (id, name) => { 
    Alert.alert( 
      "Delete Contact", 
      `Are you sure you want to delete ${name}?`, 
      [ 
        { 
          text: "Cancel", 
        }, 
        { 
          text: "Delete", 
          onPress: async () => { 
            try { 
              await Contacts.removeContactAsync(id); 
 
              setContacts( 
                contacts.filter((item) => item.id !== id) 
              ); 
 
              Alert.alert( 
                "Success", 
                "Contact deleted successfully" 
              ); 
            } catch (error) { 
              Alert.alert( 
                "Error", 
                "Could not delete contact" 
              ); 
            } 
          }, 
        }, 
      ] 
    ); 
  }; 
 
   
  const filteredContacts = contacts.filter((item) => 
    item.name?.toLowerCase().includes(search.toLowerCase()) 
  ); 
 
  return ( 
    <View style={styles.container}> 
 
      <Text style={styles.title}> 
        My Contacts 
      </Text> 
 
      {/* Permission Button */} 
      <View style={styles.button}> 
        <Button 
          title="Request Contact Permission" 
          onPress={requestPermission} 
        /> 
      </View> 
 
      {/* Get Contacts Button */} 
      <View style={styles.button}> 
        <Button 
          title="GET Contacts" 
          onPress={getContacts} 
        /> 
      </View> 
 
      {/* ========================= */} 
      {/* ADD CONTACT SECTION */} 
      {/* ========================= */} 
 
      <Text style={styles.sectionTitle}> 
        Add New Contact 
      </Text> 
 
      {/* Name Input */} 
      <TextInput 
        placeholder="Enter contact name" 
        value={name} 
        onChangeText={setName} 
        style={styles.input} 
      /> 
 
      {/* Phone Number Input */} 
      <TextInput 
        placeholder="Enter phone number" 
        value={phoneNumber} 
        onChangeText={setPhoneNumber} 
        keyboardType="phone-pad" 
        style={styles.input} 
      /> 
 
      {/* Add Contact Button */} 
      <View style={styles.button}> 
        <Button 
          title="Add Contact" 
          onPress={addContact} 
        /> 
      </View> 
 
      {/* Contact Count */} 
      <Text style={styles.count}> 
        Contacts: {filteredContacts.length} 
      </Text> 
 
      {/* Search */} 
      <TextInput 
        placeholder="Search the contact" 
        value={search} 
        onChangeText={setSearch} 
        style={styles.input} 
      /> 
 
      {/* Contacts List */} 
      <FlatList 
        data={filteredContacts} 
        keyExtractor={(item) => item.id} 
        renderItem={({ item }) => ( 
          <View style={styles.contactBox}> 
 
            {/* Contact Image */} 
            {item?.imageAvailable && item?.image?.uri ? ( 
              <Image 
                source={{ uri: item.image.uri }} 
                style={styles.contactImage} 
              /> 
            ) : ( 
              <View style={styles.letterImage}> 
                <Text style={styles.letterText}> 
                  {item.name?.[0]?.toUpperCase() || "?"} 
                </Text> 
              </View> 
            )} 
 
            {/* Name */} 
            <Text style={styles.name}> 
              {item.name || "No Name"} 
            </Text> 
 
            {/* Phone */} 
            <Text style={styles.phone}> 
              {item.phoneNumbers?.[0]?.number || 
                "No phone number"} 
            </Text> 
 
            {/* Delete */} 
            <TouchableOpacity 
              style={styles.deleteButton} 
              onPress={() => 
                deleteContact( 
                  item.id, 
                  item.name || "this contact" 
                ) 
              } 
            > 
              <Text style={styles.deleteText}> 
                Delete 
              </Text> 
            </TouchableOpacity> 
 
          </View> 
        )} 
      /> 
 
    </View> 
  ); 
} 
 
const styles = StyleSheet.create({ 
  container: { 
    flex: 1, 
    backgroundColor: "#f5f5f5", 
    padding: 20, 
    paddingTop: 50, 
  }, 
 
  title: { 
    fontSize: 28, 
    fontWeight: "bold", 
    textAlign: "center", 
    marginBottom: 20, 
  }, 
 
  sectionTitle: { 
    fontSize: 20, 
    fontWeight: "bold", 
    marginTop: 10, 
    marginBottom: 10, 
  }, 
 
  button: { 
    marginBottom: 10, 
  }, 
 
  count: { 
    fontSize: 18, 
    fontWeight: "bold", 
    marginTop: 10, 
    marginBottom: 10, 
  }, 
 
  input: { 
    backgroundColor: "white", 
    borderWidth: 1, 
    borderColor: "#ddd", 
    borderRadius: 10, 
    padding: 12, 
    marginBottom: 10, 
    fontSize: 16, 
  }, 
 
  contactBox: { 
    backgroundColor: "white", 
    padding: 15, 
    marginBottom: 10, 
    borderRadius: 10, 
    borderWidth: 1, 
    borderColor: "#ddd", 
    alignItems: "center", 
  }, 
 
  contactImage: { 
    width: 70, 
    height: 70, 
    borderRadius: 35, 
    marginBottom: 10, 
  }, 
 
  letterImage: { 
    width: 70, 
    height: 70, 
    borderRadius: 35, 
    backgroundColor: "#4A90E2", 
    justifyContent: "center", 
    alignItems: "center", 
    marginBottom: 10, 
  }, 
 
  letterText: { 
    fontSize: 30, 
    fontWeight: "bold", 
    color: "white", 
  }, 
 
  name: { 
    fontSize: 20, 
    fontWeight: "bold", 
    marginBottom: 5, 
  }, 
 
  phone: { 
    fontSize: 16, 
    color: "#555", 
    marginBottom: 10, 
  }, 
 
  deleteButton: { 
    backgroundColor: "#e53935", 
    paddingHorizontal: 20, 
    paddingVertical: 8, 
    borderRadius: 8, 
  }, 
 
  deleteText: { 
    color: "white", 
    fontWeight: "bold", 
  }, 
})