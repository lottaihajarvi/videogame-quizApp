import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Alert, TextInput } from 'react-native';
import { Header, Button, Icon, Input, ListItem } from 'react-native-elements';

export default function EndPage({ route, navigation }) {

  const { score, username } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.bgcontainer}>
        <View style={styles.textcontainer}>
          <Text style={{ color: 'white', fontSize: 18, paddingTop: 50}}>Your results:</Text>
          <Text style={{ color: 'white', fontSize: 18, paddingTop: 20}}>{username}: {score}/10</Text>
          <Text style={{ color: 'white', fontSize: 18, paddingTop: 20}}>Highscores:</Text>
          {/* <FlatList
            data={items}
            keyExtractor={(item, index) => index.toString()} 
            renderItem={({item}) => <View style={styles.listcontainer}><Text style={{fontSize: 15}}>{item.product}, {item.amount}</Text>
        </View>} 
      />*/}
      
        </View>
      </View>
          <Button icon={{name: 'repeat', color: '#fff', textAlign: 'center'}} buttonStyle={{ width: 200, height: 50, marginTop: 50, marginBottom: 50, borderRadius: 20, backgroundColor: '#517fa4'}} title="Try Again" type="solid" onPress={() => navigation.navigate('Home')}/>
          
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

  textcontainer: {
    textAlign: 'center',
    paddingTop: 20,
    alignSelf: 'center',
    justifyContent:'center',
    alignItems: 'center'

  },

    bgcontainer: {
      flex: 3,
      backgroundColor: '#517fa4',
      width: 500

    },

  });

