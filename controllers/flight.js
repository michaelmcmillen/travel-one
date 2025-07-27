const flightService = require('../services/flightService');

// Get the flight page
const flightPage = async (req, res) => {
  const flightPage = await flightService.fetchFlightPage(req)
  res.sendFile(flightPage, { title: 'Flight' }); // Send the file using the absolute path
};

// Select flight inspiration based on city
const flightInspo = async (req, res) => {
  const flightInspo = await flightService.fetchInspo(req)
  res.send(flightInspo)
};

module.exports = {
  flightPage,
  flightInspo
};