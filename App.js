import { StyleSheet, Text, View, Button, Switch, TextInput } from 'react-native';
import React,{ useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import Color from './js/styles/Colors';


import RalleyScreen from './js/pages/RalleyScreen';
import SettingsScreen from './js/pages/SettingsScreen';
import GroupScreen from './js/pages/GroupScreen';

const Tab = createBottomTabNavigator();

/* main App; uses the defined pages and navigates between them */
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'DHBW Campus Ralley') {
              iconName = 'map';
            } else if (route.name === 'Einstellungen') {
              iconName = 'settings';
            } else if (route.name === 'Gruppe') {
              iconName = 'people';
            }

            // You can return any component that you like here!
            return <MaterialIcon name={iconName} size={size} color={focused ? Color.dhbwRed : Color.dhbwGray}/>;
          },
          tabBarActiveTintColor: Color.dhbwRed,
          tabBarInactiveTintColor: Color.dhbwGray,
        })}>
        <Tab.Screen name="Gruppe" component={GroupScreen} options={{ headerStyle: {backgroundColor: Color.dhbwRed}, headerTintColor: Color.tabHeader}}/>
        <Tab.Screen name="DHBW Campus Ralley" component={RalleyScreen} options={{ headerStyle: {backgroundColor: Color.dhbwRed}, headerTintColor: Color.tabHeader}}/>
        <Tab.Screen name="Einstellungen" component={SettingsScreen} options={{ headerStyle: {backgroundColor: Color.dhbwRed}, headerTintColor: Color.tabHeader}}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
