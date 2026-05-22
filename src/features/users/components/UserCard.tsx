import { memo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, spacing, fontFamilies, fontSizes } from '@/core/theme';
import { User } from '../types/users.types';
import { UserAvatar } from './UserAvatar';

interface Props {
  user: User;
  onPress: (user: User) => void;
}

export const UserCard = memo(({ user, onPress }: Props) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress(user)}
      activeOpacity={0.6}
    >
      <UserAvatar fullName={user.fullName} userId={user.id} />
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>
          {user.fullName}
        </Text>
        <Text style={styles.meta} numberOfLines={1}>
          {user.phone} — {user.company}
        </Text>
      </View>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.md,
  },
  content: {
    flex: 1,
    gap: spacing.xs,
  },
  name: {
    fontSize: fontSizes.md,
    fontFamily: fontFamilies.semibold,
    color: colors.title,
  },
  meta: {
    fontSize: fontSizes.xs,
    fontFamily: fontFamilies.regular,
    color: colors.text,
  },
});
