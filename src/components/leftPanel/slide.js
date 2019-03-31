import React, { Component } from 'react';
import { connect } from 'react-redux';

import { setGPParameterValue } from 'reducers/screeningTool/actions';

//Material-UI components
import Slider from '@material-ui/lab/Slider';
import Typography from '@material-ui/core/Typography';
export class Slide extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.definition.input.max || 0
    };

    this.props.setGPParameterValue(props.definition.gpServiceParamKey, this.state.value);
  }

  handleChange = (event, value) => {
    const { definition } = this.props;
    this.setState({
      value
    });
    this.props.setGPParameterValue(definition.gpServiceParamKey, this.state.value);
  }

  render() {
    const { definition } = this.props;
    const { value } = this.state;
    return (
      <div className='slider-container'>
        <Slider
          className='slider'
          name={definition.label}
          id={definition.label}
          value={value}
          min={definition.input.min}
          max={definition.input.max}
          step={1}
          onChange={this.handleChange}
          disabled={false}
        />
        <div className='slider-values'>
          <Typography>{definition.input.min}</Typography>
          <Typography>{definition.input.max}</Typography>
        </div>
        <Typography>Selected Value: {value}</Typography>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setGPParameterValue: (gpServiceParamKey, value) => {
    dispatch(setGPParameterValue(gpServiceParamKey, value));
  }
});

export default connect(null, mapDispatchToProps)(Slide);
