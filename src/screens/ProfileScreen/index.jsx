import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import COLORS from '../../constants/colors';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

const MenuItem = ({ icon, label, value, onPress, color, rightElement }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress} activeOpacity={0.8}>
    <View style={[styles.menuIcon, { backgroundColor: color + '20' }]}>
      <Ionicons name={icon} size={20} color={color} />
    </View>
    <View style={styles.menuContent}>
      <Text style={styles.menuLabel}>{label}</Text>
      {value && <Text style={styles.menuValue}>{value}</Text>}
    </View>
    {rightElement || <Ionicons name="chevron-forward" size={18} color={COLORS.textMuted} />}
  </TouchableOpacity>
);

const ProfileScreen = ({ navigation }) => {
  const { user, logout } = useAuth();
  const { orders, cartCount } = useCart();

  const joinedDate = user?.joinedDate
    ? new Date(user.joinedDate).toLocaleDateString('en-PH', { month: 'long', year: 'numeric' })
    : '';

  const handleLogout = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out of Eggcelent?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: logout,
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {/* Profile Hero */}
        <LinearGradient
          colors={COLORS.gradientPrimary}
          style={styles.hero}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.heroDecor1} />
          <View style={styles.heroDecor2} />
          <View style={styles.avatarWrapper}>
            <Text style={styles.avatar}>{user?.avatar || '🧑'}</Text>
          </View>
          <Text style={styles.userName}>{user?.name || 'Egg Lover'}</Text>
          <Text style={styles.userEmail}>{user?.email}</Text>
          {joinedDate && (
            <View style={styles.joinedPill}>
              <Ionicons name="leaf-outline" size={12} color="rgba(255,255,255,0.8)" />
              <Text style={styles.joinedText}>Member since {joinedDate}</Text>
            </View>
          )}
        </LinearGradient>

        {/* Stats Row */}
        <View style={styles.statsCard}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{orders.length}</Text>
            <Text style={styles.statLabel}>Orders</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>
              {orders.reduce((t, o) => t + o.items.reduce((s, i) => s + i.eggs * i.quantity, 0), 0)}
            </Text>
            <Text style={styles.statLabel}>Eggs Bought</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{cartCount}</Text>
            <Text style={styles.statLabel}>In Cart</Text>
          </View>
        </View>

        {/* About the Farm */}
        <View style={styles.farmCard}>
          <View style={styles.farmCardHeader}>
            <Text style={styles.farmEmoji}>🐔</Text>
            <View style={styles.farmCardTitleArea}>
              <Text style={styles.farmCardTitle}>About Eggcelent Farm</Text>
              <Text style={styles.farmCardSubtitle}>Rhode Island Red Specialists</Text>
            </View>
          </View>
          <Text style={styles.farmCardText}>
            We are a family-run farm specializing in Rhode Island Red chickens — one of the finest egg-laying breeds known for their rich, golden-yolked eggs. Our hens are raised free-range with love, clean feed, and no hormones. Every egg is fresh, natural, and full of goodness!
          </Text>
          <View style={styles.farmFeatures}>
            {['🌾 Free-range hens', '🚫 No hormones', '🥚 Daily collection', '❤️ Family farm'].map((f, i) => (
              <View key={i} style={styles.farmFeatureChip}>
                <Text style={styles.farmFeatureText}>{f}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Account Menu */}
        <View style={styles.menuSection}>
          <Text style={styles.menuSectionTitle}>Account</Text>
          <View style={styles.menuCard}>
            <MenuItem
              icon="person-outline"
              label="Full Name"
              value={user?.name}
              color={COLORS.primary}
              onPress={() => {}}
            />
            <View style={styles.menuDivider} />
            <MenuItem
              icon="mail-outline"
              label="Email"
              value={user?.email}
              color={COLORS.secondary}
              onPress={() => {}}
            />
            <View style={styles.menuDivider} />
            <MenuItem
              icon="call-outline"
              label="Phone"
              value={user?.phone || 'Not set'}
              color={COLORS.success}
              onPress={() => {}}
            />
            <View style={styles.menuDivider} />
            <MenuItem
              icon="location-outline"
              label="Default Address"
              value={user?.address || 'Not set'}
              color={COLORS.info}
              onPress={() => {}}
            />
          </View>
        </View>

        {/* Orders Menu */}
        <View style={styles.menuSection}>
          <Text style={styles.menuSectionTitle}>Orders</Text>
          <View style={styles.menuCard}>
            <MenuItem
              icon="receipt-outline"
              label="My Orders"
              value={`${orders.length} order${orders.length !== 1 ? 's' : ''}`}
              color={COLORS.primary}
              onPress={() => navigation.navigate('Orders')}
            />
            <View style={styles.menuDivider} />
            <MenuItem
              icon="cart-outline"
              label="My Cart"
              value={cartCount > 0 ? `${cartCount} item${cartCount !== 1 ? 's' : ''}` : 'Empty'}
              color={COLORS.secondary}
              onPress={() => navigation.navigate('Cart')}
            />
          </View>
        </View>

        {/* Support */}
        <View style={styles.menuSection}>
          <Text style={styles.menuSectionTitle}>Support</Text>
          <View style={styles.menuCard}>
            <MenuItem
              icon="help-circle-outline"
              label="FAQs"
              color={COLORS.info}
              onPress={() => Alert.alert('FAQs', 'Frequently asked questions coming soon!')}
            />
            <View style={styles.menuDivider} />
            <MenuItem
              icon="chatbubble-outline"
              label="Contact Us"
              value="eggcelent@farm.com"
              color={COLORS.success}
              onPress={() => Alert.alert('Contact', 'Email us at: eggcelent@farm.com')}
            />
          </View>
        </View>

        {/* Sign Out */}
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout} activeOpacity={0.85}>
          <Ionicons name="log-out-outline" size={20} color={COLORS.error} />
          <Text style={styles.logoutText}>Sign Out</Text>
        </TouchableOpacity>

        {/* App Info */}
        <View style={styles.appInfo}>
          <Text style={styles.appInfoEmoji}>🥚</Text>
          <Text style={styles.appInfoName}>Eggcelent</Text>
          <Text style={styles.appInfoVersion}>Version 1.0.0</Text>
          <Text style={styles.appInfoTagline}>Farm fresh eggs, delivered with love 🐔</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },
  scroll: { paddingBottom: 32 },
  hero: {
    alignItems: 'center',
    paddingTop: 36,
    paddingBottom: 44,
    overflow: 'hidden',
    position: 'relative',
  },
  heroDecor1: {
    position: 'absolute', width: 200, height: 200, borderRadius: 100,
    backgroundColor: 'rgba(255,255,255,0.07)', top: -60, right: -40,
  },
  heroDecor2: {
    position: 'absolute', width: 120, height: 120, borderRadius: 60,
    backgroundColor: 'rgba(255,255,255,0.07)', bottom: -20, left: -20,
  },
  avatarWrapper: {
    width: 90, height: 90, borderRadius: 45,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center', justifyContent: 'center',
    marginBottom: 12,
    borderWidth: 3, borderColor: 'rgba(255,255,255,0.4)',
  },
  avatar: { fontSize: 50 },
  userName: { fontSize: 22, fontWeight: '900', color: COLORS.white, marginBottom: 4 },
  userEmail: { fontSize: 13, color: 'rgba(255,255,255,0.8)', marginBottom: 10 },
  joinedPill: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 12, paddingVertical: 5, borderRadius: 20,
  },
  joinedText: { fontSize: 11, color: 'rgba(255,255,255,0.85)', marginLeft: 5, fontWeight: '500' },
  statsCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    marginHorizontal: 16,
    marginTop: -20,
    borderRadius: 20,
    padding: 16,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 16,
    elevation: 6,
    marginBottom: 20,
  },
  statItem: { flex: 1, alignItems: 'center' },
  statValue: { fontSize: 22, fontWeight: '900', color: COLORS.primary },
  statLabel: { fontSize: 11, color: COLORS.textMuted, fontWeight: '500', marginTop: 2 },
  statDivider: { width: 1, backgroundColor: COLORS.cardBorder },
  farmCard: {
    backgroundColor: COLORS.card,
    marginHorizontal: 16,
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    marginBottom: 20,
  },
  farmCardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  farmEmoji: { fontSize: 36, marginRight: 12 },
  farmCardTitleArea: { flex: 1 },
  farmCardTitle: { fontSize: 15, fontWeight: '800', color: COLORS.textDark },
  farmCardSubtitle: { fontSize: 12, color: COLORS.primary, fontWeight: '600', marginTop: 2 },
  farmCardText: { fontSize: 13, color: COLORS.text, lineHeight: 20, marginBottom: 14 },
  farmFeatures: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  farmFeatureChip: {
    backgroundColor: COLORS.backgroundAlt,
    paddingHorizontal: 10, paddingVertical: 5,
    borderRadius: 20, borderWidth: 1, borderColor: COLORS.cardBorder,
  },
  farmFeatureText: { fontSize: 11, color: COLORS.textMedium, fontWeight: '600' },
  menuSection: { marginHorizontal: 16, marginBottom: 16 },
  menuSectionTitle: { fontSize: 14, fontWeight: '700', color: COLORS.textMuted, marginBottom: 8, letterSpacing: 0.5, textTransform: 'uppercase' },
  menuCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
  },
  menuIcon: {
    width: 38, height: 38, borderRadius: 12,
    alignItems: 'center', justifyContent: 'center',
    marginRight: 12,
  },
  menuContent: { flex: 1 },
  menuLabel: { fontSize: 14, fontWeight: '600', color: COLORS.textDark },
  menuValue: { fontSize: 12, color: COLORS.textMuted, marginTop: 1 },
  menuDivider: { height: 1, backgroundColor: COLORS.backgroundAlt, marginLeft: 62 },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: COLORS.errorLight,
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.error + '30',
  },
  logoutText: { fontSize: 15, fontWeight: '700', color: COLORS.error, marginLeft: 8 },
  appInfo: { alignItems: 'center', paddingVertical: 16 },
  appInfoEmoji: { fontSize: 28, marginBottom: 4 },
  appInfoName: { fontSize: 16, fontWeight: '800', color: COLORS.textDark },
  appInfoVersion: { fontSize: 12, color: COLORS.textMuted, marginTop: 2 },
  appInfoTagline: { fontSize: 12, color: COLORS.textMuted, fontStyle: 'italic', marginTop: 4 },
});

export default ProfileScreen;
