import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Alert, TextInput } from 'react-native';
import { Header, Button, Icon, Input, ListItem } from 'react-native-elements';
import * as firebase from 'firebase';

// const firebaseConfig = {
//   apiKey: "AIzaSyBSC3m8tnKdvODV-Mvy8dOQ2J0nmE2NBKM",
//   authDomain: "videogame-quiz-6f75d.firebaseapp.com",
//   databaseURL: "https://videogame-quiz-6f75d.firebaseio.com",
//   projectId: "videogame-quiz-6f75d",
//   storageBucket: "videogame-quiz-6f75d.appspot.com",
//   messagingSenderId: "158069297665",
//   appId: "1:158069297665:web:2e422d2514d94edf2de600",
//   measurementId: "G-XSPDQY7XG8"
// };

// firebase.initializeApp(firebaseConfig);

export default function Quiz( { route, navigation }) {

  const [questions, setQuestions] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [incorrectAnswers, setIncorrectAnswers] = useState([]);
  const [allAnswers, setAllAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [scores, setScores] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);

  const { username } = route.params;

  //when quiz is started, score is 0 and no questions have been answered
  useEffect(() => {
     getData();
     setScore(0);
     setQuestionIndex(0);
    //  firebase.database().ref('scores/').on('value', snapshot => {
    //   const data = snapshot.val();
    //   const prods = Object.values(data);
    //   setScores(prods);
    // });
   }, []);

  //  const saveScore = () => {
  //   firebase.database().ref('scores/').push(
  //     {'username': username, 'score': score}
  //   );
  // }

  //get guestions and answers data from open trivia database
  const getData = () => {
    fetch('https://opentdb.com/api.php?amount=10&category=15&difficulty=hard&type=multiple')
          .then(response => response.json()) 
          .then(loadedQuestions => {
            setQuestions(loadedQuestions.results[0].question);
            setCorrectAnswer(loadedQuestions.results[0].correct_answer);
            setIncorrectAnswers(loadedQuestions.results[0].incorrect_answers);
            const answers = [...loadedQuestions.results[0].incorrect_answers, loadedQuestions.results[0].correct_answer];
            const shuffleAnswers = shuffleArray(answers);
            setAllAnswers(shuffleAnswers);
            setQuestionIndex(questionIndex + 1);
          })
            .catch(err => console.error(err))
    }
    

  //shuffle array of questions
  const shuffleArray = (allAnswers) => {
    for (var i = allAnswers.length - 1; i > 0; i--) {  

      var index = Math.floor(Math.random() * (i + 1));  

      var temp = allAnswers[i];
      allAnswers[i] = allAnswers[index];
      allAnswers[index] = temp;
    }

    return allAnswers;
  }

  //check if answer is correct, give points, mark question as answered in the question index
  const checkAnswer = (allAnswers) => {
      if (allAnswers === correctAnswer) {
        setScore(score + 1);
        getData();
        setQuestionIndex(questionIndex + 1);
      }
      else {
        getData();
        setQuestionIndex(questionIndex + 1);
      }
    }

    //when all questions have been answered -> endpage.js
    if (questionIndex >= 11) {
      navigation.navigate('Results', {username, score})
    }


  return (
    <View style={styles.container}>
      <View style={styles.bgcontainer}>
        <Text style={{ width: 400, color: 'white', fontSize: 18, textAlign: 'center', paddingTop: 80, alignSelf:'center', justifyContent:'center', alignItems:'center' }}>Score: {score}/10</Text>
        <Text style={{ width: 400, color: 'white', fontSize: 18, textAlign: 'center', paddingTop: 90, alignSelf:'center', justifyContent:'center', alignItems:'center' }}>{questions}</Text>
      </View>
      <View style={styles.optionscontainer}>
        <Button buttonStyle={{ width: 300, marginBottom: 10, borderRadius: 20}} title={allAnswers[0]} type="outline" onPress={() => checkAnswer(allAnswers[0])}/>
        <Button buttonStyle={{ width: 300, marginBottom: 10, borderRadius: 20}} title={allAnswers[1]} type="outline" onPress={() => checkAnswer(allAnswers[1])}/>
        <Button buttonStyle={{ width: 300, marginBottom: 10, borderRadius: 20}} title={allAnswers[2]} type="outline" onPress={() => checkAnswer(allAnswers[2])}/>
        <Button buttonStyle={{ width: 300, marginBottom: 10, borderRadius: 20}} title={allAnswers[3]} type="outline" onPress={() => checkAnswer(allAnswers[3])}/>
      </View>
      <View style={styles.buttoncontainer}>
        <Icon reverse type="material-community" name="skip-next-outline" color='#517fa4' size={30} onPress={getData} />
      </View>
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

  buttoncontainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
      marginBottom: 20,
      marginLeft: 300

    },

    bgcontainer: {
      flex: 2,
      backgroundColor: '#517fa4',
      width: 500,

    },

    optionscontainer: {
        flex: 1,
        marginTop: 40,
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginBottom: 10
    
      },

      listcontainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        alignItems: 'center',
     
      },

  });
