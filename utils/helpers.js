import { AsyncStorage } from 'react-native';

const DECK_STORAGE_KEY = '@flashcardsDeck:key';

const decks = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer:
          'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  }
};

export function getDecks() {
  return AsyncStorage.getItem(DECK_STORAGE_KEY).then(results => {
    return JSON.parse(results);
  });
}

export function getDeck(id) {
  getDecks().then(data => {
    const arrayOfDecks = Object.keys(data).map(key => data[key]);
    return arrayOfDecks.filter(data => data.title === id);
  });
}

//
// export function saveDeckTitle({ title }) {
//
// }
//
// export function addCardToDeck({ title, card }) {
//
// }
