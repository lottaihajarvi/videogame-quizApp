import React, { useState } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { Button, Icon, Text } from 'react-native-elements';


export default function Home({ navigation }) {

  const [username, setUsername] = useState('');

  //show home screen info, enter username and start quiz
  return (
    <View style={styles.container}>
      <View style={styles.bgcontainer}>
        <View style={styles.iconcontainer}>
          <Icon name="gamepad-square-outline" color="white" type="material-community" size={210} />
          <Text style={{ width: 400, color: '#fff', fontSize: 20, fontWeight: 'bold', fontFamily: 'Roboto', textAlign: 'center', alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}>Test your video game knowledge</Text>
        </View>
      </View>
      <Text h3 style={{ width: 400, color: '#324f67', textAlign: 'center', paddingTop: 40, alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}>Video Game Quiz App</Text>
      <Text style={{ width: 300, color: '#324f67', fontSize: 14, fontFamily: 'Roboto', textAlign: 'center', paddingTop: 20, alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}>You have one minute to answer 10 tough questions related to video games before the timer runs out. Good luck!</Text>
      <TextInput
        style={{ fontSize: 18, width: 170, height: 50, marginTop: 20, marginBottom: 10, textAlign: 'center', borderColor: 'gray', borderWidth: 1, borderRadius: 50 }}
        placeholder='enter username'
        onChangeText={username => setUsername(username)}
      />
      <Button buttonStyle={{ width: 200, height: 50, marginTop: 10, marginBottom: 80, borderRadius: 20, backgroundColor: '#517fa4' }} onPress={() => navigation.navigate('Quiz', { username })} title="Start Quiz" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eef3f7',
    alignItems: 'center',
    justifyContent: 'center'

  },

  bgcontainer: {
    flex: 2,
    backgroundColor: '#517fa4',
    width: 500

  },

  iconcontainer: {
    marginTop: 80

  },

});
