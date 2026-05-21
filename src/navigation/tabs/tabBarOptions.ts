import { fontFamilies, fontSizes } from '@/core/theme/typography';
import { colors } from '@/core/theme/colors';

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
