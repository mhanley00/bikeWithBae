import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';

//ArcGIS Functions
import { getClosestBikes } from '../../controllers/esriMapController';

//Components
import Dropdown from './dropdown';
import CheckboxGroup from './checkboxGroup';

//Importing Bike Share Config
import config from 'config/config';

//Material-UI components
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


//SASS
import './nav.scss';

const styles = theme => ({
  button: {
    // width: '275px',
    // margin: '15px 25px'
  },
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing.unit * 3,
  },
});

export class Nav extends Component {
  constructor(props) {
    super(props);

    const filters = [];
    config.appConfig.activeFilters.forEach( filterName => {
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
      case 'checkbox':
        return (
          <CheckboxGroup
            definition={definition}
          />
        );
      // break; //
      default:
        return null;
    }
  };

  handleClick = () => {
    getClosestBikes();
  };

  render() {
    const { classes } = this.props;

    return (
      <div className='nav-container'>
        <div className='nav-header'>
        <Typography variant='h5' component='h3'>
        {config.appConfig.APP_TITLE}
        </Typography>
        </div>
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
        <Button
          variant='contained'
          href='#'
          className='button'
          onClick={this.handleClick}
        >
          Find Bikes
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(Nav));

