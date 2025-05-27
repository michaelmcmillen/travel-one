const path = require('path');

// Function to fetch the absolute path of the currency page
const fetchCurrencyPage = async () => {
    return path.join(__dirname, '../public/currency.html'); // Get the absolute path to the 'currency.html' file
};

// Function to fetch the currency symbol based on the country
const fetchCurrencySymbol = async (req) => {
    return req.db.select('symbol')
    .from('currency')
    .where('currency', 'in', function () {
        this.select('currency')
        .from('country')
        .where('country', req.params.country);
    });
};

// Function to fetch the currency code based on the country
const fetchCurrencyCode = async (req) => {
    return req.db.select('code')
    .from('currency')
    .where('currency', 'in', function () {
        this.select('currency')
        .from('country')
        .where('country', req.params.country);
    });
};

module.exports = { 
    fetchCurrencyPage,
    fetchCurrencySymbol,
    fetchCurrencyCode
};