import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';

//Client Feature Definition
import config from '../../config/config'; //CAN THIS BE CONFIG/CONFIG BECAUSE OF DOJO?
import clientLogo from '../../resources/logo.png';

//Material-UI components
import Typography from '@material-ui/core/Typography';

//SASS
import './header.scss';

const appTitle = config.appConfig.APP_TITLE;

export class Header extends Component {
  //   state = {
  //     // need state in header?
  //   };

  render() {
    return (
      <div className='header-container'>
        <div className='logo-container'>
          <img src={clientLogo} alt='logo' />
        </div>
        <Typography variant='title' component='h1'>
          {appTitle}
        </Typography>
        <Typography component='h3'>
          <a href='http://www.fehrandpeers.com/' target='blank'>
            Powered by Fehr & Peers
          </a>
        </Typography>
      </div>
    );
  }
}
export default Header;
