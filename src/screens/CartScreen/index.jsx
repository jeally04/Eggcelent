import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  StatusBar,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import CartItem from '../../components/cart/CartItem';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import COLORS from '../../constants/colors';
import { useCart } from '../../context/CartContext';

const CartScreen = ({ navigation }) => {
  const { cartItems, cartTotal, cartCount, clearCart, placeOrder } = useCart();
  const [step, setStep] = useState(1); // 1 = cart, 2 = delivery form
  const [loading, setLoading] = useState(false);
  const [delivery, setDelivery] = useState({
    name: '',
    phone: '',
    address: '',
    notes: '',
  });
  const [errors, setErrors] = useState({});

  const DELIVERY_FEE = cartTotal > 0 ? 50 : 0;
  const TOTAL = cartTotal + DELIVERY_FEE;

  const validateDelivery = () => {
    const e = {};
    if (!delivery.name.trim()) e.name = 'Name is required';
    if (!delivery.phone.trim()) e.phone = 'Phone number is required';
    if (!delivery.address.trim()) e.address = 'Delivery address is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handlePlaceOrder = async () => {
    if (!validateDelivery()) return;
    setLoading(true);
    try {
      const order = await placeOrder(delivery);
      navigation.navigate('OrderSuccess', { order });
    } catch (e) {
      Alert.alert('Error', 'Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClearCart = () => {
    Alert.alert(
      'Clear Cart',
      'Remove all items from your cart?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Clear', style: 'destructive', onPress: clearCart },
      ]
    );
  };

  if (cartItems.length === 0) {
    return (
      <SafeAreaView style={styles.safe} edges={['top']}>
        <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={22} color={COLORS.textDark} />
          </TouchableOpacity>
          <Text style={styles.topBarTitle}>My Cart</Text>
          <View style={{ width: 42 }} />
        </View>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyEmoji}>🛒</Text>
          <Text style={styles.emptyTitle}>Your cart is empty</Text>
          <Text style={styles.emptyText}>
            Looks like you haven't added any eggs yet!{'\n'}Time to shop!
          </Text>
          <Button
            title="Browse Eggs"
            onPress={() => navigation.navigate('Home')}
            style={styles.browseBtn}
            fullWidth={false}
            size="lg"
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => step === 1 ? navigation.goBack() : setStep(1)}
          activeOpacity={0.8}
        >
          <Ionicons name="arrow-back" size={22} color={COLORS.textDark} />
        </TouchableOpacity>
        <Text style={styles.topBarTitle}>
          {step === 1 ? `Cart (${cartCount})` : 'Delivery Details'}
        </Text>
        {step === 1 ? (
          <TouchableOpacity style={styles.clearBtn} onPress={handleClearCart} activeOpacity={0.8}>
            <Ionicons name="trash-outline" size={18} color={COLORS.error} />
          </TouchableOpacity>
        ) : (
          <View style={{ width: 42 }} />
        )}
      </View>

      {/* Step Indicator */}
      <View style={styles.stepRow}>
        {[{ label: 'Cart', icon: 'cart' }, { label: 'Delivery', icon: 'location' }, { label: 'Done', icon: 'checkmark-circle' }].map((s, i) => (
          <React.Fragment key={i}>
            <View style={styles.stepItem}>
              <View style={[styles.stepCircle, i < step && styles.stepCircleActive, i === step - 1 && styles.stepCircleCurrent]}>
                <Ionicons
                  name={i < step - 1 ? 'checkmark' : s.icon}
                  size={14}
                  color={i <= step - 1 ? COLORS.white : COLORS.textMuted}
                />
              </View>
              <Text style={[styles.stepLabel, i <= step - 1 && styles.stepLabelActive]}>{s.label}</Text>
            </View>
            {i < 2 && <View style={[styles.stepLine, i < step - 1 && styles.stepLineActive]} />}
          </React.Fragment>
        ))}
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {step === 1 ? (
          <>
            {/* Cart Items */}
            <View style={styles.section}>
              {cartItems.map(item => (
                <CartItem key={item.id} item={item} />
              ))}
            </View>

            {/* Farm Promise */}
            <View style={styles.farmPromise}>
              <Text style={styles.farmPromiseEmoji}>🌾</Text>
              <Text style={styles.farmPromiseText}>
                All eggs are freshly collected from our Rhode Island Red flock and packed with care!
              </Text>
            </View>
          </>
        ) : (
          <View style={styles.section}>
            <Text style={styles.deliverySectionTitle}>Where should we deliver? 📍</Text>
            <Input
              label="Recipient Name"
              placeholder="Full name"
              value={delivery.name}
              onChangeText={(v) => setDelivery(p => ({ ...p, name: v }))}
              autoCapitalize="words"
              error={errors.name}
              icon={<Ionicons name="person-outline" size={20} color={COLORS.textLight} />}
            />
            <Input
              label="Phone Number"
              placeholder="+63 900 000 0000"
              value={delivery.phone}
              onChangeText={(v) => setDelivery(p => ({ ...p, phone: v }))}
              keyboardType="phone-pad"
              error={errors.phone}
              icon={<Ionicons name="call-outline" size={20} color={COLORS.textLight} />}
            />
            <Input
              label="Delivery Address"
              placeholder="House/Unit No., Street, Barangay, City"
              value={delivery.address}
              onChangeText={(v) => setDelivery(p => ({ ...p, address: v }))}
              autoCapitalize="words"
              error={errors.address}
              icon={<Ionicons name="location-outline" size={20} color={COLORS.textLight} />}
              multiline
              numberOfLines={3}
            />
            <Input
              label="Delivery Notes (Optional)"
              placeholder="e.g. Leave at gate, call upon arrival..."
              value={delivery.notes}
              onChangeText={(v) => setDelivery(p => ({ ...p, notes: v }))}
              autoCapitalize="sentences"
              icon={<Ionicons name="document-text-outline" size={20} color={COLORS.textLight} />}
              multiline
              numberOfLines={2}
            />
          </View>
        )}

        {/* Order Summary */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Order Summary</Text>
          {cartItems.map(item => (
            <View key={item.id} style={styles.summaryRow}>
              <Text style={styles.summaryItem}>{item.name} × {item.quantity}</Text>
              <Text style={styles.summaryPrice}>₱{(item.price * item.quantity).toFixed(2)}</Text>
            </View>
          ))}
          <View style={styles.summaryDivider} />
          <View style={styles.summaryRow}>
            <Text style={styles.summaryItem}>Subtotal</Text>
            <Text style={styles.summaryPrice}>₱{cartTotal.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <View style={styles.summaryLabelRow}>
              <Ionicons name="bicycle-outline" size={14} color={COLORS.textMedium} />
              <Text style={[styles.summaryItem, { marginLeft: 4 }]}>Delivery Fee</Text>
            </View>
            <Text style={styles.summaryPrice}>₱{DELIVERY_FEE.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalAmount}>₱{TOTAL.toFixed(2)}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom CTA */}
      <View style={styles.bottomBar}>
        <View style={styles.bottomTotal}>
          <Text style={styles.bottomTotalLabel}>Total</Text>
          <Text style={styles.bottomTotalAmount}>₱{TOTAL.toFixed(2)}</Text>
        </View>
        <Button
          title={step === 1 ? 'Proceed to Delivery →' : 'Place Order 🎉'}
          onPress={step === 1 ? () => setStep(2) : handlePlaceOrder}
          loading={loading}
          size="lg"
          style={styles.checkoutBtn}
          fullWidth={false}
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
    width: 42, height: 42, borderRadius: 13,
    backgroundColor: COLORS.surface, alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: COLORS.cardBorder,
  },
  topBarTitle: { fontSize: 17, fontWeight: '800', color: COLORS.textDark },
  clearBtn: {
    width: 42, height: 42, borderRadius: 13,
    backgroundColor: COLORS.errorLight, alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: COLORS.error + '30',
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    paddingBottom: 16,
  },
  stepItem: { alignItems: 'center' },
  stepCircle: {
    width: 30, height: 30, borderRadius: 15,
    backgroundColor: COLORS.backgroundAlt,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 1.5, borderColor: COLORS.cardBorder,
    marginBottom: 4,
  },
  stepCircleActive: { backgroundColor: COLORS.success, borderColor: COLORS.success },
  stepCircleCurrent: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  stepLabel: { fontSize: 10, fontWeight: '600', color: COLORS.textMuted },
  stepLabelActive: { color: COLORS.primary },
  stepLine: { flex: 1, height: 2, backgroundColor: COLORS.cardBorder, marginBottom: 18, marginHorizontal: 4 },
  stepLineActive: { backgroundColor: COLORS.success },
  scroll: { paddingBottom: 110 },
  section: { paddingHorizontal: 16, paddingBottom: 8 },
  farmPromise: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 14,
    backgroundColor: COLORS.successLight,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.success + '30',
  },
  farmPromiseEmoji: { fontSize: 20, marginRight: 10 },
  farmPromiseText: { flex: 1, fontSize: 12, color: COLORS.textMedium, lineHeight: 17 },
  deliverySectionTitle: {
    fontSize: 18, fontWeight: '800', color: COLORS.textDark, marginBottom: 20, marginTop: 4,
  },
  summaryCard: {
    margin: 16,
    backgroundColor: COLORS.card,
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  summaryTitle: { fontSize: 16, fontWeight: '800', color: COLORS.textDark, marginBottom: 14 },
  summaryRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8,
  },
  summaryLabelRow: { flexDirection: 'row', alignItems: 'center' },
  summaryItem: { fontSize: 13, color: COLORS.textMedium, flex: 1 },
  summaryPrice: { fontSize: 13, fontWeight: '600', color: COLORS.textDark },
  summaryDivider: { height: 1, backgroundColor: COLORS.cardBorder, marginVertical: 10 },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 },
  totalLabel: { fontSize: 16, fontWeight: '800', color: COLORS.textDark },
  totalAmount: { fontSize: 22, fontWeight: '900', color: COLORS.primary },
  bottomBar: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    backgroundColor: COLORS.surface,
    paddingHorizontal: 16, paddingVertical: 12, paddingBottom: 28,
    borderTopWidth: 1, borderTopColor: COLORS.cardBorder,
    flexDirection: 'row', alignItems: 'center',
  },
  bottomTotal: { marginRight: 14 },
  bottomTotalLabel: { fontSize: 12, color: COLORS.textMuted },
  bottomTotalAmount: { fontSize: 18, fontWeight: '900', color: COLORS.primary },
  checkoutBtn: { flex: 1, borderRadius: 14 },
  emptyContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 32 },
  emptyEmoji: { fontSize: 80, marginBottom: 16 },
  emptyTitle: { fontSize: 22, fontWeight: '800', color: COLORS.textDark, marginBottom: 8 },
  emptyText: { fontSize: 14, color: COLORS.textMuted, textAlign: 'center', lineHeight: 22, marginBottom: 24 },
  browseBtn: { paddingHorizontal: 32, borderRadius: 16 },
});

export default CartScreen;
