import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Dimensions } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import {useSharedStates} from '../pages/sharedStates'
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../../supabase';

export default function QRScan() {
  const navigation = useNavigation();

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const {fragen, setFragen} = useSharedStates();
  const {aktuelleFrage, setAktuelleFrage} = useSharedStates();
  const {qrscan, setQrscan} = useSharedStates();


  useEffect(() => {
    const fetchData = async () => {
      const { data: answer, error } = await supabase
      .from('QRFragen')
      .select('QR_Info') 
      .eq('fragen_id', fragen[aktuelleFrage].id);
      setCorrectAnswer(answer)
    };
    fetchData();
  }, []);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    if (correctAnswer[0].QR_Info !== data){
      alert(`Der Barcode ist falsch! Du bist vermutlich nicht am richtigen Ort.`);
    } else if (correctAnswer[0].QR_Info === data) {
      setAktuelleFrage(aktuelleFrage+1);
    }
    setQrscan(false)
    navigation.navigate('Ralley');
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View >
      <View style={styles.mapContainer}>
        <BarCodeScanner
          style={styles.map}
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button title='Zurück' onPress={() => setQrscan(false)} color="red"/>
        <Text style={styles.title}>Hinweis: falls nicht gescannt wird, einmal zurück und neu auf Scannen klicken!</Text>
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  qrscancontainer: {
    flex: 1,
    width: '100%',
    height: '50%',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    position: "absolute",
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  title: {
    fontSize: Dimensions.get("window").height *0.025,
    textAlign: 'center',
  },
  mapContainer: {
    flex: 6,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height * 0.6,
    flex: 1,
  },
});
