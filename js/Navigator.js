import React, { useContext } from 'react';
import { Platform, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import RalleyScreen from './pages/RalleyScreen';
import SettingsScreen from './pages/SettingsScreen';

export default function Navigator({navigation }) {

  const Stack = createNativeStackNavigator();

  function SettingsStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={SettingsScreen}
        />
      </Stack.Navigator>
    );
  }

  function RalleyStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={RalleyScreen}
        />
      </Stack.Navigator>
    );
  }
  
  const tabBarLabel = (title) => {
    return (
      <Text>
        {title}
      </Text>
    );
  };

  const tabBarIcon = (icon, size) => {
    return (
      <FontAwesomeIcon
        icon={icon}
        size={size}
      />
    );
  };

  const tabsConfig = ({ route }) => ({
    headerShown: false,
    tabBarIcon: ({ color }) => {
      const routeName = route.name;
      let iconName;
      if (routeName === 'Ralley') iconName = 'rss-feed';
      else if (routeName === 'Settings') iconName = 'school';
    },
  });

  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator screenOptions={tabsConfig}>
        <Tab.Screen
          name="Ralley"
          component={RalleyStack}
          options={{
            tabBarLabel: () =>
              tabBarLabel('DHBW', ),
            tabBarLabelPosition: 'below-icon',
            tabBarIcon: () => (
              <MaterialIcon
                name={'rss-feed'}
                size={32}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsStack}
          options={{
            tabBarLabel: () =>
              tabBarLabel('Vorlesungen'),
            tabBarIcon: () =>
              <MaterialIcon
                name={'rss-feed'}
                size={32}
              />
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}