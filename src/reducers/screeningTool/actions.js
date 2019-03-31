import { SET_SCREENING_VALUES } from 'constants/actionTypes';

export function setGPParameterValue(gpServiceParamKey, value) {
  return {
    type: SET_SCREENING_VALUES,
    gpServiceParamKey,
    value
  };
}
