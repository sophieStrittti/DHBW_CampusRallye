import { StyleSheet, Text, View, Button, Switch, TextInput } from 'react-native';
import React,{ useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import RalleyScreen from './js/pages/RalleyScreen';
import SettingsScreen from './js/pages/SettingsScreen';

const Tab = createBottomTabNavigator();

/* main App; uses the defined pages and navigates between them */
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Ralley" component={RalleyScreen} options={{ headerStyle: {backgroundColor: '#f4f3f4'}}}/>
        <Tab.Screen name="Einstellungen" component={SettingsScreen} options={{ headerStyle: {backgroundColor: '#f4f3f4'}}}/>
      </Tab.Navigator>
    </NavigationContainer>
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
