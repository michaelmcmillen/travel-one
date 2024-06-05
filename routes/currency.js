var express = require('express');
var router = express.Router();


/* GET currency listing. */
router.get('/countryCurrency/:country', function(req, res, next) {
  
  fetch(`https://api.countrystatecity.in/v1/countries/${req}`)
  .then(response => response.json())
  .then(resp => res.send("HELLO!!"))
  // .then(resp => res.json(resp.currency))

});

module.exports = router;
