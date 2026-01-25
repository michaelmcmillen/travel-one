const flightService = require("../services/flightService");

// Find all destinations from given airport
const airportDestinations = async (req, res) => {
  const airportDestinations = await flightService.fetchAirportDestinations(req);
  res.send(airportDestinations);
};

module.exports = {
  airportDestinations,
};
