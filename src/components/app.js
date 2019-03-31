import React from 'react';
import { hot } from 'react-hot-loader';

import Header from 'components/header/header';
import LeftPanel from 'components/leftPanel/leftPanel';
import Mapview from 'components/mapview/mapview';
import Footer from 'components/footer/footer';

import './app.scss';

const App = () => (
  <div className='container'>
    <Header />
    <div className='app-body'>
      <LeftPanel />
      <div className='map-and-footer'>
        <Mapview />
        <Footer />
      </div>
    </div>
  </div>
);

export default hot(module)(App);
