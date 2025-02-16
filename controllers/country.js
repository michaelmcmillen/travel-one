// Select country by name
const get = async (req, res) => {
  req.db.select('*')
    .from('country')
    .where('country', req.params.country)
    .then(response => {
      res.send(response)
    })
};

module.exports = {
  get
};