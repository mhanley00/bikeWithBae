import WebMap from 'esri/WebMap';
import Map from 'esri/Map';
import MapView from 'esri/views/MapView';
import Legend from 'esri/widgets/Legend';
import Locate from 'esri/widgets/Locate';
import Graphic from 'esri/Graphic';
import GraphicsLayer from 'esri/layers/GraphicsLayer';
import Sketch from 'esri/widgets/Sketch';
import Circle from 'esri/geometry/Circle';
import geometryEngine from 'esri/geometry/geometryEngine';
import PopupTemplate from 'esri/PopupTemplate';

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
import { setGPParameterValue } from 'reducers/screeningTool/actions';

import store from '../store/store';

import cabi from '../bikewithbaecode/api/cabi';
import jump from '../bikewithbaecode/api/jump';

//Declare local functions;
const noop = () => {};
let _getUserLocation = null;
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

export const map = new Map({
  basemap: 'dark-gray'
});

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
        // return [longitude, latitude];
        store.dispatch(setGPParameterValue('user location', [longitude, latitude]));
        const userCircle = new Circle({
            radius: 1000,
            center: [longitude, latitude]
          });
          searchRadius.graphics.add(userCircle);
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

export const searchRadius = new GraphicsLayer({
  id: 'customDrawing',
  title: 'Custom Drawing'
});
export const cabiLayer = new GraphicsLayer({
  id: 'cabi-bikes',
  title: 'Capital Bikeshare'
});
export const jumpLayer = new GraphicsLayer({
  id: 'jump-bikes',
  title: 'JUMP'
});
/*
  Drawing Utilities
*/
export const sketch = new Sketch({
  view,
  layer: searchRadius
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

  const stationCircle = new Circle({
    radius: 10,
    center: [lon, lat]
  });
  return stationCircle;
};
export const fillSymbol = {
  type: 'simple-fill',
  color: [227, 139, 79, 0.8],
  outline: {

    color: [255, 255, 255],
    width: 1
  }
};

export const circleGraphic = new Graphic({
  geometry: circle,
  symbol: fillSymbol
});

export const locateWidget = new Locate({
  view: view
});


const availableBikes = [];
export const getCaBiBikes = () => {
  cabi.search().then(res => {

    res.forEach(bike => {

      const bikePoint = new Graphic({
        geometry: stationMaker(
          bike.geometry.coordinates[0],
          bike.geometry.coordinates[1]
        ),
        symbol: config.appConfig.cabiIcon,
        attributes: {
          brand: 'Capital Bikeshare',
          station: bike.properties.station.name,
          'Available Bikes': bike.properties.station.bikes_available,
          'Available Docks': bike.properties.station.docks_available,
          // 'Bike Angel Points': bike.properties.bike_angels.score,
          'BA?': bike.properties.bike_angels_action
        },
        popupTemplate: new PopupTemplate({
          title: 'Capital Bikeshare',
          content: `<b>${bike.properties.station.name}</b>
          <br>Available Bikes: ${bike.properties.station.bikes_available}
          <br>Available Docks: ${bike.properties.station.docks_available} `
        })
      });
      availableBikes.push(bikePoint);
    });
    cabiLayer.graphics.addMany(availableBikes);
    // .catch(err => console.log(err));
  });
};
export const getJumpBikes = () => {
  jump.search().then(res => {
    res.forEach(bike => {
      const bikePoint = new Graphic({
        geometry: stationMaker(bike.lon, bike.lat),
        symbol: config.appConfig.jumpIcon,
        attributes: {
          brand: 'JUMP',
          charge: bike.jump_ebike_battery_level,
          id: bike.bike_id
        },
        popupTemplate: new PopupTemplate({
          title: 'JUMP Bike',
          content: `Charge Level: ${bike.jump_ebike_battery_level}
          <br>Bike ID: ${bike.bike_id}`
        })
      });
      availableBikes.push(bikePoint);
    });

    jumpLayer.graphics.addMany(availableBikes);
    // .catch(err => console.log(err));
  });
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
  getJumpBikes();

  view.container = container;

  view
    .when()
    .then(_ => {
      view.ui.move(['zoom'], 'top-right');
      view.ui.add(locateWidget, 'top-right');
      view.graphics.add(circleGraphic);
      // view.graphics.addMany(availableBikes)

      // view.on('click', _handleViewClick);

    })
    .catch(noop);
  map.addMany([searchRadius, cabiLayer, jumpLayer]);

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


// _getUserLocation = () => {
//   store.dispatch(setGPParameterValue('user location', getUserLocation()));
// };
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

_queryParcelsFromGeometry = geometry => {};

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
window.map = map;
window.view = view;
