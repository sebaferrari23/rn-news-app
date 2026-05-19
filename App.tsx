import { AppProvider } from '@/providers/AppProvider';
import { RootNavigator } from '@/navigation/RootNavigator';

export default function App() {
  return (
    <AppProvider>
      <RootNavigator />
    </AppProvider>
  );
}
