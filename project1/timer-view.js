import React from 'react'
import { Button, StyleSheet, Text, View, Row } from 'react-native';
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
        <Text>
          {this.state.isWork ? 'Focus' : 'Rest'}
          {'\n'}
          {this.getTimeString(this.state.timeLeft)}
        </Text>
        <Button
          title="Edit"
          accessibilityLabel="Change the length of work and rest times"
          color="#841584"
          onPress={this.props.onEditPress}
        />
        <Button
          title="Reset"
          accessibilityLabel="Start the next work period"
          color="#841584"
          onPress={this.reset}
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
      return {
        ...this.state,
        timeLeft: this.state.timeLeft - 1
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
