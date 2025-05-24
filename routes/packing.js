// Route for the packing endpoint
var express = require('express');
var packingRouter = express.Router();

const packingController = require('../controllers/packing')
packingRouter.get('/', packingController.getPackingPage);

module.exports = packingRouter;