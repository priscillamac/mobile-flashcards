import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableHighlight,
  StyleSheet
} from 'react-native';
import { saveDeckTitle } from '../utils/helpers';

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
      saveDeckTitle(this.state.value);
      this.props.navigation.navigate('IndividualDeck', {
        deckTitle: this.state.value,
        deckCards: []
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
      <View>
        <Text>What is the title of your new deck?</Text>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={value => this.setState({ value })}
          value={this.state.value}
        />
        <TouchableHighlight
          style={styles.btn}
          onPress={this.onSubmit.bind(this)}
        >
          <Text>Submit</Text>
        </TouchableHighlight>
        {this.state.showError &&
          <Text>Please fill in the field</Text>
        }
      </View>
    );
  }
}

export default AddNewDeck;

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
