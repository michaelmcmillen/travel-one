const path = require('path');

// Get the flight page
const getFlightPage = async (req, res) => {
  const filePath = path.join(__dirname, '../public/flight.html'); // Get the absolute path to the 'flight.html' file
  res.sendFile(filePath, { title: 'Flight' }); // Send the file using the absolute path
};

const getAirports = async (req, res) => {
  fetch(`https://sky-scanner3.p.rapidapi.com/flights/airports`,
    {
      method: 'GET',
      headers: {
        'x-rapidapi-key': process.env.RAPID_API_KEY,
        'x-rapidapi-host': 'sky-scanner3.p.rapidapi.com'
      }
    }
  )
  .then(response => response.json())
  .then(data => {
    res.send(data)
  })
};

module.exports = {
  getFlightPage,
  getAirports
};