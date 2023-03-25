import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
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
    navigation.navigate('Ralley');
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
});
