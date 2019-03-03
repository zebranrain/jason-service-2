import axios from 'axios';

export default async (ticker, timeframe) => {
  const response = await axios.get('http://jason-service.fzdbudezre.us-west-2.elasticbeanstalk.com/api/prices', {
    params: { ticker, timeframe }
  });
  return response.data;
};