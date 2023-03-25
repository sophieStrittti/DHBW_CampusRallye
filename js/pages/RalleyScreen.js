import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../../supabase';
import Wissensfragen from '../questions/Wissensfragen';
import BildFragen from '../questions/BildFragen';
import QRCodeFragen from '../questions/QRCodeFragen';
import QuestionScreen from '../questions/QuestionScreen.js';
import {useSharedStates} from './sharedStates'



export default function RalleyScreen() {
  const navigation = useNavigation();
  const {fragen, setFragen} = useSharedStates();
  const {aktuelleFrage, setAktuelleFrage} = useSharedStates();
  const {points, setPoints} = useSharedStates();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data: questions, error } = await supabase
      .from('Fragen')
      .select(); 

      setFragen(questions);
      setLoading(false);
    };
    fetchData();
  }, []);
  
  let content;
  if (!loading && aktuelleFrage !== fragen.length) {
    if (fragen[aktuelleFrage].typ === 'Wissensfragen'){
      content = (
        <Wissensfragen />
      );
    } else if (fragen[aktuelleFrage].typ === 'Bild') {
      content = (
        <BildFragen />
      );
    } else if (fragen[aktuelleFrage].typ === 'QRFragen') {
      content = (
        <QRCodeFragen />
      );
    }   
  } else if (!loading) {
    content=(
      <Text style={styles.tileText}>Die Ralley wurde erforderlich beendet! Eure erreichte Punktzahl: {points}</Text>
    );
  }

  return (
    <View style={styles.container}>
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  tile: {
    width: '80%',
    height: 100,
    marginVertical: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'grey',
  },

  tileText: {
    fontSize: 20,
    color: 'grey',
  },
});



