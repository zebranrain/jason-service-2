import React from 'react';
import '../styles/Timeframes.scss';

function Timeframes({ changeTimeframe, timeframe }) {
  return (
    <nav onClick={changeTimeframe} className='timeframes'>
      <a className={timeframe === 'day' ? 'selected-timeframe': 'timeframe'}>1D</a>
      <a className={timeframe === 'week' ? 'selected-timeframe': 'timeframe'}>1W</a>
      <a className={timeframe === 'month' ? 'selected-timeframe': 'timeframe'}>1M</a>
      <a className={timeframe === 'quarter' ? 'selected-timeframe': 'timeframe'}>3M</a>
      <a className={timeframe === 'year' ? 'selected-timeframe': 'timeframe'}>1Y</a>
      <a className={timeframe === 'fiveYear' ? 'selected-timeframe': 'timeframe'}>5Y</a>
    </nav>
  );
}

export default Timeframes;