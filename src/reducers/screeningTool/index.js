import { combineReducers } from 'redux';

import featureValues from 'reducers/screeningTool/featureValues';

const screeningTool = combineReducers({
  featureValues,
});

export default screeningTool;
