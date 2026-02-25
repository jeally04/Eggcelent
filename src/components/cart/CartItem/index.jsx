import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import COLORS from '../../../constants/colors';
import { useCart } from '../../../context/CartContext';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <View style={styles.container}>
      {/* Egg Emoji */}
      <View style={styles.emojiBox}>
        <Text style={styles.emoji}>{item.emoji}</Text>
      </View>

      {/* Details */}
      <View style={styles.details}>
        <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.unit}>{item.unit}</Text>
        <Text style={styles.price}>₱{(item.price * item.quantity).toFixed(2)}</Text>
      </View>

      {/* Quantity Controls */}
      <View style={styles.controls}>
        <TouchableOpacity
          style={styles.controlBtn}
          onPress={() => updateQuantity(item.id, item.quantity - 1)}
          activeOpacity={0.8}
        >
          <Ionicons
            name={item.quantity === 1 ? 'trash-outline' : 'remove'}
            size={16}
            color={item.quantity === 1 ? COLORS.error : COLORS.textDark}
          />
        </TouchableOpacity>
        <Text style={styles.quantity}>{item.quantity}</Text>
        <TouchableOpacity
          style={[styles.controlBtn, styles.addBtn]}
          onPress={() => updateQuantity(item.id, item.quantity + 1)}
          activeOpacity={0.8}
        >
          <Ionicons name="add" size={16} color={COLORS.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 2,
  },
  emojiBox: {
    width: 56,
    height: 56,
    borderRadius: 14,
    backgroundColor: COLORS.backgroundAlt,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  emoji: {
    fontSize: 30,
  },
  details: {
    flex: 1,
    marginRight: 10,
  },
  name: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textDark,
    marginBottom: 2,
  },
  unit: {
    fontSize: 11,
    color: COLORS.textMuted,
    marginBottom: 4,
  },
  price: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.primary,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  controlBtn: {
    width: 30,
    height: 30,
    borderRadius: 9,
    backgroundColor: COLORS.backgroundAlt,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  addBtn: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  quantity: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.textDark,
    marginHorizontal: 12,
    minWidth: 20,
    textAlign: 'center',
  },
});

export default CartItem;
