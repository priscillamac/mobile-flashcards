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
      decks: [{ title: '', questions: [] }]
    };
  }

  componentDidMount() {
    getDecks()
      .then(data => {
        this.setState({
          decks: Object.keys(data).map(key => data[key])
        });
      })
      .catch(error => {
        console.log('Api call error in getDecks function');
        alert(error.message);
      });
  }


  render() {
    const { decks } = this.state;
    console.log(decks);
    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          {decks.map(deck => (
            <TouchableHighlight
              style={styles.deck}
              key={`key-${deck.title}`}
              underlayColor={lightBlue}
              onPress={() =>
                this.props.navigation.navigate('IndividualDeck', {
                  deckTitle: deck.title,
                  deckCards: deck.questions
                })
              }
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
