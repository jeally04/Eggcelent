import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import COLORS from '../../../constants/colors';

const Badge = ({ count, size = 'md', color = COLORS.primary, style }) => {
  if (!count || count <= 0) return null;

  const sizes = {
    sm: { container: 16, fontSize: 9, minWidth: 16 },
    md: { container: 20, fontSize: 11, minWidth: 20 },
    lg: { container: 24, fontSize: 13, minWidth: 24 },
  };

  const s = sizes[size] || sizes.md;

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: color,
          height: s.container,
          minWidth: s.minWidth,
          borderRadius: s.container / 2,
        },
        style,
      ]}
    >
      <Text style={[styles.text, { fontSize: s.fontSize }]}>
        {count > 99 ? '99+' : count}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  text: {
    color: COLORS.white,
    fontWeight: '700',
  },
});

export default Badge;
