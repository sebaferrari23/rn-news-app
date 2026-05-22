import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { colors, spacing, fontFamilies, fontSizes } from '@/core/theme';
import { User } from '../types/users.types';
import { UserCard } from './UserCard';

interface Props {
  data: User[] | undefined;
  isLoading?: boolean;
  onPressItem: (user: User) => void;
}

export function UserList({ data, isLoading, onPressItem }: Props) {
  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
      ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
      ListEmptyComponent={
        <View style={styles.centered}>
          <Text style={styles.emptyText}>No users available.</Text>
        </View>
      }
      renderItem={({ item }) => <UserCard user={item} onPress={onPressItem} />}
    />
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: spacing.xl,
  },
  content: {
    paddingHorizontal: spacing.md,
  },
  itemSeparator: {
    height: 1,
    flex: 1,
    backgroundColor: colors.border,
  },
  emptyText: {
    fontFamily: fontFamilies.medium,
    fontSize: fontSizes.md,
    color: colors.text,
  },
});
