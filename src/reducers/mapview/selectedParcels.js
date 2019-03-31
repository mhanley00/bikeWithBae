import {
  TOGGLE_PARCELS_SELECTION,
  CLEAR_PARCELS_SELECTION,
  ADD_PARCELS_SELECTION,
  SET_PARCELS_SELECTION
} from 'constants/actionTypes';
import { updateSelectedParcelGraphics, getParcelLayerOIDField } from '../../controllers/esriMapController';

const initialState = {
  features: []
};//Esri FeatureSet

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PARCELS_SELECTION: {
      const incomingParcels = action.featureSet.features;
      updateSelectedParcelGraphics(incomingParcels);
      return action.featureSet;
    }
    case ADD_PARCELS_SELECTION: {
      return state;
      // const oidField = getParcelLayerOIDField();
      // let incomingParcels = action.parcels;
      // if (!Array.isArray(action.parcels)){
      //   incomingParcels = [action.parcels];
      // }
      // const currentParcelsIds = new Set(state.map(p => p.attributes[oidField]));
      // const parcelsToAdd = incomingParcels.filter( parcel => {
      //   return !currentParcelsIds.has(parcel.attributes[oidField]);
      // });
      // const updatedList = [...state].concat(parcelsToAdd);
      // updateSelectedParcelGraphics(updatedList);
      // return updatedList;
    }
    case TOGGLE_PARCELS_SELECTION: {
      const newFeatureSet = Object.assign({}, action.featureSet);
      const oidField = getParcelLayerOIDField();
      const incomingParcels = action.featureSet.features;
      const currentParcels = state.features;

      const currentParcelsIds = new Set(currentParcels.map(p => p.attributes[oidField]));
      const incomingParcelsIds = new Set(incomingParcels.map(p => p.attributes[oidField]));
      const parcelsToAdd = incomingParcels.filter( parcel => {
        return !currentParcelsIds.has(parcel.attributes[oidField]);
      });
      const parcelsToKeepFromState = currentParcels.filter( parcel => {
        return !incomingParcelsIds.has(parcel.attributes[oidField]);
      });
      const updatedList = [...parcelsToKeepFromState].concat(parcelsToAdd);
      updateSelectedParcelGraphics(updatedList);

      newFeatureSet.features = updatedList;
      return updatedList;
    }
    case CLEAR_PARCELS_SELECTION:
      updateSelectedParcelGraphics([]);
      return initialState;
    default:
      return state;
  }
};
