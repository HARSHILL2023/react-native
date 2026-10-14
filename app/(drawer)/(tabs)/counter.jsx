import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'

const counter = () => {
  const [num, setnum] = useState(null);
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Text>counter</Text>
      <Text>{num}</Text>
      <Button title='increase' onPress={() => setnum(num + 1)} />
      <Button title='decrease' onPress={() => setnum(num - 1)} />
      <Button title='reset' onPress={() => setnum(0)} disabled={num === 0} />
    </View>
  )
}

export default counter

const styles = StyleSheet.create({})