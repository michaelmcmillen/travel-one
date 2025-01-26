var express = require('express');
var exchangeRouter = express.Router();

const exchangeController = require('../controllers/exchange')
exchangeRouter.get('/:country1/:country2', exchangeController.exchange);

module.exports = exchangeRouter;