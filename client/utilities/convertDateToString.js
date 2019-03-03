import moment from 'moment';

/* Formats milliseconds to be human readable and formatted
 according to the selected timeframe */

export default function convertDateToString(ms, timeframe) {
  if (timeframe === 'day') {
    return `${moment(ms).format('h:mm a')} ET`;
  }
  if (timeframe === 'week') {
    return `${moment(ms).format('h:mm a, MMM D')} ET`;
  }
  return moment(ms).format('MMM D, YYYY');
}