// Route for the country endpoint
var express = require('express');
var countryRouter = express.Router();

const countryController = require('../controllers/country')
countryRouter.get('/:country', countryController.countryData);

module.exports = countryRouter;