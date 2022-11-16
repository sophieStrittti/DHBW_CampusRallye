import { StyleSheet, Text, View, Button, Switch} from 'react-native';
import React,{ useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

/* main App; uses the defined pages and navigates between them */
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Datenschutzabfrage" component={PrivacyScreen}/>
        <Stack.Screen name="DHBW Campus Ralley" component={RalleyScreen} options={{ headerBackVisible: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

/*-----------------------------------------------pages----------------------------------------------- */
/* outsource pages to seperate files/component files */

/* page vor simple privacy agreement */
const PrivacyScreen = ({navigation}) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    /* View is a Container vor content. Only one View per "return"/page available, but it's possible to use multiple Views in that View as children.*/
    <View style={styles.container}> 
      <View style={styles.contentView}>
        <Text style={styles.ownText}>Hiermit akzeptiere ich, dass Bildmaterial von mir gespeichert und auch bei der Ergebnisrunde gezeigt werden darf (oder so ähnlich)</Text>
        <View style = {styles.switchcontainer}>
          <Switch
            trackColor={{ false: "grey", true: "red" }} 
            onValueChange={toggleSwitch} 
            value={isEnabled}
            thumbColor={"#f4f3f4"}
          />
          <Text style={styles.ownText}>Ich akzeptiere.</Text>
        </View>
        <Button 
          title='Bestätigen' 
          color='red' 
          onPress={() => navigation.navigate('DHBW Campus Ralley')} /* navigation function of NavigarionContainer in App()*/
        />
      </View>
    </View>
  );
}

/* main page for ralley */
const RalleyScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>Dies ist ein Test</Text>
    </View>
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
    alignItems: 'stretch',
    
  },

  ownText: {
    color: 'grey',
    fontSize: 25,
  
  },

  switchcontainer:{
    flexDirection: 'row',
    justifyContent: 'center',
  }

});