export const appConfig = {
  /*
    App Text
  */
  APP_TITLE: 'VMT Screening Tool',

  /*
    App Defaults
  */
  // activeFeatures: ['Year', 'VMT Metric', 'Year Slider', 'Year Range', 'City'],
  activeFeatures: ['VMT Metric'],
  webmapId: '641c9903b0664768a46487dc2ff284d5',
  gpServiceURL:
    'http://arcgis.fehrandpeers.com/web/rest/services/Apps/RS183653_EDCTC_VMT_Screening_Tool/GPServer/EDCTC%20VMT%20Screening%20Tool',

  /*
    Map Graphics Options
    All symbols should be acceptable for polygon geometries, usually simple-fill:
    https://developers.arcgis.com/javascript/latest/api-reference/esri-symbols-SimpleFillSymbol.html
  */
  selectedParcelSymbol: {
    type: 'simple-fill',
    color: [51, 51, 204, 0.9],
    style: 'solid',
    outline: {
      color: 'white',
      width: 1
    }
  },
  parcelSelectionGeometrySymbol: {
    type: 'simple-fill',
    color: [51, 51, 204, 0.2],
    style: 'solid',
    outline: {
      color: 'white',
      width: 1
    }
  },
  insetMapAnalysisAreaSymbol: {
    type: 'simple-fill',
    color: [255, 255, 255, 0.3],
    style: 'solid',
    outline: {
      color: 'grey',
      width: 2
    }
  },

  /*
    Inset Map Options
    visibleLayerIds: String[] containing layer ids or titles to show.
    Basemaps must be included in list.

    offSetType options are:
    'scale': sets and maintains provided inset Map's scale.

    'meters' | 'feet' | 'kilometers' | 'miles' | 'nautical-miles' | 'yards':
    will buffer analysis area by value, and set inset map's exent to buffered exent.
    https://developers.arcgis.com/javascript/latest/api-reference/esri-geometry-geometryEngine.html#buffer
  */
  insetMapOneOptions: {
    visibleLayers: ['WRCOG Vector Basemap'],
    offSetType: 'scale',
    offSetValue: 50000
  },
  insetMapTwoOptions: {
    visibleLayers: ['WRCOG Vector Basemap'],
    offSetType: 'miles',
    offSetValue: 10
  },
  /*
    Client Feature Definitions
  */
  featureDefinitions: {
    Year: {
      name: 'Year',
      label: 'Year',
      type: 'dropdown',
      input: {
        inputs: [
          {
            label: '2019',
            value: 2019
          },
          {
            label: '2018',
            value: 2018
          },
          {
            label: '2017',
            value: 2017
          },
          {
            label: '2016',
            value: 2016
          }
        ]
      },
      required: true,
      gpServiceParamKey: 'Year'
    },
    'VMT Metric': {
      name: 'VMT Metric',
      label: 'VMT Metric',
      type: 'dropdown',
      input: {
        inputs: [
          {
            label: 'Baseline (2016) Total VMT per Service Population',
            value: 'Baseline (2016) Total VMT per Service Population'
          },
          {
            label:
              '15% Reduction from Baseline (2016) Total VMT per Service Population',
            value:
              '15% Reduction from Baseline (2016) Total VMT per Service Population'
          },
          {
            label:
              '7% Reduction from Baseline (2016) Total VMT per Service Population',
            value:
              '7% Reduction from Baseline (2016) Total VMT per Service Population'
          },
          {
            label: 'Future (2040) Total VMT per Service Population',
            value: 'Future (2040) Total VMT per Service Population'
          }
        ]
      },
      required: true,
      gpServiceParamKey: 'VMT_Evaluation_Criteria'
    },
    'Year Slider': {
      name: 'Year Slider',
      label: 'Year Slider',
      type: 'slider',
      input: {
        min: 2012,
        max: 2019
      },
      required: true,
      gpServiceParamKey: 'Year Slider'
    },
    'Year Range': {
      name: 'Year Range',
      label: 'Year Range',
      type: 'range',
      input: {
        min: 2012,
        max: 2019
      },
      required: true,
      gpServiceParamKey: 'yearsRange'
    },
    City: {
      name: 'City',
      label: 'City',
      type: 'input',
      input: {
        label: 'Shingle Springs',
        placeholder: 'Shingle Springs'
      },
      required: true,
      gpServiceParamKey: 'city'
    }
  }
};
