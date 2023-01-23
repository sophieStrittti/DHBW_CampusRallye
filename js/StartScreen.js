/* home screen */

/* TO DO: EDIT & ADD IMPORTS!!! -> moved from App.js*/
const HomeScreen = ({navigation}) => {

    /* Disables to go back to privacy agreement screen. RalleyScreen is now the home Screen. */
    React.useEffect(() =>
      navigation.addListener('beforeRemove', (e) => {
        e.preventDefault();
      })
    );
  
    /* page content -> TO DO: SAVE INPUT CONTENT*/
    return (
      <View style={styles.container}>
        <Text style={styles.ownHeading}>Willkommen zur DHBW Campus Ralley!</Text>
        <Text style={styles.ownText}>Bitte den Gruppennamen und die Teilnehmer eingeben.</Text>
        <View style={styles.contentView}>
          <Text>Gruppenname:</Text>
          <TextInput style={styles.textInput}>bitte eingeben</TextInput>
          <Text>Gruppenmitglied</Text>
          <TextInput style={styles.textInput}>bitte eingeben</TextInput>
          <Text>Gruppenmitglied</Text>
          <TextInput style={styles.textInput}>bitte eingeben</TextInput>
          <Text>Gruppenmitglied</Text>
          <TextInput style={styles.textInput}>bitte eingeben</TextInput>
        </View>
        <Button  
          title='Starten' 
          color='red' 
          onPress={() => {navigation.navigate('DHBW Campus Ralley')}}
        />
      </View>
    );
  }
  