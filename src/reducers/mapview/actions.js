import * as types from 'constants/actionTypes';

export function initMap(container) {
  return {
    type: types.INIT_MAP,
    container,
  };
}

export function toggleVisibleLayer(id) {
  return {
    type: types.TOGGLE_VISIBLE_LAYER,
    id,
  };
}

export function toggleParcelsSelection(featureSet) {
  return {
    type: types.TOGGLE_PARCELS_SELECTION,
    featureSet,
  };
}

export function addParcelsSelection(featureSet) {
  return {
    type: types.ADD_PARCELS_SELECTION,
    featureSet,
  };
}

export function setParcelsSelection(featureSet) {
  return {
    type: types.SET_PARCELS_SELECTION,
    featureSet,
  };
}

export function clearParcels() {
  return {
    type: types.CLEAR_PARCELS_SELECTION,
  };
}

export function setManualParcelSelection(active) {
  return {
    type: types.SET_MANUAL_SELECTION,
    active
  };
}

export function setMapLayers(layers) {
  return {
    type: types.SET_MAP_LAYERS,
    layers
  };
}
export function analysisActiveToggle(active) {
  return {
    type: types.ANALYSIS_ACTIVE_TOGGLE,
    active
  };
}
export function storeAnalysisResults(analysisResults) {
  return {
    type: types.ANALYSIS_RESULTS,
    analysisResults
  };
}
