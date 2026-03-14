import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.content}>
        
        {/* 1. App Title & Icon */}
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Ionicons name="terminal-outline" color="#09090b" size={32} />
          </View>
          <Text style={styles.title}>API Quest</Text>
          
          {/* 2. Short Description */}
          <Text style={styles.description}>
            Master the art of the request. Solve real-world backend
            challenges and level up your integration skills.
          </Text>
        </View>

        {/* 3. Navigation to Main Feature (Card Style) */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Current Mission</Text>
          <Text style={styles.cardSub}>The Auth Labyrinth</Text>
          
          <TouchableOpacity 
            style={styles.button}
            onPress={() => console.log('Navigate to Quest')}
          >
            <Text style={styles.buttonText}>Enter Quest</Text>
            <Ionicons name="chevron-forward" color="#fff" size={18} />
          </TouchableOpacity>
        </View>

        <Text style={styles.footerText}>Version 1.0.4 | Ready for Request</Text>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // Shadcn 'background'
  },
  content: {
    padding: 24,
    justifyContent: 'center',
    flex: 1,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  iconContainer: {
    backgroundColor: '#f4f4f5', // Shadcn 'muted'
    padding: 16,
    borderRadius: 20,
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#09090b', // Shadcn 'foreground'
    letterSpacing: -1,
  },
  description: {
    fontSize: 16,
    color: '#71717a', // Shadcn 'muted-foreground'
    textAlign: 'center',
    marginTop: 12,
    lineHeight: 24,
  },
  card: {
    borderWidth: 1,
    borderColor: '#e4e4e7', // Shadcn 'border'
    borderRadius: 16,
    padding: 24,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  cardTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#a1a1aa',
    letterSpacing: 1.2,
    marginBottom: 4,
  },
  cardSub: {
    fontSize: 22,
    fontWeight: '700',
    color: '#09090b',
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#18181b', // Shadcn 'primary'
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  footerText: {
    position: 'absolute',
    bottom: 40,
    fontSize: 12,
    color: '#d4d4d8',
    alignSelf: 'center',
  },
});