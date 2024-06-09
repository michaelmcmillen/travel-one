var countryInput = document.getElementById('country-input');
var goBtn = document.getElementById('go-btn');
goBtn.addEventListener('click', go);

let currencySymbol = document.getElementById('currencySymbol');
let currency = document.getElementById('currency');

function go() {
    let country = countryInput.value;
    getCurrencySymbol(country);
    getCurrency(country)
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

function getCurrency(country) {
    fetch(`http://localhost:3000/country/${country}`)
        .then(response => response.json())
        .then(countryData => currency.textContent = countryData[0].currency);
        };

