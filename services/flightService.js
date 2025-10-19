const path = require('path');
const amadeus = require('../config/amadeus');
const { delay } = require('../config/common');

// Get the flight page
const fetchFlightPage = async (req, res) => {
    return path.join(__dirname, '../public/flight.html'); // Get the absolute path to the 'flight.html' file
};

// Fetch flight inspiration data
const fetchInspo = async (req) => {
    inspoData = [];
    try {
        // Fetch iataCode of the city name provided
        const locations = await fetchLocation(req);
        for (x = 0; x < Object.keys(locations).length; x++) {
            if (locations[x].name === req && "iataCode" in locations[x]) {
                iataCode = locations[x].iataCode;
                break;
            }
        }
        // Get inspo based on iataCode
        const flights = await amadeus.shopping.flightDestinations.get({
            origin: iataCode,
        })
        // For each iataCode destination, get city/country data
        for (x in flights.data) {
            await delay(2000);
            price = flights.data[x].price.total
            destIataCode = flights.data[x].destination
            const location = await fetchLocationOnIata(destIataCode);
            if ( location != undefined ) {
                location["iataCode"] = destIataCode
                location["price"] = price
                inspoData.push(location);
            }
        }
        console.log("#### INSPO RESULTS ####\n")
        console.log(inspoData)
        return inspoData
    }
    catch (error) {
        console.error(error);
    };
}

// Fetch city data based on city name
const fetchLocation = async (req) => {
    try {
        const locations = await amadeus.referenceData.locations.cities.get({
            keyword: req
          });
          return locations.data;
    }
    catch (error) {
        console.error(error);
    };
};

// Fetch county/city data based on iataCode
const fetchLocationOnIata = async (iataCode) => {
    try {
        const locations = await amadeus.referenceData.locations.get({
            subType: 'CITY',
            keyword: iataCode
          });
        for (x in locations.data) {
            location = locations.data[x]
            if ("iataCode" in location && location.iataCode === iataCode) {
                destCountry = location.address.countryName;
                destCity = location.address.cityName;
                return { country: destCountry, city: destCity };
            }
        }
    }
    catch (error) {
        console.error(error);
    };
};

module.exports = {
    fetchFlightPage,
    fetchInspo,
    fetchLocation
};