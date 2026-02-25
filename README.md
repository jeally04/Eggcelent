# 🥚 Eggcelent — Farm Fresh Egg Ordering App

A beautiful, user-friendly React Native mobile application for ordering fresh eggs straight from our **Rhode Island Red** chicken farm!

---

## 🐔 About the App

**Eggcelent** is a farm-direct egg ordering app. We are the sole sellers — customers can browse our egg products, add to cart, and place delivery orders directly from the app.

All eggs come from our prized **Rhode Island Red** hens — known for their rich golden yolks, thick shells, and exceptional flavor.

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🎬 Animated Splash Screen | Rhode Island Red–themed animated intro |
| 🔐 Authentication | Login & Register with form validation |
| 🏠 Home Screen | Browse eggs, search, category filter, featured banner |
| 🛒 Product Detail | Full product view with quantity selector |
| 🛍️ Shopping Cart | Add, remove, update items with running total |
| 📦 Order Placement | Delivery info form, order summary |
| ✅ Order Success | Animated confirmation screen |
| 📋 Order History | All past orders with status tracking |
| 👤 Profile | User info, farm about, account settings |

---

## 📁 Project Structure

```
src/
├── screens/
│   ├── SplashScreen/           # Animated splash screen
│   ├── LoginScreen/            # Login form
│   ├── RegisterScreen/         # Registration form
│   ├── HomeScreen/             # Main browse screen
│   ├── ProductDetailScreen/    # Product details + add to cart
│   ├── CartScreen/             # Shopping cart + checkout
│   ├── OrdersScreen/           # Order history list
│   ├── OrderDetailScreen/      # Single order detail
│   ├── OrderSuccessScreen/     # Order placed confirmation
│   └── ProfileScreen/          # User profile
├── components/
│   ├── common/
│   │   ├── Button/             # Reusable button (gradient, outline, etc.)
│   │   ├── Input/              # Text input with validation
│   │   └── Badge/              # Notification badge
│   ├── home/
│   │   ├── EggCard/            # Product card for grid
│   │   ├── CategoryChip/       # Category filter chip
│   │   └── FeaturedBanner/     # Auto-scrolling featured banner
│   └── cart/
│       └── CartItem/           # Cart item row
├── navigation/
│   ├── AppNavigator.jsx        # Main app stack (authenticated)
│   ├── AuthNavigator.jsx       # Auth flow stack
│   └── TabNavigator.jsx        # Bottom tab bar
├── context/
│   ├── AuthContext.jsx         # Auth state & methods
│   └── CartContext.jsx         # Cart state & order methods
└── constants/
    ├── colors.js               # Complete color palette
    ├── theme.js                # Fonts, spacing, radius, shadows
    └── data.js                 # Product catalog & mock data
```

---

## 🎨 Design

- **Color Palette**: Warm cream, Rhode Island Red–inspired reds and oranges, egg yolk yellow
- **Style**: Cute, farm-fresh, warm and approachable
- **Components**: Rounded cards, gradient buttons, emoji illustrations

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start the development server
npx expo start

# Run on Android
npx expo start --android

# Run on iOS
npx expo start --ios
```

---

## 📦 Tech Stack

- **React Native** + **Expo** (SDK 51)
- **React Navigation** (Stack + Bottom Tabs)
- **Expo Linear Gradient** — gradient backgrounds & buttons
- **@expo/vector-icons** (Ionicons) — icons
- **AsyncStorage** — local persistence for auth & cart
- **React Context API** — global state management

---

## 🥚 Product Catalog

Our Rhode Island Red eggs are available in:

| Product | Eggs | Price |
|---------|------|-------|
| Half Dozen | 6 | ₱3.49 |
| Classic Dozen | 12 | ₱5.99 |
| Jumbo Flat 30 | 30 | ₱13.99 |
| Mega Flat 60 | 60 | ₱24.99 |
| Fertile Eggs 6-Pack | 6 | ₱10.99 |
| Fertile Eggs Dozen | 12 | ₱18.99 |
| Gift Box Dozen | 12 | ₱9.99 |
| Weekly Egg Box | 36 | ₱21.99 |

---

*🌾 Straight from our farm to your table — Eggcelent! 🐔*
