import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '@/core/components/Header';
import { routes } from '@/navigation/routes';

export function UsersScreen() {
  return (
    <SafeAreaView>
      <Header title={routes.users.title} />
    </SafeAreaView>
  );
}
