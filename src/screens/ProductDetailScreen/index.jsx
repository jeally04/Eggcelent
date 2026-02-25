import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Button from '../../components/common/Button';
import COLORS from '../../constants/colors';
import { useCart } from '../../context/CartContext';

const { width } = Dimensions.get('window');

const ProductDetailScreen = ({ route, navigation }) => {
  const { product } = route.params;
  const { addToCart, getItemQuantity, updateQuantity, isInCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const inCart = isInCart(product.id);
  const cartQty = getItemQuantity(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    navigation.navigate('Cart');
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      {/* Header */}
      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
          activeOpacity={0.8}
        >
          <Ionicons name="arrow-back" size={22} color={COLORS.textDark} />
        </TouchableOpacity>
        <Text style={styles.topBarTitle}>Product Details</Text>
        <TouchableOpacity
          style={styles.cartBtn}
          onPress={() => navigation.navigate('Cart')}
          activeOpacity={0.8}
        >
          <Ionicons name="cart-outline" size={22} color={COLORS.primary} />
          {cartQty > 0 && (
            <View style={styles.cartBadgeDot} />
          )}
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {/* Hero Image Area */}
        <LinearGradient
          colors={COLORS.gradientWarm}
          style={styles.heroArea}
        >
          {product.badge && (
            <View style={[styles.heroBadge, { backgroundColor: product.badgeColor }]}>
              <Text style={styles.heroBadgeText}>{product.badge}</Text>
            </View>
          )}
          <Text style={styles.heroEmoji}>{product.emoji}</Text>
          <View style={styles.eggCountPill}>
            <Text style={styles.eggCountEmoji}>🥚</Text>
            <Text style={styles.eggCountText}>{product.eggs} eggs included</Text>
          </View>
        </LinearGradient>

        {/* Content */}
        <View style={styles.content}>
          {/* Name & Rating */}
          <View style={styles.nameRow}>
            <Text style={styles.productName}>{product.name}</Text>
            <View style={styles.ratingPill}>
              <Ionicons name="star" size={14} color={COLORS.accent} />
              <Text style={styles.ratingText}>{product.rating}</Text>
            </View>
          </View>

          <View style={styles.reviewsRow}>
            <Ionicons name="chatbubble-outline" size={13} color={COLORS.textMuted} />
            <Text style={styles.reviewsText}>{product.reviewCount} reviews</Text>
            <View style={styles.dot} />
            <Ionicons name="checkmark-circle-outline" size={13} color={COLORS.success} />
            <Text style={[styles.reviewsText, { color: COLORS.success }]}>In Stock</Text>
          </View>

          {/* Price */}
          <View style={styles.priceContainer}>
            <Text style={styles.price}>₱{product.price.toFixed(2)}</Text>
            <Text style={styles.priceUnit}>{product.unit}</Text>
          </View>

          {/* Description */}
          <View style={styles.card}>
            <Text style={styles.sectionLabel}>About this product</Text>
            <Text style={styles.description}>{product.description}</Text>
          </View>

          {/* Highlights */}
          <View style={styles.card}>
            <Text style={styles.sectionLabel}>Why you'll love it</Text>
            {product.highlights.map((h, i) => (
              <View key={i} style={styles.highlightRow}>
                <View style={styles.highlightDot}>
                  <Ionicons name="checkmark" size={12} color={COLORS.white} />
                </View>
                <Text style={styles.highlightText}>{h}</Text>
              </View>
            ))}
          </View>

          {/* RIR Info */}
          <LinearGradient
            colors={['#FFF3E0', '#FDEBD0']}
            style={styles.rirCard}
          >
            <Text style={styles.rirEmoji}>🐔</Text>
            <View style={styles.rirContent}>
              <Text style={styles.rirTitle}>Rhode Island Red Eggs</Text>
              <Text style={styles.rirText}>
                Our RIR hens are raised free-range on our family farm, producing rich, golden-yolked eggs packed with natural goodness.
              </Text>
            </View>
          </LinearGradient>

          {/* Quantity Selector */}
          <View style={styles.quantitySection}>
            <Text style={styles.sectionLabel}>Quantity</Text>
            <View style={styles.quantityRow}>
              <TouchableOpacity
                style={[styles.qtyBtn, quantity <= 1 && styles.qtyBtnDisabled]}
                onPress={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
                activeOpacity={0.8}
              >
                <Ionicons name="remove" size={20} color={quantity <= 1 ? COLORS.textMuted : COLORS.textDark} />
              </TouchableOpacity>
              <Text style={styles.qtyText}>{quantity}</Text>
              <TouchableOpacity
                style={[styles.qtyBtn, styles.qtyBtnAdd]}
                onPress={() => setQuantity(quantity + 1)}
                activeOpacity={0.8}
              >
                <Ionicons name="add" size={20} color={COLORS.white} />
              </TouchableOpacity>
              <View style={styles.totalContainer}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalPrice}>₱{(product.price * quantity).toFixed(2)}</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom CTA */}
      <View style={styles.bottomBar}>
        <Button
          title={inCart ? `Update Cart (${cartQty + quantity})` : 'Add to Cart'}
          onPress={handleAddToCart}
          size="lg"
          icon={<Ionicons name="cart-outline" size={20} color={COLORS.white} />}
          style={styles.addBtn}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backBtn: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  topBarTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textDark,
  },
  cartBtn: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    position: 'relative',
  },
  cartBadgeDot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.primary,
    borderWidth: 1.5,
    borderColor: COLORS.white,
  },
  scroll: { paddingBottom: 100 },
  heroArea: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 32,
    marginHorizontal: 16,
    borderRadius: 24,
    marginBottom: 20,
    position: 'relative',
  },
  heroBadge: {
    position: 'absolute',
    top: 14,
    right: 14,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
  },
  heroBadgeText: {
    color: COLORS.white,
    fontSize: 11,
    fontWeight: '700',
  },
  heroEmoji: {
    fontSize: 110,
    marginBottom: 12,
  },
  eggCountPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  eggCountEmoji: {
    fontSize: 14,
    marginRight: 5,
  },
  eggCountText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textDark,
  },
  content: {
    paddingHorizontal: 16,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  productName: {
    fontSize: 24,
    fontWeight: '900',
    color: COLORS.textDark,
    flex: 1,
    marginRight: 12,
  },
  ratingPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.accentLight,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  ratingText: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.textDark,
    marginLeft: 4,
  },
  reviewsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  reviewsText: {
    fontSize: 12,
    color: COLORS.textMuted,
    fontWeight: '500',
    marginLeft: 4,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.cardBorder,
    marginHorizontal: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 20,
  },
  price: {
    fontSize: 32,
    fontWeight: '900',
    color: COLORS.primary,
  },
  priceUnit: {
    fontSize: 14,
    color: COLORS.textMuted,
    marginLeft: 6,
    fontWeight: '500',
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  sectionLabel: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.textDark,
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: COLORS.text,
    lineHeight: 22,
  },
  highlightRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  highlightDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: COLORS.success,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  highlightText: {
    fontSize: 14,
    color: COLORS.text,
    fontWeight: '500',
  },
  rirCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  rirEmoji: {
    fontSize: 40,
    marginRight: 12,
  },
  rirContent: {
    flex: 1,
  },
  rirTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.textDark,
    marginBottom: 4,
  },
  rirText: {
    fontSize: 12,
    color: COLORS.textMedium,
    lineHeight: 18,
  },
  quantitySection: {
    marginBottom: 16,
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  qtyBtn: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: COLORS.backgroundAlt,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  qtyBtnDisabled: {
    opacity: 0.4,
  },
  qtyBtnAdd: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  qtyText: {
    fontSize: 22,
    fontWeight: '900',
    color: COLORS.textDark,
    marginHorizontal: 20,
    minWidth: 32,
    textAlign: 'center',
  },
  totalContainer: {
    marginLeft: 'auto',
    alignItems: 'flex-end',
  },
  totalLabel: {
    fontSize: 12,
    color: COLORS.textMuted,
    fontWeight: '500',
  },
  totalPrice: {
    fontSize: 22,
    fontWeight: '900',
    color: COLORS.primary,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.surface,
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingBottom: 28,
    borderTopWidth: 1,
    borderTopColor: COLORS.cardBorder,
  },
  addBtn: {
    borderRadius: 16,
  },
});

export default ProductDetailScreen;
