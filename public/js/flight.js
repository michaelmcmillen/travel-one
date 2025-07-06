const dataValue = document.getElementById('data');
const goAirportBtn = document.getElementById('go-btn');
const airportInput = document.getElementById('airport-input');

// Function to get all return flight data
const goReFlight = async (airport) => {
    const response = await fetch(`http://localhost:3000/flight/${airport}`);
    // const airportData = await response.json()
    dataValue.textContent = response;
};

// Execute 'goAirport' func when airport go button is clicked or keyboard Enter is selected
const goReFlightHandler = (e) => {
    if (e.type === 'click' || (e.type === 'keydown' && e.key === 'Enter' && document.activeElement === airportInput)) {
        goReFlight(airportInput.value)
    }
}

goAirportBtn.addEventListener('click', goReFlightHandler);
