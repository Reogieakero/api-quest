import { StyleSheet, View, Text } from 'react-native';

export const Badge = ({ children, status = 'success' }) => (
  <View style={styles.badge}>
    <View style={[styles.dot, { backgroundColor: status === 'success' ? '#10b981' : '#d4d4d8' }]} />
    <Text style={styles.text}>{children}</Text>
  </View>
);

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f4f4f5',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 99,
    alignSelf: 'flex-start',
    gap: 6,
  },
  dot: { width: 6, height: 6, borderRadius: 3 },
  text: { fontSize: 11, fontWeight: '600', color: '#18181b' },
});