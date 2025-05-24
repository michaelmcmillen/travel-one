const path = require('path');

// Get the currency page
const getCurrencyPage = async (req, res) => {
  const filePath = path.join(__dirname, '../public/currency.html'); // Get the absolute path to the 'currency.html' file
  res.sendFile(filePath, { title: 'Currency' }); // Send the file using the absolute path
};

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
  getCurrencyPage,
  getCurrency,
  getCurrencyCode
};