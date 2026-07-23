// import { StyleSheet, Text, View, Pressable, ScrollView } from 'react-native';
// import React, { useEffect } from 'react';
// import * as SecureStore from 'expo-secure-store';
// import { router } from 'expo-router';
// import { ArrowRight, LogOut, Sparkles, ShieldCheck, Zap, Compass, Users, Camera } from 'lucide-react-native';

// const HomeScreen = () => {
//   useEffect(() => {
//     checkLogin();
//   }, []);

//   const checkLogin = async () => {
//     const token = await SecureStore.getItemAsync('education');
//     if (!token) {
//       router.replace('/login');
//     }
//   };

//   const handleLogout = async () => {
//     await SecureStore.deleteItemAsync('education');
//     router.replace('/login');
//   };

//   return (
//     <ScrollView style={styles.container} contentContainerStyle={styles.content}>
//       <View style={styles.heroCard}>
//         <View style={styles.badgeRow}>
//           <View style={styles.badge}>
//             <Sparkles size={16} color="#2563eb" />
//             <Text style={styles.badgeText}>Beto Grid Style</Text>
//           </View>
//         </View>

//         <Text style={styles.title}>Welcome back, Harshil</Text>
//         <Text style={styles.subtitle}>
//           A premium, modern dashboard with bold cards and smooth motion.
//         </Text>

//         <Pressable style={styles.primaryButton} onPress={() => router.push('/students')}>
//           <Text style={styles.primaryButtonText}>Open Students</Text>
//           <ArrowRight size={18} color="#fff" />
//         </Pressable>
//       </View>

//       <View style={styles.grid}>
//         <Pressable style={styles.card} onPress={() => router.push('/students')}>
//           <Users size={24} color="#2563eb" />
//           <Text style={styles.cardTitle}>Students</Text>
//           <Text style={styles.cardText}>Manage your class and track progress.</Text>
//         </Pressable>

//         <Pressable style={styles.card} onPress={() => router.push('/camera')}>
//           <Camera size={24} color="#7c3aed" />
//           <Text style={styles.cardTitle}>Camera</Text>
//           <Text style={styles.cardText}>Capture moments and share instantly.</Text>
//         </Pressable>
//       </View>

//       <View style={styles.grid}>
//         <Pressable style={styles.card}>
//           <ShieldCheck size={24} color="#10b981" />
//           <Text style={styles.cardTitle}>Secure</Text>
//           <Text style={styles.cardText}>Your account stays protected.</Text>
//         </Pressable>

//         <Pressable style={styles.card}>
//           <Zap size={24} color="#f59e0b" />
//           <Text style={styles.cardTitle}>Fast</Text>
//           <Text style={styles.cardText}>A smooth experience everywhere.</Text>
//         </Pressable>
//       </View>

//       <Pressable style={styles.logoutButton} onPress={handleLogout}>
//         <LogOut size={18} color="#ef4444" />
//         <Text style={styles.logoutText}>Logout</Text>
//       </Pressable>
//     </ScrollView>
//   );
// };

// export default HomeScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f8fafc',
//   },
//   content: {
//     padding: 20,
//     paddingTop: 36,
//   },
//   heroCard: {
//     backgroundColor: '#ffffff',
//     borderRadius: 28,
//     padding: 24,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 12 },
//     shadowOpacity: 0.1,
//     shadowRadius: 20,
//     elevation: 5,
//   },
//   badgeRow: {
//     marginBottom: 12,
//   },
//   badge: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#eff6ff',
//     alignSelf: 'flex-start',
//     paddingHorizontal: 10,
//     paddingVertical: 6,
//     borderRadius: 999,
//     gap: 6,
//   },
//   badgeText: {
//     color: '#2563eb',
//     fontWeight: '700',
//     fontSize: 12,
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: '800',
//     color: '#0f172a',
//     marginBottom: 8,
//   },
//   subtitle: {
//     fontSize: 15,
//     color: '#64748b',
//     lineHeight: 22,
//     marginBottom: 18,
//   },
//   primaryButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#2563eb',
//     paddingVertical: 13,
//     borderRadius: 14,
//     gap: 8,
//   },
//   primaryButtonText: {
//     color: '#fff',
//     fontWeight: '700',
//     fontSize: 15,
//   },
//   grid: {
//     flexDirection: 'row',
//     gap: 12,
//     marginTop: 16,
//   },
//   card: {
//     flex: 1,
//     backgroundColor: '#fff',
//     borderRadius: 20,
//     padding: 16,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 8 },
//     shadowOpacity: 0.07,
//     shadowRadius: 14,
//     elevation: 3,
//   },
//   cardTitle: {
//     fontSize: 16,
//     fontWeight: '700',
//     color: '#0f172a',
//     marginTop: 10,
//   },
//   cardText: {
//     color: '#64748b',
//     marginTop: 4,
//     fontSize: 13,
//     lineHeight: 20,
//   },
//   logoutButton: {
//     marginTop: 20,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#fff1f2',
//     paddingVertical: 13,
//     borderRadius: 16,
//     gap: 8,
//   },
//   logoutText: {
//     color: '#ef4444',
//     fontWeight: '700',
//   },
// });

import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { router } from "expo-router"
import * as SecureStore from "expo-secure-store"

const Home = () => {

  const handleLogout = async () => {
    await SecureStore.deleteItemAsync("token")
    await SecureStore.deleteItemAsync("biometric")

    router.replace("/login")
  }
  return (
    <View>
      <Text> Home</Text>

      <Button title="Logout" onPress={handleLogout} />
    </View>
  )
}

export default Home

const styles = StyleSheet.create({})