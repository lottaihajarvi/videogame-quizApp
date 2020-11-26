import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Alert, TextInput } from 'react-native';
import { Header, Button, Icon, Input, ListItem } from 'react-native-elements';
// import getData from './finalproject/Quiz';

export default function Home( { navigation }) {

  const [username, setUsername] = useState('');

  return (
    <View style={styles.container}>
     <View style={styles.headercontainer}>
       <Header
          leftComponent={{ icon: 'menu', color: '#fff' }}
          centerComponent={{ text: 'The Impossible Video Game Quiz', style: { color: '#fff', textAlign: 'center', fontSize: 16 } }}
          rightComponent={{ icon: 'home', color: '#fff' }}
          containerStyle={{ backgroundColor: '#517fa4', height: 100 }}
       />
     <View style={styles.startcontainer}>
      <Icon name="gamepad-variant" type="material-community" size={100}/>
      <TextInput
          style={{ fontSize: 18, fontStyle: 'italic', width: 150, height: 50, marginTop: 20, marginBottom: 10, textAlign: 'center', borderColor: 'gray', borderWidth: 1, borderRadius: 50 }}
          placeholder='username'
          onChangeText={username => setUsername(username)}
        />
       <Button buttonStyle={{ width: 200, height: 50, marginTop: 10, marginBottom: 100, borderRadius: 20, backgroundColor: '#517fa4' }} onPress={() => navigation.navigate('Quiz', {username})} title="Start Quiz" />
      </View>
    </View>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eef3f7',
    alignItems: 'center',
    justifyContent: 'center',

  },

  headercontainer: {
    flex: 1,
    width: 500,
    height: 100

  },

  startcontainer: {
    flex: 1,
    marginTop: 10,
    flexDirection: 'column',
    marginTop: 200,
    marginBottom: 10,
    alignItems: 'center'


  },

  });
