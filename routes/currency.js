// Route for the currency endpoint
var express = require('express');
var currencyRouter = express.Router();

const curencyController = require('../controllers/currency')
currencyRouter.get('/', curencyController.getCurrencyPage);
currencyRouter.get('/:country', curencyController.getCurrency);
currencyRouter.get('/code/:country', curencyController.getCurrencyCode);

module.exports = currencyRouter;