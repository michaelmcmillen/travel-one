import { capitalise, createElement } from "./common.js";

const welcomeScreen = document.getElementById("welcomeScreen");
const startBtn = document.getElementById("start-btn");

const step1 = document.getElementById("step1");
const searchBtn = document.getElementById("search-btn");

const step2 = document.getElementById("step2");
const originalStep2HTML = step2.innerHTML;

const next2 = document.getElementById("next2");

const finalScreen = document.getElementById("finalScreen");
const summaryText = document.getElementById("summaryText");

const airportInput = document.getElementById("input-city");
// let controller = new AbortController();

let resultCards = document.getElementById("result-cards");
// let resultsHeader = document.getElementById("results-header");

// Navigation
startBtn.onclick = () => {
  welcomeScreen.classList.add("hidden");
  step1.classList.remove("hidden");
};

searchBtn.onclick = () => {
  const name = document.getElementById("input-city").value.trim();
  if (!name) return alert("Please enter your name.");
  searchCityFlight(airportInput.value, 1000);
  step1.classList.add("hidden");
  step2.classList.remove("hidden");
};

document.addEventListener("click", (e) => {
  if (e.target.matches("#restart-btn")) {
    restart();
  }
});

function restart() {
  step2.classList.add("hidden");
  step1.classList.remove("hidden");
  step2.innerHTML = originalStep2HTML;
  resultCards = document.getElementById("result-cards");
  // resultsHeader = document.getElementById("results-header");
}

// Function to get all return flight data
const searchCityFlight = async (city, budget) => {
  // controller = new AbortController();
  // const signal = controller.signal;
  try {
    const flight_inspo = await fetch(
      `http://localhost:3000/flight/city/${city}?budget=${budget}`
    );
    resultCards.innerHTML = "";
    const inspo = await flight_inspo.json();
    createResultsPage(inspo);
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

const createResultsPage = async (data) => {
  const cards = createFlightCards(data);
  const resultsImg = createElement(
    "img",
    "results-header-img",
    "results-header-img"
  );
  resultsImg.src = "./imgs/results-header.png";
  // resultsHeader.appendChild(resultsImg);
  fadeInCardsSequentially(cards, resultCards, 500);
  const restartButton = createElement("button", "font-format", "restart-btn");
  restartButton.textContent = "Restart";
  step2.appendChild(restartButton);
};

const fadeInCardsSequentially = async (cards, container, delay = 300) => {
  for (let i = 0; i < cards.length; i++) {
    const card = cards[i];

    // 1. Record positions of existing cards
    const existingCards = Array.from(container.children);
    const firstRects = existingCards.map((c) => c.getBoundingClientRect());

    // 2. Prepare new card for fade-in
    card.classList.add("fade-in");

    // 3. Append new card to DOM
    container.appendChild(card);

    // 4. Record new positions of old cards
    const lastRects = existingCards.map((c) => c.getBoundingClientRect());

    // 5. Apply FLIP transform to move old cards smoothly
    existingCards.forEach((c, idx) => {
      const dy = firstRects[idx].top - lastRects[idx].top;
      c.style.transform = `translateY(${dy}px)`;
      c.style.transition = "transform 0s";

      requestAnimationFrame(() => {
        c.style.transition = "transform 0.5s ease";
        c.style.transform = "translateY(0)";

        // Clear inline styles after transition ends
        const cleanup = (e) => {
          if (e.propertyName === "transform") {
            c.style.transform = "";
            c.style.transition = "";
            c.removeEventListener("transitionend", cleanup);
          }
        };
        c.addEventListener("transitionend", cleanup);
      });
    });

    // 6. Fade in the new card
    requestAnimationFrame(() => card.classList.add("show"));

    // 7. Wait before showing the next card
    await new Promise((resolve) => setTimeout(resolve, delay));
  }
};

// Create flight cards for results page
const createFlightCards = (data) => {
  const cards = [];
  for (let i = 0; i < Math.min(data.length, 5); i++) {
    const flightCard = createElement("div", "flight-card fadeIn");

    const fightCardRow1 = createElement("div", "flight-card-row-1")
    const flightRoute = createElement("div", "flight-route");
    const flightPrice = createElement("div", "flight-price");
    const destination = createElement("div", "destination");
    const flightLine = createElement("div", "flight-line");

    const fightCardRow2 = createElement("div", "flight-card-row-2")
    const flightAirline = createElement("div", "flight-airline");

    const destCity = capitalise(data[i].city);
    const destCountry = capitalise(data[i].country);
    const price = data[i].price;

    flightPrice.textContent = `$${price}`;
    flightAirline.textContent = "Airline BA";
    destination.textContent = `${destCity}, ${destCountry}`;

    flightCard.appendChild(fightCardRow1)
    fightCardRow1.appendChild(flightRoute);
    fightCardRow1.appendChild(flightLine);    
    fightCardRow1.appendChild(flightPrice);
    flightRoute.appendChild(destination);

    flightCard.appendChild(fightCardRow2)
    fightCardRow2.appendChild(flightAirline);

    cards.push(flightCard);
  }
  return cards;
};
