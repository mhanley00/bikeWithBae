import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import store from 'store/store';

import App from 'components/app';

import 'styles/main.scss';

const renderApp = Component => {
  render(
    <Provider store={store}>
      <Component />
    </Provider>,
    document.getElementById('app-container')
  );
};

renderApp(App);
