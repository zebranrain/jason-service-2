require('dotenv').config();
const express = require('express');
var cors = require('cors');
const app = express();
const port = process.env.PORT || 80;
const bodyParser = require('body-parser');
const retrievePriceHistory = require('./db/queries.js');

const translateError = {
  companyNotFound: { code: 404, message: 'Sorry! We don\'t have price records for that company.' },
  timeframeNotFound: { code: 404, message: 'Sorry! We don\'t support the timeframe you requested.' }
};

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/:ticker', express.static('./public'));

app.get('/api/prices', async function(req, res) {
  let { ticker, timeframe } = req.query;
  retrievePriceHistory(ticker, timeframe)
    .then(prices => res.json(prices))
    .catch(err => {
      // pulls the code and message from the err.message object and translates them for human consumption
      let { code, message } = translateError[err.message];
      res.status(code).end(message);
    });
});

app.listen(port, () => { console.log(`Listening on port ${port}!`); });