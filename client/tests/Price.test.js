import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Price from '../components/Price.jsx';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe("Price component", () => {
  test("renders", () => {
    const wrapper = shallow(<Price price={123.00}/>);
    expect(wrapper.exists()).toBe(true);
  });
  test("price reflects price passed down from parent state", () => {
    const wrapper = shallow(<Price price={123.00}/>);
    expect(wrapper.text()).toEqual('123');
  });
});