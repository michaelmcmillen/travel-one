// Fetches exchange rates from an external API for specific country provided
const fetchExchangeRate = async (country1, country2) => {
    const response = await fetch(`https://open.er-api.com/v6/latest/${country1}`)
    const exchangeData = await response.json();
    return exchangeData;
};

module.exports = { 
    fetchExchangeRate
};