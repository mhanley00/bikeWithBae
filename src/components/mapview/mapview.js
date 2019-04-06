import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { initialize } from '../../controllers/esriMapController';

// import { initMap } from 'reducers/mapview/actions';

import './mapview.scss';

export class MapView extends Component {
  componentDidMount() {
    initialize(this.mapview);
  }

  render() {
    const { error } = this.props;
    return (
      <div className="mapview-container">
        {error && <div>There was an error loading the MapView</div>}
        {!error && <div
          className="mapview"
          ref={(ref) => { this.mapview = ref; }}
        />}
      </div>
    );
  }
}

MapView.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  error: PropTypes.bool,
};

MapView.defaultProps = {
  error: false,
};

// const mapStateToProps = ({ mapview: { layers, error } }) => ({
//   mapLayers: layers,
//   error,
// });
const mapStateToProps = ({ mapview: { layers, error } }) => ({
  mapLayers: layers,
  error,
});

const mapDispatchToProps = dispatch => ({
  // initMap: (container) => {
  //   dispatch(initMap(container));
  // },
});

export default connect(mapStateToProps, mapDispatchToProps)(MapView);
