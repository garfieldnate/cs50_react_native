import React from 'react'
import { Button, StyleSheet, Text, View} from 'react-native';
import {Constants} from 'expo'
import PropTypes from 'prop-types'

export default class TimerView extends React.Component{
  static propTypes = {
    onEditPress: PropTypes.func.isRequired,
    secondsPerWork: PropTypes.number.isRequired,
    secondsPerRest: PropTypes.number.isRequired,
  }
  state = {
    isWork: true,
    isTimerRunning: true,
    timeLeft: this.props.secondsPerWork,
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={[styles.mode, styles.working]} textAlign='center'>
          {this.state.isWork ? 'Focus' : 'Rest'}
        </Text>
        <Text style={styles.timer}>
          {this.getTimeString(this.state.timeLeft)}
        </Text>
        <Button
          title="Edit"
          accessibilityLabel="Change the length of work and rest times"
          onPress={this.props.onEditPress}
          color="black"
        />
        <Button
          title="Reset"
          accessibilityLabel="Start the next work period"
          onPress={this.reset}
          style={styles.controls}
          color="black"
        />
        <Button
          title="Pause/Start"
          accessibilityLabel="Pause or start the timer"
          onPress={this.toggleTimerRunning}
          color="black"
        />
      </View>
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
          isWork: !this.state.isWork,
          timeLeft: timeLeft
        }
      })
  }

  decrementSeconds = () => {
    this.setState((prevState, props) => {
      const newTimeLeft = prevState.isTimerRunning ? prevState.timeLeft - 1 : prevState.timeLeft
      return {
        ...prevState,
        timeLeft: newTimeLeft
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

  reset = () => {
    this.setState({isWork: true, timeLeft: this.props.secondsPerWork})
  }

  toggleTimerRunning = () => {
    this.setState(prevState => {
      return {
        ...prevState,
        isTimerRunning: !prevState.isTimerRunning
      }
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    backgroundColor: '#FFFFFC',
    paddingTop: Constants.statusBarHeight
  },
  mode: {
    fontSize: 40,
    height: 100,
    textAlign: 'center',
    padding: 20
  },
  working: {
    backgroundColor: '#B2FF59'
  },
  resting: {
    backgroundColor: '#BEB7A4'
  },
  timer: {
    fontSize: 60,
    textAlign: 'center'
  }
});
