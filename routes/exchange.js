var express = require('express');
var router = express.Router();

// GET exchange listing
// country2 param uncessary in this request, however API may change to one where it is required
router.get('/:country1/:country2', function(req, res) {
  fetch(`https://open.er-api.com/v6/latest/${req.params.country1}`)
  .then(response => response.json())
  .then(data => {
    res.send(data)
  })
});

module.exports = router;