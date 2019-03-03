import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import App from '../components/App.jsx';
import Adapter from 'enzyme-adapter-react-16';

jest.mock('../services/stockPrices.js');

Enzyme.configure({ adapter: new Adapter() });

describe('Timeframes component', () => {
  test('renders', () => {
    const wrapper = shallow(<App match={{params: { ticker: 'AAPL' }}}/>);
    expect(wrapper.exists()).toBe(true);
  });
  // TODO: Add async test
});