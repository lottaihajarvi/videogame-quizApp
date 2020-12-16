import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { Button, Icon, ListItem, Avatar } from 'react-native-elements';
import * as SQLite from 'expo-sqlite';


export default function EndPage({ route, navigation }) {


  const db = SQLite.openDatabase('hscoredb.db');

  const { username, score } = route.params;
  const [scores, setScores] = useState([]);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('create table if not exists hscore (id integer primary key not null, score int, username text);');
    }, null, updateList);
  }, []);

  //save highscore
  const saveHighscore = () => {
    db.transaction(tx => {
      tx.executeSql('insert into hscore (score, username) values (?, ?);', [parseInt(score), username]);
    }, null, updateList
    )
  }

  //update list of highscores
  const updateList = () => {
    db.transaction(tx => {
      tx.executeSql('select * from hscore;', [], (_, { rows }) =>
        setScores(rows._array)
      );
    });
  }

  //delete highscore
  const deleteHighscore = (id) => {
    db.transaction(
      tx => {
        tx.executeSql(`delete from hscore where id = ?;`, [id]);
      }, null, updateList
    )
  }

  //list of highscores
  const renderHighscore = ({ item }) => (
    <ListItem bottomDivider>
      <Avatar rounded icon={{ name: 'user', color: '#fff', type: 'font-awesome' }} overlayContainerStyle={{ backgroundColor: 'gray' }} />
      <ListItem.Content>
        <ListItem.Title style={{ fontFamily: 'serif' }}>{item.username}</ListItem.Title>
        <ListItem.Subtitle>{item.score}/10</ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron type="material-community" name="delete-sweep-outline" color='#517fa4' size={30} onPress={() => deleteHighscore(item.id)} />
    </ListItem>
  )

  //show results and highscores
  return (
    <View style={styles.container}>
      <View style={styles.bgcontainer}>
        <View style={styles.textcontainer}>
          <View style={styles.iconcontainer}>
            <Icon type="material-community" name="balloon" color='#fff' size={50} />
            <Icon type="material-community" name="balloon" color='#fff' size={30} />
            <Text style={{ color: 'white', fontSize: 21, fontFamily: 'serif', fontWeight: 'bold', paddingTop: 15, marginLeft: 50, marginRight: 50 }}>Your results:</Text>
            <Icon type="material-community" name="balloon" color='#fff' size={30} />
            <Icon type="material-community" name="balloon" color='#fff' size={50} />
          </View>
          <View style={styles.resultscontainer}>
            <Text style={{ color: 'white', fontSize: 20, fontFamily: 'serif', paddingTop: 10, marginBottom: 20, marginRight: 10 }}>{username}: {score}/10</Text>
            <Icon type="material-community" name="plus-circle-outline" color='#fff' size={45} onPress={saveHighscore} />
          </View>
          <View style={styles.iconcontainer}>
            <Icon type="material-community" name="trophy" color='#fff' size={29} />
            <Text style={{ color: 'white', fontSize: 20, fontFamily: 'serif', marginLeft: 10, marginRight: 10 }}>Highscores</Text>
            <Icon type="material-community" name="trophy" color='#fff' size={29} />
          </View>
          <View style={styles.listcontainer}>
            <FlatList
              data={scores.sort((a, b) => b.score - a.score)}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderHighscore}
            />
          </View>
        </View>
      </View>
      <View style={styles.buttoncontainer}>
        {/* <Button icon={{ name: 'trophy', type: 'material-community', color: '#fff', textAlign: 'center' }} buttonStyle={{ width: 200, height: 50, marginTop: 20, marginBottom: 30, borderRadius: 20, backgroundColor: '#517fa4' }} title="View Highscores" type="solid" onPress={() => navigation.navigate('High Scores', { username, score, scores, deleteHighscore })} />  */}
        <Button icon={{ name: 'repeat', color: '#fff', textAlign: 'center' }} buttonStyle={{ width: 200, height: 50, marginTop: 20, marginBottom: 30, borderRadius: 20, backgroundColor: '#517fa4' }} title="Try Again" type="solid" onPress={() => navigation.navigate('Home')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: '#eef3f7',
    alignItems: 'center',
    justifyContent: 'center'

  },

  textcontainer: {
    textAlign: 'center',
    paddingTop: 20,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center'

  },

  resultscontainer: {
    flexDirection: 'row',
    textAlign: 'center',
    paddingTop: 20


  },

  iconcontainer: {
    flexDirection: 'row',
    paddingTop: 20


  },

  bgcontainer: {
    flex: 3,
    backgroundColor: '#517fa4',
    width: 500

  },

  listcontainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#517fa4',
    alignItems: 'flex-start',
    width: 410,
    marginTop: 15,
    borderRadius: 100

  },

  buttoncontainer: {
    flexDirection: 'row'

  }

});

