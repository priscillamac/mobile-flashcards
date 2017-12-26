import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import { addCardToDeck, getDecks } from '../utils/helpers';
import { blue, red, lightRed } from '../utils/colors';

class AddNewCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionValue: '',
      answerValue: '',
      showError: false
    };
  }

  static navigationOptions = ({ navigation }) => ({
    title: `Add Card to ${navigation.state.params.title}`
  });

  onSubmit() {
    const { questionValue, answerValue } = this.state;
    const { title, numberOfCards, cards } = this.props.navigation.state.params;
    if (!questionValue || !answerValue) {
      this.setState({
        showError: true
      });
    } else {
      addCardToDeck(title, questionValue, answerValue);

      this.setState({
        value: '',
        showError: false
      });
      console.log(cards);

      if (cards.length === 0) {
        const { navigation } = this.props;
        navigation.goBack();
        navigation.state.params.onSelect({
          deckTitle: title,
          deckCards: [{ answer: answerValue, question: questionValue }],
          numberOfCards: numberOfCards + 1
        });

      } else {
        const { navigation } = this.props;
        navigation.goBack();
        navigation.state.params.onSelect({
          deckTitle: title,
          deckCards: cards,
          numberOfCards: numberOfCards + 1
        });


      }
    }
  }

  render() {
    const { showError } = this.state;
    const { title } = this.props.navigation.state.params;
    return (
      <View style={styles.content}>
        <View>
          <Text style={styles.inputLabel}>Question</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={questionValue => this.setState({ questionValue })}
            value={this.state.questionValue}
          />
          <Text style={styles.inputLabel}>Answer</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={answerValue => this.setState({ answerValue })}
            value={this.state.answerValue}
          />
          <TouchableOpacity
            style={[styles.btn, styles.bgBlue]}
            onPress={this.onSubmit.bind(this)}
          >
            <Text style={styles.btnText}>Submit</Text>
          </TouchableOpacity>
          {showError && (
            <Text style={styles.error}>Please fill in both fields</Text>
          )}
        </View>
      </View>
    );
  }
}

export default AddNewCard;

const styles = StyleSheet.create({
  content: {
    marginHorizontal: 40,
    marginTop: 30
  },
  inputLabel: {
    fontSize: 15
  },
  textInput: {
    height: 40,
    borderColor: blue,
    borderWidth: 1,
    margin: 10,
    marginHorizontal: 0,
    padding: 10
  },
  btn: {
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    padding: 20,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da'
  },
  btnText: {
    color: '#fff',
    fontSize: 20
  },
  bgBlue: {
    backgroundColor: blue
  },
  error: {
    borderWidth: 1,
    borderColor: red,
    backgroundColor: lightRed,
    padding: 10,
    paddingHorizontal: 20,
    marginTop: 20
  }
});
