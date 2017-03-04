const SET_APP = 'SET_APP';

function setApp(state) {
  return {
    type: SET_APP,
    payload: state
  };
}

export {
  setApp,
  SET_APP
};
