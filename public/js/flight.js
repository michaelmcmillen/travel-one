import { capitalise }  from './common.js';

const dataValue = document.getElementById('data');
const searchCityFlightBtn = document.getElementById('search-btn');
const airportInput = document.getElementById('input-city');

// Function to get all return flight data
const searchCityFlight = async (city) => {
    try {
        const flight_inspo = await fetch(`http://localhost:3000/flight/city/${city}`);
        dataValue.innerHTML = '';
        const inspo = await flight_inspo.json();
        for ( const data of inspo ) {
            const flightInfo = document.createElement('div');
            flightInfo.classList.add('has-text-weight-light');
            flightInfo.classList.add('is-size-6')
            const destCity = capitalise(data.city)
            const destCountry = capitalise(data.country)
            const price = capitalise(data.price)
            flightInfo.textContent = `${city} > ${destCity}, ${destCountry} : $${price}`;
            dataValue.appendChild(flightInfo);
        }
    }
    catch (error) {
        console.error('Error fetching flight data:', error);
        dataValue.textContent = 'No flights found for this city.';
        return;
    }
};

// Execute 'searchCityFlight' func when Go button is clicked
const searchCityFlightHandler = (e) => {
    if (e.type === 'click' || (e.type === 'keydown' && e.key === 'Enter')) {
        searchCityFlight(airportInput.value);
    }
}

searchCityFlightBtn.addEventListener('click', searchCityFlightHandler);
airportInput.addEventListener('keydown', searchCityFlightHandler);
