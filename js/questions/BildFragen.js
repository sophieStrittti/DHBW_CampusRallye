import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image, Alert, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import * as MailComposer from 'expo-mail-composer';

export default function BildFragen() {
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, wir benötigen die Berechtigung zur Nutzung der Kamera!');
        }
      }
    })();
  }, []);

  const handleLaunchCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setSelectedImage(result.uri);
    }
  };

  const handleSendEmail = async () => {
    const hasPermission = await MediaLibrary.requestPermissionsAsync();

    if (!hasPermission.granted) {
      Alert.alert('Berechtigung erforderlich', 'Bitte gewähren Sie uns Zugriff auf Ihre Mediathek!');
      return;
    }

    if (!selectedImage) {
      Alert.alert('Fehler', 'Bitte wählen Sie ein Bild oder Video aus!');
      return;
    }

    let asset = await MediaLibrary.createAssetAsync(selectedImage);

    MailComposer.composeAsync({
      recipients: ['example@mail.com'],
      subject: 'Gruppenfoto Gruppe: ',
      body: 'Das ist unser Gruppenfoto!',
      attachments: [asset.uri],
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Sucht euch einen schönen Ort und macht gemeinsam ein Gruppenfoto</Text>
      <View style={styles.imageContainer}>
        {selectedImage ? (
          <Image source={{ uri: selectedImage }} style={styles.image} />
        ) : (
          <Text style={styles.noImageText}>Kein Foto ausgewählt</Text>
        )}
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Bild aufnehmen" onPress={handleLaunchCamera} style={styles.button} />
        <Button title="Senden" onPress={handleSendEmail} disabled={!selectedImage} style={styles.button} />
      </View>
      <Text style={styles.infoText}>Das aufgenommene Foto soll über den Button "SENDEN" per E-Mail gesendet werden</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  imageContainer: {
    backgroundColor: '#F2F2F2',
    borderRadius: 10,
    overflow: 'hidden',
    width: '100%',
    aspectRatio: 4 / 3,
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  noImageText: {
    fontSize: 16,
    textAlign: 'center',
    paddingVertical: 20,
  },
  buttonContainer: {
    width: '100%',
  },
});
