import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  RefreshControl
} from 'react-native';
import { blue } from '../utils/colors';
import { getDecks } from '../utils/helpers';

class DeckList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      decks: [{ title: '', questions: [] }],
      refreshing: false
    };
  }

  componentDidMount() {
    this.getAllDecks();
  }

  componentDidUpdate(){
    this.getAllDecks();
  }

  getAllDecks() {
    getDecks()
      .then(data => {
        this.setState({
          decks: Object.keys(data).map(key => data[key]),
          refreshing: false
        });
      })
      .catch(error => {
        console.log('Api call error in getDecks function');
        alert(error.message);
      });
  }

  onRefresh() {
    this.setState({ refreshing: true });
    this.getAllDecks();
  }

  render() {
    const { decks } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh.bind(this)}
            />
          }
        >
          {decks.map(deck => (
            <TouchableOpacity
              style={styles.deck}
              key={`key-${deck.title}`}
              onPress={() =>
                this.props.navigation.navigate('IndividualDeck', {
                  deckTitle: deck.title,
                  deckCards: deck.questions,
                  numberOfCards: deck.questions.length
                })
              }
            >
              <View style={styles.content}>
                <Text style={styles.deckTitle}>{deck.title}</Text>
                <Text>{deck.questions.length} card(s)</Text>
              </View>
            </TouchableOpacity>
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
    marginTop: 10,
    marginBottom: 0,
    padding: 20,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    backgroundColor: '#fff'
  },
  deckTitle: {
    fontSize: 20,
    paddingBottom: 3
  },
  content: {
    alignItems: 'center'
  }
});
