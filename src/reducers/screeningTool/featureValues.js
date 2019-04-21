import { SET_SCREENING_VALUES } from 'constants/actionTypes';

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SCREENING_VALUES: {
      const newValues = Object.assign({}, state);
      newValues[action.gpServiceParamKey] = action.value;
      return newValues;
    }
    default:
      return state;
  }
};