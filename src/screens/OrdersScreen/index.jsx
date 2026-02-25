import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import COLORS from '../../constants/colors';
import { STATUS_LABELS } from '../../constants/data';
import { useCart } from '../../context/CartContext';

const OrderCard = ({ order, onPress }) => {
  const status = STATUS_LABELS[order.status] || STATUS_LABELS.confirmed;
  const date = new Date(order.createdAt);
  const dateStr = date.toLocaleDateString('en-PH', { month: 'short', day: 'numeric', year: 'numeric' });
  const timeStr = date.toLocaleTimeString('en-PH', { hour: '2-digit', minute: '2-digit' });

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.88}>
      {/* Card Header */}
      <View style={styles.cardHeader}>
        <View>
          <Text style={styles.orderId}>{order.id}</Text>
          <Text style={styles.orderDate}>{dateStr} • {timeStr}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: status.bg }]}>
          <View style={[styles.statusDot, { backgroundColor: status.color }]} />
          <Text style={[styles.statusText, { color: status.color }]}>{status.label}</Text>
        </View>
      </View>

      {/* Items preview */}
      <View style={styles.itemsPreview}>
        {order.items.slice(0, 3).map((item, i) => (
          <View key={item.id} style={styles.previewItem}>
            <Text style={styles.previewEmoji}>{item.emoji}</Text>
            <Text style={styles.previewName} numberOfLines={1}>{item.name}</Text>
            <Text style={styles.previewQty}>×{item.quantity}</Text>
          </View>
        ))}
        {order.items.length > 3 && (
          <Text style={styles.moreItems}>+{order.items.length - 3} more</Text>
        )}
      </View>

      {/* Footer */}
      <View style={styles.cardFooter}>
        <View style={styles.footerLeft}>
          <Ionicons name="location-outline" size={13} color={COLORS.textMuted} />
          <Text style={styles.deliveryAddress} numberOfLines={1}>
            {order.deliveryInfo?.address || 'No address provided'}
          </Text>
        </View>
        <Text style={styles.orderTotal}>₱{order.total.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );
};

const OrdersScreen = ({ navigation }) => {
  const { orders } = useCart();

  if (orders.length === 0) {
    return (
      <SafeAreaView style={styles.safe} edges={['top']}>
        <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
        <View style={styles.headerBar}>
          <Text style={styles.screenTitle}>My Orders</Text>
        </View>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyEmoji}>📦</Text>
          <Text style={styles.emptyTitle}>No orders yet</Text>
          <Text style={styles.emptyText}>
            Your egg orders will appear here.{'\n'}Start shopping and treat yourself!
          </Text>
          <TouchableOpacity
            style={styles.shopNowBtn}
            onPress={() => navigation.navigate('Home')}
            activeOpacity={0.85}
          >
            <LinearGradient
              colors={COLORS.gradientPrimary}
              style={styles.shopNowGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.shopNowText}>Shop Now</Text>
              <Ionicons name="arrow-forward" size={16} color={COLORS.white} style={{ marginLeft: 6 }} />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      <View style={styles.headerBar}>
        <Text style={styles.screenTitle}>My Orders</Text>
        <Text style={styles.orderCount}>{orders.length} order{orders.length !== 1 ? 's' : ''}</Text>
      </View>

      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <OrderCard
            order={item}
            onPress={() => navigation.navigate('OrderDetail', { order: item })}
          />
        )}
        ListHeaderComponent={() => (
          <View style={styles.listHeader}>
            <LinearGradient
              colors={['#FFF8F0', '#FDEBD0']}
              style={styles.statsRow}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <View style={styles.statItem}>
                <Text style={styles.statEmoji}>📦</Text>
                <Text style={styles.statValue}>{orders.length}</Text>
                <Text style={styles.statLabel}>Total Orders</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statEmoji}>🥚</Text>
                <Text style={styles.statValue}>
                  {orders.reduce((t, o) => t + o.items.reduce((s, i) => s + i.eggs * i.quantity, 0), 0)}
                </Text>
                <Text style={styles.statLabel}>Eggs Ordered</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statEmoji}>💰</Text>
                <Text style={styles.statValue}>
                  ₱{orders.reduce((t, o) => t + o.total, 0).toFixed(0)}
                </Text>
                <Text style={styles.statLabel}>Total Spent</Text>
              </View>
            </LinearGradient>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  screenTitle: { fontSize: 24, fontWeight: '900', color: COLORS.textDark },
  orderCount: { fontSize: 13, color: COLORS.textMuted, fontWeight: '600' },
  listContent: { paddingHorizontal: 16, paddingBottom: 24 },
  listHeader: { marginBottom: 16 },
  statsRow: {
    flexDirection: 'row',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  statItem: { flex: 1, alignItems: 'center' },
  statEmoji: { fontSize: 20, marginBottom: 4 },
  statValue: { fontSize: 18, fontWeight: '900', color: COLORS.primary },
  statLabel: { fontSize: 10, color: COLORS.textMuted, fontWeight: '500', marginTop: 2, textAlign: 'center' },
  statDivider: { width: 1, backgroundColor: COLORS.cardBorder, marginHorizontal: 8 },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  orderId: { fontSize: 14, fontWeight: '800', color: COLORS.textDark },
  orderDate: { fontSize: 11, color: COLORS.textMuted, marginTop: 2 },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  statusDot: { width: 6, height: 6, borderRadius: 3, marginRight: 5 },
  statusText: { fontSize: 11, fontWeight: '700' },
  itemsPreview: { marginBottom: 12 },
  previewItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.cardBorder,
  },
  previewEmoji: { fontSize: 16, marginRight: 8 },
  previewName: { flex: 1, fontSize: 13, color: COLORS.text, fontWeight: '500' },
  previewQty: { fontSize: 12, color: COLORS.textMuted, fontWeight: '600' },
  moreItems: { fontSize: 12, color: COLORS.primary, fontWeight: '600', marginTop: 4 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 },
  footerLeft: { flexDirection: 'row', alignItems: 'center', flex: 1, marginRight: 8 },
  deliveryAddress: { fontSize: 11, color: COLORS.textMuted, marginLeft: 4, flex: 1 },
  orderTotal: { fontSize: 16, fontWeight: '900', color: COLORS.primary },
  emptyContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 32 },
  emptyEmoji: { fontSize: 80, marginBottom: 16 },
  emptyTitle: { fontSize: 22, fontWeight: '800', color: COLORS.textDark, marginBottom: 8 },
  emptyText: { fontSize: 14, color: COLORS.textMuted, textAlign: 'center', lineHeight: 22, marginBottom: 24 },
  shopNowBtn: { borderRadius: 16, overflow: 'hidden' },
  shopNowGradient: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 28, paddingVertical: 14,
  },
  shopNowText: { color: COLORS.white, fontSize: 15, fontWeight: '700' },
});

export default OrdersScreen;
