var express = require('express');
var router = express.Router();

// GET currency
router.get('/:country', function(req, res, db) {
  req.db.select('symbol')
  .from('currency')
  .where('currency', 'in', function() {
    this.select('currency')
        .from('country')
        .where('country', req.params.country);
      })
  .then(response => {
    res.send(response)
  })
});

// GET currency code
router.get('/code/:country', function(req, res, db) {
  req.db.select('code')
  .from('currency')
  .where('currency', 'in', function() {
    this.select('currency')
        .from('country')
        .where('country', req.params.country);
      })
  .then(response => {
    res.send(response)
  })
});

module.exports = router;