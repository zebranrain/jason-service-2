const { Company, DailyPrice, FiveMinPrice } = require('./models.js');
const _ = require('underscore');

/* A query function for each timeframe */

const retrieveDailyPrices = function(companyId) {
  const startDate = new Date('2019-02-08T00:00:00.000Z');
  const endDate = new Date('2019-02-09T00:00:00.000Z');
  return FiveMinPrice.findAll({where: { companyId, date: {$between: [startDate, endDate]}}});
};

const retrieveWeeklyPrices = function(companyId) {
  const startDate = new Date('2019-02-01T00:00:00.000Z');
  const endDate = new Date('2019-02-09T00:00:00.000Z');
  return FiveMinPrice.findAll({where: { companyId, date: {$between: [startDate, endDate]}}})
    .then((prices) => {
      return _.filter(prices, function(price, index) {
        let date = new Date(price.date);
        return date.getMinutes() % 10 === 0;
      });
    });
};

const retrieveMonthlyPrices = function(companyId) {
  const startDate = new Date('01/09/2019');
  const endDate = new Date('02/08/2019');
  return DailyPrice.findAll({where: { companyId, date: {$between: [startDate, endDate]}}});
};

const retrieveQuarterlyPrices = function(companyId) {
  const startDate = new Date('11/09/2018');
  const endDate = new Date('02/08/2019');
  return DailyPrice.findAll({where: { companyId, date: {$between: [startDate, endDate]}}});
};

const retrieveYearlyPrices = function(companyId) {
  const startDate = new Date('02/09/2018');
  const endDate = new Date('02/08/2019');
  return DailyPrice.findAll({where: { companyId, date: {$between: [startDate, endDate]}}});
};

const retrieveFiveYearPrices = function(companyId) {
  const startDate = new Date('02/09/2014');
  const endDate = new Date('02/08/2019');
  return DailyPrice.findAll({where: { companyId, date: {$between: [startDate, endDate]}}})
    .then((prices) => {
      return _.filter(prices, function(price) {
        let date = new Date(price.date);
        return date.getDay() === 4;
      });
    });
};

/* An object used to map a timeframe to its appropriate handler */

const functionMap = {
  day: retrieveDailyPrices,
  week: retrieveWeeklyPrices,
  month: retrieveMonthlyPrices,
  quarter: retrieveQuarterlyPrices,
  year: retrieveYearlyPrices,
  fiveYear: retrieveFiveYearPrices
};

/* A 'delegator' function, which receives a company ticker
and a desired timeframe, and returns an array of date/price objects.
All queries assume that today's date is Feb 8, 2019. */

const retrievePriceHistory = function(ticker, timeframe) {
  return Company.findOne({where: { ticker }})
    .then( async (company) => {
      if (!company) {
        throw new Error('companyNotFound');
      }
      if (!functionMap[timeframe]) {
        throw new Error('timeframeNotFound');
      }
      let { id, name } = company;
      let prices = await functionMap[timeframe](id);
      return { name, prices };
    });
};

module.exports = retrievePriceHistory;