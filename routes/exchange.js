var express = require('express');
var router = express.Router();

/* GET currency listing. */
router.get('/:country1/:country2', function(req, res) {

  fetch(`https://open.er-api.com/v6/latest/${req.params.country1}`)
  .then(response => response.json())
  .then(data => {
    res.send(data)
  })
});

module.exports = router;