import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableHighlight
} from 'react-native';
import { lightBlue } from '../utils/colors';
import { getDecks } from '../utils/helpers';

class DeckList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      decks: []
    };
  }
  componentDidMount() {
    getDecks().then(data => {
      this.setState({
        decks: Object.keys(data).map(key => data[key])
      });
    });
  }

  render() {
    const { decks } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          {decks.map(deck => (
            <TouchableHighlight
              style={styles.deck}
              key={deck.title}
              underlayColor={lightBlue}
              onPress={() => this.props.navigation.navigate(
                'IndividualDeck',
                { deckTitle: deck.title,
                  numberOfCards: deck.questions.length
                }
              )}
            >
              <View>
                <Text>{deck.title}</Text>
                <Text>{deck.questions.length} card(s)</Text>
              </View>
            </TouchableHighlight>
          ))}
        </ScrollView>
      </View>
    );
  }
}

export default DeckList;

const styles = StyleSheet.create({
  deck: {
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
    padding: 20,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da'
  },
  deckTitle: {
    fontSize: 16
  }
});
