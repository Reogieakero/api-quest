import React, { useMemo, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Image, Platform, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const DETAIL_PREVIEW_LINES = 6;

export default function NewsDetailScreen({ route }) {
  const item = route.params?.item;
  const [isExpanded, setIsExpanded] = useState(false);

  const categoryInfo = useMemo(() => {
    if (!item) {
      return { label: 'System Update', icon: 'server-outline', color: '#71717a' };
    }

    if (item.id.includes('news-ph')) return { label: 'PH News', icon: 'location-outline', color: '#3b82f6' };
    if (item.id.includes('news-world')) return { label: 'Global Tech', icon: 'globe-outline', color: '#8b5cf6' };
    if (item.id.includes('crypto')) return { label: 'Market Finance', icon: 'stats-chart-outline', color: '#f59e0b' };
    if (item.id.includes('space')) return { label: 'Space Intel', icon: 'planet-outline', color: '#06b6d4' };
    return { label: 'System Update', icon: 'server-outline', color: '#71717a' };
  }, [item]);

  if (!item) {
    return (
      <SafeAreaView style={styles.safeArea} edges={['left', 'right', 'bottom']}>
        <View style={styles.fallbackContainer}>
          <Text style={styles.fallbackText}>News details are unavailable.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['left', 'right', 'bottom']}>
      <ScrollView style={styles.scrollBody} showsVerticalScrollIndicator={false}>
        {item.image ? (
          <Image source={{ uri: item.image }} style={styles.heroImage} />
        ) : (
          <View style={[styles.heroImage, styles.heroFallback]} />
        )}

        <View style={styles.detailSection}>
          <View style={styles.kickerRow}>
            <View style={[styles.kickerBadge, { backgroundColor: `${categoryInfo.color}15` }]}>
              <Ionicons name={categoryInfo.icon} size={14} color={categoryInfo.color} />
              <Text style={[styles.kickerText, { color: categoryInfo.color }]}>{categoryInfo.label}</Text>
            </View>
            <Text style={styles.timestamp}>
              {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Text>
          </View>

          <Text style={styles.title}>{item.title}</Text>

          <View style={styles.storyBlock}>
            <Text style={styles.storyLabel}>Full detail</Text>
            <Text style={styles.storyText} numberOfLines={isExpanded ? undefined : DETAIL_PREVIEW_LINES}>
              {item.desc}
            </Text>

            <TouchableOpacity style={styles.expandButton} activeOpacity={0.85} onPress={() => setIsExpanded((prev) => !prev)}>
              <Text style={styles.expandButtonText}>{isExpanded ? 'Show less' : 'Read more'}</Text>
              <Ionicons name={isExpanded ? 'chevron-up' : 'chevron-down'} size={16} color="#18181b" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  scrollBody: { flex: 1, paddingTop: 0 },
  heroImage: {
    width: '100%',
    height: 220,
    backgroundColor: '#f4f4f5',
  },
  heroFallback: {
    backgroundColor: '#e4e4e7',
  },
  detailSection: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 32,
  },
  kickerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
    gap: 10,
  },
  kickerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 999,
  },
  kickerText: {
    fontSize: 11,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.7,
  },
  timestamp: {
    fontSize: 11,
    color: '#a1a1aa',
    fontWeight: '600',
  },
  title: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '800',
    color: '#09090b',
    letterSpacing: -0.8,
    marginBottom: 18,
  },
  summaryPanel: {
    backgroundColor: '#fafafa',
    borderWidth: 1,
    borderColor: '#f4f4f5',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  summaryLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: '#71717a',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
  },
  summaryText: {
    fontSize: 15,
    lineHeight: 24,
    color: '#27272a',
  },
  storyBlock: {
    paddingTop: 18,
    borderTopWidth: 1,
    borderTopColor: '#f4f4f5',
  },
  storyLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: '#71717a',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 10,
  },
  storyText: {
    fontSize: 15,
    lineHeight: 26,
    color: '#3f3f46',
  },
  expandButton: {
    marginTop: 14,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#f4f4f5',
    paddingHorizontal: 12,
    height: 38,
    borderRadius: 999,
  },
  expandButtonText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#18181b',
  },
  fallbackContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  fallbackText: {
    color: '#52525b',
    fontSize: 14,
  },
});
