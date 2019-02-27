const retrievePriceHistory = require('../db/queries.js');

test('retrievePriceHistory returns an object', async () => {
  expect.assertions(1);
  const priceHistory = await retrievePriceHistory('AAPL', 'day');
  expect(typeof priceHistory).toBe('object');
});

test('the object returned by retrievePriceHistory has a date, price, and company id', async () => {
  expect.assertions(3);
  const priceHistory = await retrievePriceHistory('AAPL', 'day');
  const { date, price, companyId } = priceHistory.prices[0];
  expect(date).toBeDefined();
  expect(price).toBeDefined();
  expect(companyId).toBeDefined();
});

test('invoking retrievePriceHistory with the "day" interval returns an array of prices at 5-minute intervals', async () => {
  expect.assertions(1);
  const priceHistory = await retrievePriceHistory('AAPL', 'day');
  let end = new Date(priceHistory.prices[0].date);
  let start = new Date(priceHistory.prices[1].date);
  expect(end - start).toBe(300000);
});

test('invoking retrievePriceHistory with the "week" interval returns an array of prices at 10-minute intervals', async () => {
  expect.assertions(1);
  const priceHistory = await retrievePriceHistory('AAPL', 'week');
  let end = new Date(priceHistory.prices[0].date);
  let start = new Date(priceHistory.prices[1].date);
  expect(end - start).toBe(600000);
});

test('invoking retrievePriceHistory with the "month" interval returns an array of prices at daily intervals', async () => {
  expect.assertions(1);
  const priceHistory = await retrievePriceHistory('AAPL', 'month');
  let end = new Date(priceHistory.prices[0].date);
  let start = new Date(priceHistory.prices[1].date);
  expect(end - start).toBe(86400000);
});

test('invoking retrievePriceHistory with the "quarterly" interval returns an array of prices at daily intervals', async () => {
  expect.assertions(1);
  const priceHistory = await retrievePriceHistory('AAPL', 'quarter');
  let end = new Date(priceHistory.prices[0].date);
  let start = new Date(priceHistory.prices[1].date);
  expect(end - start).toBe(86400000);
});

test('invoking retrievePriceHistory with the "year" interval returns an array of prices at daily intervals', async () => {
  expect.assertions(1);
  const priceHistory = await retrievePriceHistory('AAPL', 'year');
  let end = new Date(priceHistory.prices[0].date);
  let start = new Date(priceHistory.prices[1].date);
  expect(end - start).toBe(86400000);
});

test('invoking retrievePriceHistory with the "fiveYear" interval returns an array of prices at weekly intervals', async () => {
  expect.assertions(1);
  const priceHistory = await retrievePriceHistory('AAPL', 'fiveYear');
  let end = new Date(priceHistory.prices[0].date);
  let start = new Date(priceHistory.prices[1].date);
  expect(end - start).toBe(604800000);
});