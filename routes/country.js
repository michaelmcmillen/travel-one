var express = require('express');
var countryRouter = express.Router();

const countryController = require('../controllers/country')
countryRouter.get('/:country', countryController.get);

module.exports = countryRouter;