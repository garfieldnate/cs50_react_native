import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {PropTypes} from 'prop-types';

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isWork: true,
      isTimerRunning: true,
      timeLeft: this.props.secondsPerWork,
    }
  }

  static propTypes = {
    secondsPerWork: PropTypes.number,
    secondsPerRest: PropTypes.number,
  }

  render() {
    return (
      <Text>
        {this.state.isWork ? 'Focus' : 'Rest'}
        {'\n'}
        {this.getTimeString(this.state.timeLeft)}
      </Text>
    )
  }

  componentDidMount = () => {
    if(this.state.isTimerRunning) {
      this.state.interval = setInterval(this.decrementSeconds, 1000)
    }
  }

  componentWillUnmount = () => {
    clearInterval(this.state.interval)
  }

  componentDidUpdate = () => {
    if (this.state.timeLeft < 0) {
      this.changeTimers()
    }
  }

  changeTimers = () => {
      const isWork = !this.state.isWork
      const timeLeft = isWork ? this.props.secondsPerWork : this.props.secondsPerRest
      this.setState((prevState, props) => {
        return {
          ...this.state,
          'isWork': !this.state.isWork,
          'timeLeft': timeLeft
        }
      })
  }

  decrementSeconds = () => {
    this.setState((prevState, props) => {
      return {
        ...this.state,
        'timeLeft': this.state.timeLeft - 1
      }
    })
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
}

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Timer secondsPerWork={3} secondsPerRest={3}></Timer>
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
