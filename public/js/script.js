import { capitalise, createElement } from "./common.js"; // good

// Homepage
const homepage = document.getElementById("homepage"); // good
const startBtn = document.getElementById("start-btn"); // good

// Question 1
const q1 = document.getElementById("q1"); // good
const cityInput = document.getElementById("input-city"); // good
const searchBtn = document.getElementById("search-btn"); // good

// Results
const results = document.getElementById("results"); // good
const resultsOriginalHTML = results.innerHTML; // good
let resultCards = document.getElementById("result-cards"); // good

// let controller = new AbortController();

// Homepage Get Started
startBtn.addEventListener("click", (e) => {
  homepage.classList.add("hidden");
  q1.classList.remove("hidden");
}); // good

// Question 1 Search
searchBtn.addEventListener("click", (e) => {
  cityInput.value.trim();
  searchFlightInspo(cityInput.value, 1000);
  q1.classList.add("hidden");
  results.classList.remove("hidden");
}); // good

// Function to get flight inspiration
const searchFlightInspo = async (city, budget) => {
  // controller = new AbortController();
  // const signal = controller.signal;
  try {
    const flightInspo = await fetch(
      `http://localhost:3000/flight/city/${city}?budget=${budget}`
    );
    resultCards.innerHTML = "";
    const inspo = await flightInspo.json();
    createResultsPage(inspo);
  } catch (error) {
    // TODO: Create error page
    resultCards.textContent = "No flights found for this city.";
    return;
  }
};

// Create results page - Add flight cards & button
const createResultsPage = async (data) => {
  const cards = createFlightCards(data);
  await fadeInCardsSequentially(cards, resultCards, 500);
  const resultsButtons = createResultsButtons();
  results.appendChild(resultsButtons);
};

// Create flight cards for results page
const createFlightCards = (data) => {
  const cards = [];
  for (let i = 0; i < Math.min(data.length, 5); i++) {
    const flightCard = createElement("div", "flight-card fadeIn");

    const fightCardRow1 = createElement("div", "flight-card-row-1");
    const fightCardRow2 = createElement("div", "flight-card-row-2");

    const flightDestination = createElement("div", "flight-destination");
    const flightAirline = createElement("div", "flight-airline");
    const flightLine = createElement("div", "flight-line");
    const flightPrice = createElement("div", "flight-price");

    const destCity = capitalise(data[i].destCity);
    const destCountry = capitalise(data[i].destCountry);
    const price = data[i].price;

    flightPrice.textContent = `$${price}`;
    flightAirline.textContent = "Airline BA";
    flightDestination.textContent = `${destCity}, ${destCountry}`;

    fightCardRow1.appendChild(flightDestination);
    fightCardRow1.appendChild(flightLine);
    fightCardRow1.appendChild(flightPrice);

    fightCardRow2.appendChild(flightAirline);

    flightCard.appendChild(fightCardRow1);
    flightCard.appendChild(fightCardRow2);

    cards.push(flightCard);
  }
  return cards;
};

const createResultsButtons = () => {
  const restartButton = createElement("button", "", "restart-btn");
  restartButton.textContent = "Restart";
  const refreshButton = createElement("img", "", "refresh-btn");
  refreshButton.src = "./imgs/refresh.png";
  const resultsButtons = createElement("div", "results-btns");
  resultsButtons.appendChild(restartButton);
  resultsButtons.appendChild(refreshButton);
  return resultsButtons;
};

document.addEventListener("click", (e) => {
  if (e.target.matches("#restart-btn")) {
    restart();
  }
});

const restart = () => {
  results.classList.add("hidden");
  q1.classList.remove("hidden");
  results.innerHTML = resultsOriginalHTML;
  resultCards = document.getElementById("result-cards");
};

const fadeInCardsSequentially = async (cards, container, delay = 300) => {
  for (let i = 0; i < cards.length; i++) {
    const card = cards[i];

    // Record positions of existing cards
    const existingCards = Array.from(container.children);
    const firstRects = existingCards.map((c) => c.getBoundingClientRect());

    // Prepare new card for fade-in
    card.classList.add("fade-in");

    // Append new card to DOM
    container.appendChild(card);

    // Record new positions of old cards
    const lastRects = existingCards.map((c) => c.getBoundingClientRect());

    // Apply FLIP transform to move old cards smoothly
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

    // Fade in the new card
    requestAnimationFrame(() => card.classList.add("show"));

    // Wait before showing the next card
    await new Promise((resolve) => setTimeout(resolve, delay));
  }
};
