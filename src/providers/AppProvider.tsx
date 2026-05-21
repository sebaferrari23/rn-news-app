import { PropsWithChildren } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NavigationContainer } from '@react-navigation/native';
import { navigationTheme } from '@/navigation/theme';

const queryClient = new QueryClient();

export function AppProvider({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer theme={navigationTheme}>
        {children}
      </NavigationContainer>
    </QueryClientProvider>
  );
}
