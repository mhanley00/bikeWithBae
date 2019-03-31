import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setGPParameterValue } from 'reducers/screeningTool/actions';

//Material-UI components
import TextField from '@material-ui/core/TextField';

export class Input extends Component {
  constructor(props) {
    super(props);

    props.setGPParameterValue(props.definition.gpServiceParamKey, props.definition.input.placeholder);
  }

  handleChange = (event) => {
    const { definition } = this.props;
    this.props.setGPParameterValue(definition.gpServiceParamKey, event.target.value);
  }

  render() {
    const { definition } = this.props;
    return (
      <div>
        <TextField
          required={definition.required}
          id={definition.label}
          name={definition.label}
          label={definition.label}
          placeholder={definition.input.placeholder}
          margin='normal'
          variant='outlined'
          className=''
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setGPParameterValue: (gpServiceParamKey, value) => {
    dispatch(setGPParameterValue(gpServiceParamKey, value));
  }
});

export default connect(null, mapDispatchToProps)(Input);
