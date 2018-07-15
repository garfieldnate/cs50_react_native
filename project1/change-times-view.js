import React from 'react'
import {Button, View, TextInput, StyleSheet} from 'react-native'
import {PropTypes} from 'prop-types'

export default class ChangeTimesView extends React.Component {
  static propTypes = {
    'onAccept': PropTypes.func,
    'onCancel': PropTypes.func,
    'defaultWorkMins': PropTypes.number,
    'defaultRestMins': PropTypes.number,
  }
  state = {
    'workMinsInput': this.props.defaultWorkMins,
    'restMinsInput': this.props.defaultRestMins
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          //onChangeText={(text) => check that it's a number}
          value={""+this.state.workMins}
          selectTextOnFocus={true}
          maxLength={3}
          keyboardType="numeric"
        />
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          //onChangeText={(text) => check that it's a number}
          value={""+this.state.restMins}
          selectTextOnFocus={true}
          maxLength={3}
          keyboardType="numeric"
        />
        <Button title="Done" onPress={this.props.onAccept}/>
        <Button title="Cancel" onPress={this.props.onCancel} />
      </View>
    )
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
