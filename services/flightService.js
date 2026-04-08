const path = require("path");
const amadeus = require("../config/amadeus");
const { delay } = require("../config/common");
let { randomDate } = require("../config/common");
const { fetchAirportDestinations } = require("./airportService");
const { fetchIataOnCity } = require("./locationService");

// Get the flight page
const fetchFlightPage = async (req, res) => {
  return path.join(__dirname, "../public/flight.html"); // Get the absolute path to the 'flight.html' file
};

/**
 * Fetch flight/country inspiration based on city name
 * @param {string} city
 * @returns {array} An array of dictionaires containing; country, city,
 * iataCode and price
 */
const fetchInspo = async (req) => {
  const { city } = req.params;
  const { month } = req.query;

  inspoData = [];

  try {
    // GET iataCode based on city name
    const iataCode = await fetchIataOnCity(city);
    // GET all destinations the airport flies too
    const destinationAirports = await fetchAirportDestinations(iataCode);

    let result = [];
    while (result.length <= 5) {
      // Get random destination airport
      let randIndex = Math.floor(Math.random() * destinationAirports.length);
      let randDestination = destinationAirports[randIndex];

      let date = randomDate(month)

      // GET flight offer for origin, destination, date
      let flights = await fetchCheapest(
        iataCode,
        randDestination.iataCode,
        date
      );

      if (flights.data.length != 0) {
        let loc = {};
        loc.destCity = randDestination.name.toLowerCase();
        loc.destCountry = randDestination.address.countryName.toLowerCase();
        loc.price = flights.data[0].price.total;
        result.push(loc);
      }
      await delay(2000);
    }
    return result;
  } catch (error) {
    console.error(error);
  }
};

/**
 * Fetch flight inspiration based on iataCode
 * @param {string} iataCode
 * @returns {object} An object with a single key, holding an array of objects.
 * Each object contains; type, origin, destination, deptartureDate, returnDate,
 * price, and links with flightDates and flightOffers
 */
const fetchCheapest = async (originIataCode, destIataCode, departureDate) => {
  try {
    // Find the cheapest flights from SYD to BKK
    const response = await amadeus.shopping.flightOffersSearch.get({
      originLocationCode: originIataCode,
      destinationLocationCode: destIataCode,
      departureDate: departureDate,
      adults: "1",
      nonStop: "true",
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  fetchFlightPage,
  fetchInspo,
};

// ######## fetchCheapest : EXAMPLE RESPONSE ########

// Response {
//   headers: {
//     date: 'Wed, 01 Apr 2026 17:42:28 GMT',
//     'content-type': 'application/vnd.amadeus+json',
//     'content-length': '4735',
//     connection: 'keep-alive',
//     'ama-internal-message-version': '14.1',
//     'ama-request-id': '0001VDVUGCTT6R',
//     'ama-gateway-request-id': 'rrt-090c15e59124a8fea-b-eu-378333-110668052-4',
//     'access-control-allow-headers': 'origin, x-requested-with, accept, Content-Type, Authorization',
//     'access-control-max-age': '3628800',
//     'access-control-allow-methods': '*',
//     server: 'Amadeus',
//     'access-control-allow-origin': '*'
//   },
//   statusCode: 200,
//   request: Request {
//     host: 'test.api.amadeus.com',
//     port: 443,
//     ssl: true,
//     scheme: 'https',
//     verb: 'GET',
//     path: '/v2/shopping/flight-offers',
//     params: {
//       originLocationCode: 'AMS',
//       destinationLocationCode: 'MUC',
//       departureDate: '2026-04-01',
//       adults: '1',
//       nonStop: 'true'
//     },
//     queryPath: '/v2/shopping/flight-offers?originLocationCode=AMS&destinationLocationCode=MUC&departureDate=2026-04-01&adults=1&nonStop=true',
//     bearerToken: '58j3ZXnIDfcJI674OFre6jYMAFxe',
//     clientVersion: '11.0.0',
//     languageVersion: '22.17.0',
//     appId: null,
//     appVersion: null,
//     headers: {
//       'User-Agent': 'amadeus-node/11.0.0 node/22.17.0',
//       Accept: 'application/json, application/vnd.amadeus+json',
//       Authorization: 'Bearer 58j3ZXnIDfcJI674OFre6jYMAFxe',
//       'Content-Type': 'application/vnd.amadeus+json'
//     },
//     ListHTTPOverride: [
//       '/v2/shopping/flight-offers',
//       '/v1/shopping/seatmaps',
//       '/v1/shopping/availability/flight-availabilities',
//       '/v2/shopping/flight-offers/prediction',
//       '/v1/shopping/flight-offers/pricing',
//       '/v1/shopping/flight-offers/upselling'
//     ]
//   },
//   body: '{"meta":{"count":2,"links":{"self":"https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=AMS&destinationLocationCode=MUC&departureDate=2026-04-01&adults=1&nonStop=true"}},"data":[{"type":"flight-offer","id":"1","source":"GDS","instantTicketingRequired":false,"nonHomogeneous":false,"oneWay":false,"isUpsellOffer":false,"lastTicketingDate":"2026-04-01","lastTicketingDateTime":"2026-04-01","numberOfBookableSeats":9,"itineraries":[{"duration":"PT1H25M","segments":[{"departure":{"iataCode":"AMS","at":"2026-04-01T21:00:00"},"arrival":{"iataCode":"MUC","terminal":"1","at":"2026-04-01T22:25:00"},"carrierCode":"KL","number":"1859","aircraft":{"code":"73H"},"operating":{"carrierCode":"KL"},"duration":"PT1H25M","id":"1","numberOfStops":0,"blacklistedInEU":false}]}],"price":{"currency":"EUR","total":"199.98","base":"92.00","fees":[{"amount":"0.00","type":"SUPPLIER"},{"amount":"0.00","type":"TICKETING"}],"grandTotal":"199.98","additionalServices":[{"amount":"70.00","type":"CHECKED_BAGS"}]},"pricingOptions":{"fareType":["PUBLISHED"],"includedCheckedBagsOnly":false},"validatingAirlineCodes":["AF"],"travelerPricings":[{"travelerId":"1","fareOption":"STANDARD","travelerType":"ADULT","price":{"currency":"EUR","total":"199.98","base":"92.00"},"fareDetailsBySegment":[{"segmentId":"1","cabin":"ECONOMY","fareBasis":"TYS0BALA","brandedFare":"LIGHT","brandedFareLabel":"LIGHT","class":"T","includedCheckedBags":{"quantity":0},"includedCabinBags":{"quantity":1},"amenities":[{"description":"CHECKED BAG 1PC OF 23KG 158CM","isChargeable":true,"amenityType":"BAGGAGE","amenityProvider":{"name":"BrandedFare"}},{"description":"SNACK","isChargeable":false,"amenityType":"MEAL","amenityProvider":{"name":"BrandedFare"}},{"description":"BEVERAGE","isChargeable":false,"amenityType":"MEAL","amenityProvider":{"name":"BrandedFare"}},{"description":"SEAT SELECTION","isChargeable":true,"amenityType":"BRANDED_FARES","amenityProvider":{"name":"BrandedFare"}},{"description":"MILEAGE ACCRUAL","isChargeable":false,"amenityType":"BRANDED_FARES","amenityProvider":{"name":"BrandedFare"}},{"description":"UPGRADE ELIGIBILITY","isChargeable":true,"amenityType":"BRANDED_FARES","amenityProvider":{"name":"BrandedFare"}}]}]}]},{"type":"flight-offer","id":"2","source":"GDS","instantTicketingRequired":false,"nonHomogeneous":false,"oneWay":false,"isUpsellOffer":false,"lastTicketingDate":"2026-04-01","lastTicketingDateTime":"2026-04-01","numberOfBookableSeats":9,"itineraries":[{"duration":"PT1H25M","segments":[{"departure":{"iataCode":"AMS","at":"2026-04-01T21:00:00"},"arrival":{"iataCode":"MUC","terminal":"2","at":"2026-04-01T22:25:00"},"carrierCode":"LH","number":"2309","aircraft":{"code":"32A"},"operating":{"carrierCode":"LH"},"duration":"PT1H25M","id":"2","numberOfStops":0,"blacklistedInEU":false}]}],"price":{"currency":"EUR","total":"324.58","base":"193.00","fees":[{"amount":"0.00","type":"SUPPLIER"},{"amount":"0.00","type":"TICKETING"}],"grandTotal":"324.58","additionalServices":[{"amount":"70.00","type":"CHECKED_BAGS"}]},"pricingOptions":{"fareType":["PUBLISHED"],"includedCheckedBagsOnly":true},"validatingAirlineCodes":["LH"],"travelerPricings":[{"travelerId":"1","fareOption":"STANDARD","travelerType":"ADULT","price":{"currency":"EUR","total":"324.58","base":"193.00"},"fareDetailsBySegment":[{"segmentId":"2","cabin":"ECONOMY","fareBasis":"VEUCLSP9","brandedFare":"CLASSIC","brandedFareLabel":"CLASSIC","class":"V","includedCheckedBags":{"quantity":1},"includedCabinBags":{"quantity":1},"amenities":[{"description":"CATERING ON EUROPE FLTS","isChargeable":true,"amenityType":"MEAL","amenityProvider":{"name":"BrandedFare"}},{"description":"STANDARD SEAT RESERVATION","isChargeable":false,"amenityType":"BRANDED_FARES","amenityProvider":{"name":"BrandedFare"}},{"description":"MILEAGE ACCRUAL","isChargeable":false,"amenityType":"BRANDED_FARES","amenityProvider":{"name":"BrandedFare"}},{"description":"UPGRADE ELIGIBILITY","isChargeable":true,"amenityType":"BRANDED_FARES","amenityProvider":{"name":"BrandedFare"}},{"description":"PREFERRED SEAT RESERVATION","isChargeable":true,"amenityType":"BRANDED_FARES","amenityProvider":{"name":"BrandedFare"}},{"description":"CHANGE BEFORE DEPARTURE","isChargeable":true,"amenityType":"BRANDED_FARES","amenityProvider":{"name":"BrandedFare"}},{"description":"CHANGE AFTER DEPARTURE","isChargeable":true,"amenityType":"BRANDED_FARES","amenityProvider":{"name":"BrandedFare"}}]}]}]}],"dictionaries":{"locations":{"AMS":{"cityCode":"AMS","countryCode":"NL"},"MUC":{"cityCode":"MUC","countryCode":"DE"}},"aircraft":{"32A":"AIRBUS A320 (SHARKLETS)","73H":"BOEING 737-800 (WINGLETS)"},"currencies":{"EUR":"EURO"},"carriers":{"KL":"KLM ROYAL DUTCH AIRLINES","LH":"LUFTHANSA"}}}',
//   result: {
//     meta: { count: 2, links: [Object] },
//     data: [ {
//   type: 'flight-offer',
//   id: '1',
//   source: 'GDS',
//   instantTicketingRequired: false,
//   nonHomogeneous: false,
//   oneWay: false,
//   isUpsellOffer: false,
//   lastTicketingDate: '2026-04-01',
//   lastTicketingDateTime: '2026-04-01',
//   numberOfBookableSeats: 9,
//   itineraries: [ { duration: 'PT1H40M', segments: [Array] } ],
//   price: {
//     currency: 'EUR',
//     total: '276.98',
//     base: '169.00',
//     fees: [ [Object], [Object] ],
//     grandTotal: '276.98',
//     additionalServices: [ [Object] ]
//   },
//   pricingOptions: { fareType: [ 'PUBLISHED' ], includedCheckedBagsOnly: false },
//   validatingAirlineCodes: [ 'AF' ],
//   travelerPricings: [
//     {
//       travelerId: '1',
//       fareOption: 'STANDARD',
//       travelerType: 'ADULT',
//       price: [Object],
//       fareDetailsBySegment: [Array]
//     }
//   ]
// }
// , {
//   type: 'flight-offer',
//   id: '1',
//   source: 'GDS',
//   instantTicketingRequired: false,
//   nonHomogeneous: false,
//   oneWay: false,
//   isUpsellOffer: false,
//   lastTicketingDate: '2026-04-01',
//   lastTicketingDateTime: '2026-04-01',
//   numberOfBookableSeats: 9,
//   itineraries: [ { duration: 'PT1H40M', segments: [Array] } ],
//   price: {
//     currency: 'EUR',
//     total: '276.98',
//     base: '169.00',
//     fees: [ [Object], [Object] ],
//     grandTotal: '276.98',
//     additionalServices: [ [Object] ]
//   },
//   pricingOptions: { fareType: [ 'PUBLISHED' ], includedCheckedBagsOnly: false },
//   validatingAirlineCodes: [ 'AF' ],
//   travelerPricings: [
//     {
//       travelerId: '1',
//       fareOption: 'STANDARD',
//       travelerType: 'ADULT',
//       price: [Object],
//       fareDetailsBySegment: [Array]
//     }
//   ]
// }
//  ],
//     dictionaries: {
//       locations: [Object],
//       aircraft: [Object],
//       currencies: [Object],
//       carriers: [Object]
//     }
//   },
//   data: [
//     {
//       type: 'flight-offer',
//       id: '1',
//       source: 'GDS',
//       instantTicketingRequired: false,
//       nonHomogeneous: false,
//       oneWay: false,
//       isUpsellOffer: false,
//       lastTicketingDate: '2026-04-01',
//       lastTicketingDateTime: '2026-04-01',
//       numberOfBookableSeats: 9,
//       itineraries: [Array],
//       price: [Object],
//       pricingOptions: [Object],
//       validatingAirlineCodes: [Array],
//       travelerPricings: [Array]
//     },
//     {
//       type: 'flight-offer',
//       id: '2',
//       source: 'GDS',
//       instantTicketingRequired: false,
//       nonHomogeneous: false,
//       oneWay: false,
//       isUpsellOffer: false,
//       lastTicketingDate: '2026-04-01',
//       lastTicketingDateTime: '2026-04-01',
//       numberOfBookableSeats: 9,
//       itineraries: [Array],
//       price: [Object],
//       pricingOptions: [Object],
//       validatingAirlineCodes: [Array],
//       travelerPricings: [Array]
//     }
//   ],
//   parsed: true
// }

// ######################################################################
