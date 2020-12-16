import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'


export default function Quiz({ route, navigation }) {

  const [questions, setQuestions] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [incorrectAnswers, setIncorrectAnswers] = useState([]);
  const [allAnswers, setAllAnswers] = useState('');
  const [score, setScore] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);

  const { username } = route.params;

  //when quiz is started, score is 0 and no questions have been answered
  useEffect(() => {
    getData();
    setScore(0);
    setQuestionIndex(0);
  }, []);

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

  //replace special characters in the text
  const questionsFinal = questions.replace(/&quot;/g, '"').replace(/&sup2;:/g, ' 2').replace(/&#039;s/g, '’s').replace(/&#039;/g, '"').replace(/&rsquo;s;/g, '’s').replace(/&eacute;/g, 'é');
  // const answersFinal = allAnswers.toString().replace(/&quot;/g, '"').replace(/&#039;/g, '"').replace(/&#039;s/g, '’s').replace(/&amp;/g, '&').replace(/&#039;s/g, '’s');
  // console.log(answersFinal);


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

  //check if answer is correct, give points and mark question as answered in the question index
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
    navigation.navigate('Results', { username, score })
  }

  //show questions, score, answers, timer and skip button
  return (
    <View style={styles.container}>
      <View style={styles.bgcontainer}>
        <Text style={{ width: 400, color: 'white', fontSize: 20, fontFamily: 'serif', textAlign: 'center', paddingTop: 80, alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}>Question: {questionIndex}/10</Text>
        <Text style={{ width: 400, color: 'white', fontSize: 19, fontFamily: 'serif', textAlign: 'center', paddingTop: 10, alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}>Score: {score}</Text>
        <Text style={{ width: 390, color: 'white', fontSize: 18, fontFamily: 'serif', textAlign: 'center', paddingTop: 55, alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}>{questionsFinal}</Text>
      </View>
      <View style={styles.optionscontainer}>
        <Button buttonStyle={{ width: 300, marginBottom: 10, borderRadius: 20, backgroundColor: '#517fa4' }} title={allAnswers[0]} type="solid" onPress={() => checkAnswer(allAnswers[0])} />
        <Button buttonStyle={{ width: 300, marginBottom: 10, borderRadius: 20, backgroundColor: '#517fa4' }} title={allAnswers[1]} type="solid" onPress={() => checkAnswer(allAnswers[1])} />
        <Button buttonStyle={{ width: 300, marginBottom: 10, borderRadius: 20, backgroundColor: '#517fa4' }} title={allAnswers[2]} type="solid" onPress={() => checkAnswer(allAnswers[2])} />
        <Button buttonStyle={{ width: 300, marginBottom: 10, borderRadius: 20, backgroundColor: '#517fa4' }} title={allAnswers[3]} type="solid" onPress={() => checkAnswer(allAnswers[3])} />
      </View>
      <View style={styles.buttoncontainer}>
        <View style={styles.timercontainer}>
          <CountdownCircleTimer
            isPlaying
            duration={60}
            size={120}
            colors="#517fa4"
            onComplete={() => {
              navigation.navigate('Results', { username, score })
              //    return [true, 0]
            }}
          >
            {({ remainingTime }) => (
              <Animated.Text
                style={{ ...styles.remainingTime }}>
                {remainingTime}
              </Animated.Text>
            )}
          </CountdownCircleTimer>
        </View>
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
    marginLeft: 300,
    marginRight: 10

  },

  timercontainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignSelf: 'center',
    alignItems: 'flex-end',
    backgroundColor: '#eef3f7',
    marginRight: 60,
    marginTop: 140,
    marginBottom: 10

  },

  remainingTime: {
    fontSize: 20,
  },

  bgcontainer: {
    flex: 1.8,
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
