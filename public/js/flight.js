import { capitalise, createDivWithClass } from "./common.js";

// Get elements
const startBtn = document.getElementById("start-btn");
const searchBtn = document.getElementById("search-btn");
const restartBtn = document.getElementById("restart-btn");
const resultCards = document.getElementById("result-cards");
const searchInspoBtn = document.getElementById("search-inspo-btn");
const airportInput = document.getElementById("input-city");
const budgetInput = document.getElementById("input-budget");
const controller = new AbortController();

let currentStep = 1;

// Function to get all return flight data
const searchCityFlight = async (city, budget) => {
  const signal = controller.signal;
  try {
    const flight_inspo = await fetch(
      `http://localhost:3000/flight/city/${city}?budget=${budget}`,
      { signal }
    );
    resultCards.innerHTML = "";
    const inspo = await flight_inspo.json();
    createFlightCards(inspo);
  } catch (error) {
    resultCards.textContent = "No flights found for this city.";
    return;
  }
};

// Execute 'searchCityFlight' func when Search button is clicked
const searchCityFlightHandler = (e) => {
  if (e.type === "click" || (e.type === "keydown" && e.key === "Enter")) {
    searchCityFlight(airportInput.value, budgetInput.value);
  }
};

// Create flight cards foir results page
const createFlightCards = (data) => {
  for (let i = 0; i < Math.min(data.length, 5); i++) {
    const flightCard = createDivWithClass("flight-card");
    const flightRoute = createDivWithClass("flight-route");
    const flightPrice = createDivWithClass("flight-price");
    const flightAirline = createDivWithClass("flight-airline");
    const destination = createDivWithClass("destination");

    const destCity = capitalise(data[i].city);
    const destCountry = capitalise(data[i].country);
    const price = data[i].price;

    flightPrice.textContent = `$${price}`;
    flightAirline.textContent = "Airline BA";
    destination.textContent = `${destCity}, ${destCountry}`;

    flightCard.appendChild(flightRoute);
    flightCard.appendChild(flightPrice);
    flightCard.appendChild(flightAirline);
    flightRoute.appendChild(destination);
    resultCards.appendChild(flightCard);
  }
};

const nextQuestion = (step) => {
  const current = document.getElementById(`q${currentStep}`);
  const next = document.getElementById(`q${step}`);

  // Slide out current question
  current.classList.add("slide-out-left");

  setTimeout(() => {
    current.classList.remove("slide-out-left", "active");
    next.classList.add("active");
    currentStep = step;
  }, 650);
};

function showResults() {
  const current = document.getElementById(`q${currentStep}`);
  const results = document.getElementById("results");
  const container = document.getElementById("container");

  current.classList.add("slide-out-left");

  searchCityFlight(airportInput.value, 1000);

  setTimeout(() => {
    current.classList.remove("slide-out-left", "active");
    results.classList.add("active");
    container.classList.add("container-results");
  }, 650);
}

function restart() {
  // Abort current request if not already fulfilled
  if (controller) {
    controller.abort();
  }

  resultCards.innerHTML = "";

  const container = document.getElementById("container");
  const current = document.getElementById(`results`);
  const next = document.getElementById(`q2`);

  // Slide out current question
  current.classList.add("slide-out-left");

  setTimeout(() => {
    current.classList.remove("slide-out-left", "active");
    container.classList.remove("container-results");
    next.classList.add("active");
    currentStep = step;
  }, 650);
}

startBtn.addEventListener("click", () => nextQuestion(2));
searchBtn.addEventListener("click", () => showResults());
restartBtn.addEventListener("click", () => restart());
searchInspoBtn.addEventListener("click", searchCityFlightHandler);
airportInput.addEventListener("keydown", searchCityFlightHandler);
