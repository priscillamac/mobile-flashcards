import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {
  getDeck,
  getDecks,
  setLocalNotification,
  clearLocalNotification
} from '../utils/helpers';
import { blue, green, red } from '../utils/colors';

class QuizView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentQuestion: 0,
      showAnswer: false,
      score: 0,
      showFinalResults: false,
      // begins with props cards then changes to state after component Will Mount
      cards: this.props.navigation.state.params.cards
    };
  }

  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.title} Quiz`
  });

  componentDidMount() {
    this.setListOfCards();
  }

  setListOfCards() {
    getDecks().then(data => {
      const { title } = this.props.navigation.state.params;
      const setListOfCards = Object.keys(data)
        .map(key => data[key])
        .filter(data => data.title === title)[0].questions;

      this.setState({
        cards: setListOfCards
      });
    });
  }

  onSelectCorrect() {
    this.setListOfCards();
    this.handleNextQuestion();
    this.handleFinalQuestion();

    this.setState(prevState => ({
      score: prevState.score + 1
    }));
  }

  onSelectIncorrect() {
    this.setListOfCards();
    this.handleNextQuestion();
    this.handleFinalQuestion();
  }

  handleFinalQuestion() {
    if (this.state.currentQuestion + 1 === this.state.cards.length) {
      this.setState({
        showFinalResults: true
      });
    }
  }

  handleNextQuestion() {
    if (this.state.currentQuestion === this.state.cards.length - 1) return;

    this.setState(prevState => ({
      currentQuestion: prevState.currentQuestion + 1,
      showAnswer: false
    }));
  }

  onToggleAnswer() {
    this.setState(prevState => ({
      showAnswer: !prevState.showAnswer
    }));
  }

  onRestartQuiz() {
    this.setState({
      showFinalResults: false,
      currentQuestion: 0,
      score: 0,
      showAnswer: false
    });
  }

  onSubmitQuiz() {
    goBackToDeck();
    clearLocalNotification().then(setLocalNotification);
  }

  goBackToDeck() {
    const { title, numberOfCards } = this.props.navigation.state.params;
    this.props.navigation.navigate('IndividualDeck', {
      deckTitle: title,
      deckCards: this.state.cards,
      numberOfCards
    });
  }

  render() {
    const {
      currentQuestion,
      showAnswer,
      cards,
      score,
      showFinalResults
    } = this.state;

    const { numberOfCards } = this.props.navigation.state.params;

    const item = cards[currentQuestion];

    console.log('swag yolo', this.state.cards);
    const percentage = Math.round(score / numberOfCards * 100);

    if (showFinalResults) {
      return (
        <View>
          <View style={styles.content}>
            <Text style={styles.subtitle}>
              You got {score} out of {numberOfCards} questions correct
            </Text>
            <Text style={styles.score}>{percentage}%</Text>
          </View>
          <TouchableOpacity
            style={[styles.btn, styles.bgGreen]}
            onPress={this.onRestartQuiz.bind(this)}
          >
            <Text style={styles.btnText}>Restart Quiz</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.goBackToDeck.bind(this)}
          >
            <Text style={[styles.btnText, styles.blueText]}>Back to deck</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View>
        <View style={styles.content}>
          <Text style={{ marginBottom: 30 }}>
            Question {currentQuestion + 1} of {numberOfCards}
          </Text>
          <Text style={styles.title}>
            {!showAnswer ? item.question : item.answer}
          </Text>
          <TouchableOpacity onPress={this.onToggleAnswer.bind(this)}>
            <Text style={([styles.subtitle], { color: blue })}>
              {!showAnswer ? 'Show Answer' : 'Show Question'}
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={[styles.btn, styles.bgGreen]}
          onPress={this.onSelectCorrect.bind(this)}
        >
          <Text style={styles.btnText}>Correct</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btn, styles.bgRed]}
          onPress={this.onSelectIncorrect.bind(this)}
        >
          <Text style={styles.btnText}>Incorrect</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default QuizView;

const styles = StyleSheet.create({
  content: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 10
  },
  title: {
    fontSize: 30,
    paddingBottom: 5,
    textAlign: 'center'
  },
  subtitle: {
    marginTop: 10,
    fontSize: 18
  },
  btn: {
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
    marginHorizontal: 40,
    padding: 20,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da'
  },
  btnText: {
    color: '#fff',
    fontSize: 20
  },
  score: {
    fontSize: 50,
    marginTop: 20
  },
  bgGreen: {
    backgroundColor: green
  },
  bgRed: {
    backgroundColor: red
  },
  bgBlue: {
    backgroundColor: blue
  },
  blueText: {
    color: blue,
    textAlign: 'center'
  }
});
