import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import store from 'store/store';

import App from 'components/app';

import 'styles/main.scss';
import { createMuiTheme } from '@material-ui/core/styles';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#325e3e'
    },
    secondary: {
      main: '#263238'
    }
  },
  typography: {
    useNextVariants: true
  },
  overrides: {
    MuiButton: {
      text: {
        background: '#325e3e',
        color: 'white'
      }
    },
    MuiTypography: {
      root: {
        color: 'pink'
      }
    }
  }
});

const renderApp = Component => {
  render(
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <Component />
      </MuiThemeProvider>
    </Provider>,
    document.getElementById('app-container')
  );
};

renderApp(App);
