const currencyService = require("../services/currencyService");

// Get the currency page
const currencyPage = async (req, res) => {
  const currencyPage = await currencyService.fetchCurrencyPage(req);
  res.sendFile(currencyPage, { title: "Currency" }); // Send the file using the absolute path
};

// Select currency symbol based on country
const currencySymbol = async (req, res) => {
  const currencySymbol = await currencyService.fetchCurrencySymbol(req);
  res.send(currencySymbol);
};

// Select currency code based on country
const currencyCode = async (req, res) => {
  const currencyCode = await currencyService.fetchCurrencyCode(req);
  res.send(currencyCode);
};

module.exports = {
  currencyPage,
  currencySymbol,
  currencyCode,
};
