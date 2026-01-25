// Route for the airport endpoint
var express = require('express');
var airportRouter = express.Router();

const airportController = require('../controllers/airport')
airportRouter.get('/airport/departureAirportCode', airportController.airportDestinations);

module.exports = airportRouter;