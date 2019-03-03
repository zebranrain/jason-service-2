import React from 'react';
import { XYPlot, LineSeries, Crosshair } from 'react-vis';
import '../styles/Chart.scss';
import Price from './Price.jsx';
import Change from './Change.jsx';
import convertDateToString from '../utilities/convertDateToString';

class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      crosshairValues: [{}] // initialized with expected data shape, an array with one object
    };
    this.slider = this.slider.bind(this);
  }

  /* Crosshair movement event handler */
  slider(value, event) {
    this.setState({ crosshairValues: [value] });
  }

  /* Determines the price that should be passed down to the Price component */
  setPrice(pricepoints) {
    if (this.state.crosshairValues[0].y) {
      return this.state.crosshairValues[0].y;
    }
    if (pricepoints.length > 1) {
      return pricepoints[pricepoints.length - 1].y;
    }
    return '';
  }

  render() {
    const { pricepoints, company, timeframe } = this.props;
    const openingPrice = pricepoints[0] ? pricepoints[0].y : 0;
    const price = this.setPrice(pricepoints);
    const date = convertDateToString(
      this.state.crosshairValues[0].z,
      timeframe
    );
    return (
      <div>
        <Price price={price} company={company} />
        <Change openingPrice={openingPrice} currentPrice={price} />
        <XYPlot
          onMouseLeave={() => this.setState({ crosshairValues: [{}] })}
          width={1000}
          height={300}
        >
          <LineSeries
            data={pricepoints}
            onNearestX={this.slider}
            color="#21ce99"
          />
          <Crosshair values={this.state.crosshairValues}>
            <div className="crosshair-date">
              <p>{date}</p>
            </div>
          </Crosshair>
        </XYPlot>
      </div>
    );
  }
}
export default Chart;
