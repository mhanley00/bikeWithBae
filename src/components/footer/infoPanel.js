import React, { Component } from 'react';
import { connect } from 'react-redux';

export class InfoPannel extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }


  render() {
    return (
      <div className='info-panel'>
        Info Panel
      </div>
    );
  }
}

const mapDispatchToProps = () => ({
  // setGPParameterValue: (gpServiceParamKey, value) => {
  //   dispatch(setGPParameterValue(gpServiceParamKey, value));
  // }
});

export default connect(null, mapDispatchToProps)(InfoPannel);
