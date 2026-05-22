import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors } from '@/core/theme/colors';
import { spacing } from '@/core/theme/spacing';
import { fontFamilies, fontSizes } from '@/core/theme/typography';

export interface HeaderAction {
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
}

interface Props {
  title?: string;
  showBackButton?: boolean;
  actions?: HeaderAction[];
}

export function Header({ title, showBackButton = false, actions = [] }: Props) {
  const navigation = useNavigation();
  const hitSlop = {
    top: spacing.md,
    bottom: spacing.md,
    left: spacing.md,
    right: spacing.md,
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftContent}>
        {showBackButton && (
          <TouchableOpacity
            onPress={navigation.goBack}
            style={styles.backButton}
            hitSlop={hitSlop}
          >
            <Ionicons name="chevron-back" size={24} color={colors.text} />
          </TouchableOpacity>
        )}
        {title && <Text style={styles.title}>{title}</Text>}
      </View>
      <View style={styles.actionsContainer}>
        {actions.map((action) => (
          <TouchableOpacity
            key={action.icon}
            onPress={action.onPress}
            style={styles.actionButton}
            hitSlop={hitSlop}
          >
            <Ionicons name={action.icon} size={24} color={colors.text} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    paddingHorizontal: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.background,
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: fontSizes.xl,
    fontFamily: fontFamilies.bold,
    color: colors.title,
  },
  backButton: {
    marginRight: spacing.sm,
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    marginLeft: spacing.md,
  },
});
