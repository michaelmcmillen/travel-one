const path = require('path');
const amadeus = require('../config/amadeus');
const { delay } = require('../config/common');

// Get the flight page
const fetchFlightPage = async (req, res) => {
    return path.join(__dirname, '../public/flight.html'); // Get the absolute path to the 'flight.html' file
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
        const flights = await fetchCheapest(iataCode)

        // For each iataCode destination, get city, country & price data
        for (x in flights.data) {
            await delay(2000); // Temp delay for testing platform
            price = Number(flights.data[x].price.total)
            budget = Number(budget);
            destIataCode = flights.data[x].destination

            // Get destination details based on iataCode
            const location = await fetchLocationOnIata(destIataCode);

            if ( location != undefined && price < budget) {
                location["iataCode"] = destIataCode
                location["price"] = price
                inspoData.push(location);
            }
        }

        console.log("\n######## fetchInspo RESULTS START ########\n")
        console.log(inspoData)
        console.log("\n######## fetchInspo RESULTS END ########\n")

        return inspoData
    }
    catch (error) {
        console.error(error);
    };
}

/**
 * Fetch flight inspiration based on iataCode
 * @param {string} iataCode
 * @returns {object} An object with a single key, holding an array of objects.
 * Each object contains; type, origin, destination, deptartureDate, returnDate,
 * price, and links with flightDates and flightOffers
 */
const fetchCheapest = async (iataCode) => {
    try {
        const flights = await amadeus.shopping.flightDestinations.get({
            origin: iataCode,
        })
        return flights
    }
    catch (error) {
        console.error(error);
    };
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
            keyword: city
          });
          return locations.data;
    }
    catch (error) {
        console.error(error);
    };
};

/**
 * Fetch country and city names based on iataCode
 * @param {string} iataCode
 * @returns {string} country and city
 */
const fetchLocationOnIata = async (iataCode) => {
    try {
        const locations = await amadeus.referenceData.locations.get({
            subType: 'CITY',
            keyword: iataCode
          });
        for (x in locations.data) {
            location = locations.data[x]
            if ("iataCode" in location && location.iataCode === iataCode) {
                country = location.address.countryName;
                city = location.address.cityName;
                return { country: country, city: city };
            }
        }
    }
    catch (error) {
        console.error(error);
    };
};

module.exports = {
    fetchFlightPage,
    fetchInspo
};