import React from 'react';
import {StatusBar} from 'react-native'
import ChangeTimesView from './change-times-view.js'
import TimerView from './timer-view.js'

export default class App extends React.Component {
  state = {
    'editing': false,
    'workMins': 25,
    'restMins': 5
  }

  editTimers = (workMins, restMins) => {
    this.setState((prevState, props) => {
      return {
        ...prevState,
        workMins,
        restMins,
        'editing': false
      }
    });
  }

  cancelEdit = () => {
    this.setState((prevState, props) => {
      return  {
        ...prevState,
        'editing': false
      }
    });
  }

  componentDidMount() {
    // this is a focus app; hide distractions!
    StatusBar.setHidden(true);
  }

  render() {
    if(this.state.editing) {
      return (
        <ChangeTimesView
          onAccept={this.editTimers}
          onCancel={this.cancelEdit}
          defaultWorkMins={this.state.workMins}
          defaultRestMins={this.state.restMins}
        />
      )
    } else {
      return (
        <TimerView
          secondsPerWork={60 * this.state.workMins}
          secondsPerRest={60 * this.state.restMins}
          onEditPress={() => this.setState({'editing': true})}
        />
      )
    }
  }
}
