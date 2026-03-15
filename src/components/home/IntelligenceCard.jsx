import React, { useState } from 'react';
import { StyleSheet, View, Text, Platform, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const DESC_PREVIEW_LINES = 3;

export const IntelligenceCard = ({ item, onPress, enableExpand = true, forceShowExpandControl = false }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasOverflow, setHasOverflow] = useState(false);

  const getCategoryInfo = () => {
    if (item.id.includes('news-ph')) return { label: 'Philippines', icon: 'location-outline', color: '#3b82f6' };
    if (item.id.includes('news-world')) return { label: 'Global Tech', icon: 'globe-outline', color: '#8b5cf6' };
    if (item.id.includes('crypto')) return { label: 'Market Finance', icon: 'stats-chart-outline', color: '#f59e0b' };
    if (item.id.includes('space')) return { label: 'Space Intel', icon: 'planet-outline', color: '#06b6d4' };
    return { label: 'System Update', icon: 'server-outline', color: '#71717a' };
  };

  const info = getCategoryInfo();
  const Container = onPress ? TouchableOpacity : View;

  return (
    <Container style={styles.infoCard} activeOpacity={0.9} onPress={onPress}>
      <View style={styles.cardHeader}>
        <View style={[styles.iconBox, { backgroundColor: `${info.color}15` }]}>
          <Ionicons name={info.icon} size={14} color={info.color} />
        </View>
        <Text style={[styles.categoryLabel, { color: info.color }]}>{info.label}</Text>
        <View style={styles.dotSeparator} />
      </View>

      <Text style={styles.cardTitle}>{item.title}</Text>
      
      <Text
        style={styles.cardDesc}
        numberOfLines={enableExpand && isExpanded ? undefined : DESC_PREVIEW_LINES}
        onTextLayout={({ nativeEvent }) => {
          if (nativeEvent.lines.length > DESC_PREVIEW_LINES) {
            setHasOverflow(true);
          }
        }}
      >
        {item.desc}
      </Text>

      {enableExpand && (hasOverflow || forceShowExpandControl) && (
        <TouchableOpacity 
          onPress={() => setIsExpanded(!isExpanded)}
          style={styles.expandButton}
        >
          <Text style={styles.readMoreText}>{isExpanded ? 'Show less' : 'Read full report'}</Text>
          <Ionicons name={isExpanded ? 'chevron-up' : 'chevron-down'} size={14} color="#18181b" />
        </TouchableOpacity>
      )}
      
      <View style={styles.cardFooter}>
        <Ionicons name="time-outline" size={12} color="#a1a1aa" />
        <Text style={styles.timestamp}>
        {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  infoCard: { 
    backgroundColor: '#fff', 
    padding: 18, 
    marginBottom: 16, 
    borderRadius: 12, // Softer corners for user-friendliness
    borderWidth: 1,
    borderColor: '#f4f4f5',
    // Subtle shadow for depth
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8 },
      android: { elevation: 2 }
    })
  },
  cardHeader: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 12,
  },
  iconBox: {
    padding: 6,
    borderRadius: 6,
    marginRight: 8,
  },
  categoryLabel: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  dotSeparator: {
    width: 3,
    height: 3,
    borderRadius: 2,
    backgroundColor: '#e4e4e7',
    marginHorizontal: 8,
  },
  idSubtext: {
    fontSize: 10,
    color: '#a1a1aa',
    fontWeight: '500',
  },
  cardTitle: { 
    fontSize: 18, 
    fontWeight: '700', 
    color: '#09090b', 
    marginBottom: 8,
    lineHeight: 24,
  },
  cardDesc: { 
    fontSize: 14, 
    color: '#52525b', 
    lineHeight: 21, 
    marginBottom: 12 
  },
  expandButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 14,
  },
  readMoreText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#18181b',
  },
  cardFooter: { 
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderTopWidth: 1, 
    borderTopColor: '#f4f4f5', 
    paddingTop: 12,
  },
  timestamp: { 
    fontSize: 11, 
    color: '#a1a1aa',
    fontWeight: '500'
  },
});