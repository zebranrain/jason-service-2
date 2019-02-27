import React from 'react';
import numeral from 'numeral';
import '../styles/Change.scss';

function Change({ openingPrice, currentPrice }) {
  if (openingPrice) {
    let sign = openingPrice < currentPrice ? '+' : '';
    const dollarChange = sign + numeral(currentPrice - openingPrice).format('$0,0.00');
    const percentageChange = '(' + sign + numeral((currentPrice - openingPrice)/openingPrice).format('0.00%') + ')';
    return (
      <div className='change'>
        <span>{dollarChange}</span>  <span>{percentageChange}</span>
      </div>
    )
  }
  return null
}

export default Change;