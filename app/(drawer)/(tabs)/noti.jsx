import { StyleSheet, Text, View, Button } from 'react-native';
import React, { useState } from 'react';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});


const Noti = () => {

  const [id, setid] = useState(null);
  const PushNotification = async () => {


    const permission = await Notifications.getPermissionsAsync();

    if (!permission.granted) {
      alert("Permission is not given");
      await Notifications.requestPermissionsAsync()
      return;
    }


    const check = await Notifications.scheduleNotificationAsync({
      content: {
        title: "Kam Kar Taru",
        body: "Hello",
      },

      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds: 1,
        repeats: false,
      },
    });
    console.log(check)
    if (check) {
      setid(check);
    }
    alert("Notification scheduled!");
  };

  const cancelPushNotification = async () => {
    await Notifications.cancelScheduledNotificationAsync(id);
  }
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'pink',
      }}
    >
      <Text>Notification</Text>

      <Button
        title="Schedule Notification"
        onPress={PushNotification}
      />

      <Button
        title="Cancle Notification"
        onPress={cancelPushNotification}
      />
    </View>
  );
};

export default Noti;

const styles = StyleSheet.create({});