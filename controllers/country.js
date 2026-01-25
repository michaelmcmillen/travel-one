const countryService = require("../services/countryService");

// Select country by name
const countryData = async (req, res) => {
  const countryData = await countryService.fetchCountryData(req);
  res.send(countryData);
};

module.exports = {
  countryData,
};
