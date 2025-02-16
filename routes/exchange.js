// Route for the exchange endpoint
var express = require('express');
var exchangeRouter = express.Router();

const exchangeController = require('../controllers/exchange')
// country2 param uncessary in this request, however API may change to one where it is required
// so it is included in the route
exchangeRouter.get('/:country1/:country2', exchangeController.exchange);

module.exports = exchangeRouter;