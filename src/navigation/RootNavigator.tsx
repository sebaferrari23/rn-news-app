import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NewsDetailScreen } from '@/features/news/screens/NewsDetailScreen';
import { MainTabs } from './MainTabs';
import { RootStackParamList } from './types';
import { rootStackRouteNames } from './routeNames';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={rootStackRouteNames.mainTabs}
        component={MainTabs}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={rootStackRouteNames.newsDetail}
        component={NewsDetailScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
