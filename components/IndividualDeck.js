import React, { Component } from 'react';
import { Text, View, TouchableHighlight, StyleSheet } from 'react-native';
import { lightBlue } from '../utils/colors';

class IndividualDeck extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.deckTitle
  });

  render() {
    const { deckTitle, deckCards, numberOfCards } = this.props.navigation.state.params;
    const hasCards = numberOfCards > 0;

    return (
      <View>
        <Text>{deckTitle}</Text>
        <Text>
          {hasCards ? numberOfCards : 'There are no'} cards
        </Text>
        {hasCards && (
          <TouchableHighlight
            style={styles.btn}
            underlayColor={lightBlue}
            onPress={() =>
              this.props.navigation.navigate('QuizView', {
                title: deckTitle,
                cards: deckCards,
                numberOfCards
              })
            }
          >
            <Text>Start Quiz</Text>
          </TouchableHighlight>
        )}
        <TouchableHighlight
          style={styles.btn}
          underlayColor={lightBlue}
          onPress={() => this.props.navigation.navigate('AddNewCard', {
            title: deckTitle,
            cards: deckCards,
            numberOfCards
          })}
        >
          <Text>Add a new card</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

export default IndividualDeck;

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
