import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// ...

export default function RalleyScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.tile} onPress={() => navigation.navigate('Wissensfragen')}>
        <Text style={styles.tileText}>Wissensfrage</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.tile} onPress={() => navigation.navigate('QRCodeFragen')}>
        <Text style={styles.tileText}>QRCodeFrage</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.tile} onPress={() => navigation.navigate('BildFragen')}>
        <Text style={styles.tileText}>BildFrage</Text>
      </TouchableOpacity>
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



