// Selects the exchange rates based on supplied country
const exchange = async (req, res) => {
  fetch(`https://open.er-api.com/v6/latest/${req.params.country1}`)
    .then(response => response.json())
    .then(data => {
      res.send(data)
    })
};

module.exports = {
  exchange
};