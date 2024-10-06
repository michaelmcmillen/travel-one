const fs = require('fs');

async function getCountryData() {
    const url = 'https://restcountries.com/v3.1/all';
    try {
        const response = await fetch(url);
        if (response.ok) {
            const countries = await response.json();
            return countries;
        } else {
            console.error(`Failed to fetch country data: ${response.status}`);
            return null;
        }
    } catch (error) {
        console.error(`Error fetching country data: ${error}`);
        return null;
    }
}

async function generateCSV(filename) {
    const countries = await getCountryData();
    if (!countries) return;

    const headers = ['Country', 'Continent', 'Currency', 'Population', 'Capital City', 'ISO2', 'ISO3', 'Flag Icon Code'];
    const rows = [];

    rows.push(headers.join(','));

    countries.forEach(country => {
        const name = checkForComma(country.name?.common);

        const continent = checkForComma(country.region);
        const population = country.population || '';
        const capital = checkForComma(country.capital?.[0]);
        const iso2 = country.cca2 || '';
        const iso3 = country.cca3 || '';
        const flagCode = country.flag || '';

        const currencies = country.currencies || {};
        let currency = '';
        for (let currencyInfo of Object.values(currencies)) {
            currency = currencyInfo.name || '';
            break;  // Only handle the first currency if there are multiple
        }

        rows.push([name, continent, currency, population, capital, iso2, iso3, flagCode].join(','));
    });

    fs.writeFile(filename, rows.join('\n'), 'utf8', (err) => {
        if (err) {
            console.error(`Error writing CSV file: ${err}`);
        } else {
            console.log(`CSV file successfully written to ${filename}`);
        }
    });
}

function checkForComma(input) {
    let return_string = '';
    if (input && input.includes(",")) {
        return_string = input.replace(",", ":");
    }
    else {
        return_string = input;
    }
    return return_string;
}

(async () => {
    await generateCSV('/travelone/data/country_data.csv');
})();
