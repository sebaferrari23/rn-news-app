import { StyleSheet, Text, View } from 'react-native';
import { avatarColors, fontFamilies } from '@/core/theme';

function getAvatarColor(id: number): string {
  return avatarColors[id % avatarColors.length];
}

function getInitials(fullName: string): string {
  return fullName
    .split(' ')
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('');
}

interface Props {
  fullName: string;
  userId: number;
  size?: number;
}

export function UserAvatar({ fullName, userId, size = 48 }: Props) {
  const fontSize = size * 0.35;

  return (
    <View
      style={[
        styles.container,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: getAvatarColor(userId),
        },
      ]}
    >
      <Text style={[styles.initials, { fontSize }]}>
        {getInitials(fullName)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: {
    color: '#FFFFFF',
    fontFamily: fontFamilies.bold,
  },
});
