import React from 'react';
import { hot } from 'react-hot-loader';

import Nav from 'components/nav/nav';
import Mapview from 'components/mapview/mapview';

import './app.scss';

const App = () => (
  <div className='container'>
    <div className='app-body'>
      <Nav />
      <div className='map-and-footer'>
        <Mapview />
      </div>
    </div>
  </div>
);

export default hot(module)(App);
