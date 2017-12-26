import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { blue, green } from '../utils/colors';

class IndividualDeck extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.deckTitle
  });

  render() {
    const {
      deckTitle,
      deckCards,
      numberOfCards
    } = this.props.navigation.state.params;
    const hasCards = numberOfCards > 0;

    return (
      <View>
        <View style={styles.content}>
          <Text style={styles.title}>{deckTitle}</Text>
        <Text style={styles.subtitle}>
            {hasCards ? numberOfCards : 'There are no'} cards
          </Text>
        </View>
        {hasCards && (
          <TouchableOpacity
            style={[styles.btn, styles.bgblue]}
            onPress={() =>
              this.props.navigation.navigate('QuizView', {
                title: deckTitle,
                cards: deckCards,
                numberOfCards
              })
            }
          >
            <Text style={styles.btnText}>Start Quiz</Text>
        </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[styles.btn, styles.bgGreen]}
          onPress={() =>
            this.props.navigation.navigate('AddNewCard', {
              title: deckTitle,
              cards: deckCards,
              numberOfCards
            })
          }
        >
          <Text style={styles.btnText}>Add a new card</Text>
      </TouchableOpacity>
      </View>
    );
  }
}

export default IndividualDeck;

const styles = StyleSheet.create({
  content: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 10
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
  title: {
    fontSize: 30,
    paddingBottom: 5
  },
  subtitle: {
    fontSize: 20
  },
  bgblue: {
    backgroundColor: blue
  },
  bgGreen: {
    backgroundColor: green
  }
});
