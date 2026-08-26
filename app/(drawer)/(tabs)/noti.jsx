import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import * as Notification from 'expo-notifications';

Notification.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner:true,
  }),
});

const Noti = () => {
  const [time, settime] = useState('');
  const [title, settitle] = useState('');
  const [desc, setdesc] = useState('');

  const handleNoti = async () => {
    const perm = await Notification.requestPermissionsAsync();

    if (!perm.granted) {
      alert('Permission denied');
      return;
    }

    await Notification.scheduleNotificationAsync({
      content: {
        title: title || 'Default Title',
        body: desc || 'Default Body',
      },
      trigger: {
        type: 'timeInterval',   
        seconds: parseInt(time) || 5, 
        repeats: false,         
      },        
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>📢 Notification Scheduler</Text>

      <TextInput
        placeholder="Enter title"
        value={title}
        onChangeText={settitle}
        style={styles.input}
      />

      <TextInput
        placeholder="Enter time (seconds)"
        value={time}
        onChangeText={settime}
        style={styles.input}
        keyboardType="numeric"
      />

      <TextInput
        placeholder="Enter body"
        value={desc}
        onChangeText={setdesc}
        style={styles.input}
      />

      <View style={{ marginTop: 20 }}>
        <Button title="Schedule Notification" onPress={handleNoti} />
      </View>
    </View>
  );
};

export default Noti;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginVertical: 8,
    width: '80%',
    backgroundColor: '#fff',
  },
});
