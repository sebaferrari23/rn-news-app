import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from './types';
import { tabsConfig } from './tabs/tabs.config';
import { tabBarScreenOptions } from './tabs/tabBarOptions';

const Tab = createBottomTabNavigator<MainTabParamList>();

export function MainTabs() {
  return (
    <Tab.Navigator screenOptions={tabBarScreenOptions}>
      {tabsConfig.map(({ route, component }) => (
        <Tab.Screen
          key={route.name}
          name={route.name}
          component={component}
          options={{
            title: route.title,
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons
                name={focused ? route.activeTabIcon : route.tabIcon}
                color={color}
                size={size}
              />
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  );
}
