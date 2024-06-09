var countryInput = document.getElementById('country-input');
var goBtn = document.getElementById('go-btn');
goBtn.addEventListener('click', go);

let currencySymbol = document.getElementById('currencySymbol');

function go() {
    fetch(`http://localhost:3000/currency/countryCurrency/${countryInput.value}`)
        .then(response => response.json())
        .then(resp => resp[0].symbol)
        .then(symbol => {
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
};

