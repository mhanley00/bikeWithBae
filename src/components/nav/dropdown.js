import React, { Component } from 'react';
import { connect } from 'react-redux';

import { setGPParameterValue } from 'reducers/screeningTool/actions';

//Material-UI components
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';
import { setRadius } from '../../controllers/esriMapController';

export class DropDown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.definition.input.inputs[0].value,
      labelWidth: 0
    };
    this.props.setGPParameterValue(
      props.definition.name,
      this.state.value
    );
  }

  handleChange = event => {
    const { value } = event.target;
    const { definition } = this.props;

    this.setState({
      value
    });

    this.props.setGPParameterValue(
      definition.name,
      value
    );
    // TODO add conditional for whether the param is radius or riders, might need to dispatch at bottom?
    if (definition.name === 'Radius'){
      setRadius(value);
      console.log('thank you, next');
    }
  };

  render() {
    const { definition } = this.props;
    const {classes} = this.props;
    return (
      <div>
        <Select
          value={this.state.value}
          onChange={this.handleChange}
          className='dropdown-selector'
          input={
            <OutlinedInput
              name={definition.label}
              id={definition.label}
              key={definition.label}
              labelWidth={this.state.labelWidth}
            />
          }
        >
          {definition.input.inputs.map(option => (
            <MenuItem
              value={option.value}
              name={option.label}
              key={option.label}
            >
              {option.label}
            </MenuItem>
          ))}
        </Select>
        </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setGPParameterValue: (gpServiceParamKey, value) => {
    dispatch(setGPParameterValue(gpServiceParamKey, value));
  }
});

export default connect(
  null,
  mapDispatchToProps
)(DropDown);
