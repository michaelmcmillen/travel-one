// Select currency symbol based on country
const getCurrency = async (req, res) => {
  req.db.select('symbol')
    .from('currency')
    .where('currency', 'in', function () {
      this.select('currency')
        .from('country')
        .where('country', req.params.country);
    })
    .then(response => {
      res.send(response)
    })
};

// Select currency code based on country
const getCurrencyCode = async (req, res) => {
  req.db.select('code')
    .from('currency')
    .where('currency', 'in', function () {
      this.select('currency')
        .from('country')
        .where('country', req.params.country);
    })
    .then(response => {
      res.send(response)
    })
};

module.exports = {
  getCurrency,
  getCurrencyCode
};