import React from 'react'
import {Button, View, TextInput, StyleSheet} from 'react-native'
import PropTypes from 'prop-types'

export default class ChangeTimesView extends React.Component {
  static propTypes = {
    onAccept: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    defaultWorkMins: PropTypes.number.isRequired,
    defaultRestMins: PropTypes.number.isRequired,
  }
  state = {
    workMinsInput: this.props.defaultWorkMins,
    restMinsInput: this.props.defaultRestMins
  }

  handleInputChange = propName => newVal => {
    // this.setState({[propName]: newVal})
  }

  render() {
    return (
      <View style={{paddingTop: 20}}>
        <TextInput
          style={styles.input}
          onChangeText={this.handleInputChange('workMinsInput')}
          value=""//{""+this.state.workMins}
          // selectTextOnFocus={true}
          // maxLength={3}
          // keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          onChangeText={this.handleInputChange('restMinsInput')}
          value={""+this.state.restMins}
          // selectTextOnFocus={true}
          // maxLength={3}
          // keyboardType="numeric"
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
  input: {
    padding: 5,
    borderColor: 'black',
    borderWidth: 1
  }
});
