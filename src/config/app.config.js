export const appConfig = {
  /*
    App Text
  */
  APP_TITLE: '🚲Bike With Bae🚲',

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
  cabiIcon: {
    type: 'simple-marker',
    path:
      'M15.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM5 12c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5zm0 8.5c-1.9 0-3.5-1.6-3.5-3.5s1.6-3.5 3.5-3.5 3.5 1.6 3.5 3.5-1.6 3.5-3.5 3.5zm5.8-10l2.4-2.4.8.8c1.3 1.3 3 2.1 5.1 2.1V9c-1.5 0-2.7-.6-3.6-1.5l-1.9-1.9c-.5-.4-1-.6-1.6-.6s-1.1.2-1.4.6L7.8 8.4c-.4.4-.6.9-.6 1.4 0 .6.2 1.1.6 1.4L11 14v5h2v-6.2l-2.2-2.3zM19 12c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5zm0 8.5c-1.9 0-3.5-1.6-3.5-3.5s1.6-3.5 3.5-3.5 3.5 1.6 3.5 3.5-1.6 3.5-3.5 3.5z',
    color: '#f12e13',
    // color: '#f00',
    outline: {
      color: '#ffffff',
      width: 0.05
    },
    size: 15
  },
  jumpIcon: {
    type: 'simple-marker',
    path:
      'M15.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM5 12c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5zm0 8.5c-1.9 0-3.5-1.6-3.5-3.5s1.6-3.5 3.5-3.5 3.5 1.6 3.5 3.5-1.6 3.5-3.5 3.5zm5.8-10l2.4-2.4.8.8c1.3 1.3 3 2.1 5.1 2.1V9c-1.5 0-2.7-.6-3.6-1.5l-1.9-1.9c-.5-.4-1-.6-1.6-.6s-1.1.2-1.4.6L7.8 8.4c-.4.4-.6.9-.6 1.4 0 .6.2 1.1.6 1.4L11 14v5h2v-6.2l-2.2-2.3zM19 12c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5zm0 8.5c-1.9 0-3.5-1.6-3.5-3.5s1.6-3.5 3.5-3.5 3.5 1.6 3.5 3.5-1.6 3.5-3.5 3.5z',

    color: '#ff6700',
    outline: {
      color: '#000000',
      width: 0.05
    },
    size: 15
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
            label: '.25',
            value: .25
          },
          {
            label: '.5',
            value: .5
          },
          {
            label: '.75',
            value: .75
          },
          {
            label: '1',
            value: 1
          },
          {
            label: '1.25',
            value: 1.25
          },
          {
            label: '1.5',
            value: 1.5
          },
          {
            label: '1.75',
            value: 1.75
          },
          {
            label: '2',
            value: 2
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
            checked: true
          }
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
