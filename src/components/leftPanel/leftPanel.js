import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';

//ArcGIS Functions
import {
  geoprocessor
} from '../../controllers/esriMapController';

//Components
import Dropdown from './dropdown';
import Range from './range';
import Slide from './slide';
import Input from './input';
import ParcelSelector from '../parcelSelector/parcelSelector';
import LayersController from '../layersController/layersController';

//Client Feature Definition
import config from 'config/config';

//Material-UI components
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

//SASS
import './leftPanel.scss';

export class LeftPanel extends Component {
  constructor(props) {
    super(props);

    const featureDefinitions = [];
    config.appConfig.activeFeatures.forEach( featureName => {
      if (config.appConfig.featureDefinitions.hasOwnProperty(featureName)){
        featureDefinitions.push(config.appConfig.featureDefinitions[featureName]);
      }
    });

    this.state = {
      featureDefinitions
    };

  }

  inputGenerator = definition => {
    switch (definition.type) {
      case 'dropdown':
        return (
          <Dropdown
            definition={definition}
          />
        );
      case 'range':
        return (
          <Range
            definition={definition}
          />
        );
      case 'slider':
        return (
          <Slide
            definition={definition}
          />
        );
      case 'input':
        return (
          <Input
            definition={definition}
          />
        );
      // break;
      default:
        return null;
    }
  };

  handleClick = () => {
    // TODO
    console.log(this.props.featureValues);
    // debugger;
    console.log(geoprocessor());
    // return `&${definition.GPServiceParamKey}=${definition.selectedValue}`;
  };

  render() {
    return (
      <div className='feature-def-container'>
        <div>
          <FormControl variant='outlined'>
            {this.state.featureDefinitions.map(definition => (
              <div key={definition.label}>
                <Typography variant='subheading' className='feature-label' key={definition.label}>
                  {definition.label || 'No Label'}
                </Typography>
                {this.inputGenerator(definition)}
              </div>
            ))}
          </FormControl>
        </div>
        <LayersController
        title={'Data Layers'}
        // layers={this.props.layers}
        />
        <ParcelSelector />
        <Button
          variant='contained'
          href='#'
          className='button'
          onClick={this.handleClick}
        >
          Execute
        </Button>
      </div>
    );
  }
}

const mapStateToProps = ({
  // mapview: { layers },
  screeningTool: { featureValues } }) => ({
  // layers,
  featureValues
});

const mapDispatchToProps = () => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(LeftPanel);
