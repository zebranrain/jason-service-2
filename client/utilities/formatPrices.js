/* Takes an array of pricepoints in {date, time} format
and returns an array of objects with x/y/z values, for consumption
by the chart API. Note that the 'z' values (date/time strings) are not
quantitatively represented on the chart, but rather provide the chart
crosshair component a human readable date to present to the user. */

export default function formatPrices(pricepoints) {
  return pricepoints.reverse().map((pricepoint, index) => {
    let date = new Date(pricepoint.date).getTime();
    let price = parseFloat(pricepoint.price);
    return {
      x: index,
      y: price,
      z: date
    };
  });
}