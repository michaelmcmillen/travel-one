const flightService = require('../services/flightService');

// Get the flight page
const flightPage = async (req, res) => {
  const flightPage = await flightService.fetchFlightPage(req)
  res.sendFile(flightPage, { title: 'Flight' }); // Send the file using the absolute path
};

// Select flight inspiration based on city
const flightInspo = async (req, res) => {
  const flightInspo = await flightService.fetchInspo(req);
  res.send(flightInspo)
};

// TODO: Change this to a location controller
const flightLocation = async (req, res) => {
  const flightLocation = await flightService.fetchLocation(req.params.location);
  res.send(flightLocation)
};

module.exports = {
  flightPage,
  flightInspo,
  flightLocation
};