const dataValue = document.getElementById('data');
const goAirportBtn = document.getElementById('go-btn');
const airportInput = document.getElementById('airport-input');

// Function to get all return flight data
// Currently hardcoded to MAD foor dev purposes
const goReFlight = async (city) => {
    fetch(`http://localhost:3000/flight/MAD`)
        .then(response => response.json())
        .then(resp => {
            // Temp logic to printout flight data to UI
            if (resp.length === 0) {
                dataValue.textContent = 'No flights found for this city.';
            } else {
                dataValue.innerHTML = '';
                resp.forEach(flight => {
                    const flightInfo = document.createElement('div');
                    flightInfo.textContent = `Flight to ${flight.destination} from ${flight.origin} at ${flight.price.total}`;
                    dataValue.appendChild(flightInfo);
                });
            }
        })
};

// Execute 'goReFlight' func when Go button is clicked
const goReFlightHandler = (e) => {
    if (e.type === 'click' || (e.type === 'keydown' && e.key === 'Enter')) {
        goReFlight()
    }
}

goAirportBtn.addEventListener('click', goReFlightHandler);
