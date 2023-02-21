import { StyleSheet, Text, View, Button, Switch, TextInput } from 'react-native';
import React,{ useState, useEffect } from 'react';
import MapView, {Marker} from 'react-native-maps';
import * as Location from 'expo-location';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';


/* main page for ralley */
export default function RalleyScreen (){

    /* Disables to go back to privacy agreement screen. RalleyScreen is now the home Screen. */
  /*  React.useEffect(() =>
      navigation.addListener('beforeRemove', (e) => {
        e.preventDefault();
      })
    );*/
    
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
  
    useEffect(() => {
      (async () => {
        
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }
  
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      })();
    }, []);
  
    let userlatitude = 0;
    let userlongitude = 0;
    if (errorMsg) {
      console.log(errorMsg);
    } else if (location) {
      userlongitude = location.coords.longitude;
      userlatitude = location.coords.latitude;
    }

    const userlocation = {
      latitude: 47.61709224449131,
      longitude: 7.678051759539827,
    };

    userlocation.latitude = userlatitude;
    userlocation.longitude = userlongitude;

    const [mapRegion, setmapRegion] = useState({
      latitude: 47.61709224449131, 
      longitude: 7.678051759539827,
      latitudeDelta: 0.0004,
      longitudeDelta: 0.004,
    }); 

    /* page content */
    return (      
      <View>
        <Text>This is the Ralley Screen</Text>
        <Text>{userlongitude}</Text>
        <MapView
          style={{ alignSelf: 'stretch', height: '90%' }}
          region={mapRegion}
        >
          <Marker coordinate={userlocation} >
            <MaterialIcon name='gps-fixed' size={25}/>
          </Marker>
        </MapView>
      </View>
    );
  }



