import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './finalproject/Home';
import Quiz from './finalproject/Quiz';
import EndPage from './finalproject/EndPage';

  const Stack = createStackNavigator();
  
  // use as App.js
  export default class App extends React.Component { 
  render() {
  return (
  <NavigationContainer>
    <Stack.Navigator screenOptions={{headerTitleAlign: 'center'}}>
      <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
      <Stack.Screen name="Quiz" component={Quiz} options={{headerShown: false}}/>
      <Stack.Screen name="Results" component={EndPage} options={{headerShown: false}}/>
    </Stack.Navigator>
  </NavigationContainer>
    );
  }
}
