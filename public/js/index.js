async function loadFragment(id, file) {
  const res = await fetch(`./fragments/${file}`);
  const html = await res.text();
  document.getElementById(id).innerHTML = html;
}

async function initApp() {
  await Promise.all([
    loadFragment("page0", "landing.html"),
    loadFragment("page1", "origin.html"),
    loadFragment("page2", "date.html"),
    loadFragment("page3", "results.html"),
  ]);
  bindEvents();
}

function showPage(n) {
  document.getElementById("page0").classList.toggle("active", n === 0);
  document.getElementById("page1").classList.toggle("active", n === 1);
  document.getElementById("page2").classList.toggle("active", n === 2);
  document.getElementById("page3").classList.toggle("active", n === 3);
}

function bindEvents() {
  document
    .getElementById("start-btn")
    .addEventListener("click", () => showPage(1));
  document
    .getElementById("origin-btn")
    .addEventListener("click", (e) => originNext());
  document.getElementById("search-btn").addEventListener("click", search);
  document
    .getElementById("back-btn")
    .addEventListener("click", () => showPage(1));
}

const originNext = () => {
  const cityInput = document.getElementById("city-input");
  sessionStorage.setItem("city", cityInput.value.trim());
  showPage(2);
};

const search = async () => {
  const city = sessionStorage.getItem("city");
  const month = document.getElementById("month-select").value;
  showPage(3);
  flights = await searchFlightInspo(city, month);
  setTimeout(() => {
    renderResults(flights);
  }, 800);
}

const searchFlightInspo = async (city, month) => {
  // controller = new AbortController();
  // const signal = controller.signal;
  const flightInspo = await fetch(
    `http://localhost:3000/flight/city/${city}?month=${month}`
  );
  const inspo = await flightInspo.json();
  return inspo;
};

function renderResults(flights) {
  document.getElementById('loader').style.display = 'none'; // Show
  const c = document.getElementById("results-container");
  c.innerHTML = "";
  if (!flights || !flights.length) {
    renderPlaceholder("No flights found.");
    return;
  }

  const meta = document.getElementById("results-meta");
  meta.textContent =
    meta.textContent.replace(/· \d+ flight.*$/, "").trim() +
    `${flights.length} flight${flights.length !== 1 ? "s" : ""} found`;

  flights.forEach((f) => {
    const card = document.createElement("div");
    card.className = "flight-card";

    const left = document.createElement("div");
    left.className = "card-left";

    const route = document.createElement("div");
    route.className = "card-route";
    const orig = document.createElement("span");
    orig.className = "airport-code";
    orig.textContent = sessionStorage.getItem("city");
    const arrow = document.createElement("span");
    arrow.className = "route-arrow";
    arrow.textContent = "→";
    const dest = document.createElement("span");
    dest.className = "airport-code";
    dest.textContent = f.destCity;
    route.append(orig, arrow, dest);

    const al = document.createElement("div");
    al.className = "airline-name";
    al.textContent = "British Airways";

    left.append(route, al);

    const right = document.createElement("div");
    right.className = "card-right";

    const bd = document.createElement("div");
    bd.className = "card-badge";
    bd.textContent = "Economy";
    const pr = document.createElement("div");
    pr.className = "flight-price";
    pr.textContent = f.price;

    right.append(bd, pr);

    card.append(left, right);    
    c.appendChild(card);
  });
}

function renderPlaceholder(msg) {
  const c = document.getElementById("results-container");
  c.innerHTML = "";
  const p = document.createElement("p");
  p.className = "loading-container";
  p.textContent = msg;
  c.appendChild(p);
}

// window.getAirportInput = getAirportInput;
// window.getMonthInput = getMonthInput;
window.renderResults = renderResults;

initApp();
