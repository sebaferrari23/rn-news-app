import { useCallback, useMemo, useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header, HeaderAction } from '@/core/components/Header';
import { colors } from '@/core/theme/colors';
import { SearchBar } from '../components/SearchBar';
import { NewsList } from '../components/NewsList';
import { useNews } from '../hooks/useNews';
import { useNewsSearch } from '../hooks/useNewsSearch';

export function HomeScreen() {
  const { data, isLoading } = useNews();
  const { searchQuery, setSearchQuery, filteredNews } = useNewsSearch(data);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

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
      <Header title="Discover" actions={headerActions} />
      {isSearchOpen && (
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search news..."
        />
      )}
      <NewsList
        data={filteredNews}
        isLoading={isLoading}
        onPressItem={() => {}}
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
