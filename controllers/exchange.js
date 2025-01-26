// GET exchange listing
// country2 param uncessary in this request, however API may change to one where it is required
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