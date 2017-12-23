import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import { getDeck } from '../utils/helpers';

class QuizView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      questions: this.props.navigation.state.params.questions,
      currentQuestion: 0,
      showAnswer: false,
      score: 0,
      showFinalResults: false
    };
  }

  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.title} Quiz`
  });

  componentDidMount() {
    const { title } = this.props.navigation.state.params;
    getDeck(title);
  }

  onSelectCorrect() {
    this.handleNextQuestion();
    this.handleFinalQuestion();

    this.setState(prevState => ({
      score: prevState.score + 1
    }));
  }

  onSelectIncorrect() {
    this.handleNextQuestion();
    this.handleFinalQuestion();
  }

  handleFinalQuestion() {
    if (this.state.currentQuestion + 1 === this.state.questions.length) {
      this.setState({
        showFinalResults: true
      });
    }
  }

  handleNextQuestion() {
    if (this.state.currentQuestion === this.state.questions.length - 1) return;

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

  render() {
    const {
      currentQuestion,
      showAnswer,
      questions,
      score,
      showFinalResults
    } = this.state;

    const item = questions[currentQuestion];
    console.log('questions array', item);

    if (showFinalResults) {
      return (
        <View>
          <Text>
            {score} / {questions.length}
          </Text>
          <Text>You got {score / questions.length * 100}%</Text>
          <TouchableHighlight
            style={styles.btn}
            onPress={this.onRestartQuiz.bind(this)}
          >
            <Text>Restart Quiz</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.btn}
            onPress={() =>
              this.props.navigation.navigate('IndividualDeck', {
                deckTitle: this.props.navigation.state.params.title,
                deckQuestions: questions
              })
            }
          >
            <Text>Back to deck</Text>
          </TouchableHighlight>
        </View>
      );
    }

    return (
      <View>
        <Text>
          {currentQuestion + 1} / {questions.length}
        </Text>
        <Text>{!showAnswer ? item.question : item.answer}</Text>
        <TouchableHighlight onPress={this.onToggleAnswer.bind(this)}>
          <Text>{!showAnswer ? 'Show Answer' : 'Show Question'}</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.btn}
          onPress={this.onSelectCorrect.bind(this)}
        >
          <Text>Correct</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.btn}
          onPress={this.onSelectIncorrect.bind(this)}
        >
          <Text>Incorrect</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

export default QuizView;

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
