import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableHighlight,
  StyleSheet
} from 'react-native';

class AddNewDeck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionValue: '',
      answerValue: ''
    };
  }
  render() {
    return (
      <View>
        <Text>Question</Text>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={questionValue => this.setState({ questionValue })}
          value={this.state.questionValue}
        />
      <Text>Answer</Text>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={answerValue => this.setState({ answerValue })}
          value={this.state.answerValue}
        />
        <TouchableHighlight style={styles.btn}>
          <Text>Submit</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

export default AddNewDeck;

const styles = StyleSheet.create({
  btn: {
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
    padding: 20,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da'
  }
});
