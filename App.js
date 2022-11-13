import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button} from 'react-native';



export default function App() {
  return (
    
    <View style={styles.container}>
      <StatusBar style="auto" backgroundColor='#ff0000' />
      <View style={styles.contentView}>
        <Text style={styles.ownText}>Hiermit akzeptiere ich, dass Bildmaterial von mir gespeichert und auch bei der Ergebnisrunde gezeigt werden darf (oder so ähnlich)</Text>
       
        <Button title='Bestätigen'/>
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
    backgroundColor: 'grey',
    with: 200,
  }
});