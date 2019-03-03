import React from 'react';
import App from './components/App.jsx';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';

const PriceChart = (
  <Router>
    <div>
      <Route path="/:ticker" component={App} />
    </div>
  </Router>
);

window.PriceChart = PriceChart;