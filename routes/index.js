var express = require('express');
var router = express.Router();

// GET home page
router.get('/', function(req, res, next) {
  res.sendFile('./public/index.html', { title: 'Express' });
});

module.exports = router;
