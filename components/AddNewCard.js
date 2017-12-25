import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableHighlight,
  StyleSheet
} from 'react-native';
import { addCardToDeck } from '../utils/helpers';

class AddNewCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionValue: '',
      answerValue: '',
      showError: false
    };
  }

  onSubmit() {
    const { questionValue, answerValue } = this.state;
    if (!questionValue || !answerValue) {
      this.setState({
        showError: true
      });
    } else {
      console.log('not empty');
      this.setState({
        showError: false
      });
    }
    // addCardToDeck(this.props.navigation.state.params.title, questionValue, answerValue);
    // this.props.navigation.navigate('IndividualDeck', {
    //   deckTitle: this.state.value,
    //   deckCards: []
    // });
    // this.setState({
    //   value: ''
    // });
  }

  render() {
    const { showError } = this.state;
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
        <TouchableHighlight style={styles.btn}
          onPress={this.onSubmit.bind(this)}>
          <Text>Submit</Text>
        </TouchableHighlight>
        {showError &&
          <Text>Please fill in both fields</Text>
        }
      </View>
    );
  }
}

export default AddNewCard;

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
