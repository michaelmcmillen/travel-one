const fs = require("fs");

// Function to convert symbol to hex codes
function symbolToHex(symbol) {
  return (
    '"' +
    symbol
      .split("")
      .map((char) => char.charCodeAt(0).toString(16).toUpperCase())
      .join(",") +
    '"'
  );
}

// Fetch data from Rest Countries API
async function generateCurrencyCSV(filename) {
  try {
    const response = await fetch(
      "https://restcountries.com/v3.1/all?fields=name,region,capital,currencies,population,cca2,cca3,flag"
    );
    const countries = await response.json();

    const headers = ["Currency", "Symbol", "Code"];
    const rows = [];

    rows.push(headers.join(","));

    countries.forEach((country) => {
      if (country.currencies) {
        Object.entries(country.currencies).forEach(([code, info]) => {
          const name = info.name || "";
          const symbol = info.symbol || "";
          const hexSymbol = symbol ? symbolToHex(symbol) : "";
          rows.push([name, symbol, hexSymbol].join(","));
        });
      }
    });

    fs.writeFile(filename, rows.join("\n"), "utf8", (err) => {
      if (err) {
        console.error(`Error writing CSV file: ${err}`);
      } else {
        console.log(`CSV file successfully written to ${filename}`);
      }
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

(async () => {
  await generateCurrencyCSV("/travelone/data/currency_data.csv");
})();
