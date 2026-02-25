import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Button from '../../components/common/Button';
import COLORS from '../../constants/colors';
import { STATUS_LABELS } from '../../constants/data';

const OrderSuccessScreen = ({ route, navigation }) => {
  const { order } = route.params;
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const bounceAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    StatusBar.setBarStyle('dark-content');
    Animated.sequence([
      Animated.spring(scaleAnim, { toValue: 1, friction: 4, tension: 80, useNativeDriver: true }),
      Animated.parallel([
        Animated.timing(fadeAnim, { toValue: 1, duration: 400, useNativeDriver: true }),
        Animated.spring(bounceAnim, { toValue: 1, friction: 5, tension: 60, useNativeDriver: true }),
      ]),
    ]).start();
  }, []);

  const status = STATUS_LABELS[order.status] || STATUS_LABELS.confirmed;

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <LinearGradient
        colors={['#FFF8F0', '#FDEBD0']}
        style={styles.container}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        {/* Success Icon */}
        <Animated.View style={[styles.iconContainer, { transform: [{ scale: scaleAnim }] }]}>
          <LinearGradient
            colors={COLORS.gradientPrimary}
            style={styles.iconGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.successEmoji}>🎉</Text>
          </LinearGradient>
          <Animated.Text style={[styles.eggFloat, { transform: [{ scale: bounceAnim }] }]}>
            🥚
          </Animated.Text>
        </Animated.View>

        <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
          <Text style={styles.successTitle}>Order Placed!</Text>
          <Text style={styles.successSubtitle}>
            Thank you for your order! 🐔{'\n'}Your fresh eggs are on their way!
          </Text>

          {/* Order Info Card */}
          <View style={styles.orderCard}>
            <View style={styles.orderIdRow}>
              <Text style={styles.orderIdLabel}>Order ID</Text>
              <Text style={styles.orderId}>{order.id}</Text>
            </View>

            <View style={styles.divider} />

            {/* Items */}
            {order.items.map((item) => (
              <View key={item.id} style={styles.itemRow}>
                <Text style={styles.itemEmoji}>{item.emoji}</Text>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemQtyPrice}>
                  ×{item.quantity} · ₱{(item.price * item.quantity).toFixed(2)}
                </Text>
              </View>
            ))}

            <View style={styles.divider} />

            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total Paid</Text>
              <Text style={styles.totalAmount}>₱{order.total.toFixed(2)}</Text>
            </View>

            <View style={styles.divider} />

            {/* Delivery Info */}
            <View style={styles.deliveryInfo}>
              <Text style={styles.deliveryLabel}>📍 Delivering to</Text>
              <Text style={styles.deliveryValue}>{order.deliveryInfo?.name}</Text>
              <Text style={styles.deliveryAddress}>{order.deliveryInfo?.address}</Text>
            </View>

            <View style={[styles.statusBadge, { backgroundColor: status.bg }]}>
              <View style={[styles.statusDot, { backgroundColor: status.color }]} />
              <Text style={[styles.statusText, { color: status.color }]}>
                Status: {status.label}
              </Text>
            </View>
          </View>

          {/* Farm Note */}
          <View style={styles.farmNote}>
            <Text style={styles.farmNoteText}>
              🌾 Our Rhode Island Red hens are already busy!{'\n'}
              Fresh eggs will be packed and prepared with care!
            </Text>
          </View>
        </Animated.View>

        {/* Action Buttons */}
        <Animated.View style={[styles.actions, { opacity: fadeAnim }]}>
          <Button
            title="View My Orders"
            onPress={() => navigation.navigate('MainTabs', { screen: 'Orders' })}
            size="lg"
            style={styles.actionBtn}
          />
          <Button
            title="Continue Shopping"
            onPress={() => navigation.navigate('MainTabs', { screen: 'Home' })}
            variant="outline"
            size="lg"
            style={{ marginTop: 12 }}
          />
        </Animated.View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1 },
  container: { flex: 1, paddingHorizontal: 16, paddingTop: 20 },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    position: 'relative',
  },
  iconGradient: {
    width: 100, height: 100, borderRadius: 50,
    alignItems: 'center', justifyContent: 'center',
  },
  successEmoji: { fontSize: 52 },
  eggFloat: {
    position: 'absolute',
    fontSize: 32,
    bottom: -8,
    right: -8,
  },
  content: { flex: 1 },
  successTitle: {
    fontSize: 30, fontWeight: '900', color: COLORS.textDark,
    textAlign: 'center', marginBottom: 8,
  },
  successSubtitle: {
    fontSize: 14, color: COLORS.textMedium, textAlign: 'center',
    lineHeight: 22, marginBottom: 24,
  },
  orderCard: {
    backgroundColor: COLORS.surface, borderRadius: 20,
    padding: 18, borderWidth: 1, borderColor: COLORS.cardBorder,
    marginBottom: 16,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 4,
  },
  orderIdRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  orderIdLabel: { fontSize: 13, color: COLORS.textMuted, fontWeight: '500' },
  orderId: { fontSize: 13, fontWeight: '800', color: COLORS.primary },
  divider: { height: 1, backgroundColor: COLORS.backgroundAlt, marginVertical: 10 },
  itemRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  itemEmoji: { fontSize: 18, marginRight: 8 },
  itemName: { flex: 1, fontSize: 13, fontWeight: '600', color: COLORS.text },
  itemQtyPrice: { fontSize: 12, color: COLORS.textMedium },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  totalLabel: { fontSize: 14, fontWeight: '700', color: COLORS.textDark },
  totalAmount: { fontSize: 20, fontWeight: '900', color: COLORS.primary },
  deliveryInfo: { marginTop: 4 },
  deliveryLabel: { fontSize: 12, color: COLORS.textMuted, marginBottom: 4, fontWeight: '500' },
  deliveryValue: { fontSize: 14, fontWeight: '700', color: COLORS.textDark },
  deliveryAddress: { fontSize: 12, color: COLORS.textMedium, marginTop: 2, lineHeight: 18 },
  statusBadge: {
    flexDirection: 'row', alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20, marginTop: 12,
  },
  statusDot: { width: 6, height: 6, borderRadius: 3, marginRight: 5 },
  statusText: { fontSize: 11, fontWeight: '700' },
  farmNote: {
    backgroundColor: COLORS.successLight,
    borderRadius: 14, padding: 14, marginBottom: 16,
    borderWidth: 1, borderColor: COLORS.success + '30',
  },
  farmNoteText: {
    fontSize: 13, color: COLORS.textMedium,
    textAlign: 'center', lineHeight: 20,
  },
  actions: { paddingBottom: 8 },
  actionBtn: { borderRadius: 14 },
});

export default OrderSuccessScreen;
