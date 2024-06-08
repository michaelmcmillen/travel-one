var express = require('express');
var router = express.Router();

/* GET currency listing. */
router.get('/countryCurrency/:country', function(req, res, db) {
  req.db.select('currency')
  .from('country')
  .where({
    country: req.params.country
  })
  .then(response => {
    res.send(response)
  })
});

module.exports = router;