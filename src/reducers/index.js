import { combineReducers } from 'redux';
import {
  SET_APP
} from '../actions';

const rootReducer = combineReducers({
  app: appReducer
});

function appReducer(state = {}, action) {
  switch (action.type) {
    case SET_APP:
      return action.payload;
    default:
      return state;
  }
}

export default rootReducer;
