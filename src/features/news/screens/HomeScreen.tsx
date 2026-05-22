import { useCallback, useMemo, useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header, HeaderAction } from '@/core/components/Header';
import { colors } from '@/core/theme/colors';
import { routes } from '@/navigation/routes';
import { MainTabScreenProps } from '@/navigation/types';
import { mainTabRouteNames } from '@/navigation/routeNames';
import { SearchBar } from '../components/SearchBar';
import { NewsList } from '../components/NewsList';
import { useNews } from '../hooks/useNews';
import { useNewsSearch } from '../hooks/useNewsSearch';

type Props = MainTabScreenProps<typeof mainTabRouteNames.favorites>;

export function HomeScreen({ navigation }: Props) {
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

  const navigateToNewsDetail = useCallback(
    (newsId: number) => {
      navigation.navigate(routes.newsDetail.name, { newsId });
    },
    [navigation],
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
        onPressItem={navigateToNewsDetail}
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
