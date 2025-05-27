var express = require('express');
var indexRouter = express.Router();

// GET home page
const indexController = require('../controllers/index')
indexRouter.get('/', indexController.indexPage);

module.exports = indexRouter;
