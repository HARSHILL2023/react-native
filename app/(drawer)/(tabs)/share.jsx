// import {
//   StyleSheet,
//   Text,
//   View,
//   Share,
//   Pressable,
//   TextInput,
//   KeyboardAvoidingView,
//   Platform,
// } from 'react-native';
// import React, { useState } from 'react';

// const Sharee = () => {
//   const [mssg, setmssg] = useState('');

//   const handleshare = async () => {
//     if (!mssg.trim()) return;

//     await Share.share({
//        title: "React Native Course",
//         message: mssg,
       
//     });
//   };

//   return (
//     <KeyboardAvoidingView
//       style={styles.container}
//       behavior={Platform.OS === 'ios' ? 'padding' : undefined}
//     >
//       <View style={styles.header}>
//         <Text style={styles.title}>Share Something</Text>
//         <Text style={styles.subtitle}>
//           Write a message and share it with others
//         </Text>
//       </View>

//       <View style={styles.card}>
//         <Text style={styles.label}>Your Message</Text>

//         <TextInput
//           value={mssg}
//           onChangeText={setmssg}
//           placeholder="Type something to share..."
//           placeholderTextColor="#8B8B94"
//           multiline
//           textAlignVertical="top"
//           style={styles.input}
//         />

//         <Text style={styles.counter}>{mssg.length} characters</Text>

//         <Pressable
//           style={({ pressed }) => [
//             styles.shareButton,
//             pressed && styles.buttonPressed,
//             !mssg.trim() && styles.disabledButton,
//           ]}
//           onPress={handleshare}
//           disabled={!mssg.trim()}
//         >
//           <Text style={styles.shareIcon}>↗</Text>
//           <Text style={styles.shareText}>Share Message</Text>
//         </Pressable>
//       </View>

//       <View style={styles.footer}>
//         <Text style={styles.footerText}>
//           Your message will open in the device's share menu.
//         </Text>
//       </View>
//     </KeyboardAvoidingView>
//   );
// };

// export default Sharee;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#0B0B0F',
//     paddingHorizontal: 22,
//     paddingTop: 70,
//   },

//   header: {
//     marginBottom: 30,
//   },

//   title: {
//     fontSize: 32,
//     fontWeight: '800',
//     color: '#FFFFFF',
//     letterSpacing: -0.8,
//   },

//   subtitle: {
//     marginTop: 8,
//     fontSize: 15,
//     color: '#92929B',
//     lineHeight: 22,
//   },

//   card: {
//     backgroundColor: '#15151B',
//     borderRadius: 24,
//     padding: 20,
//     borderWidth: 1,
//     borderColor: '#25252D',
//   },

//   label: {
//     color: '#FFFFFF',
//     fontSize: 16,
//     fontWeight: '700',
//     marginBottom: 12,
//   },

//   input: {
//     height: 180,
//     backgroundColor: '#0D0D12',
//     borderRadius: 16,
//     borderWidth: 1,
//     borderColor: '#292932',
//     padding: 16,
//     color: '#FFFFFF',
//     fontSize: 16,
//     lineHeight: 23,
//   },

//   counter: {
//     color: '#6F6F79',
//     fontSize: 12,
//     textAlign: 'right',
//     marginTop: 8,
//   },

//   shareButton: {
//     marginTop: 20,
//     height: 56,
//     borderRadius: 16,
//     backgroundColor: '#FFFFFF',
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     gap: 10,
//   },

//   buttonPressed: {
//     opacity: 0.75,
//     transform: [{ scale: 0.98 }],
//   },

//   disabledButton: {
//     opacity: 0.35,
//   },

//   shareIcon: {
//     fontSize: 23,
//     fontWeight: '700',
//     color: '#0B0B0F',
//   },

//   shareText: {
//     color: '#0B0B0F',
//     fontSize: 16,
//     fontWeight: '800',
//   },

//   footer: {
//     marginTop: 22,
//     paddingHorizontal: 8,
//   },

//   footerText: {
//     color: '#666670',
//     fontSize: 13,
//     textAlign: 'center',
//     lineHeight: 19,
//   },
// });