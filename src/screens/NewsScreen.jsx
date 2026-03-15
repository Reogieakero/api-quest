import React, { useMemo, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TextInput,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CategoryBento } from '../components/home/CategoryBento';
import { IntelligenceCard } from '../components/home/IntelligenceCard';
import { fetchApiData } from '../services/apiService';
import { RetroLoader } from '../components/ui/RetroLoader';

const FILTER_TITLES = {
  all: 'All News',
  'news-ph': 'PH News',
  'news-world': 'Global Tech News',
  latest: 'Latest News',
};

export default function NewsScreen({ route, navigation }) {
  const initialNews = Array.isArray(route.params?.newsItems) ? route.params.newsItems : [];
  const initialFilter = route.params?.initialFilter || 'all';
  const [newsItems, setNewsItems] = useState(initialNews);
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState(initialFilter);
  const [loading, setLoading] = useState(initialNews.length === 0);

  React.useEffect(() => {
    setActiveFilter(initialFilter);
  }, [initialFilter]);

  React.useEffect(() => {
    if (initialNews.length > 0) {
      return;
    }

    const loadNews = async () => {
      const data = await fetchApiData();
      const onlyNews = data.filter((item) => item.source?.startsWith('news-'));
      setNewsItems(onlyNews);
      setLoading(false);
    };

    loadNews();
  }, [initialNews.length]);

  const sourceFilteredNews = useMemo(() => {
    if (activeFilter === 'news-ph') {
      return newsItems.filter((item) => item.source === 'news-ph');
    }

    if (activeFilter === 'news-world') {
      return newsItems.filter((item) => item.source === 'news-world');
    }

    if (activeFilter === 'latest') {
      return newsItems.slice(0, 6);
    }

    return newsItems;
  }, [activeFilter, newsItems]);

  const filteredNews = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) {
      return sourceFilteredNews;
    }

    return sourceFilteredNews.filter((item) => {
      const title = (item.title || '').toLowerCase();
      const desc = (item.desc || '').toLowerCase();
      return title.includes(query) || desc.includes(query);
    });
  }, [search, sourceFilteredNews]);

  const currentTitle = FILTER_TITLES[activeFilter] || 'All News';

  return (
    <SafeAreaView style={styles.safeArea} edges={['left', 'right', 'bottom']}>
      <View style={styles.mainWrapper}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <RetroLoader label="Scanning headlines..." />
          </View>
        ) : (
          <ScrollView style={styles.scrollBody} showsVerticalScrollIndicator={false}>
            <CategoryBento activeFilter={activeFilter} onCategoryPress={setActiveFilter} />

            <View style={styles.newsSection}>
              <Text style={styles.sectionTitle}>{currentTitle}</Text>
              <TextInput
                style={styles.searchInput}
                placeholder="Search news"
                placeholderTextColor="#a1a1aa"
                value={search}
                onChangeText={setSearch}
              />

              {filteredNews.length === 0 ? (
                <Text style={styles.emptyText}>No news matched your search.</Text>
              ) : (
                filteredNews.map((item) => (
                  <IntelligenceCard
                    key={item.id}
                    item={item}
                    enableExpand={false}
                    onPress={() => navigation.navigate('NewsDetail', { item })}
                  />
                ))
              )}
            </View>
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  mainWrapper: { flex: 1, paddingTop: 0 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  scrollBody: { flex: 1 },
  newsSection: { paddingHorizontal: 16, marginTop: 12, paddingBottom: 40 },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#a1a1aa',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 12,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#e4e4e7',
    borderRadius: 10,
    height: 44,
    paddingHorizontal: 12,
    marginBottom: 16,
    color: '#18181b',
    fontSize: 14,
  },
  emptyText: {
    fontSize: 13,
    color: '#71717a',
    marginTop: 4,
  },
});
