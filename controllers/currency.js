// GET currency
const getCurrency = async (req, res) => {
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
};
  
  // GET currency code
 const getCurrencyCode = async (req, res) => {
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
};
  
module.exports = {
    getCurrency,
    getCurrencyCode
};