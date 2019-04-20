import React, { Component } from 'react';
import { connect } from 'react-redux';

import { setGPParameterValue } from 'reducers/screeningTool/actions';

//Material-UI components
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';

export class DropDown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.definition.input.inputs[0].value || null,
      labelWidth: 0
    };
    this.props.setGPParameterValue(
      props.definition.gpServiceParamKey,
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
      definition.gpServiceParamKey,
      this.state.value
    );
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
