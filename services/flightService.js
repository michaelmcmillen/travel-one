const path = require("path");
const amadeus = require("../config/amadeus");
const { delay } = require("../config/common");

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
    // Search locations based on the city name provided
    const locations = await fetchLocationOnCity(city);

    // Get correct iataCode for the city searched from response
    for (x = 0; x < Object.keys(locations).length; x++) {
      if (locations[x].name === city && "iataCode" in locations[x]) {
        iataCode = locations[x].iataCode;
        break;
      }
    }

    // Get inspiration based on iataCode
    const flights = await fetchCheapest(iataCode);

    console.log("\n######## fetchInspo RESULTS START ########\n");
    console.log(flights);
    console.log("\n######## fetchInspo RESULTS END ########\n");

    // For each iataCode destination, get city, country & price data
    for (x in flights.data) {
      await delay(2000); // Temp delay for testing platform
      price = Math.round(Number(flights.data[x].price.total));
      budget = Number(budget);
      destIataCode = flights.data[x].destination;

      // Get destination details based on iataCode
      const location = await fetchLocationOnIata(destIataCode);

      if (location != undefined && price < budget) {
        location["iataCode"] = destIataCode;
        location["price"] = price;
        inspoData.push(location);
      }
    }

    console.log("\n######## fetchInspo RESULTS START ########\n")
    console.log(inspoData)
    console.log("\n######## fetchInspo RESULTS END ########\n")

    return inspoData;
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
const fetchCheapest = async (iataCode) => {
  try {
    // const flights = await amadeus.shopping.flightDestinations.get({
    //     origin: "MAD",
    // })
    // TODO: Temporary hardcoded JSON response whilst the Amadeus Inspo Search is not working
    flights = JSON.parse(
      `{"data":[{"type":"flight-destination","origin":"MAD","destination":"PAR","departureDate":"2020-10-23","returnDate":"2020-10-26","price":{"total":"52.52"},"links":{"flightDates":"https://test.api.amadeus.com/v1/shopping/flight-dates?origin=MAD&destination=ALC&departureDate=2020-07-24,2021-01-19&oneWay=false&duration=1,15&nonStop=false&viewBy=DURATION","flightOffers":"https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=MAD&destinationLocationCode=ALC&departureDate=2020-10-23&returnDate=2020-10-26&adults=1&nonStop=false"}},{"type":"flight-destination","origin":"MAD","destination":"MUC","departureDate":"2020-10-23","returnDate":"2020-10-26","price":{"total":"52.52"},"links":{"flightDates":"https://test.api.amadeus.com/v1/shopping/flight-dates?origin=MAD&destination=ALC&departureDate=2020-07-24,2021-01-19&oneWay=false&duration=1,15&nonStop=false&viewBy=DURATION","flightOffers":"https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=MAD&destinationLocationCode=ALC&departureDate=2020-10-23&returnDate=2020-10-26&adults=1&nonStop=false"}},{"type":"flight-destination","origin":"MAD","destination":"SEA","departureDate":"2020-10-23","returnDate":"2020-10-26","price":{"total":"52.52"},"links":{"flightDates":"https://test.api.amadeus.com/v1/shopping/flight-dates?origin=MAD&destination=ALC&departureDate=2020-07-24,2021-01-19&oneWay=false&duration=1,15&nonStop=false&viewBy=DURATION","flightOffers":"https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=MAD&destinationLocationCode=ALC&departureDate=2020-10-23&returnDate=2020-10-26&adults=1&nonStop=false"}},{"type":"flight-destination","origin":"MAD","destination":"LON","departureDate":"2020-10-22","returnDate":"2020-10-25","price":{"total":"71.15"},"links":{"flightDates":"https://test.api.amadeus.com/v1/shopping/flight-dates?origin=MAD&destination=LON&departureDate=2020-07-24,2021-01-19&oneWay=false&duration=1,15&nonStop=false&viewBy=DURATION","flightOffers":"https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=MAD&destinationLocationCode=LON&departureDate=2020-10-22&returnDate=2020-10-25&adults=1&nonStop=false"}},{"type":"flight-destination","origin":"MAD","destination":"MUC","departureDate":"2020-08-12","returnDate":"2020-08-17","price":{"total":"98.53"},"links":{"flightDates":"https://test.api.amadeus.com/v1/shopping/flight-dates?origin=MAD&destination=MUC&departureDate=2020-07-24,2021-01-19&oneWay=false&duration=1,15&nonStop=false&viewBy=DURATION","flightOffers":"https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=MAD&destinationLocationCode=MUC&departureDate=2020-08-12&returnDate=2020-08-17&adults=1&nonStop=false"}},{"type":"flight-destination","origin":"MAD","destination":"WAW","departureDate":"2020-07-30","returnDate":"2020-08-06","price":{"total":"108.30"},"links":{"flightDates":"https://test.api.amadeus.com/v1/shopping/flight-dates?origin=MAD&destination=WAW&departureDate=2020-07-24,2021-01-19&oneWay=false&duration=1,15&nonStop=false&viewBy=DURATION","flightOffers":"https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=MAD&destinationLocationCode=WAW&departureDate=2020-07-30&returnDate=2020-08-06&adults=1&nonStop=false"}},{"type":"flight-destination","origin":"MAD","destination":"KRK","departureDate":"2020-07-25","returnDate":"2020-08-01","price":{"total":"116.81"},"links":{"flightDates":"https://test.api.amadeus.com/v1/shopping/flight-dates?origin=MAD&destination=KRK&departureDate=2020-07-24,2021-01-19&oneWay=false&duration=1,15&nonStop=false&viewBy=DURATION","flightOffers":"https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=MAD&destinationLocationCode=KRK&departureDate=2020-07-25&returnDate=2020-08-01&adults=1&nonStop=false"}}],"dictionaries":{"currencies":{"EUR":"EURO"},"locations":{"CLJ":{"subType":"AIRPORT","detailedName":"CLUJ NAPOCA"},"RIX":{"subType":"AIRPORT","detailedName":"RIGA INTL"},"KTM":{"subType":"AIRPORT","detailedName":"TRIBHUVAN INTL"},"KRK":{"subType":"AIRPORT","detailedName":"JOHN PAUL II BALICE"},"HNL":{"subType":"AIRPORT","detailedName":"DANIEL K INOUYE INTL"},"FLL":{"subType":"AIRPORT","detailedName":"FLL INTL"},"ORL":{"subType":"AIRPORT","detailedName":"EXECUTIVE"},"SLC":{"subType":"AIRPORT","detailedName":"SALT LAKE CITY INTL"},"WAW":{"subType":"AIRPORT","detailedName":"FREDERIC CHOPIN"},"MTY":{"subType":"AIRPORT","detailedName":"MARIANO ESCOBEDO INTL"},"TLL":{"subType":"AIRPORT","detailedName":"LENNART MERI"},"GOA":{"subType":"AIRPORT","detailedName":"CRISTOFORO COLOMBO"},"MUC":{"subType":"AIRPORT","detailedName":"MUNICH INTERNATIONAL"},"SSA":{"subType":"AIRPORT","detailedName":"D.L.E.MAGALHAES"},"ACC":{"subType":"AIRPORT","detailedName":"KOTOKA INTL"},"MDZ":{"subType":"AIRPORT","detailedName":"EL PLUMERILLO"},"LWO":{"subType":"AIRPORT","detailedName":"INTERNATIONAL"},"MGA":{"subType":"AIRPORT","detailedName":"AUGUSTO C.SANDINO INT"},"BOS":{"subType":"AIRPORT","detailedName":"EDWARD L LOGAN INTL"},"LON":{"subType":"CITY","detailedName":"LONDON"},"TYO":{"subType":"CITY","detailedName":"TOKYO"},"DEN":{"subType":"AIRPORT","detailedName":"DENVER INTERNATIONAL"},"GOT":{"subType":"AIRPORT","detailedName":"LANDVETTER"},"SEA":{"subType":"AIRPORT","detailedName":"SEATTLE TACOMA INTL"},"MAD":{"subType":"AIRPORT","detailedName":"ADOLFO SUAREZ BARAJAS"},"CCS":{"subType":"AIRPORT","detailedName":"SIMON BOLIVAR INTL"},"VIE":{"subType":"AIRPORT","detailedName":"VIENNA INTERNATIONAL"},"MOW":{"subType":"CITY","detailedName":"MOSCOW"},"RGN":{"subType":"AIRPORT","detailedName":"MINGALADON"},"ALC":{"subType":"AIRPORT","detailedName":"ALICANTE AIRPORT"},"KIV":{"subType":"AIRPORT","detailedName":"INTERNATIONAL"},"VCE":{"subType":"AIRPORT","detailedName":"MARCO POLO"},"SIN":{"subType":"AIRPORT","detailedName":"CHANGI"},"GLA":{"subType":"AIRPORT","detailedName":"GLASGOW INTL"}}},"meta":{"currency":"EUR","links":{"self":"https://test.api.amadeus.com/v1/shopping/flight-destinations?origin=MAD&departureDate=2020-07-24,2021-01-19&oneWay=false&duration=1,15&nonStop=false&viewBy=DESTINATION"},"defaults":{"departureDate":"2020-07-24,2021-01-19","oneWay":false,"duration":"1,15","nonStop":false,"viewBy":"DESTINATION"}}}`
    );
    return flights;
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
