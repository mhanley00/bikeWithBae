import { combineReducers } from 'redux';

import mapview from 'reducers/mapview/index';
import screeningTool from 'reducers/screeningTool/index';

export default combineReducers({
  mapview,
  screeningTool
});
