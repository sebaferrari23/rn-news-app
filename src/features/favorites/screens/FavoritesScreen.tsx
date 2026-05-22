import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '@/core/components/Header';
import { colors } from '@/core/theme/colors';
import { routes } from '@/navigation/routes';
import { NewsList } from '@/features/news/components/NewsList';
import { useNavigateToNewsDetail } from '@/features/news/hooks';
import { useFavoritesStore } from '../store/useFavoritesStore';

export function FavoritesScreen() {
  const favorites = useFavoritesStore((s) => s.favorites);
  const navigateToNewsDetail = useNavigateToNewsDetail();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header title={routes.favorites.title} />
      <NewsList data={favorites} onPressItem={navigateToNewsDetail} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
