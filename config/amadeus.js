// Amadeus config required to use the Amadeus API and refresh Bearer token as required

const Amadeus = require('amadeus');

const amadeus = new Amadeus({   
  clientId: `${process.env.AMADEUS_API_KEY}`,
  clientSecret: `${process.env.AMADEUS_API_SECRET}`,
  // logLevel: 'debug'
});

module.exports = amadeus;