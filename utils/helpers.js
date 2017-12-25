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
    // if there data already exists in the AsyncStorage database
    if (JSON.parse(results) !== null) {
      return JSON.parse(results);
    } else {
      // no data exists yet - it must be set to the key from the decks array
      AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(decks));
      return AsyncStorage.getItem(DECK_STORAGE_KEY).then(results => {
        return JSON.parse(results);
      });
    }
  });
}

export function getDeck(id) {
  getDecks().then(data => {
    const arrayOfDecks = Object.keys(data).map(key => data[key]);
    return arrayOfDecks.filter(data => data.title === id);
  });
}

export function saveNewDeck(title) {
  return AsyncStorage.mergeItem(
    DECK_STORAGE_KEY,
    JSON.stringify({
      [title]: {
        title,
        questions: []
      }
    })
  );
}

export function addCardToDeck(title, question, answer) {
  getDecks().then(data => {
    const existingCards = Object.keys(data)
      .map(key => data[key])
      .filter(data => data.title === title)[0].questions;

    const hasNoCards = existingCards.length === 0;

    if (hasNoCards) {
      return AsyncStorage.mergeItem(
        DECK_STORAGE_KEY,
        JSON.stringify({
          [title]: {
            questions: [
              {
                question,
                answer
              }
            ]
          }
        })
      );
    } else {
      return AsyncStorage.mergeItem(
        DECK_STORAGE_KEY,
        JSON.stringify({
          [title]: {
            questions: [
              ...existingCards,
              {
                question,
                answer
              }
            ]
          }
        })
      );
    }
  });
}
