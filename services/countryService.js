// Function to get all country overall data
const fetchCountryData = async (req) => {
    return req.db.select('*')
    .from('country')
    .where('country', req.params.country)
};

module.exports = { 
    fetchCountryData
};