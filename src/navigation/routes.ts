import { Ionicons } from '@expo/vector-icons';
import { mainTabRouteNames, rootStackRouteNames } from './routeNames';

export interface RouteConfig<T extends string> {
  name: T;
  title: string;
  tabIcon?: keyof typeof Ionicons.glyphMap;
  activeTabIcon?: keyof typeof Ionicons.glyphMap;
}

export const routes = {
  home: {
    name: mainTabRouteNames.home,
    title: 'Discover',
    tabIcon: 'compass-outline',
    activeTabIcon: 'compass',
  },
  favorites: {
    name: mainTabRouteNames.favorites,
    title: 'Favorites',
    tabIcon: 'heart-outline',
    activeTabIcon: 'heart',
  },
  users: {
    name: mainTabRouteNames.users,
    title: 'Users',
    tabIcon: 'people-outline',
    activeTabIcon: 'people',
  },
  newsDetail: {
    name: rootStackRouteNames.newsDetail,
    title: '',
  },
} satisfies Record<string, RouteConfig<string>>;
