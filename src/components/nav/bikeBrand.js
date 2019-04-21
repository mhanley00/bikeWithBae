import React, { Component } from 'react';
import { connect } from 'react-redux';

import { setGPParameterValue } from 'reducers/screeningTool/actions';

//Material UI Components
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const styles = theme => ({
  root: {
    display: 'flex'
  }
});

class BikeBrand extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checked: this.props.checked,
    };
    const { label } = this.props;

    this.props.setGPParameterValue(
      label,
      this.state.checked
    );
  }
  handleChange = () => {
    const { label } = this.props;
    const selected = !this.state.checked;
    this.setState({checked: selected});

    this.props.setGPParameterValue(
      label,
      selected
    );
  };

  render() {
    const { classes } = this.props;
    const { label, key } = this.props;

    return (
      <div className={classes.root}>
            <FormControlLabel
              control={
                <Checkbox
                  value={label}
                  key={key}
                  checked={this.state.checked}
                  onChange={this.handleChange}
                />
              }
              label={label}
            />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setGPParameterValue: (gpServiceParamKey, checked) => {
    dispatch(setGPParameterValue(gpServiceParamKey, checked));
  }
});

export default connect(null, mapDispatchToProps)(withStyles(styles, { withTheme: true })(BikeBrand));

