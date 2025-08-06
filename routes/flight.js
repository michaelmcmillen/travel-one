// Route for the flight endpoint
var express = require('express');
var flightRouter = express.Router();

const flightController = require('../controllers/flight')
flightRouter.get('/', flightController.flightPage);
flightRouter.get('/city/:city', flightController.flightInspo);

// TODO: Change this to a location route
flightRouter.get('/location/:location', flightController.flightLocation);

module.exports = flightRouter;