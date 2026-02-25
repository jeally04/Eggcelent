import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import COLORS from '../../../constants/colors';

const Button = ({
  title,
  onPress,
  variant = 'primary',   // 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size = 'md',           // 'sm' | 'md' | 'lg'
  loading = false,
  disabled = false,
  icon,
  iconRight,
  style,
  textStyle,
  fullWidth = true,
}) => {
  const isDisabled = disabled || loading;

  const sizeStyles = {
    sm: { paddingVertical: 8, paddingHorizontal: 16, borderRadius: 10 },
    md: { paddingVertical: 14, paddingHorizontal: 24, borderRadius: 14 },
    lg: { paddingVertical: 18, paddingHorizontal: 32, borderRadius: 16 },
  };

  const textSizes = {
    sm: 13,
    md: 15,
    lg: 17,
  };

  if (variant === 'primary') {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={isDisabled}
        activeOpacity={0.85}
        style={[fullWidth && styles.fullWidth, style]}
      >
        <LinearGradient
          colors={isDisabled ? ['#D4A79A', '#D4A79A'] : COLORS.gradientPrimary}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.base, sizeStyles[size]]}
        >
          {loading ? (
            <ActivityIndicator color={COLORS.white} size="small" />
          ) : (
            <View style={styles.row}>
              {icon && <View style={styles.iconLeft}>{icon}</View>}
              <Text style={[styles.primaryText, { fontSize: textSizes[size] }, textStyle]}>
                {title}
              </Text>
              {iconRight && <View style={styles.iconRight}>{iconRight}</View>}
            </View>
          )}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  const variantStyles = {
    secondary: {
      bg: COLORS.accent,
      text: COLORS.textDark,
      border: COLORS.accentDark,
    },
    outline: {
      bg: COLORS.transparent,
      text: COLORS.primary,
      border: COLORS.primary,
    },
    ghost: {
      bg: COLORS.transparent,
      text: COLORS.primary,
      border: COLORS.transparent,
    },
    danger: {
      bg: COLORS.error,
      text: COLORS.white,
      border: COLORS.error,
    },
  };

  const vs = variantStyles[variant] || variantStyles.outline;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.85}
      style={[
        styles.base,
        sizeStyles[size],
        { backgroundColor: vs.bg, borderColor: vs.border, borderWidth: variant === 'outline' ? 2 : 0 },
        isDisabled && styles.disabled,
        fullWidth && styles.fullWidth,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={vs.text} size="small" />
      ) : (
        <View style={styles.row}>
          {icon && <View style={styles.iconLeft}>{icon}</View>}
          <Text style={[styles.text, { color: vs.text, fontSize: textSizes[size] }, textStyle]}>
            {title}
          </Text>
          {iconRight && <View style={styles.iconRight}>{iconRight}</View>}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullWidth: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryText: {
    color: COLORS.white,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  text: {
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  disabled: {
    opacity: 0.55,
  },
  iconLeft: {
    marginRight: 8,
  },
  iconRight: {
    marginLeft: 8,
  },
});

export default Button;
