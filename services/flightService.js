const path = require('path');
const amadeus = require('../config/amadeus');

// Get the flight page
const fetchFlightPage = async (req, res) => {
    return path.join(__dirname, '../public/flight.html'); // Get the absolute path to the 'flight.html' file
};

// Fetch flight inspiration data
const fetchInspo = async (req, res) => {
    try {
        // Find cheapest destinations from Madrid (currently hardcoded)
        const flights = await amadeus.shopping.flightDestinations.get({
            origin: req,
        })
        return flights
    }
    catch (error) {
        console.error(error);
    };
}

module.exports = {
    fetchFlightPage,
    fetchInspo
};