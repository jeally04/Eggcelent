import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import COLORS from '../../../constants/colors';
import { useCart } from '../../../context/CartContext';

const { width } = Dimensions.get('window');
const BANNER_WIDTH = width - 32;

const FeaturedBanner = ({ products, onProductPress }) => {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { addToCart } = useCart();

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (activeIndex + 1) % products.length;
      scrollRef.current?.scrollTo({ x: nextIndex * BANNER_WIDTH, animated: true });
      setActiveIndex(nextIndex);
    }, 3500);
    return () => clearInterval(interval);
  }, [activeIndex, products.length]);

  const handleScroll = (event) => {
    const idx = Math.round(event.nativeEvent.contentOffset.x / BANNER_WIDTH);
    setActiveIndex(idx);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        style={styles.scroll}
      >
        {products.map((product) => (
          <TouchableOpacity
            key={product.id}
            activeOpacity={0.92}
            onPress={() => onProductPress(product)}
            style={styles.bannerItem}
          >
            <LinearGradient
              colors={COLORS.gradientPrimary}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.gradient}
            >
              {/* Left content */}
              <View style={styles.content}>
                <View style={[styles.badgePill, { backgroundColor: 'rgba(255,255,255,0.25)' }]}>
                  <Text style={styles.badgePillText}>{product.badge}</Text>
                </View>
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.description} numberOfLines={2}>
                  Fresh from our Rhode Island Red hens!
                </Text>
                <View style={styles.priceRow}>
                  <Text style={styles.price}>₱{product.price.toFixed(2)}</Text>
                  <Text style={styles.priceUnit}> / {product.unit}</Text>
                </View>
                <TouchableOpacity
                  style={styles.shopBtn}
                  onPress={() => addToCart(product)}
                  activeOpacity={0.85}
                >
                  <Text style={styles.shopBtnText}>Add to Cart</Text>
                  <Ionicons name="cart-outline" size={15} color={COLORS.primary} style={{ marginLeft: 4 }} />
                </TouchableOpacity>
              </View>

              {/* Right emoji */}
              <View style={styles.emojiContainer}>
                <Text style={styles.bigEmoji}>{product.emoji}</Text>
                <Text style={styles.eggCount}>{product.eggs} eggs</Text>
              </View>

              {/* Decorative circles */}
              <View style={styles.circle1} />
              <View style={styles.circle2} />
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Dots */}
      <View style={styles.dots}>
        {products.map((_, i) => (
          <View
            key={i}
            style={[styles.dot, i === activeIndex && styles.activeDot]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 4,
  },
  scroll: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  bannerItem: {
    width: BANNER_WIDTH,
    borderRadius: 20,
    overflow: 'hidden',
  },
  gradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingRight: 10,
    borderRadius: 20,
    height: 170,
    overflow: 'hidden',
    position: 'relative',
  },
  content: {
    flex: 1,
    zIndex: 1,
  },
  badgePill: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 20,
    marginBottom: 6,
  },
  badgePillText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: '700',
  },
  productName: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.white,
    marginBottom: 4,
    lineHeight: 24,
  },
  description: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 10,
    lineHeight: 15,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 10,
  },
  price: {
    fontSize: 22,
    fontWeight: '900',
    color: COLORS.white,
  },
  priceUnit: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.75)',
  },
  shopBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    alignSelf: 'flex-start',
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
  },
  shopBtnText: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: '700',
  },
  emojiContainer: {
    alignItems: 'center',
    zIndex: 1,
    width: 90,
  },
  bigEmoji: {
    fontSize: 64,
  },
  eggCount: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 11,
    fontWeight: '600',
  },
  circle1: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255,255,255,0.07)',
    bottom: -30,
    right: 60,
  },
  circle2: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.07)',
    top: -20,
    right: 20,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.cardBorder,
    marginHorizontal: 3,
  },
  activeDot: {
    backgroundColor: COLORS.primary,
    width: 18,
  },
});

export default FeaturedBanner;
