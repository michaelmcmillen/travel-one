const amadeus = require("../config/amadeus");

/**
 * Fetch location data based on city name
 * @param {string} city - City name
 * @returns {string} iataCode
 */
const fetchIataOnCity = async (city) => {
  try {
    const locations = await amadeus.referenceData.locations.cities.get({
      keyword: city,
    });
    // Get correct iataCode for the city searched from response
    for (x = 0; x < Object.keys(locations.data).length; x++) {
      if (locations.data[x].name === city && "iataCode" in locations.data[x]) {
        iataCode = locations.data[x].iataCode;
        break;
      }
    }
    return iataCode;
  } catch (error) {
    console.error(error);
  }
};

/**
 * Fetch country and city names based on iataCode
 * @param {string} iataCode
 * @returns {string} country and city
 */
const fetchLocationOnIata = async (iataCode) => {
  try {
    const locations = await amadeus.referenceData.locations.get({
      subType: "CITY",
      keyword: iataCode,
    });

    for (x in locations.data) {
      location = locations.data[x];
      if ("iataCode" in location && location.iataCode === iataCode) {
        country = location.address.countryName;
        city = location.address.cityName;
        return { country: country, city: city };
      }
    }
  } catch (error) {
    console.error(error);
  }
};

/**
 * Fetch location data based on city name
 * @param {string} city - City name
 * @returns {array} An array of dictionaries for possible locations
 * based on the search. Dictionary includes; type, subType, iataCode,
 * address & geoCode
 */
const fetchLocationOnCity = async (city) => {
  try {
    const locations = await amadeus.referenceData.locations.cities.get({
      keyword: city,
    });
    return locations.data;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  fetchIataOnCity,
  fetchLocationOnCity,
  fetchLocationOnIata
};

// ######## fetchIataOnCity EXAMPLE RESPONSE ########

// Response {
//   headers: {
//     date: 'Wed, 01 Apr 2026 17:25:25 GMT',
//     'content-type': 'application/vnd.amadeus+json',
//     'content-length': '1879',
//     connection: 'keep-alive',
//     'ama-internal-message-version': '14.1',
//     'ama-request-id': '0001VDPD6CTSED',
//     'ama-gateway-request-id': 'rrt-0c3795d3d339c499e-b-eu-1460058-96275393-2',
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
//     path: '/v1/reference-data/locations/cities',
//     params: { keyword: 'Amsterdam' },
//     queryPath: '/v1/reference-data/locations/cities?keyword=Amsterdam',
//     bearerToken: 'jGiHmWAqnuGTnGanxAItZxfRmCyq',
//     clientVersion: '11.0.0',
//     languageVersion: '22.17.0',
//     appId: null,
//     appVersion: null,
//     headers: {
//       'User-Agent': 'amadeus-node/11.0.0 node/22.17.0',
//       Accept: 'application/json, application/vnd.amadeus+json',
//       Authorization: 'Bearer jGiHmWAqnuGTnGanxAItZxfRmCyq',
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
//   body: '{\n' +
//     '  "meta" : {\n' +
//     '    "count" : 7,\n' +
//     '    "links" : {\n' +
//     '      "self" : "https://test.api.amadeus.com/v1/reference-data/locations/cities?keyword=Amsterdam&max=1000"\n' +
//     '    }\n' +
//     '  },\n' +
//     '  "data" : [ {\n' +
//     '    "type" : "location",\n' +
//     '    "subType" : "city",\n' +
//     '    "name" : "Amsterdam",\n' +
//     '    "iataCode" : "AMS",\n' +
//     '    "address" : {\n' +
//     '      "countryCode" : "NL",\n' +
//     '      "stateCode" : "NL-ZZZ"\n' +
//     '    },\n' +
//     '    "geoCode" : {\n' +
//     '      "latitude" : 52.37403,\n' +
//     '      "longitude" : 4.88969\n' +
//     '    }\n' +
//     '  }, {\n' +
//     '    "type" : "location",\n' +
//     '    "subType" : "city",\n' +
//     '    "name" : "New Amsterdam",\n' +
//     '    "iataCode" : "QSX",\n' +
//     '    "address" : {\n' +
//     '      "countryCode" : "GY"\n' +
//     '    },\n' +
//     '    "geoCode" : { }\n' +
//     '  }, {\n' +
//     '    "type" : "location",\n' +
//     '    "subType" : "city",\n' +
//     '    "name" : "New Amsterdam",\n' +
//     '    "address" : {\n' +
//     '      "countryCode" : "GY",\n' +
//     '      "stateCode" : "GY-ZZZ"\n' +
//     '    },\n' +
//     '    "geoCode" : {\n' +
//     '      "latitude" : 6.24793,\n' +
//     '      "longitude" : -57.5171\n' +
//     '    }\n' +
//     '  }, {\n' +
//     '    "type" : "location",\n' +
//     '    "subType" : "city",\n' +
//     '    "name" : "Amsterdam-Zuidoost",\n' +
//     '    "address" : {\n' +
//     '      "countryCode" : "NL",\n' +
//     '      "stateCode" : "NL-ZZZ"\n' +
//     '    },\n' +
//     '    "geoCode" : {\n' +
//     '      "latitude" : 52.3075,\n' +
//     '      "longitude" : 4.97222\n' +
//     '    }\n' +
//     '  }, {\n' +
//     '    "type" : "location",\n' +
//     '    "subType" : "city",\n' +
//     '    "name" : "Nieuw Amsterdam",\n' +
//     '    "address" : {\n' +
//     '      "countryCode" : "SR",\n' +
//     '      "stateCode" : "SR-ZZZ"\n' +
//     '    },\n' +
//     '    "geoCode" : {\n' +
//     '      "latitude" : 5.88573,\n' +
//     '      "longitude" : -55.08871\n' +
//     '    }\n' +
//     '  }, {\n' +
//     '    "type" : "location",\n' +
//     '    "subType" : "city",\n' +
//     '    "name" : "Amsterdam",\n' +
//     '    "address" : {\n' +
//     '      "countryCode" : "US",\n' +
//     '      "stateCode" : "US-NY"\n' +
//     '    },\n' +
//     '    "geoCode" : {\n' +
//     '      "latitude" : 42.93869,\n' +
//     '      "longitude" : -74.18819\n' +
//     '    }\n' +
//     '  }, {\n' +
//     '    "type" : "location",\n' +
//     '    "subType" : "city",\n' +
//     '    "name" : "Amsterdam",\n' +
//     '    "address" : {\n' +
//     '      "countryCode" : "US",\n' +
//     '      "stateCode" : "US-OH"\n' +
//     '    },\n' +
//     '    "geoCode" : {\n' +
//     '      "latitude" : 39.95757,\n' +
//     '      "longitude" : -82.37821\n' +
//     '    }\n' +
//     '  } ]\n' +
//     '}',
//   result: {
//     meta: { count: 7, links: [Object] },
//     data: [
//       [Object], [Object],
//       [Object], [Object],
//       [Object], [Object],
//       [Object]
//     ]
//   },
//   data: [
//     {
//       type: 'location',
//       subType: 'city',
//       name: 'Amsterdam',
//       iataCode: 'AMS',
//       address: [Object],
//       geoCode: [Object]
//     },
//     {
//       type: 'location',
//       subType: 'city',
//       name: 'New Amsterdam',
//       iataCode: 'QSX',
//       address: [Object],
//       geoCode: {}
//     },
//     {
//       type: 'location',
//       subType: 'city',
//       name: 'New Amsterdam',
//       address: [Object],
//       geoCode: [Object]
//     },
//     {
//       type: 'location',
//       subType: 'city',
//       name: 'Amsterdam-Zuidoost',
//       address: [Object],
//       geoCode: [Object]
//     },
//     {
//       type: 'location',
//       subType: 'city',
//       name: 'Nieuw Amsterdam',
//       address: [Object],
//       geoCode: [Object]
//     },
//     {
//       type: 'location',
//       subType: 'city',
//       name: 'Amsterdam',
//       address: [Object],
//       geoCode: [Object]
//     },
//     {
//       type: 'location',
//       subType: 'city',
//       name: 'Amsterdam',
//       address: [Object],
//       geoCode: [Object]
//     }
//   ],
//   parsed: true
// }

// ######################################################################

