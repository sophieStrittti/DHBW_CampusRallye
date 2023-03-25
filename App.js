import { StyleSheet, Text, View, Button, Switch, TextInput} from 'react-native';
import React,{ useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { createStackNavigator } from '@react-navigation/stack';
import { Screen } from 'react-native-screens';

import Color from './js/styles/Colors';

import RalleyScreen from './js/pages/RalleyScreen';
import SettingsScreen from './js/pages/SettingsScreen';
import GroupScreen from './js/pages/GroupScreen';
import ImpressumScreen from './js/pages/ImpressumScreen';
import SpracheScreen from './js/pages/SpracheScreen';
import InformationenScreen from './js/pages/InformationenScreen';
import QRCodeFragen from './js/questions/QRCodeFragen';
import Wissensfragen from './js/questions/Wissensfragen';
import BildFragen from './js/questions/BildFragen';
import QRScan from './js/questions/QRScan';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


/* main App; uses the defined pages and navigates between them */
export default function App() {
  const [enabled, setEnabled] = useState(true);

  return (
    <NavigationContainer>
      {enabled ? (
          <Stack.Navigator>
          <Stack.Screen name="Ralley" component={TabScreen} options={{headerShown: false}}/>
          <Stack.Screen name="Impressum" component={ImpressumScreen} options={{ headerStyle: {backgroundColor: Color.dhbwRed}, headerTintColor: Color.tabHeader}}/>
          <Stack.Screen name="Sprache" component={SpracheScreen} options={{ headerStyle: {backgroundColor: Color.dhbwRed}, headerTintColor: Color.tabHeader}}/>
          <Stack.Screen name="Informationen" component={InformationenScreen} options={{ headerStyle: {backgroundColor: Color.dhbwRed}, headerTintColor: Color.tabHeader}}/>
          <Stack.Screen name="Wissensfragen" component={Wissensfragen} options={{ headerStyle: {backgroundColor: Color.dhbwRed}, headerTintColor: Color.tabHeader}}/>
          <Stack.Screen name="QRCodeFragen" component={QRCodeFragen} options={{ headerStyle: {backgroundColor: Color.dhbwRed}, headerTintColor: Color.tabHeader}}/>
          <Stack.Screen name="BildFragen" component={BildFragen} options={{ headerStyle: {backgroundColor: Color.dhbwRed}, headerTintColor: Color.tabHeader}}/>
          <Stack.Screen name="QRScan" component={QRScan} options={{ headerStyle: {backgroundColor: Color.dhbwRed}, headerTintColor: Color.tabHeader}}/>
        </Stack.Navigator>
      ) : <Text>please Verify</Text>}
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
          } else if (route.name === 'Gruppe') {
            iconName = 'people';
          }
          return <MaterialIcon name={iconName} size={size} color={focused ? Color.dhbwRed : Color.dhbwGray}/>;
        },
        tabBarActiveTintColor: Color.dhbwRed,
        tabBarInactiveTintColor: Color.dhbwGray,
      })}>
      <Tab.Screen name="Gruppe" component={GroupScreen} options={{ headerStyle: {backgroundColor: Color.dhbwRed}, headerTintColor: Color.tabHeader}}/>
      <Tab.Screen name="DHBW Campus Ralley" component={RalleyScreen} options={{ headerStyle: {backgroundColor: Color.dhbwRed}, headerTintColor: Color.tabHeader}}/>
      <Tab.Screen name="Einstellungen" component={SettingsScreen} options={{ headerStyle: {backgroundColor: Color.dhbwRed}, headerTintColor: Color.tabHeader}}/>
    </Tab.Navigator>
  );
}