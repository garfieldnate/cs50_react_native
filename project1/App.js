import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {PropTypes} from 'prop-types';

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isWork: true,
      isTimerRunning: false,
      timeLeft: this.props.secondsPerWork,
    }
    setInterval(this.decrementSeconds, 1000)
  }

  decrementSeconds = () => {
    this.setState({
      ...this.state,
      'timeLeft': this.state.timeLeft - 1
    })//, checkTime
  }

  getTimeString = (seconds) => {
    return seconds
  }

  render() {
    return (
      <Text>{this.getTimeString(this.state.timeLeft)}</Text>
    )
  }

  static propTypes = {
    secondsPerWork: PropTypes.integer,
    secondsPerRest: PropTypes.integer,
  }
}

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Open up Ap.js to start working on your app!</Text>
        <Timer secondsPerWork={60} secondsPerRest={60}></Timer>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
