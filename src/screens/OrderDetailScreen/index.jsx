import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import COLORS from '../../constants/colors';
import { STATUS_LABELS } from '../../constants/data';

const OrderDetailScreen = ({ route, navigation }) => {
  const { order } = route.params;
  const status = STATUS_LABELS[order.status] || STATUS_LABELS.confirmed;
  const date = new Date(order.createdAt).toLocaleString('en-PH', {
    month: 'long', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit',
  });

  const DELIVERY_FEE = 50;
  const subtotal = order.total - DELIVERY_FEE;

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color={COLORS.textDark} />
        </TouchableOpacity>
        <Text style={styles.topBarTitle}>Order Details</Text>
        <View style={{ width: 42 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {/* Status Banner */}
        <LinearGradient colors={COLORS.gradientPrimary} style={styles.statusBanner}>
          <View style={styles.statusRow}>
            <View style={[styles.statusBadge, { backgroundColor: status.bg }]}>
              <View style={[styles.statusDot, { backgroundColor: status.color }]} />
              <Text style={[styles.statusText, { color: status.color }]}>{status.label}</Text>
            </View>
            <Text style={styles.orderDate}>{date}</Text>
          </View>
          <Text style={styles.orderId}>{order.id}</Text>
        </LinearGradient>

        {/* Items */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Items Ordered</Text>
          {order.items.map(item => (
            <View key={item.id} style={styles.itemCard}>
              <View style={styles.itemEmoji}>
                <Text style={styles.itemEmojiText}>{item.emoji}</Text>
              </View>
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemUnit}>{item.unit}</Text>
                <Text style={styles.itemEggs}>🥚 {item.eggs * item.quantity} eggs</Text>
              </View>
              <View style={styles.itemPricing}>
                <Text style={styles.itemQty}>×{item.quantity}</Text>
                <Text style={styles.itemTotal}>₱{(item.price * item.quantity).toFixed(2)}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Delivery Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Delivery Details</Text>
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Ionicons name="person-outline" size={16} color={COLORS.primary} />
              <Text style={styles.infoLabel}>Name</Text>
              <Text style={styles.infoValue}>{order.deliveryInfo?.name}</Text>
            </View>
            <View style={styles.infoDivider} />
            <View style={styles.infoRow}>
              <Ionicons name="call-outline" size={16} color={COLORS.primary} />
              <Text style={styles.infoLabel}>Phone</Text>
              <Text style={styles.infoValue}>{order.deliveryInfo?.phone}</Text>
            </View>
            <View style={styles.infoDivider} />
            <View style={styles.infoRow}>
              <Ionicons name="location-outline" size={16} color={COLORS.primary} />
              <Text style={styles.infoLabel}>Address</Text>
              <Text style={[styles.infoValue, { flex: 2 }]}>{order.deliveryInfo?.address}</Text>
            </View>
            {order.deliveryInfo?.notes ? (
              <>
                <View style={styles.infoDivider} />
                <View style={styles.infoRow}>
                  <Ionicons name="document-text-outline" size={16} color={COLORS.primary} />
                  <Text style={styles.infoLabel}>Notes</Text>
                  <Text style={[styles.infoValue, { flex: 2 }]}>{order.deliveryInfo.notes}</Text>
                </View>
              </>
            ) : null}
          </View>
        </View>

        {/* Payment Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Summary</Text>
          <View style={styles.summaryCard}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>₱{subtotal.toFixed(2)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Delivery Fee</Text>
              <Text style={styles.summaryValue}>₱{DELIVERY_FEE.toFixed(2)}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.summaryRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>₱{order.total.toFixed(2)}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },
  topBar: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingVertical: 12,
  },
  backBtn: {
    width: 42, height: 42, borderRadius: 13,
    backgroundColor: COLORS.surface, alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: COLORS.cardBorder,
  },
  topBarTitle: { fontSize: 17, fontWeight: '800', color: COLORS.textDark },
  scroll: { paddingBottom: 32 },
  statusBanner: {
    marginHorizontal: 16, borderRadius: 18, padding: 18, marginBottom: 20,
  },
  statusRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  statusBadge: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20,
  },
  statusDot: { width: 6, height: 6, borderRadius: 3, marginRight: 5 },
  statusText: { fontSize: 11, fontWeight: '700' },
  orderDate: { fontSize: 11, color: 'rgba(255,255,255,0.8)' },
  orderId: { fontSize: 18, fontWeight: '900', color: COLORS.white },
  section: { paddingHorizontal: 16, marginBottom: 20 },
  sectionTitle: { fontSize: 16, fontWeight: '800', color: COLORS.textDark, marginBottom: 12 },
  itemCard: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: COLORS.card, borderRadius: 14, padding: 12, marginBottom: 10,
    borderWidth: 1, borderColor: COLORS.cardBorder,
  },
  itemEmoji: {
    width: 50, height: 50, borderRadius: 12,
    backgroundColor: COLORS.backgroundAlt, alignItems: 'center', justifyContent: 'center', marginRight: 12,
  },
  itemEmojiText: { fontSize: 26 },
  itemInfo: { flex: 1 },
  itemName: { fontSize: 13, fontWeight: '700', color: COLORS.textDark },
  itemUnit: { fontSize: 11, color: COLORS.textMuted, marginTop: 2 },
  itemEggs: { fontSize: 11, color: COLORS.textMedium, marginTop: 3 },
  itemPricing: { alignItems: 'flex-end' },
  itemQty: { fontSize: 12, color: COLORS.textMuted },
  itemTotal: { fontSize: 15, fontWeight: '800', color: COLORS.primary },
  infoCard: {
    backgroundColor: COLORS.card, borderRadius: 16, padding: 16,
    borderWidth: 1, borderColor: COLORS.cardBorder,
  },
  infoRow: { flexDirection: 'row', alignItems: 'flex-start', paddingVertical: 4 },
  infoLabel: { fontSize: 12, color: COLORS.textMuted, fontWeight: '500', flex: 1, marginLeft: 8 },
  infoValue: { fontSize: 13, fontWeight: '600', color: COLORS.textDark, flex: 2, textAlign: 'right' },
  infoDivider: { height: 1, backgroundColor: COLORS.backgroundAlt, marginVertical: 6 },
  summaryCard: {
    backgroundColor: COLORS.card, borderRadius: 16, padding: 16,
    borderWidth: 1, borderColor: COLORS.cardBorder,
  },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  summaryLabel: { fontSize: 13, color: COLORS.textMedium },
  summaryValue: { fontSize: 13, fontWeight: '600', color: COLORS.textDark },
  divider: { height: 1, backgroundColor: COLORS.cardBorder, marginBottom: 10 },
  totalLabel: { fontSize: 15, fontWeight: '800', color: COLORS.textDark },
  totalValue: { fontSize: 20, fontWeight: '900', color: COLORS.primary },
});

export default OrderDetailScreen;
