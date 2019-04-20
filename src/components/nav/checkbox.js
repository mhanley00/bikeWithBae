import React, { Component } from 'react';
import { connect } from 'react-redux';

import { setGPParameterValue } from 'reducers/screeningTool/actions';

//Material UI Components
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const styles = theme => ({
  root: {
    display: 'flex'
  }
  // formControl: {
  //   margin: theme.spacing.unit * 3
  // } //WAS USED IN FormControl Component
  // <FormControl
  //       component='fieldset'
  //       className={classes.formControl}
  //       >
});

class CheckboxesGroup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.definition.input.inputs[0].value || null,
      labelWidth: 0
    };
    this.props.setGPParameterValue(
      props.definition.gpServiceParamKey,
      this.state.checked
    );
  }
  handleChange = event => {
    const { checked } = event.target;
    const { definition } = this.props;

    this.setState({
      checked //SET CHECKED INSTEAD OF VALUE
    });

    this.props.setGPParameterValue(
      definition.gpServiceParamKey,
      this.state.checked /// MIGHT NEED TO KEEP AS VALUE FOR API CALL
    );
  };

  render() {
    const { classes } = this.props;
    const { definition } = this.props;

    return (
      <div className={classes.root}>
        <FormLabel component='legend'>
          Select Shared Vehicle Companies
        </FormLabel>
        <FormGroup>
          {definition.input.inputs.map(option => (
            <FormControlLabel
              control={
                <Checkbox
                  value={option.value}
                  key={option.label}
                  checked={option.checked}
                  onChange={this.handleChange}
                />
              }
              label={option.label}
            />
          ))}
        </FormGroup>
      </div>
    );
  }
}

CheckboxesGroup.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapDispatchToProps = dispatch => ({
  setGPParameterValue: (gpServiceParamKey, checked) => {
    dispatch(setGPParameterValue(gpServiceParamKey, checked));
  }
});

export default connect(null, mapDispatchToProps)(withStyles(styles, { withTheme: true })(CheckboxesGroup));

