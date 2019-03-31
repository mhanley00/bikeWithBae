import React, { Component } from 'react';

import { createInsetMap } from '../../controllers/esriMapController';

export class InsetMap extends Component {
  constructor(props) {
    super(props);

    this.insetMapContainer = React.createRef();
  }

  componentDidMount () {
    createInsetMap(this.props.insetMapOptions, this.insetMapContainer.current);
  }


  render() {
    return (
      <div ref={this.insetMapContainer}>
      </div>
    );
  }
}

export default InsetMap;
