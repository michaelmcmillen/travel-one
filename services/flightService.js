const path = require('path');
const amadeus = require('../config/amadeus');

// Get the flight page
const fetchFlightPage = async (req, res) => {
    return path.join(__dirname, '../public/flight.html'); // Get the absolute path to the 'flight.html' file
};

// Fetch flight inspiration data
const fetchInspo = async (req, res) => {
    try {
        const flights = await amadeus.shopping.flightDestinations.get({
            origin: req,
        })
        return flights
    }
    catch (error) {
        console.error(error);
    };
}

// TODO: Change this to a location service
const fetchLocation = async (req, res) => {
    try {
        const locations = await amadeus.referenceData.locations.get({
            keyword: req,
            subType: "AIRPORT",
        });
        return locations
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