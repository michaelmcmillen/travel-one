// ── FRAGMENT LOADER ──
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

// ── PAGE NAV ──
function showPage(n) {
  document.getElementById("page0").classList.toggle("active", n === 0);
  document.getElementById("page1").classList.toggle("active", n === 1);
  document.getElementById("page2").classList.toggle("active", n === 2);
  document.getElementById("page3").classList.toggle("active", n === 3);
}

// ── BIND EVENTS ── (called after fragments load)
function bindEvents() {
  document
    .getElementById("start-btn")
    .addEventListener("click", () => showPage(1));
  document
    .getElementById("next-btn")
    .addEventListener("click", () => showPage(2));
  document
    .getElementById("search-btn")
    .addEventListener("click", onSearch);
  document
    .getElementById("back-btn")
    .addEventListener("click", () => showPage(1));
}

// ── INPUTS ──
function getAirportInput() {
  return document.getElementById("airport-input").value.trim().toUpperCase();
}

function getMonthInput() {
  return document.getElementById("month-select").value;
}

// ── SEARCH ──
function onSearch() {
  const airport = "London Heathrow";
//   if (!airport || !month) {
//     alert("Please enter an airport and select a month.");
//     return;
//   }

//   const sel = document.getElementById('month-select');
//   const monthName = sel.options[sel.selectedIndex].text;
//   document.getElementById('results-meta').textContent = `From ${airport} · ${monthName}`;
//   renderPlaceholder('Loading…');
  showPage(3);

  // ── YOUR BACKEND CALL GOES HERE ──
  // e.g. fetchFlights(airport, month).then(renderResults);
  setTimeout(() => {
    renderResults([
      {
        origin: airport,
        destination: "JFK",
        price: "£349",
        airline: "British Airways",
      },
      {
        origin: airport,
        destination: "DXB",
        price: "£289",
        airline: "Emirates",
      },
      {
        origin: airport,
        destination: "CDG",
        price: "£119",
        airline: "Air France",
      },
      { origin: airport, destination: "AMS", price: "£94", airline: "KLM" },
      {
        origin: airport,
        destination: "FCO",
        price: "£138",
        airline: "Alitalia",
      },
      {
        origin: airport,
        destination: "SIN",
        price: "£512",
        airline: "Singapore Airlines",
      },
    ]);
  }, 800);
  // ─────────────────────────────────
}

// ── RENDER ──
function renderResults(flights) {
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

    const route = document.createElement("div");
    route.className = "card-route";
    const orig = document.createElement("span");
    orig.className = "airport-code";
    orig.textContent = f.origin;
    const arrow = document.createElement("span");
    arrow.className = "route-arrow";
    arrow.textContent = "→";
    const dest = document.createElement("span");
    dest.className = "airport-code";
    dest.textContent = f.destination;
    route.append(orig, arrow, dest);

    const s1 = document.createElement("div");
    s1.className = "sep";
    const al = document.createElement("div");
    al.className = "airline-name";
    al.textContent = f.airline;
    const bd = document.createElement("div");
    bd.className = "card-badge";
    bd.textContent = "Economy";
    const s2 = document.createElement("div");
    s2.className = "sep";
    const pr = document.createElement("div");
    pr.className = "flight-price";
    pr.textContent = f.price;

    card.append(route, s1, al, bd, s2, pr);
    c.appendChild(card);
  });
}

function renderPlaceholder(msg) {
  const c = document.getElementById("results-container");
  c.innerHTML = "";
  const p = document.createElement("p");
  p.className = "state-msg";
  p.textContent = msg;
  c.appendChild(p);
}


// Expose for external backend use
window.getAirportInput = getAirportInput;
window.getMonthInput = getMonthInput;
window.renderResults = renderResults;

// ── INIT ──
initApp();
