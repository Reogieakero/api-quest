import React from 'react';
import { StyleSheet, View, Text, FlatList, Dimensions, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAutoCarousel } from '../../hooks/useAutoCarousel';

const { width } = Dimensions.get('window');

export const ApiCarousel = ({ data, onItemPress }) => {
  if (!data || data.length === 0) return null;

  const infiniteData = [data[data.length - 1], ...data, data[0]];
  const { flatListRef, handleMomentumScrollEnd } = useAutoCarousel(data);

  const renderSlideContent = (item) => (
    <View style={styles.contentOverlay}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.desc} numberOfLines={2}>
        {item.desc}
      </Text>
      <TouchableOpacity style={styles.button} activeOpacity={0.85} onPress={() => onItemPress?.(item)}>
        <Text style={styles.buttonText}>Read more</Text>
      </TouchableOpacity>
    </View>
  );

  const renderItem = ({ item }) => (
    <View style={styles.slide}>
      <View style={styles.card}>
        {item.image ? (
          <Image source={{ uri: item.image }} style={styles.heroImage} />
        ) : (
          <View style={[styles.heroImage, styles.heroFallback]} />
        )}
        <View style={styles.imageOverlay} />
        {renderSlideContent(item)}
      </View>
    </View>
  );

  return (
    <View style={styles.carouselWrapper}>
      <FlatList
        ref={flatListRef}
        data={infiniteData}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        initialScrollIndex={1}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, index) => `mission-${index}`}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        getItemLayout={(_, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  carouselWrapper: {
    paddingVertical: 10
  },
  slide: {
    width: width
  },
  card: {
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: '#18181b',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6
  },
  heroImage: { width: '100%', height: 220 },
  heroFallback: { backgroundColor: '#27272a' },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(9, 9, 11, 0.4)'
  },
  contentOverlay: {
    position: 'absolute',
    left: 14,
    right: 14,
    bottom: 14,
    gap: 8
  },
  title: { fontSize: 24, fontWeight: '800', color: '#fafafa', letterSpacing: -0.6 },
  desc: { fontSize: 13, color: 'rgba(250, 250, 250, 0.9)', lineHeight: 18 },
  button: {
    alignSelf: 'flex-end', // Moved to the right
    backgroundColor: 'rgba(24, 24, 27, 0.92)',
    height: 40,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 2,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)'
  },
  buttonText: { color: '#fff', fontWeight: '700', fontSize: 13, letterSpacing: 0.2 }
});