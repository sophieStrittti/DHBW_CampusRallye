import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';

export default function QuestionScreen() {
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState('');

  useEffect(() => {
    const fetchQuestion = async () => {
      const questionRef = firestore().collection('questions').doc('randomQuestion');
      const doc = await questionRef.get();
      if (!doc.exists) {
        console.log('No such document!');
      } else {
        setQuestion(doc.data().text);
      }
    };
    fetchQuestion();
  }, []);

  const saveAnswer = async () => {
    const answersRef = firestore().collection('answers');
    const newAnswerRef = await answersRef.add({
      question: question,
      answer: answer,
    });
    console.log('Answer saved with ID: ', newAnswerRef.id);
    setAnswer('');
  };

  return (
    <View style={styles.container}>
      {question && (
        <>
          <Text style={styles.question}>{question}</Text>
          <TextInput
            style={styles.input}
            onChangeText={text => setAnswer(text)}
            value={answer}
            placeholder="Enter your answer"
          />
          <TouchableOpacity style={styles.button} onPress={saveAnswer}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  question: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
