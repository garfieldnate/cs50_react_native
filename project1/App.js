import React from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import {PropTypes} from 'prop-types';
import ChangeTimesView from './change-times-view.js'
import TimerView from './timer-view.js'

export default class App extends React.Component {
  state = {
    'editing': false,
    'workMins': 25,
    'restMins': 5
  }
  render() {
    if(this.state.editing) {
      return (
        <ChangeTimesView
          onAccept={() => this.setState({'editing': false})}
          onCancel={() => this.setState({'editing': false})}
        />
      )
    } else {
      return (
        <TimerView
          secondsPerWork={3}
          secondsPerRest={3}
          onEditPress={() => this.setState({'editing': true})}
        />
      )
    }
  }
}
