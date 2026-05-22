import { colors, fontFamilies, fontSizes } from '@/core/theme';

export const tabBarScreenOptions = {
  headerShown: false,
  tabBarActiveTintColor: colors.primary,
  tabBarInactiveTintColor: colors.text,
  tabBarStyle: {
    backgroundColor: colors.background,
    borderTopColor: colors.background,
    height: 88,
    paddingTop: 8,
  },
  tabBarLabelStyle: {
    fontFamily: fontFamilies.medium,
    fontSize: fontSizes.xs,
  },
};
