import { colors } from '@/core/theme/colors';
import { DefaultTheme, Theme } from '@react-navigation/native';

export const navigationTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.background,
    card: colors.background,
    text: colors.text,
    border: colors.background,
    primary: colors.primary,
    notification: colors.primary,
  },
};
