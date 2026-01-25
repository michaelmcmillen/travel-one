const path = require("path");
const amadeus = require("../config/amadeus");
const { delay } = require("../config/common");
let { randDate } = require("../config/common");
const { fetchAirportDestinations } = require("./airportService");

// Get the flight page
const fetchFlightPage = async (req, res) => {
  return path.join(__dirname, "../public/flight.html"); // Get the absolute path to the 'flight.html' file
};

/**
 * Fetch flight/country inspiration based on city name
 * @param {string} city
 * @returns {array} An array of dictionaires containing; country, city,
 * iataCode and price
 */
const fetchInspo = async (req) => {
  const { city } = req.params;
  let { budget } = req.query;

  inspoData = [];

  try {
    // GET iataCode based on city name
    const iataCode = await fetchIataCodeOnCity(city);
    // GET all destinations the airport flies too
    const destinationAirports = await fetchAirportDestinations(iataCode);

    let result = [];
    while (result.length <= 5) {
      // Get random destination airport
      let randIndex = Math.floor(Math.random() * destinationAirports.length);
      let randDestination = destinationAirports[randIndex];
      console.log("\n######################### Random Destination ####################################\n");
      console.log(randDestination);
      console.log("\n#################################################################################\n");

      let date = randDate()
      console.log("\n######################### Random Date ####################################\n");
      console.log(date);
      console.log("\n##########################################################################\n");

      // GET flight offer for origin, destination, date
      let flights = await fetchCheapest(iataCode, randDestination.iataCode, date);
      console.log("\n######## fetchFlightOffers : FLIGHT SEARCH OFFER EXAMPLE ########\n");
      console.log(flights.data[0]);
      console.log("\n######################################################################\n")

      if ( flights.data.length != 0 ) {
        let loc = {}
        loc.destCity = randDestination.name;
        loc.destCountry = randDestination.address.countryName
        loc.price = flights.data[0].price.total;
        result.push(loc)
        console.log(result)
      }
      await delay(2000);
    }
    return result;



    // For each iataCode destination, get city, country & price data
    // for (x in flights.data) {
    //   await delay(2000); // Temp delay for testing platform
    //   price = Math.round(Number(flights.data[x].price.total));
    //   budget = Number(budget);
    //   destIataCode = flights.data[x].destination;

    //   // Get destination details based on iataCode
    //   const location = await fetchLocationOnIata(destIataCode);

    //   if (location != undefined && price < budget) {
    //     location["iataCode"] = destIataCode;
    //     location["price"] = price;
    //     inspoData.push(location);
    //   }
    // }

    // console.log("\n######## fetchInspo RESULTS START ########\n")
    // console.log(inspoData)
    // console.log("\n######## fetchInspo RESULTS END ########\n")

    // return inspoData;
  } catch (error) {
    console.error(error);
  }
};

/**
 * Fetch location data based on city name
 * @param {string} city - City name
 * @returns {string} iataCode
 */
const fetchIataCodeOnCity = async (city) => {
  try {
    const locations = await amadeus.referenceData.locations.cities.get({
      keyword: city,
    });
    // Get correct iataCode for the city searched from response
    for (x = 0; x < Object.keys(locations.data).length; x++) {
      if (locations.data[x].name === city && "iataCode" in locations.data[x]) {
        iataCode = locations.data[x].iataCode;
        break;
      }
    }
    console.log("\n######## fetchIataCodeOnCity : IATA CODE FOR CITY SEARCHED ########\n");
    console.log(iataCode);
    console.log("\n######################################################################\n")
    return iataCode;
  } catch (error) {
    console.error(error);
  }
};

/**
 * Fetch flight inspiration based on iataCode
 * @param {string} iataCode
 * @returns {object} An object with a single key, holding an array of objects.
 * Each object contains; type, origin, destination, deptartureDate, returnDate,
 * price, and links with flightDates and flightOffers
 */
const fetchCheapest = async (originIataCode, destIataCode, departureDate) => {
    try {
      // Find the cheapest flights from SYD to BKK
      const response = await amadeus.shopping.flightOffersSearch.get({
        originLocationCode: originIataCode,
        destinationLocationCode: destIataCode,
        departureDate: departureDate,
        adults: "1",
        nonStop: "true"
      });
      console.log("\n######## fetchFlightOffers : FLIGHT SEARCH OFFER EXAMPLE ########\n");
      console.log(response.data[0]);
      console.log("\n######################################################################\n")
      return response;
    } catch (error) {
      console.error(error);
    }
};

/**
 * Fetch location data based on city name
 * @param {string} city - City name
 * @returns {array} An array of dictionaries for possible locations
 * based on the search. Dictionary includes; type, subType, iataCode,
 * address & geoCode
 */
const fetchLocationOnCity = async (city) => {
  try {
    const locations = await amadeus.referenceData.locations.cities.get({
      keyword: city,
    });
    return locations.data;
  } catch (error) {
    console.error(error);
  }
};

/**
 * Fetch country and city names based on iataCode
 * @param {string} iataCode
 * @returns {string} country and city
 */
const fetchLocationOnIata = async (iataCode) => {
  try {
    const locations = await amadeus.referenceData.locations.get({
      subType: "CITY",
      keyword: iataCode,
    });

    for (x in locations.data) {
      location = locations.data[x];
      if ("iataCode" in location && location.iataCode === iataCode) {
        country = location.address.countryName;
        city = location.address.cityName;
        return { country: country, city: city };
      }
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  fetchFlightPage,
  fetchInspo,
};
