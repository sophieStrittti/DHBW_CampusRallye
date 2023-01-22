import { StyleSheet, Text, View, Button, Switch, TextInput, StatusBar } from 'react-native';
import React,{ useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Navigator from './js/Navigator';

/* main App; uses the defined pages and navigates between them */
export default function App() {
  return (
    <View>
      <StatusBar />
      <Text>This is a test text</Text>
      <Navigator />
    </View>
  );
}


/* TO DO: outsource Styles in Styles folder */
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