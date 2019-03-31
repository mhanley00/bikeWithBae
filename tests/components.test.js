import React from 'react';
import { shallow } from 'enzyme';

import App from '../src/components/app.js';

test('Application matches snapshot', () => {
    const component = shallow(<App />);
    expect(component).toMatchSnapshot();
});

