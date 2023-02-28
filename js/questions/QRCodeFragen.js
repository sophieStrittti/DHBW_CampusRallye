import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { dhbwRed } from '../styles/Colors';

export default function QRCodeFragen() {
  const navigation = useNavigation();
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isLocationEnabled, setIsLocationEnabled] = useState(true);
  const dhbwbiblocation = {latitude: 47.61722471790031, longitude: 7.677300665290789,};

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();

    if (isLocationEnabled) {
      const locationSubscriber = Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 5000,
          distanceInterval: 10,
        },
        setLocation
      );
      if (locationSubscriber && locationSubscriber.remove) {
        return () => {
            locationSubscriber.remove();
        };
      }
    }
  }, [isLocationEnabled]);

  const toggleLocation = () => {
    setIsLocationEnabled(!isLocationEnabled);
  };

  let userlocation = {
    latitude: 47.61709224449131,
    longitude: 7.678051759539827,
  };

  if (errorMsg) {
    console.log(errorMsg);
  } else if (location) {
    userlocation = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
  }

  const mapRegion = {
    latitude: userlocation.latitude,
    longitude: userlocation.longitude,
    latitudeDelta: 0.0004,
    longitudeDelta: 0.004,
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Gehe zur Bibliothek der DHBW Lörrach und scanne den QR-Code für die nächste Aufgabe</Text>
      </View>
      <View style={styles.mapContainer}>
        <MapView style={styles.map} region={mapRegion}>
          <Marker coordinate={userlocation}>
            <MaterialIcon name="gps-fixed" size={35} color={"blue"}/>
          </Marker>
          <Marker coordinate={dhbwbiblocation}>
            <MaterialIcon name="place" size={60} color={"red"} />
          </Marker>
        </MapView>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title={'QR-Code Scannen'}
          onPress={() => navigation.navigate('QRScan')}
          color={'red'}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    fontSize: 20,
    textAlign: 'center',
  },
  mapContainer: {
    flex: 6,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
