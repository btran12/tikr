import * as React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
// import Sound from 'react-native-sound';

export default function App() {
  const normalCount = 15;
  const breakCount = 10;
  const defaultIterations = 3;

  const [counter, setCounter] = useState(0);
  const [iteration, setIteration] = useState(defaultIterations); // Keep track of the number of reps
  const [isBreak, setBreak] = useState(null); // Keep track of when is break

  // Run when iteration is updated
  useEffect(() => {
    if (isBreak != null) {    
      setTimeout(() => {
        if (isBreak) {
          setCounter(breakCount);
        } else {
          setCounter(normalCount);
        }
      }, 500);
    }
  }, [isBreak]);

  // Run when counter is updated
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
    backgroundColor: '#7A9E9F'
  },
  seconds: {
    fontSize: 180,
    textAlign: 'center',
    margin: 10,
    color: '#FE5F55'
  },
});
