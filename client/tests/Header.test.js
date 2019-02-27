import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Header from '../components/Header.jsx';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe("Header component", () => {
  test("renders", () => {
    const wrapper = shallow(<Header company={'Apple, Inc.'}/>);
    expect(wrapper.exists()).toBe(true);
  });
  test("company name is rendered properly", () => {
    const wrapper = shallow(<Header company={'Apple, Inc.'}/>);
    expect(wrapper.text()).toEqual('Apple, Inc.');
  });
});