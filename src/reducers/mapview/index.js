import { combineReducers } from 'redux';

import layers from 'reducers/mapview/layers';
import error from 'reducers/mapview/error';
import visibleLayers from 'reducers/mapview/visibleLayers';
import selectedParcels from 'reducers/mapview/selectedParcels';
import manualParcelSelection from 'reducers/mapview/manualParcelSelection';
import analysisIsActive from 'reducers/mapview/analysisIsActive';
import analysisResults from 'reducers/mapview/analysisResults';

const mapview = combineReducers({
  layers,
  error,
  visibleLayers,
  selectedParcels,
  manualParcelSelection,
  analysisIsActive,
  analysisResults
});

export default mapview;
