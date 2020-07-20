import * as React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, ToastAndroid } from 'react-native';
// import Sound from 'react-native-sound';

const App = () => {
  const normalCount = 15;
  const breakCount = 10;
  const defaultIterations = 3;

  const [counter, setCounter] = useState(0);
  const [iteration, setIteration] = useState(defaultIterations); // Keep track of the number of reps
  const [isBreak, setBreak] = useState(null); // Keep track of when is break

  // const tickingSound = new Sound('ticking-time.wav');
  // const playTick = () => {
  //   tickingSound.play();
  // }

  const showToast = (message) => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  }

  // Track break
  useEffect(() => {
    if (isBreak != null) {    
      setTimeout(() => {
        if (isBreak) {
          setCounter(breakCount);
          showToast('Break!');
        } else {
          setCounter(normalCount);
          showToast('Back at it!');
        }
      }, 500);
    }
  }, [isBreak]);

  // Track counter
  useEffect(() => {

    if (counter <= 0 && iteration > 0 && isBreak != null) {
      if (isBreak) {
        setBreak(false)
      } else {
        setBreak(true);
        setIteration(iteration - 1);
        console.log(iteration);
      }
    }

    const timer = counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer)

    
  }, [counter]);
  

  return (
    <View style={styles.container}>
      <Text style={styles.seconds}>{counter}</Text>
      <Button
        title="Begin"
        onPress={() => {
          setCounter(normalCount);
          setIteration(defaultIterations);
          setBreak(false);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black'
  },
  seconds: {
    fontSize: 180,
    textAlign: 'center',
    margin: 10,
    color: 'white'
  },
});

export default App;