// const { response } = require("express");

const dataValue = document.getElementById('data');
const searchCityFlightBtn = document.getElementById('search-btn');
const airportInput = document.getElementById('input-city');

// Function to get all return flight data
const searchCityFlight = async (city) => {
    const response = await fetch(`http://localhost:3000/flight/${city}`);
    try {
        results = await response.json();
        data = results.data
        dataValue.innerHTML = '';
        data.forEach(flight => {
            const flightInfo = document.createElement('div');
            flightInfo.textContent = `Flight from ${flight.origin}, to ${flight.destination} at $${flight.price.total}`;
            dataValue.appendChild(flightInfo);
        });
    } catch (error) {
        console.error('Error fetching flight data:', error);
        dataValue.textContent = 'No flights found for this city.';
        return;
    }
};

// Execute 'goReFlight' func when Go button is clicked
const searchCityFlightHandler = (e) => {
    if (e.type === 'click' || (e.type === 'keydown' && e.key === 'Enter')) {
        searchCityFlight(airportInput.value);
    }
}

searchCityFlightBtn.addEventListener('click', searchCityFlightHandler);
airportInput.addEventListener('keydown', searchCityFlightHandler);
