import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  StatusBar,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import EggCard from '../../components/home/EggCard';
import CategoryChip from '../../components/home/CategoryChip';
import FeaturedBanner from '../../components/home/FeaturedBanner';
import Badge from '../../components/common/Badge';
import COLORS from '../../constants/colors';
import { PRODUCTS, CATEGORIES, FEATURED_PRODUCTS } from '../../constants/data';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

const HomeScreen = ({ navigation }) => {
  const { user } = useAuth();
  const { cartCount } = useCart();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const filteredProducts = PRODUCTS.filter(p => {
    const matchCat = activeCategory === 'all' || p.category === activeCategory;
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 800);
  }, []);

  const firstName = user?.name?.split(' ')[0] || 'Friend';

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      {/* Top Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarEmoji}>🧑</Text>
          </View>
          <View>
            <Text style={styles.greeting}>Hello, {firstName}! 👋</Text>
            <Text style={styles.subGreeting}>What eggs shall we get today?</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.cartBtn}
          onPress={() => navigation.navigate('Cart')}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={COLORS.gradientPrimary}
            style={styles.cartBtnGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Ionicons name="cart" size={22} color={COLORS.white} />
          </LinearGradient>
          {cartCount > 0 && (
            <Badge
              count={cartCount}
              size="sm"
              style={styles.cartBadge}
            />
          )}
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COLORS.primary} />}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Ionicons name="search-outline" size={18} color={COLORS.textMuted} style={styles.searchIcon} />
            <TextInput
              placeholder="Search eggs..."
              placeholderTextColor={COLORS.textMuted}
              value={searchQuery}
              onChangeText={setSearchQuery}
              style={styles.searchInput}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                <Ionicons name="close-circle" size={18} color={COLORS.textMuted} />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Farm Banner */}
        {!searchQuery && (
          <View style={styles.farmBanner}>
            <LinearGradient
              colors={['#FFF8F0', '#FDEBD0']}
              style={styles.farmBannerGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <View style={styles.farmBannerContent}>
                <Text style={styles.farmBannerTitle}>Farm Fresh Daily 🌅</Text>
                <Text style={styles.farmBannerText}>
                  Our Rhode Island Red hens lay the freshest eggs every morning!
                </Text>
              </View>
              <Text style={styles.farmBannerEmoji}>🐔</Text>
            </LinearGradient>
          </View>
        )}

        {/* Featured Products Banner */}
        {!searchQuery && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>✨ Featured Picks</Text>
            </View>
            <FeaturedBanner
              products={FEATURED_PRODUCTS}
              onProductPress={(product) => navigation.navigate('ProductDetail', { product })}
            />
          </View>
        )}

        {/* Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Browse by Type</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesRow}
          >
            {CATEGORIES.map((cat) => (
              <CategoryChip
                key={cat.id}
                category={cat}
                isActive={activeCategory === cat.id}
                onPress={() => setActiveCategory(cat.id)}
              />
            ))}
          </ScrollView>
        </View>

        {/* Products Grid */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              {searchQuery ? `Results for "${searchQuery}"` : 'All Eggs'}
            </Text>
            <Text style={styles.sectionCount}>{filteredProducts.length} items</Text>
          </View>

          {filteredProducts.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyEmoji}>🔍</Text>
              <Text style={styles.emptyTitle}>No eggs found</Text>
              <Text style={styles.emptyText}>Try a different search or category</Text>
            </View>
          ) : (
            <View style={styles.productGrid}>
              {filteredProducts.map((product) => (
                <EggCard
                  key={product.id}
                  product={product}
                  onPress={() => navigation.navigate('ProductDetail', { product })}
                />
              ))}
            </View>
          )}
        </View>

        {/* Testimonials section */}
        {!searchQuery && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>💬 What customers say</Text>
            <View style={styles.testimonialCard}>
              <Text style={styles.testimonialQuote}>
                "The freshest eggs I've ever tasted! The yolks are so vibrant and golden.
                My whole family loves them!"
              </Text>
              <View style={styles.testimonialAuthor}>
                <Text style={styles.testimonialAvatar}>👩</Text>
                <View>
                  <Text style={styles.testimonialName}>Maria Santos</Text>
                  <View style={styles.starsRow}>
                    {[1, 2, 3, 4, 5].map(s => (
                      <Ionicons key={s} name="star" size={12} color={COLORS.accent} />
                    ))}
                  </View>
                </View>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.background,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.backgroundAlt,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    borderWidth: 2,
    borderColor: COLORS.cardBorder,
  },
  avatarEmoji: {
    fontSize: 24,
  },
  greeting: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textDark,
  },
  subGreeting: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginTop: 1,
  },
  cartBtn: {
    position: 'relative',
    marginLeft: 12,
  },
  cartBtnGradient: {
    width: 46,
    height: 46,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    zIndex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  searchContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    paddingHorizontal: 14,
    height: 48,
    borderWidth: 1.5,
    borderColor: COLORS.cardBorder,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: COLORS.textDark,
  },
  farmBanner: {
    marginHorizontal: 16,
    marginBottom: 20,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  farmBannerGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  farmBannerContent: {
    flex: 1,
  },
  farmBannerTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.textDark,
    marginBottom: 4,
  },
  farmBannerText: {
    fontSize: 12,
    color: COLORS.textMedium,
    lineHeight: 17,
  },
  farmBannerEmoji: {
    fontSize: 44,
    marginLeft: 10,
  },
  section: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: COLORS.textDark,
    marginBottom: 14,
  },
  sectionCount: {
    fontSize: 13,
    color: COLORS.textMuted,
    fontWeight: '500',
  },
  categoriesRow: {
    paddingRight: 16,
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 48,
  },
  emptyEmoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textDark,
    marginBottom: 6,
  },
  emptyText: {
    fontSize: 14,
    color: COLORS.textMuted,
  },
  testimonialCard: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  testimonialQuote: {
    fontSize: 14,
    color: COLORS.text,
    fontStyle: 'italic',
    lineHeight: 22,
    marginBottom: 14,
  },
  testimonialAuthor: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  testimonialAvatar: {
    fontSize: 28,
    marginRight: 10,
  },
  testimonialName: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textDark,
    marginBottom: 3,
  },
  starsRow: {
    flexDirection: 'row',
  },
});

export default HomeScreen;
