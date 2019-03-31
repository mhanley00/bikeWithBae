import React, { Component } from 'react';

//ArcGIS Functions
import {
  getLayerByID,
  updateLayerFromLayerController
} from '../../controllers/esriMapController';

//Material-UI components
import Slider from '@material-ui/lab/Slider';
import Typography from '@material-ui/core/Typography';

export class LayerToggle extends Component {
  constructor(props) {
    super(props);

    const layer = getLayerByID(props.layerId);

    this.initialState = {
      title: layer.title,
      visible: layer.visible,
      opacity: layer.opacity
    };

    this.state = {
      ...this.initialState
    };
  }

  componentDidMount() {
    console.log('MOUNTED', this.props.layerId);
    console.log(this.state.opacity);
  }

  handleOpacityChange = (event, value) => {
    const { layerId } = this.props;

    updateLayerFromLayerController('opacity', value, layerId);
    this.setState({
      opacity: value
    });
  };

  handleVisabilityChange = event => {
    let layerVisible;
    if (event.target.checked === true) {
      layerVisible = true;
      updateLayerFromLayerController(
        'visible',
        layerVisible,
        this.props.layerId
      );
    }
    if (event.target.checked === false) {
      layerVisible = false;
      updateLayerFromLayerController(
        'visible',
        layerVisible,
        this.props.layerId
      );
    }
    this.setState({
      visible: layerVisible
    });
  };

  render() {
    return (
      <div className='data-layer' name={this.state.title}>
        <div className='toggle-container'>
          <label className='switch'>
            <input
              type='checkbox'
              defaultChecked={this.state.visible}
              onChange={this.handleVisabilityChange}
            />
            <div />
            <span className='switch' />
          </label>
        </div>
        <Typography variant='body1'>{this.state.title}</Typography>
        <div className='slider-container'>
          <Slider
            min={0}
            max={1}
            step={0.1}
            value={parseFloat(this.state.opacity)}
            onChange={this.handleOpacityChange}
          />
        </div>
      </div>
    );
  }
}

export default LayerToggle;
