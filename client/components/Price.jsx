import React from 'react';
import 'odometer';
import '../styles/Price.scss';


// fix formatting

function Price({ price }) {
  return (
    <div className='price'>
      <span>$</span><div className='odometer'>{price}</div>
    </div>
  )
}

export default Price;