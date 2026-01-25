const exchangeService = require("../services/exchangeService");

// Selects the exchange rates based on supplied country
const exchangeRate = async (req, res) => {
  const exchange = await exchangeService.fetchExchangeRate(
    req.params.country1,
    req.params.country2
  );
  res.send(exchange);
};

module.exports = {
  exchangeRate,
};
