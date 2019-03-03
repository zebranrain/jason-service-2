import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Price from '../components/Price.jsx';
import Adapter from 'enzyme-adapter-react-16';
import Odometer from 'react-odometerjs';

Enzyme.configure({ adapter: new Adapter() });

describe('Price component', () => {
  test('renders', () => {
    const wrapper = shallow(<Price price={123.00}/>);
    expect(wrapper.exists()).toBe(true);
  });
  test('"odometer" price reflects price passed down from parent state', () => {
    const wrapper = shallow(<Price price={123.00}/>);
    expect(wrapper.contains( <Odometer format="(.ddd).dd" duration={500} value={123} />)).toBe(true);
  });
});