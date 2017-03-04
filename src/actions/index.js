const SET_APP = 'SET_APP';
const SET_CAPTURE_STATE = 'SET_CAPTURE_STATE';

function setApp(state) {
  return {
    type: SET_APP,
    payload: state
  };
}

function setCaptureState(state) {
  return {
    type: SET_CAPTURE_STATE,
    payload: state
  };
}

export {
  setApp,
  SET_APP,
  setCaptureState,
  SET_CAPTURE_STATE
};
