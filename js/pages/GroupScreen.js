import { StyleSheet, Text, View, Button, Switch, TextInput } from 'react-native';
import React,{ useState } from 'react';

/* main page for ralley */
export default function GroupScreen (){

    /* Disables to go back to privacy agreement screen. RalleyScreen is now the home Screen. */
  /*  React.useEffect(() =>
      navigation.addListener('beforeRemove', (e) => {
        e.preventDefault();
      })
    );*/
  
    /* page content */
    return (
      <View>
        <Text>This is the Group Screen</Text>
      </View>
    );
  }