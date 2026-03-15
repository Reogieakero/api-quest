import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Platform, Modal, TouchableOpacity, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HomeHeader } from '../components/home/HomeHeader';
import { ApiCarousel } from '../components/home/ApiCarousel';
import { CategoryBento } from '../components/home/CategoryBento';
import { IntelligenceCard } from '../components/home/IntelligenceCard';
import { fetchApiData } from '../services/apiService';
import { RetroLoader } from '../components/ui/RetroLoader';

export default function HomeScreen({ navigation }) {
  const [missions, setMissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAbout, setShowAbout] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const data = await fetchApiData();
    setMissions(data);
    setLoading(false);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <RetroLoader label="Syncing mission feed..." />
      </View>
    );
  }

  const latestIdsBySource = new Map();
  missions.forEach((item) => {
    const sourceKey = item.source || item.id;
    if (!latestIdsBySource.has(sourceKey)) {
      latestIdsBySource.set(sourceKey, item.id);
    }
  });

  const carouselIds = new Set(latestIdsBySource.values());
  const carouselData = missions.filter((item) => carouselIds.has(item.id));
  const allNews = missions.filter((item) => item.source?.startsWith('news-'));
  const moreNews = missions.filter((item) => !carouselIds.has(item.id));

  return (
    <SafeAreaView style={styles.safeArea}>
      <Modal animationType="fade" transparent={true} visible={showAbout} onRequestClose={() => setShowAbout(false)}>
        <Pressable style={styles.modalOverlay} onPress={() => setShowAbout(false)}>
          <View style={styles.aboutCard}>
            <Text style={styles.aboutMasthead}>System Manifesto</Text>
            <View style={styles.thickRule} />
            <Text style={styles.aboutTitle}>API Integration Protocol</Text>
            <Text style={styles.aboutDescription}>
              This application is engineered to integrate multiple public APIs to retrieve real-time data streams. Current protocols include NASA Deep Space, Open-Meteo Mati Station, CoinGecko Markets, and NewsData Global Intelligence.
            </Text>
            <TouchableOpacity style={styles.closeButton} onPress={() => setShowAbout(false)}>
              <Text style={styles.closeButtonText}>DISMISS</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>

      <View style={styles.mainWrapper}>
        <HomeHeader onHelpPress={() => setShowAbout(true)} />
        <ApiCarousel data={carouselData} onItemPress={(item) => navigation.navigate('NewsDetail', { item })} />

        <ScrollView style={styles.scrollBody} showsVerticalScrollIndicator={false}>
          <CategoryBento activeFilter="all" onCategoryPress={(filterKey) => navigation.navigate('News', { newsItems: allNews, initialFilter: filterKey })} />
          <View style={styles.feedSection}>
            <Text style={styles.sectionTitle}>Intelligence Feed</Text>
            {moreNews.map((item) => (
              <IntelligenceCard key={item.id} item={item} onPress={() => navigation.navigate('NewsDetail', { item })} />
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  mainWrapper: { flex: 1, paddingTop: Platform.OS === 'android' ? 18 : 2 },
  scrollBody: { flex: 1 },
  feedSection: { paddingHorizontal: 16, marginTop: 32, paddingBottom: 40 },
  sectionTitle: { fontSize: 11, fontWeight: '700', color: '#a1a1aa', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 16 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'center', padding: 30 },
  aboutCard: { backgroundColor: '#fff', padding: 24, borderWidth: 2, borderColor: '#000' },
  aboutMasthead: { fontSize: 10, fontWeight: '900', textAlign: 'center', letterSpacing: 2, marginBottom: 5 },
  thickRule: { height: 4, backgroundColor: '#000', marginBottom: 15 },
  aboutTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10, fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif' },
  aboutDescription: { fontSize: 14, lineHeight: 20, textAlign: 'justify', marginBottom: 20, fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif' },
  closeButton: { borderWidth: 1, borderColor: '#000', paddingVertical: 10, alignItems: 'center' },
  closeButtonText: { fontSize: 12, fontWeight: '800' }
});