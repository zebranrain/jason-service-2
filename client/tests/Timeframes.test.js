import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Timeframes from '../components/Timeframes.jsx';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('Timeframes component', () => {
  test('renders', () => {
    const wrapper = shallow(<Timeframes/>);
    expect(wrapper.exists()).toBe(true);
  });
  test('displays the appropriate timeframes, initialized with the "timeframe" class', () => {
    const wrapper = shallow(<Timeframes/>);
    console.log(wrapper.find('a'));
    expect(wrapper.contains(<a className="timeframe">1D</a>)).toBe(true);
    expect(wrapper.contains(<a className="timeframe">1W</a>)).toBe(true);
    expect(wrapper.contains(<a className="timeframe">1M</a>)).toBe(true);
    expect(wrapper.contains(<a className="timeframe">3M</a>)).toBe(true);
    expect(wrapper.contains(<a className="timeframe">1Y</a>)).toBe(true);
    expect(wrapper.contains(<a className="timeframe">5Y</a>)).toBe(true);
  });
});