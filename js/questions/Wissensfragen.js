import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';

export default function Wissensfragen() {
  const [question, setQuestion] = useState("Was bedeutet die Abkürzung DHBW?");
  const [answer, setAnswer] = useState("");
  const [confirmedAnswer, setConfirmedAnswer] = useState("");

  const handleAnswerSubmit = () => {
    if (answer.trim() === '') {
      Alert.alert('Fehler', 'Bitte geben Sie eine Antwort ein.');
      return;
    }

    Alert.alert(
      "Sicherheitsfrage",
      `Bist du sicher, dass "${answer}" deine endgültige Antwort ist?`,
      [
        {
          text: "Abbrechen",
          style: "cancel",
        },
        {
          text: "Ja, Antwort bestätigen",
          onPress: () => setConfirmedAnswer(answer),
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.question}>{question}</Text>
      <Text style={styles.inputLabel}>Antwort:</Text>
      <TextInput
        style={styles.input}
        value={answer}
        onChangeText={setAnswer}
        placeholder="Gib hier deine Antwort ein"
      />
      <Button
        title="Antwort Absenden"
        onPress={handleAnswerSubmit}
        disabled={!answer}
      />
      {confirmedAnswer ? (
        <View style={styles.answerContainer}>
          <Text style={styles.answerLabel}>Bestätigte Antwort:</Text>
          <Text style={styles.answer}>{confirmedAnswer}</Text>
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
