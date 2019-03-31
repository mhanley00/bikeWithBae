import React, { Component } from 'react';
import InfoPanel from './infoPanel';
import InsetMap from './insetMap';
import config from 'config/config';

import './footer.scss';

export class Footer extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div className='footer'>
        <InfoPanel />
        <InsetMap insetMapOptions={config.appConfig.insetMapOneOptions} />
        <InsetMap insetMapOptions={config.appConfig.insetMapTwoOptions} />
      </div>
    );
  }
}

export default Footer;
