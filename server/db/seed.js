const { Company, DailyPrice, FiveMinPrice, sequelize } = require('./models.js');
const fs = require('fs');
const { promisify } = require('util');
const path = require('path');
const _ = require('underscore');
const companyDir = path.join(__dirname, '../data/company');
const dailyDir = path.join(__dirname, '../data/daily');
let fiveMinDir = path.join(__dirname, '../data/five-min');
const dailyLimit = new Date("2014-01-01");
const fiveMinLimit = new Date("2019-02-03");
const readdir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);

function forEachFileInDir(dir, callback) {
  fs.readdir(dir, function(err, files) {
    if (err) throw err;
    files.forEach(function(file) {
      fs.readFile(`${dir}/${file}`, 'utf8', function(err, data) {
        if (err) callback(err);
        data = JSON.parse(data);
        return callback(null, data);
      });
    });
  });
}

function mapToRecentPrices(prices, companyId, limit) {
  let allPrices = _.map(prices, (data, date, dailyPrices) => {
    let price = parseFloat(dailyPrices[date]['4. close']);
    return { date, price, companyId };
  });
  return _.filter(allPrices, (price) => {
    let date = new Date(price.date);
    return date >= limit;
  });
}

async function generateCompaniesFromFiles() {
  const files = await readdir(companyDir);
  const companies = await _.map(files, async file => {
    let data = await readFile(`${companyDir}/${file}`, 'utf8');
    data = JSON.parse(data);
    let company = data.bestMatches[0];
    let ticker = company['1. symbol'];
    let name = company['2. name'];
    return { ticker, name };
  });
  return Promise.all(companies);
}

async function seedCompanies() {
  generateCompaniesFromFiles()
  .then((companies) => {
    return Company.bulkCreate(companies);
  });
}

async function seedDailyPrices() {
  forEachFileInDir(dailyDir, function(err, data) {
    if (err) throw err;
    let ticker = data['Meta Data']['2. Symbol'];
    let allPrices = data["Time Series (Daily)"];
    Company.findOne({where: { ticker }})
    .then((company) => {
      let companyId = company.id;
      let recentPrices = mapToRecentPrices(allPrices, companyId, dailyLimit);
      return DailyPrice.bulkCreate(recentPrices);
    });
  });
}

async function seedFiveMinPrices() {
  forEachFileInDir(fiveMinDir, function(err, data) {
    if (err) throw err;
    let ticker = data['Meta Data']['2. Symbol'];
    let allPrices = data["Time Series (5min)"];
    Company.findOne({where: { ticker }})
    .then((company) => {
      let companyId = company.id;
      let recentPrices = mapToRecentPrices(allPrices, companyId, fiveMinLimit);
      return FiveMinPrice.bulkCreate(recentPrices);
    });
  });
}

sequelize.sync()
.then(seedCompanies)
.then(seedDailyPrices)
.then(seedFiveMinPrices);