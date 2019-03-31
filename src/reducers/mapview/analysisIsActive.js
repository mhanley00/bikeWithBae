import { ANALYSIS_ACTIVE_TOGGLE } from 'constants/actionTypes';

const initialState = false;

export default (state = initialState, action) => {
  switch (action.type) {
    case ANALYSIS_ACTIVE_TOGGLE:
      return action.active || false;
    default:
      return state;
  }
};
