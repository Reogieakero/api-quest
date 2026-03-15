import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';

export function RetroLoader({ label = 'Loading feed...' }) {
  const shake = useRef(new Animated.Value(0)).current;
  const spin = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const shakeLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(shake, {
          toValue: 1,
          duration: 900,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(shake, {
          toValue: -1,
          duration: 900,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(shake, {
          toValue: 0,
          duration: 600,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );

    const spinLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(spin, {
          toValue: 1,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(spin, {
          toValue: 2,
          duration: 750,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(spin, {
          toValue: 4,
          duration: 750,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );

    shakeLoop.start();
    spinLoop.start();

    return () => {
      shakeLoop.stop();
      spinLoop.stop();
    };
  }, [shake, spin]);

  const shakeRotate = shake.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: ['-0.5deg', '0deg', '0.5deg'],
  });

  const spinRotate = spin.interpolate({
    inputRange: [0, 1, 2, 4],
    outputRange: ['0deg', '360deg', '750deg', '1800deg'],
  });

  return (
    <View style={styles.wrapper}>
      <Animated.View style={[styles.loader, { transform: [{ rotate: shakeRotate }] }]}> 
        <View style={styles.topRail} />
        <View style={styles.centerPole} />
        <View style={styles.leftSlot} />
        <View style={styles.reelRow}>
          <View style={styles.reel} />
          <View style={styles.reel} />
          <View style={styles.reel} />
        </View>

        <Animated.View style={[styles.disk, { transform: [{ rotate: spinRotate }] }]}> 
          <View style={styles.diskCrossVertical} />
          <View style={styles.diskCrossHorizontal} />
          <View style={styles.diskInner} />
        </Animated.View>

        <View style={[styles.foot, styles.leftFoot]} />
        <View style={[styles.foot, styles.rightFoot]} />
      </Animated.View>

      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  loader: {
    width: 120,
    height: 150,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    position: 'relative',
    overflow: 'visible',
  },
  topRail: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 20,
    height: 4,
    backgroundColor: '#d4d4d8',
  },
  centerPole: {
    position: 'absolute',
    top: 0,
    left: 59,
    width: 1,
    height: 23,
    backgroundColor: '#d4d4d8',
  },
  leftSlot: {
    position: 'absolute',
    top: 6,
    left: 8,
    width: 30,
    height: 8,
    borderRadius: 6,
    backgroundColor: '#d4d4d8',
  },
  reelRow: {
    position: 'absolute',
    top: 3,
    right: 10,
    flexDirection: 'row',
    gap: 5,
  },
  reel: {
    width: 15,
    height: 15,
    borderRadius: 999,
    backgroundColor: '#eeeeee',
    borderWidth: 3,
    borderColor: '#a1a1aa',
  },
  disk: {
    position: 'absolute',
    width: 95,
    height: 95,
    left: 12.5,
    bottom: 20,
    borderRadius: 999,
    backgroundColor: '#bbdefb',
    borderWidth: 10,
    borderColor: '#dddddd',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  diskCrossVertical: {
    position: 'absolute',
    width: 12,
    height: 68,
    backgroundColor: '#64b5f6',
  },
  diskCrossHorizontal: {
    position: 'absolute',
    width: 68,
    height: 12,
    backgroundColor: '#64b5f6',
  },
  diskInner: {
    width: 28,
    height: 28,
    borderRadius: 999,
    backgroundColor: '#607d8b',
    borderWidth: 5,
    borderColor: '#e5e7eb',
  },
  foot: {
    position: 'absolute',
    top: 150,
    width: 7,
    height: 5,
    backgroundColor: '#a1a1aa',
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
  leftFoot: {
    left: 5,
  },
  rightFoot: {
    right: 5,
  },
  label: {
    marginTop: 24,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: '#71717a',
  },
});
