import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import App from '../components/App.jsx';
import Adapter from 'enzyme-adapter-react-16';
import { doesNotReject } from 'assert';

jest.mock('../services/stockPrices.js');

Enzyme.configure({ adapter: new Adapter() });

describe("Timeframes component", () => {
  test("renders", () => {
    const wrapper = shallow(<App match={{params: { ticker: 'AAPL' }}}/>);
    expect(wrapper.exists()).toBe(true);
  });
  // test("sets state to appropriate company", done => {
  //   const wrapper = shallow(<App match={{params: { ticker: 'AAPL' }}}/>);

  //   setTimeout(() => {
  //     wrapper.update();
  //     expect(wrapper.find("Header").length).toEqual(1);
  //     done();
  //   })
  //   // expect(wrapper.state()).company.toEqual('Apple Inc.')
  // });
});