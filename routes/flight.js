// Route for the flight endpoint
var express = require('express');
var flightRouter = express.Router();

const flightController = require('../controllers/flight')
flightRouter.get('/', flightController.flightPage);
flightRouter.get('/:city', flightController.flightInspo);

module.exports = flightRouter;