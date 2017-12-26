import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import { saveNewDeck } from '../utils/helpers';
import { blue, red, lightRed } from '../utils/colors';

class AddNewDeck extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      showError: false
    };
  }

  onSubmit() {
    if (!this.state.value) {
      this.setState({
        showError: true
      });
    } else {
      saveNewDeck(this.state.value);
      
      this.props.navigation.navigate('IndividualDeck', {
        deckTitle: this.state.value,
        deckCards: [],
        numberOfCards: 0
      });
      // clears the value so no longer visible on click back
      this.setState({
        value: '',
        showError: false
      });
    }
  }
  render() {
    return (
      <View style={styles.content}>
        <Text style={styles.title}>What is the title of your new deck?</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={value => this.setState({ value })}
          value={this.state.value}
        />
        <TouchableOpacity
          style={[styles.btn, styles.bgBlue]}
          onPress={this.onSubmit.bind(this)}
        >
          <Text style={styles.btnText}>Submit</Text>
        </TouchableOpacity>
        {this.state.showError && (
          <Text style={styles.error}>Please fill in the field</Text>
        )}
      </View>
    );
  }
}

export default AddNewDeck;

const styles = StyleSheet.create({
  content: {
    marginHorizontal: 40,
    marginTop: 40
  },
  title: {
    fontSize: 30,
    paddingBottom: 5,
    textAlign: 'center'
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
    padding: 20,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da'
  },
  bgBlue: {
    backgroundColor: blue
  },
  btnText: {
    color: '#fff',
    fontSize: 20
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
