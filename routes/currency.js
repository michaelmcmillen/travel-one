// Route for the currency endpoint
var express = require('express');
var currencyRouter = express.Router();

const curencyController = require('../controllers/currency')
currencyRouter.get('/', curencyController.currencyPage);
currencyRouter.get('/:country', curencyController.currencySymbol);
currencyRouter.get('/code/:country', curencyController.currencyCode);

module.exports = currencyRouter;