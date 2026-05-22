import {
  Linking,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, fontFamilies, fontSizes } from '@/core/theme';
import { User } from '../types/users.types';
import { UserAvatar } from './UserAvatar';

interface Props {
  user: User | null;
  onClose: () => void;
}

interface InfoRowProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
  href?: string;
}

const InfoRow = ({ icon, label, value, href }: InfoRowProps) => {
  const content = (
    <>
      <Ionicons
        name={icon}
        size={24}
        color={href ? colors.primary : colors.text}
      />
      <View style={styles.rowText}>
        <Text style={styles.rowLabel}>{label}</Text>
        <Text style={[styles.rowValue, href && styles.rowValueLink]}>
          {value}
        </Text>
      </View>
      {href && (
        <Ionicons
          name="chevron-forward-outline"
          size={16}
          color={colors.primary}
        />
      )}
    </>
  );

  if (href) {
    return (
      <TouchableOpacity
        style={styles.row}
        onPress={() => Linking.openURL(href)}
        activeOpacity={0.7}
      >
        {content}
      </TouchableOpacity>
    );
  }

  return <View style={styles.row}>{content}</View>;
};

export function UserDetailModal({ user, onClose }: Props) {
  return (
    <Modal
      visible={!!user}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.handle} />

        {user && (
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.header}>
              <UserAvatar fullName={user.fullName} userId={user.id} size={80} />
              <Text style={styles.name}>{user.fullName}</Text>
              <Text style={styles.username}>@{user.username}</Text>
            </View>
            <View style={styles.section}>
              <InfoRow
                icon="mail-outline"
                label="Email"
                value={user.email}
                href={`mailto:${user.email}`}
              />
              <InfoRow
                icon="call-outline"
                label="Phone"
                value={user.phone}
                href={`tel:${user.phone}`}
              />
              <InfoRow
                icon="globe-outline"
                label="Website"
                value={user.website}
                href={`https://${user.website}`}
              />
              <InfoRow icon="location-outline" label="City" value={user.city} />
              <InfoRow
                icon="business-outline"
                label="Company"
                value={user.company}
              />
            </View>
          </ScrollView>
        )}
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: spacing.sm,
    flex: 1,
  },
  handle: {
    width: 48,
    height: 5,
    borderRadius: 999,
    backgroundColor: colors.border,
    alignSelf: 'center',
    marginBottom: spacing.md,
  },
  header: {
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.lg,
  },
  name: {
    fontSize: fontSizes.xl,
    fontFamily: fontFamilies.bold,
    color: colors.title,
  },
  username: {
    fontSize: fontSizes.sm,
    fontFamily: fontFamilies.regular,
    color: colors.text,
  },
  section: {
    paddingHorizontal: spacing.md,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  rowText: {
    flex: 1,
    gap: 2,
  },
  rowLabel: {
    fontSize: fontSizes.xs,
    fontFamily: fontFamilies.regular,
    color: colors.text,
  },
  rowValue: {
    fontSize: fontSizes.md,
    fontFamily: fontFamilies.medium,
    color: colors.title,
  },
  rowValueLink: {
    color: colors.primary,
  },
});
