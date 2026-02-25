import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import COLORS from '../../../constants/colors';
import { useCart } from '../../../context/CartContext';

const EggCard = ({ product, onPress }) => {
  const { addToCart, isInCart, getItemQuantity } = useCart();
  const inCart = isInCart(product.id);
  const qty = getItemQuantity(product.id);

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.9}
    >
      {/* Badge */}
      {product.badge && (
        <View style={[styles.badge, { backgroundColor: product.badgeColor }]}>
          <Text style={styles.badgeText}>{product.badge}</Text>
        </View>
      )}

      {/* Egg Illustration */}
      <View style={styles.imageContainer}>
        <Text style={styles.emoji}>{product.emoji}</Text>
      </View>

      {/* Info */}
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={2}>{product.name}</Text>

        {/* Rating */}
        <View style={styles.ratingRow}>
          <Ionicons name="star" size={12} color={COLORS.accent} />
          <Text style={styles.rating}>{product.rating}</Text>
          <Text style={styles.reviewCount}>({product.reviewCount})</Text>
        </View>

        {/* Egg count */}
        <View style={styles.eggCountRow}>
          <Text style={styles.eggEmoji}>🥚</Text>
          <Text style={styles.eggCount}>{product.eggs} eggs</Text>
        </View>
      </View>

      {/* Price & Cart */}
      <View style={styles.footer}>
        <View>
          <Text style={styles.price}>₱{product.price.toFixed(2)}</Text>
          <Text style={styles.unit}>{product.unit}</Text>
        </View>

        {inCart ? (
          <View style={styles.quantityBadge}>
            <Ionicons name="checkmark-circle" size={16} color={COLORS.success} />
            <Text style={styles.quantityText}>{qty}</Text>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => addToCart(product)}
            activeOpacity={0.8}
          >
            <Ionicons name="add" size={20} color={COLORS.white} />
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 18,
    padding: 14,
    width: '48%',
    marginBottom: 14,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 3,
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: 10,
    right: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
    zIndex: 1,
  },
  badgeText: {
    color: COLORS.white,
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
    backgroundColor: COLORS.backgroundAlt,
    borderRadius: 14,
    marginBottom: 10,
  },
  emoji: {
    fontSize: 44,
  },
  info: {
    marginBottom: 10,
  },
  name: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textDark,
    marginBottom: 4,
    lineHeight: 19,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  rating: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textDark,
    marginLeft: 3,
  },
  reviewCount: {
    fontSize: 11,
    color: COLORS.textMuted,
    marginLeft: 2,
  },
  eggCountRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eggEmoji: {
    fontSize: 11,
  },
  eggCount: {
    fontSize: 11,
    color: COLORS.textMedium,
    marginLeft: 3,
    fontWeight: '500',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  price: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.primary,
  },
  unit: {
    fontSize: 10,
    color: COLORS.textMuted,
    marginTop: 1,
  },
  addButton: {
    backgroundColor: COLORS.primary,
    width: 34,
    height: 34,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.successLight,
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 10,
  },
  quantityText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.success,
    marginLeft: 3,
  },
});

export default EggCard;
