import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ImageBackground } from 'react-native';

export const CategoryBento = ({ onCategoryPress, activeFilter = 'all' }) => {
  const categories = [
    { name: 'All News', filterKey: 'all', img: 'https://images.unsplash.com/photo-1495020689067-958852a7765e?w=400' },
    { name: 'PH News', filterKey: 'news-ph', img: 'https://images.pexels.com/photos/1595385/pexels-photo-1595385.jpeg?w=400' },
    { name: 'Global Tech', filterKey: 'news-world', img: 'https://images.pexels.com/photos/1504711/pexels-photo-1504711.jpeg?w=400' },
    { name: 'Latest', filterKey: 'latest', img: 'https://images.unsplash.com/photo-1488229297570-58520851e868?w=400' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Category</Text>
      <View style={styles.grid}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat.filterKey}
            style={[styles.card, activeFilter === cat.filterKey && styles.cardActive]}
            activeOpacity={0.8}
            onPress={() => onCategoryPress?.(cat.filterKey)}
          >
            <ImageBackground source={{ uri: cat.img }} style={styles.image} imageStyle={{ borderRadius: 4 }}>
              <View style={[styles.overlay, activeFilter === cat.filterKey && styles.overlayActive]}>
                <Text style={styles.text}>{cat.name}</Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { paddingHorizontal: 16, marginTop: 8 },
  sectionTitle: { fontSize: 11, fontWeight: '700', color: '#a1a1aa', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 },
  grid: { flexDirection: 'row', justifyContent: 'space-between', gap: 8 },
  card: { flex: 1, height: 75 },
  cardActive: { transform: [{ translateY: -2 }] },
  image: { flex: 1 },
  overlay: { flex: 1, backgroundColor: 'rgba(9, 9, 11, 0.45)', borderRadius: 4, justifyContent: 'center', alignItems: 'center' },
  overlayActive: { backgroundColor: 'rgba(9, 9, 11, 0.2)' },
  text: { color: '#fff', fontSize: 9, fontWeight: '900', textTransform: 'uppercase', letterSpacing: 0.8 },
});