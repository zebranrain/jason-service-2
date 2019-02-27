const request = require('request');
const key = require('../api-keys/alphaVantage');
const fs = require('fs');
const path = require('path');
const _ = require('underscore');
let baseUrl = `https://www.alphavantage.co/query?&apikey=${key}`;

const tickers = [
  "ATVI",
  "ADBE",
  "AMD",
  "ALXN",
  "ALGN",
  "GOOG",
  "GOOGL",
  "AMZN",
  "AAL",
  "AMGN",
  "ADI",
  "AAPL",
  "AMAT",
  "ASML",
  "ADSK",
  "ADP",
  "BIDU",
  "BIIB",
  "BMRN",
  "BKNG",
  "AVGO",
  "CDNS",
  "CELG",
  "CERN",
  "CHTR",
  "CHKP",
  "CTAS",
  "CSCO",
  "CTXS",
  "CTSH",
  "CMCSA",
  "COST",
  "CSX",
  "CTRP",
  "DLTR",
  "EBAY",
  "EA",
  "EXPE",
  "FB",
  "FAST",
  "FISV",
  "GILD",
  "HAS",
  "HSIC",
  "IDXX",
  "ILMN",
  "INCY",
  "INTC",
  "INTU",
  "ISRG",
  "JBHT",
  "JD",
  "KLAC",
  "LRCX",
  "LBTYA",
  "LBTYK",
  "LULU",
  "MAR",
  "MXIM",
  "MELI",
  "MCHP",
  "MU",
  "MSFT",
  "MDLZ",
  "MNST",
  "MYL",
  "NTAP",
  "NTES",
  "NFLX",
  "NVDA",
  "NXPI",
  "ORLY",
  "PCAR",
  "PAYX",
  "PYPL",
  "PEP",
  "QCOM",
  "REGN",
  "ROST",
  "SIRI",
  "SWKS",
  "SBUX",
  "SYMC",
  "SNPS",
  "TMUS",
  "TTWO",
  "TSLA",
  "TXN",
  "KHC",
  "FOX",
  "FOXA",
  "ULTA",
  "UAL",
  "VRSN",
  "VRSK",
  "VRTX",
  "WBA",
  "WDC",
  "WLTW",
  "WDAY"
];

const timeSeries = [
  'TIME_SERIES_INTRADAY',
  'TIME_SERIES_DAILY'
];

const intervals = [
  '5min'
];

function priceFetcher(ticker, timeSeries, url, interval) {
  let folder = folderMapper(timeSeries, interval);
  url += `function=${timeSeries}&symbol=${ticker}&outputsize=full`;
  if (timeSeries === 'TIME_SERIES_INTRADAY') {
    url += `&interval=${interval}`;
  }
  request(url, function(err, response, body) {
    if (err) throw err;
    fs.writeFile(`${folder}/${ticker}.txt`, body, function(err) {
      if (err) throw err;
    });
  });
}

function folderMapper(timeSeries, interval) {
  if (timeSeries === 'TIME_SERIES_INTRADAY' && interval === '5min') {
    return path.join(__dirname, '../data/five-min');
  }
  if (timeSeries === 'TIME_SERIES_DAILY') {
    return path.join(__dirname, '../data/daily');
  }
}

function getAllPrices(url) {
  let timeout = 13000;
  tickers.forEach((ticker) => {
    timeSeries.forEach((timeSeries) => {
      if (timeSeries === 'TIME_SERIES_INTRADAY') {
        intervals.forEach((interval) => {
          setTimeout(() => {
            priceFetcher(ticker, timeSeries, url, interval);
          }, timeout)
          timeout += 13000;
        });
      } else {
        setTimeout(() => {
          priceFetcher(ticker, timeSeries, url);
        }, timeout)
        timeout += 13000;
      }
    });
  })
}

function fetchCompany(ticker) {
  let folder = path.join(__dirname, '../data/company');
  let url = baseUrl + `&function=SYMBOL_SEARCH&keywords=${ticker}`;
  request(url, function(err, response, body) {
    if (err) throw err;
    fs.writeFile(`${folder}/${ticker}.txt`, body, function(err) {
      if (err) throw err;
    });
  });
}

function getAllCompanies() {
  let timeout = 0;
  tickers.forEach((ticker) => {
    setTimeout(() => {
      fetchCompany(ticker)
    }, timeout);
    timeout += 13000;
  });
}