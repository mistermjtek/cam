const SET_APP = 'SET_APP';
const SET_CAPTURE_STATE = 'SET_CAPTURE_STATE';
const SET_SELECTED_PICTURE = 'SET_SELECTED_PICTURE';

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

function setSelectedPicture(picture) {
  console.log('PICTURE', picture)
  return {
    type: SET_SELECTED_PICTURE,
    payload: picture
  };
}

export {
  setApp,
  SET_APP,
  setCaptureState,
  SET_CAPTURE_STATE,
  setSelectedPicture,
  SET_SELECTED_PICTURE
};
