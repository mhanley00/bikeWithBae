import React, { Component } from 'react';
import { connect } from 'react-redux';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { attachSketch } from '../../controllers/esriMapController';
import { setManualParcelSelection } from '../../reducers/mapview/actions';

import './parcelSelector.scss';

export class ParcelSelector extends Component {
  constructor (props) {
    super(props);

    this.sketchRef = React.createRef();
  }
  componentDidMount() {
    attachSketch(this.sketchRef.current);
  }

  render() {
    const {
      selectedParcels,
      toggleManualParcelSelection,
      manualParcelSelection
    } = this.props;
    return (
      <div className='parcel-selector'>
        <Typography variant='h5' component='h3'>
          Parcel Selector
        </Typography>
        <Typography component='p'>
          Use the Draw Tool or click on the map to select parcels for analysis.
        </Typography>
        <Typography variant='h6' component='h3'>
          Parcels Selected: {selectedParcels.length}
        </Typography>
        <Button
          variant="outlined"
          onClick={() => {toggleManualParcelSelection(!manualParcelSelection);}}
          className={manualParcelSelection ? 'active' : ''}
        >
          Manual Selection
        </Button>
        <div ref={this.sketchRef} />
      </div>
    );
  }
}

const mapStateToProps = ({ mapview: { selectedParcels, manualParcelSelection }}) => ({
  selectedParcels,
  manualParcelSelection
});

const mapDispatchToProps = dispatch => ({
  toggleManualParcelSelection: active => {
    dispatch(setManualParcelSelection(active));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ParcelSelector);
