import React from 'react'
import {Button, View, TextInput, StyleSheet} from 'react-native'
import PropTypes from 'prop-types'

// We can't control TextInput due to the issue below: https://github.com/facebook/react-native/issues/18219
// Waiting for PR to be merged: https://github.com/facebook/react-native/pull/18278

export default class ChangeTimesView extends React.Component {
  static propTypes = {
    onAccept: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    defaultWorkMins: PropTypes.number.isRequired,
    defaultRestMins: PropTypes.number.isRequired,
  }
  state = {
    workMinsInput: this.props.defaultWorkMins,
    restMinsInput: this.props.defaultRestMins,
  }

  handleInputChange = propName => newVal => {
    this.setState({workMinsInput: newVal})
  }

  render() {
    return (
      <View style={{paddingTop: 20}}>
        <TextInput
          style={styles.input}
          onChangeText={this.handleInputChange('workMinsInput')}
          value={""+this.props.defaultWorkMins}
          // selectTextOnFocus={true}
          // maxLength={3}
          // keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          onChangeText={this.handleInputChange('restMinsInput')}
          value={""+this.props.defaultRestMins}
          // selectTextOnFocus={true}
          // maxLength={3}
          // keyboardType="numeric"
        />
        <Button title="Done" onPress={() => this.props.onAccept(+this.state.workMinsInput,+this.state.restMinsInput)}/>
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
    backgroundColor: '#FFFFFC'
  },
  input: {
    padding: 5,
    borderColor: 'black',
    borderWidth: 1
  }
});
