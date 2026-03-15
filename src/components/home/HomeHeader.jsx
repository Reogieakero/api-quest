import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const HomeHeader = ({ onHelpPress }) => {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  return (
    <View style={styles.headerContainer}>
      <View style={styles.header}>
        <View style={styles.titleGroup}>
          <Text style={styles.dateLabel}>{today.toUpperCase()}</Text>
          <Text style={styles.brand}>Feed</Text>
        </View>
        <TouchableOpacity style={styles.helpButton} onPress={onHelpPress}>
          <Ionicons name="help-circle-outline" size={24} color="#18181b" />
        </TouchableOpacity>
      </View>
      <View style={styles.separator} />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: { paddingHorizontal: 16, backgroundColor: '#fff' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingTop: 8, paddingBottom: 12, position: 'relative' },
  titleGroup: { alignItems: 'center' },
  dateLabel: { fontSize: 10, fontWeight: '700', color: '#71717a', letterSpacing: 1.5, marginBottom: 2 },
  brand: { fontSize: 32, fontWeight: '900', color: '#000', letterSpacing: -1 },
  helpButton: { position: 'absolute', right: 0, padding: 4 },
  separator: { height: 2, backgroundColor: '#000', width: '100%' }
});