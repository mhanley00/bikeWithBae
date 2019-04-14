import WebMap from 'esri/WebMap';
import Map from 'esri/Map';
import MapView from 'esri/views/MapView';
import Legend from 'esri/widgets/Legend';
import Graphic from 'esri/Graphic';
import GraphicsLayer from 'esri/layers/GraphicsLayer';
import Sketch from 'esri/widgets/Sketch';
import Circle from 'esri/geometry/Circle';
import geometryEngine from 'esri/geometry/geometryEngine';
import Geoprocessor from 'esri/tasks/Geoprocessor';

import config from 'config/config';

import {
  toggleParcelsSelection,
  clearParcels,
  setParcelsSelection,
  setManualParcelSelection,
  setMapLayers,
  analysisActiveToggle,
  storeAnalysisResults
} from '../reducers/mapview/actions';

import store from '../store/store';

import cabi from '../bikewithbaecode/api/cabi';

//Declare local functions;
const noop = () => {};
let _setManualParcelSelectionState = null;
let _setParcelsSelection = null;
let _clearParcels = null;
let _toggleParcelsSelection = null;
let _handleViewClick = null;
let _updateParcelQueryGraphic = null;
let _queryParcelsFromGeometry = null;
let _setMapLayers = null;
let _analysisActiveToggle = null;
let _storeAnalysis = null;

// export const webmap = new WebMap({
//   portalItem: {
//     id: config.appConfig.webmapId
//   }
// });
export const map = new Map({
  basemap: 'dark-gray'
});

// export const view = new MapView({
//   map: webmap
// });

let latitude;
let longitude;
export const getUserLocation = () => {
  const location = window.navigator && window.navigator.geolocation;

  if (location) {
    location.getCurrentPosition(
      position => {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        console.log(latitude, longitude);
      },
      error => {
        latitude = 'err-latitude';
        longitude = 'err-longitude';
      }
    );
  }
};
export const view = new MapView({
  map: map,
  // container: map.container,
  center: [-77.091, 38.8816],
  // center: [longitude, latitude],
  zoom: 12
});

export const legend = new Legend({
  view: view
});

/*
  Layer for displaying the selected Parcels
*/
// export const selectedParcelsGraphicsLayer = new GraphicsLayer({
//   id: 'selectedParcelsGraphicsLayer',
//   title: 'Selected Parcels'
// });

/*
  Layer for displaying the graphic which is used to query parcels
*/
// export const parcelSelectionGraphicsLayer = new GraphicsLayer({
//   id: 'parcelSelectionGraphicsLayer',
//   title: 'Parcel Query Geometry'
// });

/*
  Drawing Utilities
*/
// export const sketch = new Sketch({
//   view: view,
//   layer: parcelSelectionGraphicsLayer
// });
export const drawingLayer = new GraphicsLayer({
  id: 'customDrawing',
  title: 'Custom Drawing'
});

/*
  Drawing Utilities
*/
export const sketch = new Sketch({
  view,
  layer: drawingLayer
});

export const circle = new Circle({
  radius: 1000,
  center: [-77.0369, 38.9072]
});
// export const userCircle = new Circle({
//   radius: 1000,
//   center: [longitude, latitude]
// });
export const stationMaker = (lon, lat) => {
  //TODO add custom color by company
  const stationCircle = new Circle({
    radius: 200,
    center: [lon, lat]
  });
  return stationCircle;
};
export const fillSymbol = {
  type: 'simple-fill', // autocasts as new SimpleFillSymbol()
  color: [227, 139, 79, 0.8],
  outline: {
    // autocasts as new SimpleLineSymbol()
    color: [255, 255, 255],
    width: 1
  }
};
// Add the geometry and symbol to a new graphic
export const circleGraphic = new Graphic({
  geometry: circle,
  symbol: fillSymbol
});

export const getCaBiBikes = () => {
  cabi.search().then(res => {
    // drawingLayer.graphics.removeAll(); TODO - add this back in
    const availableBikes = [];
    // console.log(res.map(bike => bike.geometry.coordinates ));
    // res.forEach(bike => console.log(bike.geometry.coordinates ));
    res
      .forEach(bike => {
        const bikePoint = new Graphic({
          geometry: stationMaker(
            bike.geometry.coordinates[0],
            bike.geometry.coordinates[1]
          ),
          symbol: fillSymbol // TODO config.appConfig.cabiStation > make red
          // attributes //TODO add avail bikes/stations so can add to popup
        });
        availableBikes.push(bikePoint);
      });
      debugger
      drawingLayer.graphics.addMany(availableBikes);
      // .catch(err => console.log(err));
  });
};

/*
  Start of layer visability + opacity manipulation
*/
// export const getLayerIDs = () => {
//   const layerIDs = webmap.layers.items.map(layer => {
//     return layer.id;
//   });
//   return layerIDs;
// };

// export const getLayerByID = id => {
//   return webmap.findLayerById(id);
// };

// export const updateLayerFromLayerController = (key, value, id) => {
//   const layerToUpdate = webmap.findLayerById(id);
//   if (layerToUpdate) {
//     layerToUpdate[key] = value;
//   }
// };

export const geoprocessor = () => {
  // TODO make it accept in filters here, then we put the component
  const state = store.getState();
  if (state.mapview.selectedParcels.features.length > 0) {
    _analysisActiveToggle(true);

    const url = config.appConfig.gpServiceURL;
    const gp = new Geoprocessor(url);
    const params = {
      ...state.screeningTool.featureValues,
      Parcels: state.mapview.selectedParcels
    };
    gp.submitJob(params).then(results => {
      _analysisActiveToggle(false); //TODO - use this for spinner
      console.log(results);
      console.log(state.mapview.analysisIsActive);

      if (results.jobStatus !== 'job-failed') {
        const jobId = results.jobId;
        gp.getResultData(jobId, 'Results').then(result => {
          _storeAnalysis(result);
        });
      }
    });
  }
};

/*
  Attaches the esri view to passed dom node.
  Handles initial setup:
    * adding legend to the UI
    * attaching click event\
  @container: mounted html dom node
*/
export const initialize = container => {
  getUserLocation();
  getCaBiBikes();

  view.container = container;

  view
    .when()
    .then(_ => {
      view.ui.add([legend], 'top-right');
      view.ui.move(['zoom'], 'top-right');
      view.graphics.add(circleGraphic);

      // view.on('click', _handleViewClick);

      // _setMapLayers(getLayerIDs());
      // console.log(webmap.layers.items.map(layer => layer.title));
    })
    .catch(noop);
  // webmap.addMany([selectedParcelsGraphicsLayer, parcelSelectionGraphicsLayer]);
  // console.log(latitude, longitude);
  return () => {
    view.container = null;
  };
};

/*
  Attaches Sketch to the dom
  @container mounted html dom node
*/
export const attachSketch = container => {
  sketch.container = container;
};

/*
  Clears off all current graphics
  Creates a new graphic for each passed parcel
  Add those graphics to the Map.
  @parcels <Collection>Features
*/
export const updateSelectedParcelGraphics = parcels => {
  selectedParcelsGraphicsLayer.graphics.removeAll();
  const newGraphics = [];
  parcels.forEach(parcel => {
    const polygonGrapic = new Graphic({
      geometry: parcel.geometry,
      symbol: config.appConfig.selectedParcelSymbol,
      attributes: parcel.attributes
    });
    newGraphics.push(polygonGrapic);
  });
  selectedParcelsGraphicsLayer.addMany(newGraphics);
};

/*
  Returns the name of the field that the parcel layer
  uses as the OID field.
  It's used in other parts of the app to allow features
  to be identified.
*/
export const getParcelLayerOIDField = () => {
  const parcelLayer = webmap.layers.find(layer => {
    return layer.title === 'Parcels (Zoom in to view)';
  });
  const oidField = parcelLayer.fields.find(field => {
    return field.type === 'oid';
  });
  return oidField.name;
};

export const getSelectedParcelFeatures = () => {
  return selectedParcelsGraphicsLayer.graphics;
};

/*
  Creates Inset Map and MapView from given webmapId.
  Disables navigation
  Updates graphic and mapView exent when selected anaylsis parcels are updated.

  @insetMapOptions <Object> defined in app.config.js
  @container: mounted html dom node
*/
export const createInsetMap = (insetMapOptions, container) => {
  const { visibleLayers } = insetMapOptions;
  const insetMap = new WebMap({
    portalItem: {
      id: config.appConfig.webmapId
    }
  });
  const insetView = new MapView({
    map: insetMap,
    container: container
  });

  insetView.when(() => {
    insetMap.allLayers.forEach(layer => {
      layer.visible =
        visibleLayers.includes(layer.id) || visibleLayers.includes(layer.title);
    });
    insetView.ui.empty('top-left');
    insetView.on(['drag', 'key-down', 'mouse-wheel', 'double-click'], function(
      event
    ) {
      event.stopPropagation();
    });
  });

  selectedParcelsGraphicsLayer.graphics.on('change', () => {
    insetView.graphics.removeAll();
    if (selectedParcelsGraphicsLayer.graphics.length > 0) {
      const selectedParcelsGeos = selectedParcelsGraphicsLayer.graphics
        .map(graphic => graphic.geometry)
        .toArray();
      const unionedGeo = geometryEngine.union(selectedParcelsGeos);

      const viewGoToOptions = {
        target: unionedGeo
      };
      if (insetMapOptions.offSetType === 'scale') {
        viewGoToOptions.scale = insetMapOptions.offSetValue;
      } else {
        const buffer = geometryEngine.buffer(
          unionedGeo,
          insetMapOptions.offSetValue,
          insetMapOptions.offSetType
        );
        viewGoToOptions.target = buffer;
      }

      insetView.goTo(viewGoToOptions, {
        duration: 500
      });

      const polygonGrapic = new Graphic({
        geometry: unionedGeo,
        symbol: config.appConfig.insetMapAnalysisAreaSymbol
      });
      insetView.graphics.add(polygonGrapic);
    }
  });
};

_setParcelsSelection = featureSet => {
  store.dispatch(setParcelsSelection(featureSet));
};

_clearParcels = () => {
  store.dispatch(clearParcels());
};

_toggleParcelsSelection = featureSet => {
  store.dispatch(toggleParcelsSelection(featureSet));
};

_setManualParcelSelectionState = active => {
  store.dispatch(setManualParcelSelection(active));
};

_setMapLayers = layers => {
  store.dispatch(setMapLayers(layers));
};

_analysisActiveToggle = active => {
  store.dispatch(analysisActiveToggle(active));
};

_storeAnalysis = res => {
  store.dispatch(storeAnalysisResults(res));
};

_queryParcelsFromGeometry = geometry => {
  return new Promise(resolve => {
    const parcelLayer = webmap.layers.find(layer => {
      return layer.title === 'Parcels (Zoom in to view)';
    });
    const query = parcelLayer.createQuery();
    query.geometry = geometry;
    query.returnGeometry = true;
    query.outFields = ['*'];
    parcelLayer.queryFeatures(query).then(featureSet => {
      resolve(featureSet);
    });
  });
};

// _handleViewClick = event => {
//   const state = store.getState();
//   if (state.mapview.manualParcelSelection) {
//     //Once you've activated manual selection and clicked the map, reset query graphics.
//     parcelSelectionGraphicsLayer.removeAll();

//     _queryParcelsFromGeometry(event.mapPoint).then(featureSet => {
//       _toggleParcelsSelection(featureSet);
//     });
//   }
// };

_updateParcelQueryGraphic = event => {
  const graphicGeos = parcelSelectionGraphicsLayer.graphics
    .map(graphic => graphic.geometry)
    .toArray();

  //If there are graphics which are used to query parcels, create a union geometry
  //and query the parcels layer with it
  //If there are NO graphics(its been emptied), clear out the selected parcels.
  if (graphicGeos.length > 0) {
    if (event.tool === 'polyline') {
      const polygonFromPolyline = geometryEngine.convexHull(
        event.graphic.geometry
      );
      graphicGeos.push(polygonFromPolyline);
    }
    const unionedGeo = geometryEngine.union(graphicGeos);
    parcelSelectionGraphicsLayer.removeAll();
    const polygonGrapic = new Graphic({
      geometry: unionedGeo,
      symbol: config.appConfig.parcelSelectionGeometrySymbol
    });
    parcelSelectionGraphicsLayer.add(polygonGrapic);
    _queryParcelsFromGeometry(unionedGeo).then(featureSet => {
      if (featureSet.features.length > 0) {
        _setParcelsSelection(featureSet);
      }
    });
  } else {
    _clearParcels();
  }
};

sketch.on('create, update', event => {
  if (event.state === 'complete' || event.state === 'cancel') {
    _updateParcelQueryGraphic(event);
  }
  //Any action with sketch should set manual selection to false;
  _setManualParcelSelectionState(false);
});

window.sketch = sketch;
// window.map = webmap;
window.map = map;
window.view = view;
