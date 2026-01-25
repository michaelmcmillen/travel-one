const flightService = require("../services/flightService");

// Select flight inspiration based on city
const flightInspo = async (req, res) => {
  const flightInspo = await flightService.fetchInspo(req);
  res.send(flightInspo);
};

// // TODO: Change this to a location controller
// const flightLocation = async (req, res) => {
//   const flightLocation = await flightService.fetchLocation(req.params.location);
//   res.send(flightLocation);
// };

module.exports = {
  flightInspo,
  // flightLocation,
};
