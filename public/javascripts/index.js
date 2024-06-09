var countryInput = document.getElementById('country-input');
var goBtn = document.getElementById('go-btn');
goBtn.addEventListener('click', function() {
    go(countryInput.value)
});

var exchangeInput = document.getElementById('exchange-input');
var exchangeBtn = document.getElementById('exchange-btn');
exchangeBtn.addEventListener('click', function() {
    exchangeRate(countryInput.value, exchangeInput.value)
});

let currencySymbol = document.getElementById('currencySymbol');
let currencyValue = document.getElementById('currency');
let continent = document.getElementById('continent');
let population = document.getElementById('population');
let capitalCity = document.getElementById('capitalCity');
let exchangeFeat = document.getElementById('exchange-feat');

function go(country) {
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
    .then(resp => displayExchangeFeat());
};

function getCurrencySymbol(country) {
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
                currencySymbol.textContent = renderedSymbol
            }
            else {
                currencySymbol.textContent = String.fromCharCode(parseInt(symbol, 16));
            };
        })
}

async function getCountry(country) {
    const response = await fetch(`http://localhost:3000/country/${country}`);
    const countryData = await response.json();
    return countryData;
}

function displayExchangeFeat() {
    if (currencyValue.textContent) {
        exchangeFeat.style.visibility = 'visible';
    }
}

async function exchangeRate(countryOne, countryTwo) {
    let searchCountryCode = await currencyCode(countryOne);
    let exchangeCountryCode = await currencyCode(countryTwo);
    const response = await fetch(`http://localhost:3000/exchange/${searchCountryCode}/${exchangeCountryCode}`);
    return response;
}

async function currencyCode(country) {
    const response = await fetch(`http://localhost:3000/currency/code/${country}`);
    const currencyCode = await response.json();
    return currencyCode[0].code;
}