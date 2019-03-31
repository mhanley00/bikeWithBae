import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setGPParameterValue } from 'reducers/screeningTool/actions';

//Material-UI components
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';

export class Range extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rangeMin: props.definition.input.min || 0,
      rangeMax: props.definition.input.max || 0,
      labelWidth: 0
    };

    this.props.setGPParameterValue(props.definition.gpServiceParamKey, this.constructParameterValue());
  }

  constructParameterValue = () => {
    return `${this.state.rangeMin}-${this.state.rangeMax}`;
  }

  handleChange = event => {
    const { definition } = this.props;

    this.setState({
      [event.target.name]: event.target.value
    }, () => {
      this.props.setGPParameterValue(definition.gpServiceParamKey, this.constructParameterValue());
    });
  };

  render() {
    const { definition } = this.props;
    const { rangeMin, rangeMax } = this.state;

    const lowerRange = [];
    for (let i = definition.input.min; i <= rangeMax; i++) {
      lowerRange.push(
        <MenuItem value={i} name={i.toString()} key={i}>
          {i}
        </MenuItem>
      );
    }
    const upperRange = [];
    for (let i = rangeMin; i <= definition.input.max; i++) {
      upperRange.push(
        <MenuItem value={i} name={i.toString()} key={i}>
          {i}
        </MenuItem>
      );
    }

    return (
      <FormControl variant='outlined' className='double-selects'>
        <Select
          key={definition.input.min}
          value={rangeMin}
          onChange={this.handleChange}
          className='range-selector'
          input={
            <OutlinedInput
              name={'rangeMin'}
              id={'rangeMin'}
              labelWidth={this.state.labelWidth}
            />
          }
        >
          {lowerRange}
        </Select>
        <Select
          key={definition.input.max}
          value={rangeMax}
          onChange={this.handleChange}
          className='range-selector'
          input={
            <OutlinedInput
              name={'rangeMax'}
              id={'rangeMax'}
              labelWidth={this.state.labelWidth}
            />
          }
        >
          {upperRange}
        </Select>
      </FormControl>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setGPParameterValue: (gpServiceParamKey, value) => {
    dispatch(setGPParameterValue(gpServiceParamKey, value));
  }
});

export default connect(null, mapDispatchToProps)(Range);
