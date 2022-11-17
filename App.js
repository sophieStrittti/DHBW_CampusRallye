import { StyleSheet, Text, View, Button, Switch, TextInput } from 'react-native';
import React,{ useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

/* main App; uses the defined pages and navigates between them */
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Datenschutzabfrage" component={PrivacyScreen} options={{ headerStyle: {backgroundColor: '#f4f3f4'}}}/>
        <Stack.Screen name="Willkommen" component={HomeScreen} options={{ headerBackVisible: false, headerStyle: {backgroundColor: '#f4f3f4'}}}/>
        <Stack.Screen name="DHBW Campus Ralley" component={RalleyScreen} options={{ headerBackVisible: false, headerStyle: {backgroundColor: '#f4f3f4'}}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

/* home screen */
const HomeScreen = ({navigation}) => {

  /* Disables to go back to privacy agreement screen. RalleyScreen is now the home Screen. */
  React.useEffect(() =>
    navigation.addListener('beforeRemove', (e) => {
      e.preventDefault();
    })
  );

  /* page content -> TO DO: SAVE INPUT CONTENT*/
  return (
    <View style={styles.container}>
      <Text style={styles.ownHeading}>Willkommen zur DHBW Campus Ralley!</Text>
      <Text style={styles.ownText}>Bitte den Gruppennamen und die Teilnehmer eingeben.</Text>
      <View style={styles.contentView}>
        <Text>Gruppenname:</Text>
        <TextInput style={styles.textInput}>bitte eingeben</TextInput>
        <Text>Gruppenmitglied</Text>
        <TextInput style={styles.textInput}>bitte eingeben</TextInput>
        <Text>Gruppenmitglied</Text>
        <TextInput style={styles.textInput}>bitte eingeben</TextInput>
        <Text>Gruppenmitglied</Text>
        <TextInput style={styles.textInput}>bitte eingeben</TextInput>
      </View>
      <Button  
        title='Starten' 
        color='red' 
        onPress={() => {navigation.navigate('DHBW Campus Ralley')}}
      />
    </View>
  );
}

/*-----------------------------------------------pages----------------------------------------------- */
/* outsource pages to seperate files/component files */

/* page vor simple privacy agreement */
const PrivacyScreen = ({navigation}) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const [shouldShow, setShouldShow] = useState(false);

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

        {/* Text to show if switch disabled and button pressed */}
        {shouldShow ? <Text style={styles.warningMessage}>Bitte akzeptieren</Text>:null}
        <Button 
          title='Bestätigen' 
          color='red' 
          onPress={() => {isEnabled ? navigation.navigate('Willkommen') : setShouldShow(true)}} /* navigation function of NavigarionContainer in App()*/
          /* TO DO for later: save privacy agreement for user*/
        />
      </View>
    </View>
  );
}

/* main page for ralley */
const RalleyScreen = ({navigation}) => {

  /* Disables to go back to privacy agreement screen. RalleyScreen is now the home Screen. */
  React.useEffect(() =>
    navigation.addListener('beforeRemove', (e) => {
      e.preventDefault();
    })
  );

  /* page content */
  return (
    <View style={styles.container}>
      
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