import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '@/features/news/screens/HomeScreen';
import { FavoritesScreen } from '@/features/favorites/screens/FavoritesScreen';
import { UsersScreen } from '@/features/users/screens/UsersScreen';
import { MainTabParamList } from './types';

const Tab = createBottomTabNavigator<MainTabParamList>();

export function MainTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
      <Tab.Screen name="Users" component={UsersScreen} />
    </Tab.Navigator>
  );
}
