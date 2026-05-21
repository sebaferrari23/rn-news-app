import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps } from '@react-navigation/native';
import { mainTabRouteNames, rootStackRouteNames } from './routeNames';

export type RootStackParamList = {
  [rootStackRouteNames.mainTabs]: undefined;
  [rootStackRouteNames.newsDetail]: {
    newsId: number;
  };
};

export type MainTabParamList = {
  [mainTabRouteNames.home]: undefined;
  [mainTabRouteNames.favorites]: undefined;
  [mainTabRouteNames.users]: undefined;
};

export type RootStackRouteName = keyof RootStackParamList;
export type MainTabRouteName = keyof MainTabParamList;

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

export type MainTabScreenProps<T extends keyof MainTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<MainTabParamList, T>,
    NativeStackScreenProps<RootStackParamList>
  >;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
