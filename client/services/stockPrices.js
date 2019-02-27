import axios from 'axios';

export default async (ticker, timeframe) => {
  const response = await axios.get('http://127.0.0.1:3001/api/prices', {
    params: { ticker, timeframe }
  });
  return response.data;
}