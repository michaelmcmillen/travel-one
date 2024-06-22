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
let city1 = document.getElementById('city1');
let city2 = document.getElementById('city2');
let city1Rate = document.getElementById('city1Rate');
let city2Rate = document.getElementById('city2Rate');

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
    .then(() => displayEl(exchangeSearch));
};

getCurrencySymbol = (country) => {
    fetch(`http://localhost:3000/currency/${country}`)
        .then(response => response.json())
        .then(countryData => {
            // Get currency symbol
            symbol = countryData[0].symbol;
            let symArray = []
            if (symbol.indexOf(',') > -1) {
                symArray = symbol.split(',');
                let renderedSymbol = '';
                for (let i = 0; i < symArray.length; i++) {
                    renderedSymbol = renderedSymbol + String.fromCharCode(parseInt(symArray[i], 16));
                }
                c
            }
            else {
                currencySymbol.textContent = String.fromCharCode(parseInt(symbol, 16));
            };
        })
}

getCountry = async (country) => {
    const response = await fetch(`http://localhost:3000/country/${country}`);
    const countryData = await response.json();
    return countryData;
}

displayEl = (el) => {
    if (currencyValue.textContent) {
        el.style.visibility = 'visible';
    }
}

exchangeRate = async (countryOne, countryTwo) => {
    let searchCountryCode = await currencyCode(countryOne);
    let exchangeCountryCode = await currencyCode(countryTwo);
    const response = await fetch(`http://localhost:3000/exchange/${searchCountryCode}/${exchangeCountryCode}`);
    exchangeDatObj = await response.json().then(displayEl(exchangeResults));
    city1.textContent = `${countryOne} (${searchCountryCode})`;
    city2.textContent = `${countryTwo} (${exchangeCountryCode})`;
    city1Rate.textContent = exchangeDatObj.rates[searchCountryCode];
    city2Rate.textContent = exchangeDatObj.rates[exchangeCountryCode].toFixed(4);;
}

currencyCode = async (country) => {
    const response = await fetch(`http://localhost:3000/currency/code/${country}`);
    const currencyCode = await response.json();
    return currencyCode[0].code;
}