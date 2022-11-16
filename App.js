import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Switch} from 'react-native';
import React, { useState } from 'react';

export default function App() {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <View style={styles.container}>
      <View style={styles.contentView}>
        <Text style={styles.ownText}>Hiermit akzeptiere ich, dass Bildmaterial von mir gespeichert und auch bei der Ergebnisrunde gezeigt werden darf (oder so ähnlich)</Text>
        <View style = {styles.radiocontainer}>
          <Switch
            trackColor={{ false: "grey", true: "red" }} 
            onValueChange={toggleSwitch} 
            value={isEnabled}
            thumbColor={"#f4f3f4"}
          />
          <Text style={styles.ownText}>Ich akzeptiere.</Text>
        </View>
        <Button title='Bestätigen' color='red'/>
      </View>
    </View>
    /* View ist ein Container, nur eine View in einer Komponente, aber mehrere Unterviews/Views in der View */
  );
}

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

  radiocontainer:{
    flexDirection: 'row',
    justifyContent: 'center',
  }

});