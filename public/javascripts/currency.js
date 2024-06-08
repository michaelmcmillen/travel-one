var countryInput = document.getElementById('country-input');
var goBtn = document.getElementById('go-btn');
goBtn.addEventListener('click', go);

let currencyText = document.getElementsByTagName('p')[0];

function go() {
    fetch(`http://localhost:3000/currency/countryCurrency/${countryInput.value}`)
    .then(response => response.json())
    .then(resp => resp[0].symbol)
    .then(currency => String.fromCharCode(parseInt(currency, 16)))
    .then(currsym => currencyText.textContent = currsym);
    }

