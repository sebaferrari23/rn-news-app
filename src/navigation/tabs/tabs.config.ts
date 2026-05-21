import { ComponentType } from 'react';
import { routes, RouteConfig } from '../routes';
import { MainTabRouteName } from '../types';
import { HomeScreen } from '@/features/news/screens/HomeScreen';
import { FavoritesScreen } from '@/features/favorites/screens/FavoritesScreen';
import { UsersScreen } from '@/features/users/screens/UsersScreen';

export interface TabConfig {
  route: RouteConfig<MainTabRouteName>;
  component: ComponentType<any>;
}

export const tabsConfig: TabConfig[] = [
  {
    route: routes.home,
    component: HomeScreen,
  },
  {
    route: routes.favorites,
    component: FavoritesScreen,
  },
  {
    route: routes.users,
    component: UsersScreen,
  },
];
