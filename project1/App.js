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

  formatSeconds = (seconds) => {
    if(seconds < 10) {
      return "0" + seconds
    } else {
      return seconds
    }
  }

  getTimeString = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const remainderSeconds = seconds - minutes * 60
    return minutes + ":" + this.formatSeconds(remainderSeconds)
  }

  render() {
    return (
      <Text>{this.getTimeString(this.state.timeLeft)}</Text>
    )
  }

  static propTypes = {
    secondsPerWork: PropTypes.number,
    secondsPerRest: PropTypes.number,
  }
}

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Open up Ap.js to start working on your app!</Text>
        <Timer secondsPerWork={70} secondsPerRest={60}></Timer>
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
