import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';

export default function GroupScreen() {
  const [anweisung, setAnweisung] = useState("Bitte geben Sie einen Gruppennamen ein");
  const [group, setGroup] = useState("");
  const [confirmedGroup, setConfirmedGroup] = useState("");

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
          onPress: () => setConfirmedGroup(group),
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.question}>{anweisung}</Text>
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
      {confirmedGroup ? (
        <View style={styles.answerContainer}>
          <Text style={styles.answerLabel}>Bestätigter Name:</Text>
          <Text style={styles.answer}>{confirmedGroup}</Text>
        </View>
      ) : null}
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
  question: {
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
});