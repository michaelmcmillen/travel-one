// Route for the flight endpoint
var express = require('express');
var flightRouter = express.Router();

const flightController = require('../controllers/flight')
flightRouter.get('/', flightController.getFlightPage);
flightRouter.get('/:airport', flightController.getAirports);

module.exports = flightRouter;