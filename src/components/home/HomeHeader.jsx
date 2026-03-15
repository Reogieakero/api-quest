import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export const HomeHeader = () => {
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
      </View>
      
      <View style={styles.separator} />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    marginBottom: 0
  },
  header: {
    alignItems: 'center',
    paddingTop: 4,
    paddingBottom: 0
  },
  titleGroup: {
    alignItems: 'center'
  },
  dateLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: '#71717a',
    letterSpacing: 1.2,
    marginBottom: 2,
  },
  brand: {
    fontSize: 28, 
    fontFamily: 'Unbounded_700Bold',
    color: '#09090b',
    letterSpacing: -0.8,
    textAlign: 'center'
  },
});