import { capitalise } from './common.js';

const start = document.getElementById('start');
const search = document.getElementById('search');
const dataValue = document.getElementById('data');
const searchCityFlightBtn = document.getElementById('search-btn');
const airportInput = document.getElementById('input-city');
const budgetInput = document.getElementById('input-budget');


let currentStep = 1;
const totalSteps = 3;
const progressBar = document.getElementById("progressBar");




// Function to get all return flight data
const searchCityFlight = async (city, budget) => {
  try {
    const flight_inspo = await fetch(`http://localhost:3000/flight/city/${city}?budget=${budget}`);
    dataValue.innerHTML = '';
    const inspo = await flight_inspo.json();
    for (let i = 0; i < Math.min(inspo.length, 5); i++) {

      const flightCard = Object.assign(document.createElement('div'), { className: 'flight-card' });
      const flightRoute = Object.assign(document.createElement('div'), { className: 'flight-route' });
      const flightPrice = Object.assign(document.createElement('div'), { className: 'flight-price' });
      const flightAirline = Object.assign(document.createElement('div'), { className: 'flight-airline' });
      const destination = Object.assign(document.createElement('span'), { className: 'destination' });

      const destCity = capitalise(inspo[i].city);
      const destCountry = capitalise(inspo[i].country);
      const price = inspo[i].price;

      flightPrice.textContent = `$${price}`;
      flightAirline.textContent = "Airline BA";
      destination.textContent = `${destCity}, ${destCountry}`;

      flightCard.appendChild(flightRoute);
      flightCard.appendChild(flightPrice);
      flightCard.appendChild(flightAirline);
      flightRoute.appendChild(destination);
      dataValue.appendChild(flightCard);
    }
  }
  catch (error) {
    console.error('Error fetching flight data:', error);
    dataValue.textContent = 'No flights found for this city.';
    return;
  }
};

// Execute 'searchCityFlight' func when Search button is clicked
const searchCityFlightHandler = (e) => {
  if (e.type === 'click' || (e.type === 'keydown' && e.key === 'Enter')) {
    searchCityFlight(airportInput.value, budgetInput.value);
  }
}

const nextQuestion = (step) => {
  const current = document.getElementById(`q${currentStep}`);
  const next = document.getElementById(`q${step}`);

  // Slide out current question
  current.classList.add("slide-out-left");

  setTimeout(() => {
    current.classList.remove("slide-out-left", "active");
    next.classList.add("active");
    currentStep = step;
    updateProgress();
  }, 650);
}

function showResults() {
  const current = document.getElementById(`q${currentStep}`);
  const results = document.getElementById("results");
  const container = document.getElementById("container");

  current.classList.add("slide-out-left");

  searchCityFlight(airportInput.value, 1000);

  setTimeout(() => {
    current.classList.remove("slide-out-left", "active");
    results.classList.add("active");
    container.classList.add("container-results")

    updateProgress(100);

    const budget = document.getElementById("budget").value || "unknown";
    const dest = document.getElementById("destinationType").value || "anywhere";
    const time = document.getElementById("travelTime").value || "anytime";

    document.getElementById("resultText").innerText =
      `We’ll find ${dest} destinations for ${time} trips within £${budget}.`;
  }, 650);
}

function restart() {
  document.querySelectorAll(".question").forEach(q => q.classList.remove("active"));
  document.getElementById("q1").classList.add("active");
  currentStep = 1;
  updateProgress();
}

function updateProgress(percentOverride) {
  const percent = percentOverride ?? ((currentStep - 1) / totalSteps) * 100;
  progressBar.style.width = `${percent}%`;
}

start.addEventListener('click', () => nextQuestion(2))
search.addEventListener('click', () => showResults())
searchCityFlightBtn.addEventListener('click', searchCityFlightHandler);
airportInput.addEventListener('keydown', searchCityFlightHandler);