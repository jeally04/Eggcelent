import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  Animated,
  StyleSheet,
  Dimensions,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import COLORS from '../../constants/colors';

const { width, height } = Dimensions.get('window');

const SplashScreen = ({ onFinish }) => {
  // Animation values
  const bgScale = useRef(new Animated.Value(1.1)).current;
  const eggScale = useRef(new Animated.Value(0)).current;
  const eggBounce = useRef(new Animated.Value(0)).current;
  const eggRotate = useRef(new Animated.Value(0)).current;
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const titleTranslateY = useRef(new Animated.Value(30)).current;
  const subtitleOpacity = useRef(new Animated.Value(0)).current;
  const taglineOpacity = useRef(new Animated.Value(0)).current;
  const chickenOpacity = useRef(new Animated.Value(0)).current;
  const chickenTranslateX = useRef(new Animated.Value(-60)).current;
  const dotsOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    StatusBar.setBarStyle('light-content');

    Animated.sequence([
      // 1. BG zoom in
      Animated.timing(bgScale, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),

      // 2. Egg pops in with spring
      Animated.spring(eggScale, {
        toValue: 1,
        friction: 4,
        tension: 100,
        useNativeDriver: true,
      }),

      // 3. Egg wobble
      Animated.sequence([
        Animated.timing(eggRotate, { toValue: 1, duration: 120, useNativeDriver: true }),
        Animated.timing(eggRotate, { toValue: -1, duration: 120, useNativeDriver: true }),
        Animated.timing(eggRotate, { toValue: 1, duration: 100, useNativeDriver: true }),
        Animated.timing(eggRotate, { toValue: 0, duration: 100, useNativeDriver: true }),
      ]),

      // 4. Title slides up
      Animated.parallel([
        Animated.timing(titleOpacity, { toValue: 1, duration: 400, useNativeDriver: true }),
        Animated.timing(titleTranslateY, { toValue: 0, duration: 400, useNativeDriver: true }),
      ]),

      // 5. Subtitle and tagline fade in
      Animated.parallel([
        Animated.timing(subtitleOpacity, { toValue: 1, duration: 350, useNativeDriver: true }),
        Animated.timing(taglineOpacity, { toValue: 1, duration: 350, useNativeDriver: true }),
      ]),

      // 6. Chicken slides in from left
      Animated.parallel([
        Animated.timing(chickenOpacity, { toValue: 1, duration: 350, useNativeDriver: true }),
        Animated.spring(chickenTranslateX, {
          toValue: 0,
          friction: 6,
          tension: 80,
          useNativeDriver: true,
        }),
      ]),

      // 7. Loading dots appear
      Animated.timing(dotsOpacity, { toValue: 1, duration: 300, useNativeDriver: true }),

      // 8. Pause before leaving
      Animated.delay(1200),
    ]).start(() => {
      onFinish && onFinish();
    });

    // Continuous egg bounce
    const bounceLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(eggBounce, { toValue: -8, duration: 700, useNativeDriver: true }),
        Animated.timing(eggBounce, { toValue: 0, duration: 700, useNativeDriver: true }),
      ])
    );
    const bounceTimeout = setTimeout(() => bounceLoop.start(), 900);
    return () => {
      clearTimeout(bounceTimeout);
      bounceLoop.stop();
    };
  }, []);

  const rotateInterpolate = eggRotate.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: ['-12deg', '0deg', '12deg'],
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[StyleSheet.absoluteFillObject, { transform: [{ scale: bgScale }] }]}>
        <LinearGradient
          colors={COLORS.gradientSplash}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFillObject}
        />
      </Animated.View>

      {/* Decorative circles */}
      <View style={[styles.circle, styles.circle1]} />
      <View style={[styles.circle, styles.circle2]} />
      <View style={[styles.circle, styles.circle3]} />

      {/* Chicken walking in */}
      <Animated.View
        style={[
          styles.chickenContainer,
          { opacity: chickenOpacity, transform: [{ translateX: chickenTranslateX }] },
        ]}
      >
        <Text style={styles.chickenEmoji}>🐔</Text>
      </Animated.View>

      {/* Main egg + glow */}
      <Animated.View
        style={[
          styles.eggGlow,
          {
            transform: [
              { scale: eggScale },
              { rotate: rotateInterpolate },
              { translateY: eggBounce },
            ],
          },
        ]}
      >
        <View style={styles.glowRing} />
        <Text style={styles.eggEmoji}>🥚</Text>
      </Animated.View>

      {/* Title */}
      <Animated.View
        style={{ opacity: titleOpacity, transform: [{ translateY: titleTranslateY }] }}
      >
        <Text style={styles.title}>Eggcelent</Text>
      </Animated.View>

      {/* Subtitle */}
      <Animated.Text style={[styles.subtitle, { opacity: subtitleOpacity }]}>
        Farm Fresh • Rhode Island Red
      </Animated.Text>

      {/* Tagline */}
      <Animated.View style={[styles.taglineContainer, { opacity: taglineOpacity }]}>
        <Text style={styles.tagline}>🌾 Straight from our farm to your table 🌾</Text>
      </Animated.View>

      {/* Loading dots */}
      <Animated.View style={[styles.dotsContainer, { opacity: dotsOpacity }]}>
        <LoadingDots />
      </Animated.View>
    </View>
  );
};

// Animated loading dots
const LoadingDots = () => {
  const dot1 = useRef(new Animated.Value(0.3)).current;
  const dot2 = useRef(new Animated.Value(0.3)).current;
  const dot3 = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animate = (dot, delay) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(dot, { toValue: 1, duration: 300, useNativeDriver: true }),
          Animated.timing(dot, { toValue: 0.3, duration: 300, useNativeDriver: true }),
          Animated.delay(600),
        ])
      );

    const a1 = animate(dot1, 0);
    const a2 = animate(dot2, 200);
    const a3 = animate(dot3, 400);
    a1.start();
    a2.start();
    a3.start();
    return () => { a1.stop(); a2.stop(); a3.stop(); };
  }, []);

  return (
    <View style={styles.dots}>
      {[dot1, dot2, dot3].map((dot, i) => (
        <Animated.View key={i} style={[styles.dot, { opacity: dot }]} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  circle: {
    position: 'absolute',
    borderRadius: 9999,
    backgroundColor: 'rgba(255,255,255,0.06)',
  },
  circle1: {
    width: 300,
    height: 300,
    top: -80,
    right: -80,
  },
  circle2: {
    width: 200,
    height: 200,
    bottom: 60,
    left: -60,
  },
  circle3: {
    width: 140,
    height: 140,
    top: height * 0.35,
    right: -30,
  },
  chickenContainer: {
    position: 'absolute',
    bottom: height * 0.22,
    left: 30,
  },
  chickenEmoji: {
    fontSize: 52,
  },
  eggGlow: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  glowRing: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(245, 200, 66, 0.15)',
    borderWidth: 1.5,
    borderColor: 'rgba(245, 200, 66, 0.3)',
  },
  eggEmoji: {
    fontSize: 100,
  },
  title: {
    fontSize: 48,
    fontWeight: '900',
    color: COLORS.white,
    letterSpacing: 1,
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    fontWeight: '600',
    letterSpacing: 2,
    marginTop: 6,
    marginBottom: 16,
    textTransform: 'uppercase',
  },
  taglineContainer: {
    backgroundColor: 'rgba(255,255,255,0.12)',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  tagline: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 13,
    fontWeight: '500',
    letterSpacing: 0.3,
  },
  dotsContainer: {
    position: 'absolute',
    bottom: 60,
  },
  dots: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.8)',
    marginHorizontal: 4,
  },
});

export default SplashScreen;
