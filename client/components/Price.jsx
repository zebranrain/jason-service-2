import React from 'react';
import '../styles/Price.scss';
import Odometer from 'react-odometerjs';

/* A rolling price component that updates as price changes
(i.e. as the crosshair in the Chart component moves). Presently,
this uses the Odometer library, but ultimately it should be
customized so that each digit moves independently to the next value. */

const Price = function ({ price }) {
  return (
    <div className="price">
      <span>$</span>
      <Odometer
        format="(.ddd).dd"
        duration={500}
        value={price}
      />
    </div>
  );
};

export default Price;
