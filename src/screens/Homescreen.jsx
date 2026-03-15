import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView, TouchableOpacity, Platform, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ApiCarousel } from '../components/home/ApiCarousel';
import { ApiInfo } from '../components/home/ApiInfo';
import { fetchMissionData } from '../services/apiService';

export default function HomeScreen() {
  const [missions, setMissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const data = await fetchMissionData();
    setMissions(data);
    setLoading(false);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator color="#18181b" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.mainWrapper}>
        <View style={styles.headerContainer}>
          <View style={styles.header}>
            <View>
              <Text style={styles.brand}>api-quest</Text>
              <Text style={styles.subBrand}>Explorer Dashboard</Text>
            </View>
            <TouchableOpacity style={styles.ghostButton}>
              <Ionicons name="person-outline" size={20} color="#09090b" />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <ApiCarousel data={missions} />
          <View style={styles.detailsSection}>
            <Text style={styles.sectionTitle}>System Specs</Text>
            <ApiInfo icon="terminal-outline" label="Environment" value="Production v4" />
            <ApiInfo icon="shield-checkmark-outline" label="Security" value="AES-256" />
            <ApiInfo icon="server-outline" label="Gateway" value="Edge-Lambda" />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  mainWrapper: { flex: 1, paddingTop: Platform.OS === 'android' ? 40 : 10 },
  headerContainer: { paddingHorizontal: 16, marginBottom: 8 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 16 },
  brand: { fontSize: 20, fontWeight: '700', color: '#09090b' },
  subBrand: { fontSize: 12, color: '#71717a' },
  ghostButton: { padding: 8, borderWidth: 1, borderColor: '#e4e4e7' },
  detailsSection: { paddingHorizontal: 16, paddingTop: 32, paddingBottom: 40 },
  sectionTitle: { fontSize: 12, fontWeight: '700', color: '#a1a1aa', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 20 },
});