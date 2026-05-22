import { useCallback, useMemo, useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header, HeaderAction } from '@/core/components/Header';
import { colors } from '@/core/theme';
import { routes } from '@/navigation/routes';
import { useUsers } from '../hooks/useUsers';
import { User } from '../types/users.types';
import { UserDetailModal, UserList } from '../components';
import { SearchBar } from '@/core/components/SearchBar';
import { useUsersSearch } from '../hooks/useUsersSearch';

export function UsersScreen() {
  const { data, isLoading } = useUsers();
  const { searchQuery, setSearchQuery, filteredUsers } = useUsersSearch(data);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const toggleSearch = useCallback(() => {
    setIsSearchOpen((prev) => !prev);
    setSearchQuery('');
  }, [setSearchQuery]);

  const headerActions: HeaderAction[] = useMemo(
    () => [
      {
        icon: isSearchOpen ? 'close-outline' : 'search-outline',
        onPress: toggleSearch,
      },
    ],
    [isSearchOpen, toggleSearch],
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header title={routes.users.title} actions={headerActions} />
      {isSearchOpen && (
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search users ..."
        />
      )}
      <UserList
        data={filteredUsers}
        isLoading={isLoading}
        onPressItem={setSelectedUser}
      />
      <UserDetailModal
        user={selectedUser}
        onClose={() => setSelectedUser(null)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
