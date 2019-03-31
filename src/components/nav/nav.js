import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';

//ArcGIS Functions
import {
  geoprocessor
} from '../../controllers/esriMapController';

//Components
import Dropdown from './dropdown';
// import ParcelSelector from '../parcelSelector/parcelSelector';

//Client Feature Definition
import config from 'config/config';

//Material-UI components
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

//SASS
import './nav.scss';

export class Nav extends Component {
  constructor(props) {
    super(props);

    const filters = [];
    config.appConfig.activeFilters.forEach( filterName => {
      // console.log()
      if (config.appConfig.filters.hasOwnProperty(filterName)){
        filters.push(config.appConfig.filters[filterName]);
      }
    });

    this.state = {
      filters
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
      // break;
      default:
        return null;
    }
  };

  handleClick = () => {
    // TODO
    // console.log(this.props.featureValues);
    // // debugger;
    // console.log(geoprocessor());
  };

  render() {
    return (
      <div className='nav-container'>
        <div className='nav-header'></div>
        <div>
          <FormControl variant='outlined'>
            {this.state.filters.map(definition => (
              <div key={definition.label}>
                <Typography variant='subheading' className='feature-label' key={definition.label}>
                  {definition.label || 'No Label'}
                </Typography>
                {this.inputGenerator(definition)}
              </div>
            ))}
          </FormControl>
        </div>
        {/* <ParcelSelector /> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
