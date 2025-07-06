// Setup all elements to be used in the app
const currencySymbol = document.getElementById('currencySymbol');
const currencyValue = document.getElementById('currency');
const continent = document.getElementById('continent');
const population = document.getElementById('population');
const capitalCity = document.getElementById('capitalCity');
const exchangeSearch = document.getElementById('exchange-feat');
const exchangeResults = document.getElementById('exchange-results');
const country1 = document.getElementById('country1');
const country2 = document.getElementById('country2');
const country1Rate = document.getElementById('country1Rate');
const country2Rate = document.getElementById('country2Rate');

// Function to get all country data
const goCountry = (country) => {
    getCurrencySymbol(country)
    getCountry(country)
        .then(
            countryData => {
                currencyValue.textContent = countryData[0].currency;
                continent.textContent = countryData[0].continent;
                population.textContent = countryData[0].population.toLocaleString();
                capitalCity.textContent = countryData[0].capital;
            }
        )
        .then(() => displayExchangeEl(exchangeSearch));
};

// Execute 'goCountry' func when country go button is clicked or keyboard Enter is selected
const goCountryHandler = (e) => {
    if (e.type === 'click' || (e.type === 'keydown' && e.key === 'Enter' && document.activeElement === countryInput)) {
        goCountry(countryInput.value)
    }
}

// Setup country input & button elements
const countryInput = document.getElementById('country-input');
const goCountryBtn = document.getElementById('go-btn');
goCountryBtn.addEventListener('click', goCountryHandler);
countryInput.addEventListener('keydown', goCountryHandler);

// Execute 'exchangeRate' func when exchange to button is clicked or keyboard Enter is selected
exchangeHandler = (e) => {
    if (e.type === 'click' || (e.type === 'keydown' && e.key === 'Enter' && document.activeElement === exchangeInput)) {
        exchangeRate(countryInput.value, exchangeInput.value)
    }
}

// Setup exchange country elements
const exchangeInput = document.getElementById('exchange-input');
const exchangeBtn = document.getElementById('exchange-btn');
exchangeBtn.addEventListener('click', exchangeHandler);
exchangeInput.addEventListener('keydown', exchangeHandler);

// Func to get currency symbol in its correct format
const getCurrencySymbol = (country) => {
    fetch(`http://localhost:3000/currency/${country}`)
        .then(response => response.json())
        .then(countryData => {
            symbol = countryData[0].symbol;
            let symArray = []
            // Some currency symbols are made of multiple hex values
            // If they are, split them, convert and concatenate
            if (symbol.indexOf(',') > -1) {
                symArray = symbol.split(',');
                let renderedSymbol = '';
                for (let i = 0; i < symArray.length; i++) {
                    renderedSymbol = renderedSymbol + String.fromCharCode(parseInt(symArray[i], 16));
                }
                currencySymbol.textContent = renderedSymbol;
            }
            // For single hex value currency symbols
            else {
                currencySymbol.textContent = String.fromCharCode(parseInt(symbol, 16));
            };
        })
}

// Get all country data
const getCountry = async (country) => {
    const response = await fetch(`http://localhost:3000/country/${country}`);
    const countryData = await response.json();
    return countryData;
}

// Displays 'exchange to' input box only if a prior country has been searched
// and has its currency populated
const displayExchangeEl = (el) => {
    if (currencyValue.textContent) {
        el.style.visibility = 'visible';
    }
}

// Perform exchange rate req with 2 country's provided
// Returns a conversion of the first country's value of 1, to the second country's equivelant value
const exchangeRate = async (countryOne, countryTwo) => {
    let searchCountryCode = await currencyCode(countryOne);
    let exchangeCountryCode = await currencyCode(countryTwo);
    const response = await fetch(`http://localhost:3000/exchange/${searchCountryCode}/${exchangeCountryCode}`);
    exchangeDatObj = await response.json();
    displayExchangeEl(exchangeResults);
    country1.textContent = `${countryOne} (${searchCountryCode})`;
    country2.textContent = `${countryTwo} (${exchangeCountryCode})`;
    country1Rate.textContent = exchangeDatObj.rates[searchCountryCode];
    convertedValue = exchangeDatObj.rates[exchangeCountryCode].toFixed(4);
    // Round up country2 value to 1 if conversion is 1:1
    if (convertedValue == '1.0000') {
        country2Rate.textContent = '1';
    }
    else {
        country2Rate.textContent = convertedValue;
    }
}

// Get countrys currency code
const currencyCode = async (country) => {
    const response = await fetch(`http://localhost:3000/currency/code/${country}`);
    const currencyCode = await response.json();
    return currencyCode[0].code;
}