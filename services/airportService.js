const amadeus = require("../config/amadeus");
const { delay } = require("../config/common");

const fetchAirportDestinations = async (req) => {
  try {
    const response = await amadeus.airport.directDestinations.get({
      departureAirportCode: req,
    });

    console.log("\n######## fetchAirportDestinations : EXAMPLE OF FLIGHT DESTINATION FOR SEARCHED CITY ########\n");
    console.log(response.data[0]);
    console.log("\n#################################################################################\n");

    return response.data;

  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  fetchAirportDestinations,
};
