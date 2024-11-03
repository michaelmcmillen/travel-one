const fs = require('fs');
const path = require('path');

// Function to convert symbol to hex codes
function symbolToHex(symbol) {
    return '"' + symbol.split('').map(char => char.charCodeAt(0).toString(16).toUpperCase()).join(',') + '"';
}

// Fetch data from Rest Countries API
async function fetchCurrencyData() {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const countriesData = await response.json();

        // Prepare data for CSV
        const csvData = [];
        countriesData.forEach(country => {
            if (country.currencies) {
                Object.entries(country.currencies).forEach(([code, info]) => {
                    const name = info.name || '';
                    const symbol = info.symbol || '';
                    const hexSymbol = symbol ? symbolToHex(symbol) : '';
                    csvData.push([name, hexSymbol, code]);
                });
            }
        });

        // Remove duplicate entries by converting to a set of JSON strings, then back to array
        const uniqueData = Array.from(new Set(csvData.map(JSON.stringify))).map(JSON.parse);

        // Export to CSV
        const csvFile = '/travelone/data/currency_data.csv';
        const header = 'currency,symbol,code\n';
        const rows = uniqueData.map(row => row.join(',')).join('\n');
        
        fs.writeFileSync(csvFile, header + rows, 'utf8');
        console.log(`Data has been written to ${csvFile}`);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

fetchCurrencyData();
