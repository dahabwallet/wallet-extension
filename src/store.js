import { createStore } from 'redux';

const initialState = {
  password: '',
};

function passwordReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_PASSWORD':
      return {
        ...state,
        password: action.payload,
      };
    default:
      return state;
  }
}

const store = createStore(passwordReducer);

export default store;
