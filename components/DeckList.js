import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { lightGray } from '../utils/colors';

class DeckList extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>My Decks</Text>
        </View>
      <ScrollView>
        <View style={styles.deck}>
          <Text>Title</Text>
          <Text># cards</Text>
        </View>
      </ScrollView>
      </View>
    );
  }
}

export default DeckList;

const styles = StyleSheet.create({
  header: {
    backgroundColor: lightGray,
    alignItems: 'center',
    borderBottomColor: '#DEDEDE'
  },
  headerTitle: {
    fontSize: 20,
    padding: 10
  },
  deck: {
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
    padding: 20,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
  },
  deckTitle: {
    fontSize: 16
  }

});
