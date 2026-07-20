import { StyleSheet, Text, View, FlatList, TouchableOpacity, Platform, useColorScheme } from 'react-native'
import React, { useState } from 'react'
import * as Contacts from 'expo-contacts'
import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import { Ionicons } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function ContactsScreen() {
    const [contactList, setContactList] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const colorScheme = useColorScheme()
    const isDark = colorScheme === 'dark'

    const getContacts = async () => {
        setLoading(true)
        setError(null)
        try {
            const { status } = await Contacts.requestPermissionsAsync();
            if (status === 'granted') {
                const { data } = await Contacts.getContactsAsync({
                    fields: [Contacts.Fields.PhoneNumbers],
                });

                if (data.length > 0) {
                    setContactList(data);
                } else {
                    setError('No contacts found.');
                }
            } else {
                setError('Permission to access contacts was denied');
            }
        } catch (err) {
            setError('An error occurred while fetching contacts');
        } finally {
            setLoading(false)
        }
    }

    const renderContact = ({ item }) => {
        const initials = item.name ? item.name.charAt(0).toUpperCase() : '?'
        const phoneNumber = item.phoneNumbers && item.phoneNumbers.length > 0 
            ? item.phoneNumbers[0].number 
            : 'No phone number'

        return (
            <View style={[styles.contactCard, isDark && styles.contactCardDark]}>
                <View style={styles.avatar}>
                    <Text style={styles.avatarText}>{initials}</Text>
                </View>
                <View style={styles.contactInfo}>
                    <ThemedText style={styles.contactName} numberOfLines={1}>{item.name}</ThemedText>
                    <Text style={styles.contactPhone}>{phoneNumber}</Text>
                </View>
                <TouchableOpacity style={[styles.actionButton, isDark && styles.actionButtonDark]}>
                    <Ionicons name="call" size={20} color="#0A7EA4" />
                </TouchableOpacity>
            </View>
        )
    }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
        <ThemedView style={styles.container}>
            <View style={styles.header}>
                <ThemedText type="title" style={styles.title}>My Contacts</ThemedText>
                <Text style={styles.subtitle}>Manage your connections</Text>
            </View>
            
            <TouchableOpacity 
                style={styles.primaryButton} 
                onPress={getContacts}
                activeOpacity={0.8}
            >
                <Ionicons name="people-circle" size={24} color="#fff" style={styles.buttonIcon} />
                <Text style={styles.buttonText}>
                    {loading ? "Syncing..." : "Sync Contacts"}
                </Text>
            </TouchableOpacity>

            {error && (
                <View style={styles.errorContainer}>
                    <Ionicons name="alert-circle" size={20} color="#FF3B30" />
                    <Text style={styles.errorText}>{error}</Text>
                </View>
            )}

            <FlatList
                data={contactList}
                keyExtractor={(item) => item.id || Math.random().toString()}
                renderItem={renderContact}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={() => (
                    !loading && !error && (
                        <View style={styles.emptyContainer}>
                            <Ionicons name="person-outline" size={60} color={isDark ? "#555" : "#ccc"} />
                            <ThemedText style={styles.emptyText}>No contacts synced yet.</ThemedText>
                        </View>
                    )
                )}
            />
        </ThemedView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
    header: {
        marginBottom: 25,
        marginTop: 15,
    },
    title: {
        fontSize: 34,
        fontWeight: '800',
        letterSpacing: 0.5,
    },
    subtitle: {
        fontSize: 16,
        color: '#8e8e93',
        marginTop: 4,
    },
    primaryButton: {
        flexDirection: 'row',
        backgroundColor: '#0A7EA4',
        paddingVertical: 16,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        shadowColor: '#0A7EA4',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 8,
    },
    buttonIcon: {
        marginRight: 8,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '700',
    },
    errorContainer: {
        flexDirection: 'row',
        backgroundColor: '#ffe5e5',
        padding: 12,
        borderRadius: 12,
        alignItems: 'center',
        marginBottom: 15,
    },
    errorText: {
        color: '#FF3B30',
        marginLeft: 8,
        fontSize: 14,
        fontWeight: '500',
    },
    listContent: {
        paddingBottom: 40,
    },
    contactCard: {
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        padding: 16,
        borderRadius: 20,
        marginBottom: 14,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.06,
        shadowRadius: 10,
        elevation: 3,
    },
    contactCardDark: {
        backgroundColor: '#1E1E1E',
        shadowColor: '#000',
        shadowOpacity: 0.3,
    },
    avatar: {
        width: 54,
        height: 54,
        borderRadius: 27,
        backgroundColor: '#E6F2F7',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    avatarText: {
        color: '#0A7EA4',
        fontSize: 22,
        fontWeight: '700',
    },
    contactInfo: {
        flex: 1,
        marginRight: 10,
    },
    contactName: {
        fontSize: 17,
        fontWeight: '700',
        marginBottom: 4,
    },
    contactPhone: {
        fontSize: 14,
        color: '#8e8e93',
        fontWeight: '500',
    },
    actionButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#f2f2f7',
        justifyContent: 'center',
        alignItems: 'center',
    },
    actionButtonDark: {
        backgroundColor: '#2C2C2E',
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 60,
    },
    emptyText: {
        marginTop: 15,
        fontSize: 16,
        color: '#8e8e93',
        fontWeight: '500',
    }
})