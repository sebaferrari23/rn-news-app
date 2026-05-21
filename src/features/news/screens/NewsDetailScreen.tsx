import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '@/core/components/Header';

export function NewsDetailScreen() {
  return (
    <SafeAreaView>
      <Header showBackButton={true} />
    </SafeAreaView>
  );
}
