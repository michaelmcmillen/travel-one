var express = require('express');
var router = express.Router();

/* GET country listing. */
router.get('/:country', function(req, res, db) {
  req.db.select('*')
  .from('country')
  .where('country', req.params.country)
  .then(response => {
    res.send(response)
  })
});

module.exports = router;