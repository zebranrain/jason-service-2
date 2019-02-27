import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Timeframes from '../components/Timeframes.jsx';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe("Timeframes component", () => {
  test("renders", () => {
    const wrapper = shallow(<Timeframes/>);
    expect(wrapper.exists()).toBe(true);
  });
  test("displays the appropriate timeframes", () => {
    const wrapper = shallow(<Timeframes/>);
    expect(wrapper.contains(<a>1D</a>)).toBe(true);
    expect(wrapper.contains(<a>1W</a>)).toBe(true);
    expect(wrapper.contains(<a>1M</a>)).toBe(true);
    expect(wrapper.contains(<a>3M</a>)).toBe(true);
    expect(wrapper.contains(<a>1Y</a>)).toBe(true);
    expect(wrapper.contains(<a>5Y</a>)).toBe(true);
  });
});