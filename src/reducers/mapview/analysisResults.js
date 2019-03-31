import { ANALYSIS_RESULTS } from 'constants/actionTypes';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case ANALYSIS_RESULTS:
      return action.analysisResults || null;
    default:
      return state;
  }
};
