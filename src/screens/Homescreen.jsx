import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Platform, ActivityIndicator, TouchableOpacity } from 'react-native';
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
  const moreNews = allNews.filter((item) => !carouselIds.has(item.id)).slice(0, 3);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.mainWrapper}>
        <HomeHeader />
        <ApiCarousel data={carouselData} onItemPress={(item) => navigation.navigate('NewsDetail', { item })} />

        <ScrollView style={styles.scrollBody} showsVerticalScrollIndicator={false}>
          <CategoryBento
            activeFilter="all"
            onCategoryPress={(filterKey) => navigation.navigate('News', { newsItems: allNews, initialFilter: filterKey })}
          />

          <View style={styles.feedSection}>
            <Text style={styles.sectionTitle}>More news</Text>

            {moreNews.length === 0 ? (
              <Text style={styles.emptyText}>No extra news available right now.</Text>
            ) : (
              moreNews.map((item) => (
                <IntelligenceCard
                  key={item.id}
                  item={item}
                  onPress={() => navigation.navigate('NewsDetail', { item })}
                />
              ))
            )}

            <TouchableOpacity
              style={styles.browseAllButton}
              activeOpacity={0.85}
              onPress={() => navigation.navigate('News', { newsItems: allNews, initialFilter: 'all' })}
            >
              <Text style={styles.browseAllText}>Browse all news</Text>
            </TouchableOpacity>
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
  sectionTitle: { fontSize: 11, fontWeight: '700', color: '#a1a1aa', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 16 },
  emptyText: { fontSize: 13, color: '#71717a', marginBottom: 16 },
  browseAllButton: {
    height: 44,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e4e4e7',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2
  },
  browseAllText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#18181b',
    textTransform: 'uppercase',
    letterSpacing: 0.8
  }
});