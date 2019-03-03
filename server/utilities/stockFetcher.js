require('dotenv').config();
const request = require('request');
const key = process.env.ALPHA_VANTAGE_KEY;
const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const baseUrl = `https://www.alphavantage.co/query?&apikey=${key}`;

/* These functions are used to harvest actual historical stock data from teh AlphaVantage API.
This was performed one time, and the responses were stored as JSON in text files in the data folder. */

/* The 100 stock tickers we want. */
const tickers = [
  'ATVI',
  'ADBE',
  'AMD',
  'ALXN',
  'ALGN',
  'GOOG',
  'GOOGL',
  'AMZN',
  'AAL',
  'AMGN',
  'ADI',
  'AAPL',
  'AMAT',
  'ASML',
  'ADSK',
  'ADP',
  'BIDU',
  'BIIB',
  'BMRN',
  'BKNG',
  'AVGO',
  'CDNS',
  'CELG',
  'CERN',
  'CHTR',
  'CHKP',
  'CTAS',
  'CSCO',
  'CTXS',
  'CTSH',
  'CMCSA',
  'COST',
  'CSX',
  'CTRP',
  'DLTR',
  'EBAY',
  'EA',
  'EXPE',
  'FB',
  'FAST',
  'FISV',
  'GILD',
  'HAS',
  'HSIC',
  'IDXX',
  'ILMN',
  'INCY',
  'INTC',
  'INTU',
  'ISRG',
  'JBHT',
  'JD',
  'KLAC',
  'LRCX',
  'LBTYA',
  'LBTYK',
  'LULU',
  'MAR',
  'MXIM',
  'MELI',
  'MCHP',
  'MU',
  'MSFT',
  'MDLZ',
  'MNST',
  'MYL',
  'NTAP',
  'NTES',
  'NFLX',
  'NVDA',
  'NXPI',
  'ORLY',
  'PCAR',
  'PAYX',
  'PYPL',
  'PEP',
  'QCOM',
  'REGN',
  'ROST',
  'SIRI',
  'SWKS',
  'SBUX',
  'SYMC',
  'SNPS',
  'TMUS',
  'TTWO',
  'TSLA',
  'TXN',
  'KHC',
  'FOX',
  'FOXA',
  'ULTA',
  'UAL',
  'VRSN',
  'VRSK',
  'VRTX',
  'WBA',
  'WDC',
  'WLTW',
  'WDAY'
];

/* The timeseries we want. */
const timeSeries = [
  'TIME_SERIES_INTRADAY',
  'TIME_SERIES_DAILY'
];

/* The interval(s) we want. */
const intervals = [
  '5min'
];

/* Fetches historical prices from Morningstar API */

const folderMapper = function(timeSeries, interval) {
  if (timeSeries === 'TIME_SERIES_INTRADAY' && interval === '5min') {
    return path.join(__dirname, '../data/five-min');
  }
  if (timeSeries === 'TIME_SERIES_DAILY') {
    return path.join(__dirname, '../data/daily');
  }
};

const priceFetcher = function(ticker, timeSeries, url, interval) {
  let folder = folderMapper(timeSeries, interval);
  url += `function=${timeSeries}&symbol=${ticker}&outputsize=full`;
  if (timeSeries === 'TIME_SERIES_INTRADAY') {
    url += `&interval=${interval}`;
  }
  request(url, function(err, response, body) {
    if (err) { throw err; }
    fs.writeFile(`${folder}/${ticker}.txt`, body, function(err) {
      if (err) { throw err; }
    });
  });
};

/* Loops through tickers, timeSeries, and interval(s),
and schedules API calls every 13 seconds for every permutation
of ticker/timeSeries/interval. I'm using 13 seconds because
the API warns not to make more than 5 calls per minute. */

const getAllPrices = function(url) {
  let timeout = 13000;
  tickers.forEach((ticker) => {
    timeSeries.forEach((timeSeries) => {
      if (timeSeries === 'TIME_SERIES_INTRADAY') {
        intervals.forEach((interval) => {
          setTimeout(() => {
            priceFetcher(ticker, timeSeries, url, interval);
          }, timeout);
          timeout += 13000;
        });
      } else {
        setTimeout(() => {
          priceFetcher(ticker, timeSeries, url);
        }, timeout);
        timeout += 13000;
      }
    });
  });
};

/* Fetches a company from the AlphaVantage API */

const fetchCompany = function(ticker) {
  let folder = path.join(__dirname, '../data/company');
  let url = baseUrl + `&function=SYMBOL_SEARCH&keywords=${ticker}`;
  request(url, function(err, response, body) {
    if (err) { throw err; }
    fs.writeFile(`${folder}/${ticker}.txt`, body, function(err) {
      if (err) { throw err; }
    });
  });
};

/* Loops through all tickers and fetches basic company info (e.g. name),
scheduling API calls every 13 seconds. */

const getAllCompanies = function() {
  let timeout = 0;
  tickers.forEach((ticker) => {
    setTimeout(() => {
      fetchCompany(ticker);
    }, timeout);
    timeout += 13000;
  });
};