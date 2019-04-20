export const appConfig = {
  /*
    App Text
  */
  APP_TITLE: 'Bike with Bae 🚲🚲',

  /*
    App Defaults
  */
  // activeFilters: ['Riders', 'Radius', 'Brand', 'City' ],
  activeFilters: ['Riders', 'Radius', 'Brand'],
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
    Filter Details
  */
  filters: {
    Riders: {
      name: 'Riders',
      label: 'Riders',
      type: 'dropdown',
      input: {
        inputs: [
          {
            label: '1',
            value: 1
          },
          {
            label: '2',
            value: 2
          },
          {
            label: '3',
            value: 3
          },
          {
            label: '4',
            value: 4
          },
          {
            label: '5',
            value: 5
          },
          {
            label: '6',
            value: 6
          },
          {
            label: '7',
            value: 7
          }
        ]
      },
      required: false
    },
    Radius: {
      name: 'Radius',
      label: 'Radius',
      type: 'dropdown',
      input: {
        inputs: [
          {
            label: '1',
            value: 1
          },
          {
            label: '2',
            value: 2
          },
          {
            label: '3',
            value: 3
          },
          {
            label: '4',
            value: 4
          },
          {
            label: '5',
            value: 5
          },
          {
            label: '6',
            value: 6
          },
          {
            label: '7',
            value: 7
          }
        ]
      },
      required: false
    },
    Brand: {
      name: 'Brand',
      label: 'Brand',
      type: 'checkbox',
      input: {
        inputs: [
          {
            label: 'Capital Bikeshare', //CaBi + Jump are main bikes now, do not see Lime bikes in Citymapper
            value: 'Capital Bikeshare',
            checked: true
          },
          {
            label: 'Jump',
            value: 'Jump',
            checked: false
          },
          // {
          //   label: 'Lime',
          //   value: 'Lime',
          // checked: true
          // },
          // {
          //   label: 'Lyft', //need to ask about API for this one
          //   value: 'Lyft'
          // checked: true

          // },
          // {
          //   label: 'Skip',
          //   value: 'Skip',
          // checked: true

          // },
          // {
          //   label: 'Bird',
          //   value: 'Bird',
          // checked: true

          // },
          // {
          //   label: 'Spin', //Do not see any in Citymapper
          //   value: 'Spin',
          // checked: true
          // }
        ]
      },
      required: false
    }

    // City: { //FOR FUTURE USE
    //   name: 'City',
    //   label: 'City',
    //   type: 'input',
    //   input: {
    //     label: 'Shingle Springs',
    //     placeholder: 'Shingle Springs'
    //   },
    //   required: true,
    // }
  }
};
