import { SET_MANUAL_SELECTION } from 'constants/actionTypes';

const initialState = false;

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_MANUAL_SELECTION:
      return action.active || false;
    default:
      return state;
  }
};
