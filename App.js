import { StyleSheet, Text, View, Button, Switch, TextInput } from 'react-native';
import React,{ useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { createStackNavigator } from '@react-navigation/stack';
import { Screen } from 'react-native-screens';

import RalleyScreen from './js/pages/RalleyScreen';
import SettingsScreen from './js/pages/SettingsScreen';
import ImpressumScreen from './js/pages/ImpressumScreen';
import SpracheScreen from './js/pages/SpracheScreen';
import InformationenScreen from './js/pages/InformationenScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

/* main App; uses the defined pages and navigates between them */
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Ralley" component={TabScreen} />
        <Stack.Screen name="Einstellungen" component={SettingsScreen} />
        <Stack.Screen name="Impressum" component={ImpressumScreen} />
        <Stack.Screen name="Sprache" component={SpracheScreen} />
        <Stack.Screen name="Informationen" component={InformationenScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function TabScreen() {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'DHBW Campus Ralley') {
            iconName = 'map';
          } else if (route.name === 'Einstellungen') {
            iconName = 'settings';
          }

          // You can return any component that you like here!
          return <MaterialIcon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen name="DHBW Campus Ralley" component={RalleyScreen} options={{ headerStyle: {backgroundColor: '#f4f3f4'}}}/>
      <Tab.Screen name="Einstellungen" component={SettingsScreen} options={{ headerStyle: {backgroundColor: '#f4f3f4'}}}/>
    </Tab.Navigator>
  );
}

/*-----------------------------------------------styles----------------------------------------------- */

/* styles of different components, pages or areas. Similar to CSS, but not all props available*/
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  contentView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },

  ownText: {
    color: 'grey',
    fontSize: 25,
  
  },

  switchcontainer:{
    flexDirection: 'row',
    justifyContent: 'center',
  },

  warningMessage: {
    color: 'red',
    fontSize: 20,
  },

  ownHeading: {
    fontSize: 40,
    color: 'grey',
  },

  textInput: {
    borderColor: 'grey',
    borderWidth: 2,
    width: 300,
  }
});