import { StyleSheet, Text, View, Button, Switch, TextInput, Modal, Alert } from 'react-native';
import React,{ useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { createStackNavigator } from '@react-navigation/stack';
import { Screen } from 'react-native-screens';
import { supabase } from './supabase';

import Color from './js/styles/Colors';


import RalleyScreen from './js/pages/RalleyScreen';
import SettingsScreen from './js/pages/SettingsScreen';
import GroupScreen from './js/pages/GroupScreen';
import ImpressumScreen from './js/pages/ImpressumScreen';
import SpracheScreen from './js/pages/SpracheScreen';
import InformationenScreen from './js/pages/InformationenScreen';
import QRCodeFragen from './js/questions/QRCodeFragen';
import Wissensfragen from './js/questions/Wissensfragen';
import BildFragen from './js/questions/BildFragen';
import QRScan from './js/questions/QRScan';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


/* main App; uses the defined pages and navigates between them */
export default function App() {
  const [enabled, setEnabled] = useState(false);

  const [anweisung, setAnweisung] = useState("Bitte geben Sie das Passwort, welches sie vom Veranstalter erhalten haben, ein");
  const [password, setpassword] = useState("");
  const [confirmedpassword, setConfirmedpassword] = useState("");
  const [showModal, setShowModal] = useState(true);
  const [anweisung2, setAnweisung2] = useState("Bitte geben Sie einen Gruppennamen ein");
  const [group, setGroup] = useState("");
  const [confirmedGroup, setConfirmedGroup] = useState("");
  const [showModal2, setShowModal2] = useState(false);
  const [anweisung3, setAnweisung3] = useState("Bitte geben Sie die Namen der Gruppenmitglieder durch , getrennt ein");
  const [groupMembers, setGroupMembers] = useState("");
  const [confirmedGroupMembers, setConfirmedGroupMembers] = useState("");
  const [showModal3, setShowModal3] = useState(false);

  const [realpassword, setrealpassword] = useState(null)

  useEffect(() => {
    async function getData() {
      let { data: realpassword, error } = await supabase
      .from('Ralley')
      .select('password');
      setrealpassword(realpassword[0].password);
    }
    getData();
  }, []);
  
  const handlePasswordSubmit = () => {
    if (password.trim() === '') {
      Alert.alert('Fehler', 'Bitte geben Sie das richtige Passwort ein.');
      return;
    }

    Alert.alert(
      "Sicherheitsfrage",
      `Bist du sicher, dass "${password}" das richtige Passwort ist`,
      [
        {
          text: "Abbrechen",
          style: "cancel",
        },
        {
          text: "Ja, Passwort bestätigen",
          onPress: () => {
            setConfirmedpassword(password);
            if (password !== realpassword){
              Alert.alert('Fehler', 'Falsches Passwort.');
              return;
            }
            setShowModal(false);
            setShowModal2(true);
          },
        },
      ],
    );
  };

  const handleGroupSubmit = () => {
    if (group.trim() === '') {
      Alert.alert('Fehler', 'Bitte geben Sie einen Gruppennamen ein.');
      return;
    }

    Alert.alert(
      "Sicherheitsfrage",
      `Bist du sicher, dass "${group}" dein Gruppenname ist?`,
      [
        {
          text: "Abbrechen",
          style: "cancel",
        },
        {
          text: "Ja, Antwort bestätigen",
          onPress: () => {
            setConfirmedGroup(group);
            setShowModal2(false);
            setShowModal3(true);
          },
        },
      ],
    );
  };

  const handleGroupMembersSubmit = () => {
    if (groupMembers.trim() === '') {
      Alert.alert('Fehler', 'Bitte geben Sie einen Gruppengröße ein.');
      return;
    }

    Alert.alert(
      "Sicherheitsfrage",
      `Bist du sicher, dass ihr insgesamt"${groupMembers}" Personen in der Gruppe seid?`,
      [
        {
          text: "Abbrechen",
          style: "cancel",
        },
        {
          text: "Ja, Antwort bestätigen",
          onPress: () => {
            setConfirmedGroupMembers(groupMembers);
            setShowModal3(false);
            setEnabled(true)
          },
        },
      ],
    );
  };

  return (
    <NavigationContainer>
      {enabled ? (
          <Stack.Navigator>
          <Stack.Screen name="Ralley" component={TabScreen} options={{headerShown: false}}/>
          <Stack.Screen name="Impressum" component={ImpressumScreen} options={{ headerStyle: {backgroundColor: Color.dhbwRed}, headerTintColor: Color.tabHeader}}/>
          <Stack.Screen name="Sprache" component={SpracheScreen} options={{ headerStyle: {backgroundColor: Color.dhbwRed}, headerTintColor: Color.tabHeader}}/>
          <Stack.Screen name="Informationen" component={InformationenScreen} options={{ headerStyle: {backgroundColor: Color.dhbwRed}, headerTintColor: Color.tabHeader}}/>
          <Stack.Screen name="Wissensfragen" component={Wissensfragen} options={{ headerStyle: {backgroundColor: Color.dhbwRed}, headerTintColor: Color.tabHeader}}/>
          <Stack.Screen name="QRCodeFragen" component={QRCodeFragen} options={{ headerStyle: {backgroundColor: Color.dhbwRed}, headerTintColor: Color.tabHeader}}/>
          <Stack.Screen name="BildFragen" component={BildFragen} options={{ headerStyle: {backgroundColor: Color.dhbwRed}, headerTintColor: Color.tabHeader}}/>
          <Stack.Screen name="QRScan" component={QRScan} options={{ headerStyle: {backgroundColor: Color.dhbwRed}, headerTintColor: Color.tabHeader}}/>
        </Stack.Navigator>
      ) : <View>
        <Modal visible={showModal} animationType="slide" transparent={true}>
    <View style={styles.modalContainer}>
    <View style={styles.modalContent}>
    <Text style={styles.modalText}>{anweisung}</Text>
    <TextInput
               style={styles.input}
               value={password}
               onChangeText={setpassword}
               placeholder="Gib hier das Passwort ein"
             />
    <Button
               title="Passwort Absenden"
               onPress={handlePasswordSubmit}
               disabled={!password}
             />
    </View>
    </View>
    </Modal>
    <Modal visible={showModal2} animationType="slide" transparent={true}>
    <View style={styles.modalContainer}>
    <View style={styles.modalContent}>
    <Text style={styles.modalText}>{anweisung2}</Text>
    <TextInput
               style={styles.input}
               value={group}
               onChangeText={setGroup}
               placeholder="Gib hier deinen Gruppennamen ein"
             />
    <Button
               title="Name Absenden"
               onPress={handleGroupSubmit}
               disabled={!group}
             />
    </View>
    </View>
    </Modal>
    <Modal visible={showModal3} animationType="slide" transparent={true}>
    <View style={styles.modalContainer}>
    <View style={styles.modalContent}>
    <Text style={styles.modalText}>{anweisung3}</Text>
    <TextInput
               style={styles.input}
               value={groupMembers}
               onChangeText={setGroupMembers}
               placeholder="Gib hier die Namen der Mitglieder ein"
             />
    <Button
               title="Namen Absenden"
               onPress={handleGroupMembersSubmit}
               disabled={!groupMembers}
             />
    </View>
    </View>
    </Modal>
        </View>}
      </NavigationContainer> 
  );
}

function TabScreen() {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'DHBW Campus Ralley') {
            iconName = 'map';
          } else if (route.name === 'Einstellungen') {
            iconName = 'settings';
          } else if (route.name === 'Gruppe') {
            iconName = 'people';
          }
          return <MaterialIcon name={iconName} size={size} color={focused ? Color.dhbwRed : Color.dhbwGray}/>;
        },
        tabBarActiveTintColor: Color.dhbwRed,
        tabBarInactiveTintColor: Color.dhbwGray,
      })}>
      <Tab.Screen name="Gruppe" component={GroupScreen} options={{ headerStyle: {backgroundColor: Color.dhbwRed}, headerTintColor: Color.tabHeader}}/>
      <Tab.Screen name="DHBW Campus Ralley" component={RalleyScreen} options={{ headerStyle: {backgroundColor: Color.dhbwRed}, headerTintColor: Color.tabHeader}}/>
      <Tab.Screen name="Einstellungen" component={SettingsScreen} options={{ headerStyle: {backgroundColor: Color.dhbwRed}, headerTintColor: Color.tabHeader}}/>
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  padding: 20,
  },
  modalContainer: {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
  backgroundColor: '#fff',
  borderRadius: 10,
  padding: 20,
  width: '80%',
  alignItems: 'center',
  },
  modalText: {
  fontSize: 20,
  marginBottom: 20,
  textAlign: 'center',
  },
  inputLabel: {
  fontSize: 16,
  marginBottom: 5,
  },
  input: {
  width: '100%',
  height: 40,
  borderColor: 'gray',
  borderWidth: 1,
  marginBottom: 20,
  paddingHorizontal: 10,
  },
  answerContainer: {
  marginTop: 20,
  alignItems: 'center',
  },
  answerLabel: {
  fontSize: 16,
  fontWeight: 'bold',
  marginBottom: 5,
  },
  answer: {
  fontSize: 16,
  },
  section: {
    marginTop: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '100%',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  label: {
    fontSize: 16,
    color: '#666',
    marginRight: 5,
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  });