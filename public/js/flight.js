const dataValue = document.getElementById('data');
const searchCityFlightBtn = document.getElementById('search-btn');
const airportInput = document.getElementById('input-city');

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Function to get all return flight data
const searchCityFlight = async (city) => {
    const flight_inspo = await fetch(`http://localhost:3000/flight/city/${city}`);
    try {
        results = await flight_inspo.json();
        data = results.data;
        dataValue.innerHTML = '';
        destinationCity = null;
        for (flight of data) {
            const flightInfo = document.createElement('div');
            try {

                // TODO: Remove delay when moving to prod
                await delay(2000);
                
                const locations = await fetch(`http://localhost:3000/flight/location/${flight.destination}`);
                loc = await locations.json();
                cities = loc.data;
                for (destination of cities) {
                    if (destination.iataCode === flight.destination) {
                        destinationCity = destination.address.cityName
                        break;
                    }
                    else {
                        destinationCity = 'Unknown City';
                    }
                }
            } catch (error) {
                destinationCity = 'No City';
                console.error('No destination data found for this flight');
            }
            flightInfo.textContent = `Flight from ${flight.origin}, to ${destinationCity} at $${flight.price.total}`;
            if (city === flight.origin) {
                dataValue.appendChild(flightInfo);
            }
        };
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
