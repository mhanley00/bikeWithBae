import { SET_MAP_LAYERS } from 'constants/actionTypes';

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_MAP_LAYERS:
      return action.layers || initialState;
    default:
      return state;
  }
};
