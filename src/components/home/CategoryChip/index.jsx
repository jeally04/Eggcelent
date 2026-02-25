import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import COLORS from '../../../constants/colors';

const CategoryChip = ({ category, isActive, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.chip, isActive && styles.activeChip]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={styles.emoji}>{category.emoji}</Text>
      <Text style={[styles.label, isActive && styles.activeLabel]}>
        {category.label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: COLORS.surface,
    borderWidth: 1.5,
    borderColor: COLORS.cardBorder,
    marginRight: 10,
  },
  activeChip: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  emoji: {
    fontSize: 14,
    marginRight: 5,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textMedium,
  },
  activeLabel: {
    color: COLORS.white,
  },
});

export default CategoryChip;
