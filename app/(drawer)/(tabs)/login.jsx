import React, { useState } from 'react'
import {
  Alert,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native'
import { router } from 'expo-router'
import * as SecureStore from 'expo-secure-store'
import * as LocalAuthentication from 'expo-local-authentication'

const Login = () => {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async () => {
    if (name === 'harshil' && password === '123456') {
      await SecureStore.setItemAsync('token', 'Bharat')
      Alert.alert('login sucessfully', 'user is loggged in')
      router.replace("/home")
      return
    }

    Alert.alert('Invalid credentials', 'Something Went wrong')
  }

  const handleBiometricLogin = async () => {
    const token = await SecureStore.getItemAsync('token')
    if (!token) {
      Alert.alert('No saved login', 'Please log in with credentials first.')
      return
    }

    const hasHardware = await LocalAuthentication.hasHardwareAsync()
    const isEnrolled = await LocalAuthentication.isEnrolledAsync()

    if (!hasHardware || !isEnrolled) {
      Alert.alert('Biometrics unavailable', 'Your device does not support biometric login.')
      return
    }

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Login with biometrics',
      cancelLabel: 'Cancel' ,
      fallbackLabel: 'Use Passcode',
    })

    if (result.success) {
      Alert.alert('Login successful', 'Biometric authentication passed.')
      router.replace("/home")
      return
    }

    Alert.alert('Authentication failed', 'Please try again.')
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Login</Text>
        <Text style={styles.subtitle}>Enter your credentials to continue</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            placeholder="ENTER NAME"
            placeholderTextColor="#9CA3AF"
            value={name}
            onChangeText={setName}
            autoCapitalize="none"
            keyboardType="default"
            returnKeyType="next"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            placeholderTextColor="#9CA3AF"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
            returnKeyType="done"
          />
        </View>

        <TouchableOpacity style={styles.buttonPrimary} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonSecondary} onPress={handleBiometricLogin}>
          <Text style={styles.buttonSecondaryText}>Login with Biometrics</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B1120',
    padding: 24,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#111827',
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.18,
    shadowRadius: 20,
    elevation: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#F8FAFC',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: '#9CA3AF',
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 18,
  },
  label: {
    color: '#E5E7EB',
    marginBottom: 8,
    fontSize: 13,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#1F2937',
    color: '#F8FAFC',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#374151',
  },
  buttonPrimary: {
    backgroundColor: '#2563EB',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  buttonSecondary: {
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#374151',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },
  buttonSecondaryText: {
    color: '#D1D5DB',
    fontSize: 15,
    fontWeight: '600',
  },
})