import { combineReducers } from 'redux';
import {
  SET_APP,
  SET_CAPTURE_STATE
} from '../actions';

const defaultCaptureState = {
  imagePath: ''
};

const rootReducer = combineReducers({
  app: appReducer,
  capture: captureReducer,
});

function appReducer(state = {}, action) {
  switch (action.type) {
    case SET_APP:
      return action.payload;
    default:
      return state;
  }
}

function captureReducer(state = defaultCaptureState, action) {
  switch (action.type) {
    case SET_CAPTURE_STATE:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
}

export default rootReducer;
