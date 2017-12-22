import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { lightGray } from '../utils/colors';

class AddNewDeck extends Component {
  render() {
    return (
      <View style={styles.header}>
        <Text style={styles.title}>Add New Deck</Text>
      </View>
    );
  }
}

export default AddNewDeck;

const styles = StyleSheet.create({
  header: {
    backgroundColor: lightGray,
    alignItems: 'center',
    borderBottomColor: '#DEDEDE'
  },
  title: {
    fontSize: 20,
    padding: 10
  }
});
