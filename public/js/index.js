// Execute 'goCountry' func when country go button is clicked or Enter is selected
goCountryHandler = (e) => {
    if (e.type === 'click' || (e.type === 'keydown' && e.key === 'Enter' && document.activeElement === countryInput)) {
        goCountry(countryInput.value)
    }
}

// Setup country input elements
var countryInput = document.getElementById('country-input');
var goCountryBtn = document.getElementById('go-btn');
goCountryBtn.addEventListener('click', goCountryHandler);
countryInput.addEventListener('keydown', goCountryHandler);

// Execute 'exchangeRate' func when exchange to button is clicked or Enter is selected
exchangeHandler = (e) => {
    if (e.type === 'click' || (e.type === 'keydown' && e.key === 'Enter' && document.activeElement === exchangeInput)) {
        exchangeRate(countryInput.value, exchangeInput.value)
    }
}

// Setup exchange country elements
var exchangeInput = document.getElementById('exchange-input');
var exchangeBtn = document.getElementById('exchange-btn');
exchangeBtn.addEventListener('click', exchangeHandler);
exchangeInput.addEventListener('keydown', exchangeHandler);

let currencySymbol = document.getElementById('currencySymbol');
let currencyValue = document.getElementById('currency');
let continent = document.getElementById('continent');
let population = document.getElementById('population');
let capitalCity = document.getElementById('capitalCity');
let exchangeSearch = document.getElementById('exchange-feat');
let exchangeResults = document.getElementById('exchange-results');
let country1 = document.getElementById('country1');
let country2 = document.getElementById('country2');
let country1Rate = document.getElementById('country1Rate');
let country2Rate = document.getElementById('country2Rate');

// Func to get country data
goCountry = (country) => {
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

// Func to get currency symbol in its correct format
getCurrencySymbol = (country) => {
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
getCountry = async (country) => {
    const response = await fetch(`http://localhost:3000/country/${country}`);
    const countryData = await response.json();
    return countryData;
}

// Displays 'exchange to' input box only if a prior country has been searched
// and has its currency populated
displayExchangeEl = (el) => {
    if (currencyValue.textContent) {
        el.style.visibility = 'visible';
    }
}

// Perform exchange rate req with 2 country's provided
// Returns a conversion of th first country's value of 1, to the second country's equivelant value
exchangeRate = async (countryOne, countryTwo) => {
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
currencyCode = async (country) => {
    const response = await fetch(`http://localhost:3000/currency/code/${country}`);
    const currencyCode = await response.json();
    return currencyCode[0].code;
}