import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '@/core/components/Header';
import { routes } from '@/navigation/routes';

export function FavoritesScreen() {
  return (
    <SafeAreaView>
      <Header title={routes.favorites.title} />
    </SafeAreaView>
  );
}
