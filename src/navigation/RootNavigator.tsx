import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NewsDetailScreen } from '@/features/news/screens/NewsDetailScreen';
import { MainTabs } from './MainTabs';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();
export function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainTabs"
        component={MainTabs}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="NewsDetail"
        component={NewsDetailScreen}
        options={{
          title: 'News Detail',
        }}
      />
    </Stack.Navigator>
  );
}
