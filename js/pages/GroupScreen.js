import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, Modal } from 'react-native';
import { supabase } from '../../supabase';

export default function GroupScreen() {
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

  const [realpassword, setrealpassword] = useState("")

  async function getData() {
    let { data: realpassword, error } = await supabase
    .from('Ralley')
    .select('password');
    setrealpassword(realpassword[0].password);
    return realpassword;
  }
  //const realpassword = '123';
  getData();
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
          },
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
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
    <View style={styles.section}>
    <Text style={styles.sectionTitle}>Bestätigte Gruppe</Text>
    <View style={styles.row}>
      <Text style={styles.label}>Gruppen Name:</Text>
      <Text style={styles.value}>{confirmedGroup}</Text>
    </View>
    <View style={styles.row}>
      <Text style={styles.label}>Mitglieder:</Text>
      <Text style={styles.value}>{confirmedGroupMembers}</Text>
    </View>
    </View>
    </View>
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