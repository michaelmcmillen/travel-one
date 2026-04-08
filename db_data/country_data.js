const fs = require("fs");

async function generateCountryCSV(filename) {
  const response = await fetch(
    "https://restcountries.com/v3.1/all?fields=name,region,capital,currencies,population,cca2,cca3,flag"
  );
  const countries = await response.json();
  if (!countries) return;

  const headers = [
    "Country",
    "Continent",
    "Currency",
    "Population",
    "Capital City",
    "ISO2",
    "ISO3",
    "Flag Icon Code",
  ];
  const rows = [];

  rows.push(headers.join(","));

  countries.forEach((country) => {
    const name = checkForComma(country.name?.common);

    const continent = checkForComma(country.region);
    const population = country.population || "";
    const capital = checkForComma(country.capital?.[0]);
    const iso2 = country.cca2 || "";
    const iso3 = country.cca3 || "";
    const flagCode = country.flag || "";

    const currencies = country.currencies || {};
    let currency = "";
    for (let currencyInfo of Object.values(currencies)) {
      currency = currencyInfo.name || "";
      break; // Only handle the first currency if there are multiple
    }

    rows.push(
      [
        name,
        continent,
        currency,
        population,
        capital,
        iso2,
        iso3,
        flagCode,
      ].join(",")
    );
  });

  fs.writeFile(filename, rows.join("\n"), "utf8", (err) => {
    if (err) {
      console.error(`Error writing CSV file: ${err}`);
    } else {
      console.log(`CSV file successfully written to ${filename}`);
    }
  });
}

function checkForComma(input) {
  let return_string = "";
  if (input && input.includes(",")) {
    return_string = input.replace(",", ":");
  } else {
    return_string = input;
  }
  return return_string;
}

(async () => {
  await generateCountryCSV("/travelone/data/country_data.csv");
})();
