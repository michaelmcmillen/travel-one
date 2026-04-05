const amadeus = require("../config/amadeus");
const { delay } = require("../config/common");

const fetchAirportDestinations = async (req) => {
  try {
    const response = await amadeus.airport.directDestinations.get({
      departureAirportCode: req,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  fetchAirportDestinations,
};

// ######## fetchAirportDestinations EXAMPLE RESPONSE ########

// Response {
//   headers: {
//     date: 'Wed, 01 Apr 2026 17:27:23 GMT',
//     'content-type': 'application/vnd.amadeus+json',
//     'content-length': '109904',
//     connection: 'keep-alive',
//     'ama-internal-message-version': '14.1',
//     'ama-request-id': '0001VDPZ0CTSHN',
//     'ama-gateway-request-id': 'rrt-096c16d0907832abe-b-eu-214460-96302933-3',
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
//     path: '/v1/airport/direct-destinations',
//     params: { departureAirportCode: 'AMS' },
//     queryPath: '/v1/airport/direct-destinations?departureAirportCode=AMS',
//     bearerToken: 'cU9TjSnycEGgy7oaKySWEASydtgi',
//     clientVersion: '11.0.0',
//     languageVersion: '22.17.0',
//     appId: null,
//     appVersion: null,
//     headers: {
//       'User-Agent': 'amadeus-node/11.0.0 node/22.17.0',
//       Accept: 'application/json, application/vnd.amadeus+json',
//       Authorization: 'Bearer cU9TjSnycEGgy7oaKySWEASydtgi',
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
//     '    "count" : 265,\n' +
//     '    "links" : {\n' +
//     '      "self" : "https://test.api.amadeus.com/v1/airport/direct-destinations?departureAirportCode=AMS"\n' +
//     '    }\n' +
//     '  },\n' +
//     '  "data" : [ {\n' +
//     '    "type" : "location",\n' +
//     '    "subtype" : "city",\n' +
//     '    "name" : "AALBORG",\n' +
//     '    "iataCode" : "AAL",\n' +
//     '    "geoCode" : {\n' +
//     '      "latitude" : 57.09278,\n' +
//     '      "longitude" : 9.84917\n' +
//     '    },\n' +
//     '    "address" : {\n' +
//     '      "countryName" : "DENMARK",\n' +
//     '      "countryCode" : "DK",\n' +
//     '      "regionCode" : "EUROP"\n' +
//     '    },\n' +
//     '    "timeZone" : {\n' +
//     '      "offSet" : "+02:00",\n' +
//     '      "referenceLocalDateTime" : "2026-04-01T17:12:34"\n' +
//     '    }\n' +
//     '  }, {\n' +
//     '    "type" : "location",\n' +
//     '    "subtype" : "city",\n' +
//     '    "name" : "ABERDEEN",\n' +
//     '    "iataCode" : "ABZ",\n' +
//     '    "geoCode" : {\n' +
//     '      "latitude" : 57.20195,\n' +
//     '      "longitude" : -2.19777\n' +
//     '    },\n' +
//     '    "address" : {\n' +
//     '      "countryName" : "UNITED KINGDOM",\n' +
//     '      "countryCode" : "GB",\n' +
//     '      "regionCode" : "EUROP"\n' +
//     '    },\n' +
//     '    "timeZone" : {\n' +
//     '      "offSet" : "+01:00",\n' +
//     '      "referenceLocalDateTime" : "2026-04-01T17:12:34"\n' +
//     '    }\n' +
//     '  }, {\n' +
//     '    "type" : "location",\n' +
//     '    "subtype" : "city",\n' +
//     '    "name" : "ACCRA",\n' +
//     '    "iataCode" : "ACC",\n' +
//     '    "geoCode" : {\n' +
//     '      "latitude" : 5.60528,\n' +
//     '      "longitude" : -0.16666\n' +
//     '    },\n' +
//     '    "address" : {\n' +
//     '      "countryName" : "GHANA",\n' +
//     '      "countryCode" : "GH",\n' +
//     '      "regionCode" : "AFRIC"\n' +
//     '    },\n' +
//     '    "timeZone" : {\n' +
//     '      "offSet" : "+00:00",\n' +
//     '      "referenceLocalDateTime" : "2026-04-01T17:12:34"\n' +
//     '    }\n' +
//     '  }, {\n' +
//     '    "type" : "location",\n' +
//     '    "subtype" : "city",\n' +
//     '    "name" : "LANZAROTE",\n' +
//     '    "iataCode" : "ACE",\n' +
//     '    "geoCode" : {\n' +
//     '      "latitude" : 28.95028,\n' +
//     '      "longitude" : -13.60555\n' +
//     '    },\n' +
//     '    "address" : {\n' +
//     '      "countryName" : "SPAIN",\n' +
//     '      "countryCode" : "ES",\n' +
//     '      "regionCode" : "EUROP"\n' +
//     '    },\n' +
//     '    "timeZone" : {\n' +
//     '      "offSet" : "+01:00",\n' +
//     '      "referenceLocalDateTime" : "2026-04-01T17:12:34"\n' +
//     '    }\n' +
//     '  }, {\n' +
//     '    "type" : "location",\n' +
//     '    "subtype" : "city",\n' +
//     '    "name" : "ALESUND",\n' +
//     '    "iataCode" : "AES",\n' +
//     '    "geoCode" : {\n' +
//     '      "latitude" : 62.56028,\n' +
//     '      "longitude" : 6.11028\n' +
//     '    },\n' +
//     '    "address" : {\n' +
//     '      "countryName" : "NORWAY",\n' +
//     '      "countryCode" : "NO",\n' +
//     '      "regionCode" : "EUROP"\n' +
//     '    },\n' +
//     '    "timeZone" : {\n' +
//     '      "offSet" : "+02:00",\n' +
//     '      "referenceLocalDateTime" : "2026-04-01T17:12:34"\n' +
//     '    }\n' +
//     '  }, {\n' +
//     '    "type" : "location",\n' +
//     '    "subtype" : "city",\n' +
//     '    "name" : "AGADIR",\n' +
//     '    "iataCode" : "AGA",\n' +
//     '    "geoCode" : {\n' +
//     '      "latitude" : 30.325,\n' +
//     '      "longitude" : -9.41305\n' +
//     '    },\n' +
//     '    "address" : {\n' +
//     '      "countryName" : "MOROCCO",\n' +
//     '      "countryCode" : "MA",\n' +
//     '      "regionCode" : "AFRIC"\n' +
//     '    },\n' +
//     '    "timeZone" : {\n' +
//     '      "offSet" : "+01:00",\n' +
//     '      "referenceLocalDateTime" : "2026-04-01T17:12:34"\n' +
//     '    }\n' +
//     '  }, {\n' +
//     '    "type" : "location",\n' +
//     '    "subtype" : "city",\n' +
//     '    "name" : "MALAGA",\n' +
//     '    "iataCode" : "AGP",\n' +
//     '    "geoCode" : {\n' +
//     '      "latitude" : 36.675,\n' +
//     '      "longitude" : -4.49916\n' +
//     '    },\n' +
//     '    "address" : {\n' +
//     '      "countryName" : "SPAIN",\n' +
//     '      "countryCode" : "ES",\n' +
//     '      "regionCode" : "EUROP"\n' +
//     '    },\n' +
//     '    "timeZone" : {\n' +
//     '      "offSet" : "+02:00",\n' +
//     '      "referenceLocalDateTime" : "2026-04-01T17:12:34"\n' +
//     '    }\n' +
//     '  }, {\n' +
//     '    "type" : "location",\n' +
//     '    "subtype" : "city",\n' +
//     '    "name" : "AL HOCEIMA",\n' +
//     '    "iataCode" : "AHU",\n' +
//     '    "geoCode" : {\n' +
//     '      "latitude" : 35.17723,\n' +
//     '      "longitude" : -3.83944\n' +
//     '    },\n' +
//     '    "address" : {\n' +
//     '      "countryName" : "MOROCCO",\n' +
//     '      "countryCode" : "MA",\n' +
//     '      "regionCode" : "AFRIC"\n' +
//     '    },\n' +
//     '    "timeZone" : {\n' +
//     '      "offSet" : "+01:00",\n' +
//     '      "referenceLocalDateTime" : "2026-04-01T17:12:34"\n' +
//     '    }\n' +
//     '  }, {\n' +
//     '    "type" : "location",\n' +
//     '    "subtype" : "city",\n' +
//     '    "name" : "ALICANTE",\n' +
//     '    "iataCode" : "ALC",\n' +
//     '    "geoCode" : {\n' +
//     '      "latitude" : 38.28223,\n' +
//     '      "longitude" : -0.55805\n' +
//     '    },\n' +
//     '    "address" : {\n' +
//     '      "countryName" : "SPAIN",\n' +
//     '      "countryCode" : "ES",\n' +
//     '      "regionCode" : "EUROP"\n' +
//     '    },\n' +
//     '    "timeZone" : {\n' +
//     '      "offSet" : "+02:00",\n' +
//     '      "referenceLocalDateTime" : "2026-04-01T17:12:34"\n' +
//     '    }\n' +
//     '  }, {\n' +
//     '    "type" : "location",\n' +
//     '    "subtype" : "city",\n' +
//     '    "name" : "AMMAN",\n' +
//     '    "iataCode" : "AMM",\n' +
//     '    "geoCode" : {\n' +
//     '      "latitude" : 31.7225,\n' +
//     '      "longitude" : 35.99334\n' +
//     '    },\n' +
//     '    "address" : {\n' +
//     '      "countryName" : "JORDAN",\n' +
//     '      "countryCode" : "JO",\n' +
//     '      "regionCode" : "MEAST"\n' +
//     '    },\n' +
//     '    "timeZone" : {\n' +
//     '      "offSet" : "+03:00",\n' +
//     '      "referenceLocalDateTime" : "2026-04-01T17:12:34"\n' +
//     '    }\n' +
//     '  }, {\n' +
//     '    "type" : "location",\n' +
//     '    "subtype" : "city",\n' +
//     '    "name" : "AMSTERDAM",\n' +
//     '    "iataCode" : "AMS",\n' +
//     '    "geoCode" : {\n' +
//     '      "latitude" : 52.31028,\n' +
//     '      "longitude" : 4.76028\n' +
//     '    },\n' +
//     '    "address" : {\n' +
//     '      "countryName" : "NETHERLANDS",\n' +
//     '      "countryCode" : "NL",\n' +
//     '      "regionCode" : "EUROP"\n' +
//     '    },\n' +
//     '    "timeZone" : {\n' +
//     '      "offSet" : "+02:00",\n' +
//     '      "referenceLocalDateTime" : "2026-04-01T17:12:34"\n' +
//     '    }\n' +
//     '  }, {\n' +
//     '    "type" : "location",\n' +
//     '    "subtype" : "city",\n' +
//     '    "name" : "ANKARA",\n' +
//     '    "iataCode" : "ANK",\n' +
//     '    "geoCode" : {\n' +
//     '      "latitude" : 39.94973,\n' +
//     '      "longitude" : 32.68862\n' +
//     '    },\n' +
//     '    "address" : {\n' +
//     '      "countryName" : "TURKIYE",\n' +
//     '      "countryCode" : "TR",\n' +
//     '      "regionCode" : "EURAS"\n' +
//     '    },\n' +
//     '    "timeZone" : {\n' +
//     '      "offSet" : "+03:00",\n' +
//     '      "referenceLocalDateTime" : "2026-04-01T17:12:34"\n' +
//     '    }\n' +
//     '  }, {\n' +
//     '    "type" : "location",\n' +
//     '    "subtype" : "city",\n' +
//     '    "name" : "ANTWERP",\n' +
//     '    "iataCode" : "ANR",\n' +
//     '    "geoCode" : {\n' +
//     '      "latitude" : 51.18945,\n' +
//     '      "longitude" : 4.46028\n' +
//     '    },\n' +
//     '    "address" : {\n' +
//     '      "countryName" : "BELGIUM",\n' +
//     '      "countryCode" : "BE",\n' +
//     '      "regionCode" : "EUROP"\n' +
//     '    },\n' +
//     '    "timeZone" : {\n' +
//     '      "offSet" : "+02:00",\n' +
//     '      "referenceLocalDateTime" : "2026-04-01T17:12:34"\n' +
//     '    }\n' +
//     '  }, {\n' +
//     '    "type" : "location",\n' +
//     '    "subtype" : "city",\n' +
//     '    "name" : "KARPATHOS",\n' +
//     '    "iataCode" : "AOK",\n' +
//     '    "geoCode" : {\n' +
//     '      "latitude" : 35.42139,\n' +
//     '      "longitude" : 27.14612\n' +
//     '    },\n' +
//     '    "address" : {\n' +
//     '      "countryName" : "GREECE",\n' +
//     '      "countryCode" : "GR",\n' +
//     '      "regionCode" : "EUROP"\n' +
//     '    },\n' +
//     '    "timeZone" : {\n' +
//     '      "offSet" : "+03:00",\n' +
//     '      "referenceLocalDateTime" : "2026-04-01T17:12:34"\n' +
//     '    }\n' +
//     '  }, {\n' +
//     '    "type" : "location",\n' +
//     '    "subtype" : "city",\n' +
//     '    "name" : "KAYSERI",\n' +
//     '    "iataCode" : "ASR",\n' +
//     '    "geoCode" : {\n' +
//     '      "latitude" : 38.77028,\n' +
//     '      "longitude" : 35.49556\n' +
//     '    },\n' +
//     '    "address" : {\n' +
//     '      "countryName" : "TURKIYE",\n' +
//     '      "countryCode" : "TR",\n' +
//     '      "regionCode" : "EURAS"\n' +
//     '    },\n' +
//     '    "timeZone" : {\n' +
//     '      "offSet" : "+03:00",\n' +
//     '      "referenceLocalDateTime" : "2026-04-01T17:12:34"\n' +
//     '    }\n' +
//     '  }, {\n' +
//     '    "type" : "location",\n' +
//     '    "subtype" : "city",\n' +
//     '    "name" : "ATHENS",\n' +
//     '    "iataCode" : "ATH",\n' +
//     '    "geoCode" : {\n' +
//     '      "latitude" : 37.93639,\n' +
//     '      "longitude" : 23.94445\n' +
//     '    },\n' +
//     '    "address" : {\n' +
//     '      "countryName" : "GREECE",\n' +
//     '      "countryCode" : "GR",\n' +
//     '      "regionCode" : "EUROP"\n' +
//     '    },\n' +
//     '    "timeZone" : {\n' +
//     '      "offSet" : "+03:00",\n' +
//     '      "referenceLocalDateTime" : "2026-04-01T17:12:34"\n' +
//     '    }\n' +
//     '  }, {\n' +
//     '    "type" : "location",\n' +
//     '    "subtype" : "city",\n' +
//     '    "name" : "ATLANTA",\n' +
//     '    "iataCode" : "ATL",\n' +
//     '    "geoCode" : {\n' +
//     '      "latitude" : 33.64112,\n' +
//     '      "longitude" : -84.42277\n' +
//     '    },\n' +
//     '    "address" : {\n' +
//     '      "countryName" : "UNITED STATES OF AMERICA",\n' +
//     '      "countryCode" : "US",\n' +
//     '      "stateCode" : "GA",\n' +
//     '      "regionCode" : "NAMER"\n' +
//     '    },\n' +
//     '    "timeZone" : {\n' +
//     '      "offSet" : "-04:00",\n' +
//     '      "referenceLocalDateTime" : "2026-04-01T17:12:34"\n' +
//     '    }\n' +
//     '  }, {\n' +
//     '    "type" : "location",\n' +
//     '    "subtype" : "city",\n' +
//     '    "name" : "ARUBA",\n' +
//     '    "iataCode" : "AUA",\n' +
//     '    "geoCode" : {\n' +
//     '      "latitude" : 12.50389,\n' +
//     '      "longitude" : -70.00777\n' +
//     '    },\n' +
//     '    "address" : {\n' +
//     '      "countryName" : "ARUBA",\n' +
//     '      "countryCode" : "AW",\n' +
//     '      "regionCode" : "CARIB"\n' +
//     '    },\n' +
//     '    "timeZone" : {\n' +
//     '      "offSet" : "-04:00",\n' +
//     '      "referenceLocalDateTime" : "2026-04-01T17:12:34"\n' +
//     '    }\n' +
//     '  }, {\n' +
//     '    "type" : "location",\n' +
//     '    "subtype" : "city",\n' +
//     '    "name" : "ABU DHABI",\n' +
//     '    "iataCode" : "AUH",\n' +
//     '    "geoCode" : {\n' +
//     '      "latitude" : 24.43306,\n' +
//     '      "longitude" : 54.65112\n' +
//     '    },\n' +
//     '    "address" : {\n' +
//     '      "countryName" : "UNITED ARAB EMIRATES",\n' +
//     '      "countryCode" : "AE",\n' +
//     '      "regionCode" : "MEAST"\n' +
//     '    },\n' +
//     '    "timeZone" : {\n' +
//     '      "offSet" : "+04:00",\n' +
//     '      "referenceLocalDateTime" : "2026-04-01T17:12:34"\n' +
//     '    }\n' +
//     '  }, {\n' +
//     '    "type" : "location",\n' +
//     '    "subtype" : "city",\n' +
//     '    "name" : "AUSTIN",\n' +
//     '    "iataCode" : "AUS",\n' +
//     '    "geoCode" : {\n' +
//     '      "latitude" : 30.19445,\n' +
//     '      "longitude" : -97.67\n' +
//     '    },\n' +
//     '    "address" : {\n' +
//     '      "countryName" : "UNITED STATES OF AMERICA",\n' +
//     '      "countryCode" : "US",\n' +
//     '      "stateCode" : "TX",\n' +
//     '      "regionCode" : "NAMER"\n' +
//     '    },\n' +
//     '    "timeZone" : {\n' +
//     '      "offSet" : "-05:00",\n' +
//     '      "referenceLocalDateTime" : "2026-04-01T17:12:34"\n' +
//     '    }\n' +
//     '  }, {\n' +
//     '    "type" : "location",\n' +
//     '    "subtype" : "city",\n' +
//     '    "name" : "ANTALYA",\n' +
//     '    "iataCode" : "AYT",\n' +
//     '    "geoCode" : {\n' +
//     '      "latitude" : 36.89862,\n' +
//     '      "longitude" : 30.80056\n' +
//     '    },\n' +
//     '    "address" : {\n' +
//     '      "countryName" : "TURKIYE",\n' +
//     '      "countryCode" : "TR",\n' +
//     '      "regionCode" : "EURAS"\n' +
//     '    },\n' +
//     '    "timeZone" : {\n' +
//     '      "offSet" : "+03:00",\n' +
//     '      "referenceLocalDateTime" : "2026-04-01T17:12:34"\n' +
//     '    }\n' +
//     '  }, {\n' +
//     '    "type" : "location",\n' +
//     '    "subtype" : "city",\n' +
//     '    "name" : "BAHRAIN",\n' +
//     '    "iataCode" : "BAH",\n' +
//     '    "geoCode" : {\n' +
//     '      "latitude" : 26.27084,\n' +
//     '      "longitude" : 50.63362\n' +
//     '    },\n' +
//     '    "address" : {\n' +
//     '      "countryName" : "BAHRAIN",\n' +
//     '      "countryCode" : "BH",\n' +
//     '      "regionCode" : "MEAST"\n' +
//     '    },\n' +
//     '    "timeZone" : {\n' +
//     '      "offSet" : "+03:00",\n' +
//     '      "referenceLocalDateTime" : "2026-04-01T17:12:34"\n' +
//     '    }\n' +
//     '  }, {\n' +
//     '    "type" : "location",\n' +
//     '    "subtype" : "city",\n' +
//     '    "name" : "BARCELONA",\n' +
//     '    "iataCode" : "BCN",\n' +
//     '    "geoCode" : {\n' +
//     '      "latitude" : 41.29695,\n' +
//     '      "longitude" : 2.07834\n' +
//     '    },\n' +
//     '    "address" : {\n' +
//     '      "countryName" : "SPAIN",\n' +
//     '      "countryCode" : "ES",\n' +
//     '      "regionCode" : "EUROP"\n' +
//     '    },\n' +
//     '    "timeZone" : {\n' +
//     '      "offSet" : "+02:00",\n' +
//     '      "referenceLocalDateTime" : "2026-04-01T17:12:34"\n' +
//     '    }\n' +
//     '  }, {\n' +
//     '    "type" : "location",\n' +
//     '    "subtype" : "city",\n' +
//     '    "name" : "BELGRADE",\n' +
//     '    "iataCode" : "BEG",\n' +
//     '    "geoCode" : {\n' +
//     '      "latitude" : 44.81834,\n' +
//     '      "longitude" : 20.30917\n' +
//     '    },\n' +
//     '    "address" : {\n' +
//     '      "countryName" : "SERBIA",\n' +
//     '      "countryCode" : "RS",\n' +
//     '      "regionCode" : "EUROP"\n' +
//     '    },\n' +
//     '    "timeZone" : {\n' +
//     '      "offSet'... 99904 more characters,
//   result: {
//     meta: { count: 265, links: [Object] },
//     data: [
//       [Object], [Object], [Object], [Object], [Object], [Object],
//       [Object], [Object], [Object], [Object], [Object], [Object],
//       [Object], [Object], [Object], [Object], [Object], [Object],
//       [Object], [Object], [Object], [Object], [Object], [Object],
//       [Object], [Object], [Object], [Object], [Object], [Object],
//       [Object], [Object], [Object], [Object], [Object], [Object],
//       [Object], [Object], [Object], [Object], [Object], [Object],
//       [Object], [Object], [Object], [Object], [Object], [Object],
//       [Object], [Object], [Object], [Object], [Object], [Object],
//       [Object], [Object], [Object], [Object], [Object], [Object],
//       [Object], [Object], [Object], [Object], [Object], [Object],
//       [Object], [Object], [Object], [Object], [Object], [Object],
//       [Object], [Object], [Object], [Object], [Object], [Object],
//       [Object], [Object], [Object], [Object], [Object], [Object],
//       [Object], [Object], [Object], [Object], [Object], [Object],
//       [Object], [Object], [Object], [Object], [Object], [Object],
//       [Object], [Object], [Object], [Object],
//       ... 165 more items
//     ]
//   },
//   data: [
//     {
//       type: 'location',
//       subtype: 'city',
//       name: 'AALBORG',
//       iataCode: 'AAL',
//       geoCode: [Object],
//       address: [Object],
//       timeZone: [Object]
//     },
//     {
//       type: 'location',
//       subtype: 'city',
//       name: 'ABERDEEN',
//       iataCode: 'ABZ',
//       geoCode: [Object],
//       address: [Object],
//       timeZone: [Object]
//     },
//     {
//       type: 'location',
//       subtype: 'city',
//       name: 'ACCRA',
//       iataCode: 'ACC',
//       geoCode: [Object],
//       address: [Object],
//       timeZone: [Object]
//     },
//     {
//       type: 'location',
//       subtype: 'city',
//       name: 'LANZAROTE',
//       iataCode: 'ACE',
//       geoCode: [Object],
//       address: [Object],
//       timeZone: [Object]
//     },
//     {
//       type: 'location',
//       subtype: 'city',
//       name: 'ALESUND',
//       iataCode: 'AES',
//       geoCode: [Object],
//       address: [Object],
//       timeZone: [Object]
//     },
//     {
//       type: 'location',
//       subtype: 'city',
//       name: 'AGADIR',
//       iataCode: 'AGA',
//       geoCode: [Object],
//       address: [Object],
//       timeZone: [Object]
//     },
//     {
//       type: 'location',
//       subtype: 'city',
//       name: 'MALAGA',
//       iataCode: 'AGP',
//       geoCode: [Object],
//       address: [Object],
//       timeZone: [Object]
//     },
//     {
//       type: 'location',
//       subtype: 'city',
//       name: 'AL HOCEIMA',
//       iataCode: 'AHU',
//       geoCode: [Object],
//       address: [Object],
//       timeZone: [Object]
//     },
//     {
//       type: 'location',
//       subtype: 'city',
//       name: 'ALICANTE',
//       iataCode: 'ALC',
//       geoCode: [Object],
//       address: [Object],
//       timeZone: [Object]
//     },
//     {
//       type: 'location',
//       subtype: 'city',
//       name: 'AMMAN',
//       iataCode: 'AMM',
//       geoCode: [Object],
//       address: [Object],
//       timeZone: [Object]
//     },
//     {
//       type: 'location',
//       subtype: 'city',
//       name: 'AMSTERDAM',
//       iataCode: 'AMS',
//       geoCode: [Object],
//       address: [Object],
//       timeZone: [Object]
//     },
//     {
//       type: 'location',
//       subtype: 'city',
//       name: 'ANKARA',
//       iataCode: 'ANK',
//       geoCode: [Object],
//       address: [Object],
//       timeZone: [Object]
//     },
//     {
//       type: 'location',
//       subtype: 'city',
//       name: 'ANTWERP',
//       iataCode: 'ANR',
//       geoCode: [Object],
//       address: [Object],
//       timeZone: [Object]
//     },
//     {
//       type: 'location',
//       subtype: 'city',
//       name: 'KARPATHOS',
//       iataCode: 'AOK',
//       geoCode: [Object],
//       address: [Object],
//       timeZone: [Object]
//     },
//     {
//       type: 'location',
//       subtype: 'city',
//       name: 'KAYSERI',
//       iataCode: 'ASR',
//       geoCode: [Object],
//       address: [Object],
//       timeZone: [Object]
//     },
//     {
//       type: 'location',
//       subtype: 'city',
//       name: 'ATHENS',
//       iataCode: 'ATH',
//       geoCode: [Object],
//       address: [Object],
//       timeZone: [Object]
//     },
//     {
//       type: 'location',
//       subtype: 'city',
//       name: 'ATLANTA',
//       iataCode: 'ATL',
//       geoCode: [Object],
//       address: [Object],
//       timeZone: [Object]
//     },
//     {
//       type: 'location',
//       subtype: 'city',
//       name: 'ARUBA',
//       iataCode: 'AUA',
//       geoCode: [Object],
//       address: [Object],
//       timeZone: [Object]
//     },
//     {
//       type: 'location',
//       subtype: 'city',
//       name: 'ABU DHABI',
//       iataCode: 'AUH',
//       geoCode: [Object],
//       address: [Object],
//       timeZone: [Object]
//     },
//     {
//       type: 'location',
//       subtype: 'city',
//       name: 'AUSTIN',
//       iataCode: 'AUS',
//       geoCode: [Object],
//       address: [Object],
//       timeZone: [Object]
//     },
//     {
//       type: 'location',
//       subtype: 'city',
//       name: 'ANTALYA',
//       iataCode: 'AYT',
//       geoCode: [Object],
//       address: [Object],
//       timeZone: [Object]
//     },
//     {
//       type: 'location',
//       subtype: 'city',
//       name: 'BAHRAIN',
//       iataCode: 'BAH',
//       geoCode: [Object],
//       address: [Object],
//       timeZone: [Object]
//     },
//     {
//       type: 'location',
//       subtype: 'city',
//       name: 'BARCELONA',
//       iataCode: 'BCN',
//       geoCode: [Object],
//       address: [Object],
//       timeZone: [Object]
//     },
//     {
//       type: 'location',
//       subtype: 'city',
//       name: 'BELGRADE',
//       iataCode: 'BEG',
//       geoCode: [Object],
//       address: [Object],
//       timeZone: [Object]
//     },
//     {
//       type: 'location',
//       subtype: 'city',
//       name: 'BERLIN',
//       iataCode: 'BER',
//       geoCode: [Object],
//       address: [Object],
//       timeZone: [Object]
//     },
//     {
//       type: 'location',
//       subtype: 'city',
//       name: 'BEIRUT',
//       iataCode: 'BEY',
//       geoCode: [Object],
//       address: [Object],
//       timeZone: [Object]
//     },
//     {
//       type: 'location',
//       subtype: 'city',
//       name: 'BELFAST',
//       iataCode: 'BFS',
//       geoCode: [Object],
//       address: [Object],
//       timeZone: [Object]
//     },
//     {
//       type: 'location',
//       subtype: 'city',
//       name: 'BERGEN',
//       iataCode: 'BGO',
//       geoCode: [Object],
//       address: [Object],
//       timeZone: [Object]
//     },
//     {
//       type: 'location',
//       subtype: 'city',
//       name: 'BIRMINGHAM',
//       iataCode: 'BHX',
//       geoCode: [Object],
//       address: [Object],
//       timeZone: [Object]
//     },
//     {
//       type: 'location',
//       subtype: 'city',
//       name: 'BILBAO',
//       iataCode: 'BIO',
//       geoCode: [Object],
//       address: [Object],
//       timeZone: [Object]
//     },
//     {
//       type: 'location',
//       subtype: 'city',
//       name: 'BANJUL',
//       iataCode: 'BJL',
//       geoCode: [Object],
//       address: [Object],
//       timeZone: [Object]
//     },
//     {
//       type: 'location',
//       subtype: 'city',
//       name: 'BEIJING',
//       iataCode: 'BJS',
//       geoCode: [Object],
//       address: [Object],
//       timeZone: [Object]
//     },
//     {
//       type: 'location',
//       subtype: 'city',
//       name: 'BODRUM',
//       iataCode: 'BJV',
//       geoCode: [Object],
//       address: [Object],
//       timeZone: [Object]
//     },
//     {
//       type: 'location',
//       subtype: 'city',
//       name: 'BANGKOK',
//       iataCode: 'BKK',
//       geoCode: [Object],
//       address: [Object],
//       timeZone: [Object]
//     },
//     {
//       type: 'location',
//       subtype: 'city',
//       name: 'BILLUND',
//       iataCode: 'BLL',
//       geoCode: [Object],
//       address: [Object],
//       timeZone: [Object]
//     },
//     {
//       type: 'location',
//       subtype: 'city',
//       name: 'BOLOGNA',
//       iataCode: 'BLQ',
//       geoCode: [Object],
//       address: [Object],
//       timeZone: [Object]
//     },
//     {
//       type: 'location',
//       subtype: 'city',
//       name: 'BENGALURU',
//       iataCode: 'BLR',
//       geoCode: [Object],
//       address: [Object],
//       timeZone: [Object]
//     },
//     {
//       type: 'location',
//       subtype: 'city',
//       name: 'BORDEAUX',
//       iataCode: 'BOD',
//       geoCode: [Object],
//       address: [Object],
//       timeZone: [Object]
//     },
//     {
//       type: 'location',
//       subtype: 'city',
//       name: 'BOGOTA',
//       iataCode: 'BOG',
//       geoCode: [Object],
//       address: [Object],
//       timeZone: [Object]
//     },
//     {
//       type: 'location',
//       subtype: 'city',
//       name: 'BURGAS',
//       iataCode: 'BOJ',
//       geoCode: [Object],
//       address: [Object],
//       timeZone: [Object]
//     },
//     {
//       type: 'location',
//       subtype: 'city',
//       name: 'MUMBAI',
//       iataCode: 'BOM',
//       geoCode: [Object],
//       address: [Object],
//       timeZone: [Object]
//     },
//     {
//       type: 'location',
//       subtype: 'city',
//       name: 'BONAIRE',
//       iataCode: 'BON',
//       geoCode: [Object],
//       address: [Object],
//       timeZone: [Object]
//     },
//     {
//       type: 'location',
//       subtype: 'city',
//       name: 'BOSTON',
//       iataCode: 'BOS',
//       geoCode: [Object],
//       address: [Object],
//       timeZone: [Object]
//     },
//     {
//       type: 'location',
//       subtype: 'city',
//       name: 'BREMEN',
//       iataCode: 'BRE',
//       geoCode: [Object],
//       address: [Object],
//       timeZone: [Object]
//     },
//     {
//       type: 'location',
//       subtype: 'city',
//       name: 'BARI',
//       iataCode: 'BRI',
//       geoCode: [Object],
//       address: [Object],
//       timeZone: [Object]
//     },
//     {
//       type: 'location',
//       subtype: 'city',
//       name: 'BRISTOL',
//       iataCode: 'BRS',
//       geoCode: [Object],
//       address: [Object],
//       timeZone: [Object]
//     },
//     {
//       type: 'location',
//       subtype: 'city',
//       name: 'BRUSSELS',
//       iataCode: 'BRU',
//       geoCode: [Object],
//       address: [Object],
//       timeZone: [Object]
//     },
//     {
//       type: 'location',
//       subtype: 'city',
//       name: 'BUDAPEST',
//       iataCode: 'BUD',
//       geoCode: [Object],
//       address: [Object],
//       timeZone: [Object]
//     },
//     {
//       type: 'location',
//       subtype: 'city',
//       name: 'BUENOS AIRES',
//       iataCode: 'BUE',
//       geoCode: [Object],
//       address: [Object],
//       timeZone: [Object]
//     },
//     {
//       type: 'location',
//       subtype: 'city',
//       name: 'BUCHAREST',
//       iataCode: 'BUH',
//       geoCode: [Object],
//       address: [Object],
//       timeZone: [Object]
//     },
//     {
//       type: 'location',
//       subtype: 'city',
//       name: 'BOA VISTA ISLAND',
//       iataCode: 'BVC',
//       geoCode: [Object],
//       address: [Object],
//       timeZone: [Object]
//     },
//     {
//       type: 'location',
//       subtype: 'city',
//       name: 'CAGLIARI',
//       iataCode: 'CAG',
//       geoCode: [Object],
//       address: [Object],
//       timeZone: [Object]
//     },
//     {
//       type: 'location',
//       subtype: 'city',
//       name: 'CAIRO',
//       iataCode: 'CAI',
//       geoCode: [Object],
//       address: [Object],
//       timeZone: [Object]
//     },
//     {
//       type: 'location',
//       subtype: 'city',
//       name: 'GUANGZHOU',
//       iataCode: 'CAN',
//       geoCode: [Object],
//       address: [Object],
//       timeZone: [Object]
//     },
//     {
//       type: 'location',
//       subtype: 'city',
//       name: 'KERKYRA',
//       iataCode: 'CFU',
//       geoCode: [Object],
//       address: [Object],
//       timeZone: [Object]
//     },
//     {
//       type: 'location',
//       subtype: 'city',
//       name: 'COLOGNE/BONN',
//       iataCode: 'CGN',
//       geoCode: [Object],
//       address: [Object],
//       timeZone: [Object]
//     },
//     {
//       type: 'location',
//       subtype: 'city',
//       name: 'CHICAGO',
//       iataCode: 'CHI',
//       geoCode: [Object],
//       address: [Object],
//       timeZone: [Object]
//     },
//     {
//       type: 'location',
//       subtype: 'city',
//       name: 'CHANIA',
//       iataCode: 'CHQ',
//       geoCode: [Object],
//       address: [Object],
//       timeZone: [Object]
//     },
//     {
//       type: 'location',
//       subtype: 'city',
//       name: 'CLUJ NAPOCA',
//       iataCode: 'CLJ',
//       geoCode: [Object],
//       address: [Object],
//       timeZone: [Object]
//     },
//     {
//       type: 'location',
//       subtype: 'city',
//       name: 'CASABLANCA',
//       iataCode: 'CMN',
//       geoCode: [Object],
//       address: [Object],
//       timeZone: [Object]
//     },
//     {
//       type: 'location',
//       subtype: 'city',
//       name: 'COPENHAGEN',
//       iataCode: 'CPH',
//       geoCode: [Object],
//       address: [Object],
//       timeZone: [Object]
//     },
//     {
//       type: 'location',
//       subtype: 'city',
//       name: 'CAPE TOWN',
//       iataCode: 'CPT',
//       geoCode: [Object],
//       address: [Object],
//       timeZone: [Object]
//     },
//     {
//       type: 'location',
//       subtype: 'city',
//       name: 'CATANIA',
//       iataCode: 'CTA',
//       geoCode: [Object],
//       address: [Object],
//       timeZone: [Object]
//     },
//     {
//       type: 'location',
//       subtype: 'city',
//       name: 'CHENGDU',
//       iataCode: 'CTU',
//       geoCode: [Object],
//       address: [Object],
//       timeZone: [Object]
//     },
//     {
//       type: 'location',
//       subtype: 'city',
//       name: 'CURACAO',
//       iataCode: 'CUR',
//       geoCode: [Object],
//       address: [Object],
//       timeZone: [Object]
//     },
//     {
//       type: 'location',
//       subtype: 'city',
//       name: 'CARDIFF',
//       iataCode: 'CWL',
//       geoCode: [Object],
//       address: [Object],
//       timeZone: [Object]
//     },
//     {
//       type: 'location',
//       subtype: 'city',
//       name: 'DUBROVNIK',
//       iataCode: 'DBV',
//       geoCode: [Object],
//       address: [Object],
//       timeZone: [Object]
//     },
//     {
//       type: 'location',
//       subtype: 'city',
//       name: 'DELHI',
//       iataCode: 'DEL',
//       geoCode: [Object],
//       address: [Object],
//       timeZone: [Object]
//     },
//     {
//       type: 'location',
//       subtype: 'city',
//       name: 'DALLAS',
//       iataCode: 'DFW',
//       geoCode: [Object],
//       address: [Object],
//       timeZone: [Object]
//     },
//     {
//       type: 'location',
//       subtype: 'city',
//       name: 'DALAMAN',
//       iataCode: 'DLM',
//       geoCode: [Object],
//       address: [Object],
//       timeZone: [Object]
//     },
//     {
//       type: 'location',
//       subtype: 'city',
//       name: 'DAMMAM',
//       iataCode: 'DMM',
//       geoCode: [Object],
//       address: [Object],
//       timeZone: [Object]
//     },
//     {
//       type: 'location',
//       subtype: 'city',
//       name: 'DOHA',
//       iataCode: 'DOH',
//       geoCode: [Object],
//       address: [Object],
//       timeZone: [Object]
//     },
//     {
//       type: 'location',
//       subtype: 'city',
//       name: 'DRESDEN',
//       iataCode: 'DRS',
//       geoCode: [Object],
//       address: [Object],
//       timeZone: [Object]
//     },
//     {
//       type: 'location',
//       subtype: 'city',
//       name: 'DORTMUND',
//       iataCode: 'DTM',
//       geoCode: [Object],
//       address: [Object],
//       timeZone: [Object]
//     },
//     {
//       type: 'location',
//       subtype: 'city',
//       name: 'DETROIT',
//       iataCode: 'DTT',
//       geoCode: [Object],
//       address: [Object],
//       timeZone: [Object]
//     },
//     {
//       type: 'location',
//       subtype: 'city',
//       name: 'DUBLIN',
//       iataCode: 'DUB',
//       geoCode: [Object],
//       address: [Object],
//       timeZone: [Object]
//     },
//     {
//       type: 'location',
//       subtype: 'city',
//       name: 'DUESSELDORF',
//       iataCode: 'DUS',
//       geoCode: [Object],
//       address: [Object],
//       timeZone: [Object]
//     },
//     {
//       type: 'location',
//       subtype: 'city',
//       name: 'DUBAI',
//       iataCode: 'DXB',
//       geoCode: [Object],
//       address: [Object],
//       timeZone: [Object]
//     },
//     {
//       type: 'location',
//       subtype: 'city',
//       name: 'BASEL MULHOUSE',
//       iataCode: 'EAP',
//       geoCode: [Object],
//       address: [Object],
//       timeZone: [Object]
//     },
//     {
//       type: 'location',
//       subtype: 'city',
//       name: 'ERBIL',
//       iataCode: 'EBL',
//       geoCode: [Object],
//       address: [Object],
//       timeZone: [Object]
//     },
//     {
//       type: 'location',
//       subtype: 'city',
//       name: 'EDINBURGH',
//       iataCode: 'EDI',
//       geoCode: [Object],
//       address: [Object],
//       timeZone: [Object]
//     },
//     {
//       type: 'location',
//       subtype: 'city',
//       name: 'KEFALLINIA',
//       iataCode: 'EFL',
//       geoCode: [Object],
//       address: [Object],
//       timeZone: [Object]
//     },
//     {
//       type: 'location',
//       subtype: 'city',
//       name: 'EINDHOVEN',
//       iataCode: 'EIN',
//       geoCode: [Object],
//       address: [Object],
//       timeZone: [Object]
//     },
//     {
//       type: 'location',
//       subtype: 'city',
//       name: 'ELAZIG',
//       iataCode: 'EZS',
//       geoCode: [Object],
//       address: [Object],
//       timeZone: [Object]
//     },
//     {
//       type: 'location',
//       subtype: 'city',
//       name: 'FARO',
//       iataCode: 'FAO',
//       geoCode: [Object],
//       address: [Object],
//       timeZone: [Object]
//     },
//     {
//       type: 'location',
//       subtype: 'city',
//       name: 'FES',
//       iataCode: 'FEZ',
//       geoCode: [Object],
//       address: [Object],
//       timeZone: [Object]
//     },
//     {
//       type: 'location',
//       subtype: 'city',
//       name: 'FLORENCE',
//       iataCode: 'FLR',
//       geoCode: [Object],
//       address: [Object],
//       timeZone: [Object]
//     },
//     {
//       type: 'location',
//       subtype: 'city',
//       name: 'MUENSTER/OSNABRUECK',
//       iataCode: 'FMO',
//       geoCode: [Object],
//       address: [Object],
//       timeZone: [Object]
//     },
//     {
//       type: 'location',
//       subtype: 'city',
//       name: 'FUNCHAL',
//       iataCode: 'FNC',
//       geoCode: [Object],
//       address: [Object],
//       timeZone: [Object]
//     },
//     {
//       type: 'location',
//       subtype: 'city',
//       name: 'FORTALEZA',
//       iataCode: 'FOR',
//       geoCode: [Object],
//       address: [Object],
//       timeZone: [Object]
//     },
//     {
//       type: 'location',
//       subtype: 'city',
//       name: 'FRANKFURT',
//       iataCode: 'FRA',
//       geoCode: [Object],
//       address: [Object],
//       timeZone: [Object]
//     },
//     {
//       type: 'location',
//       subtype: 'city',
//       name: 'FUERTEVENTURA',
//       iataCode: 'FUE',
//       geoCode: [Object],
//       address: [Object],
//       timeZone: [Object]
//     },
//     {
//       type: 'location',
//       subtype: 'city',
//       name: 'GDANSK',
//       iataCode: 'GDN',
//       geoCode: [Object],
//       address: [Object],
//       timeZone: [Object]
//     },
//     {
//       type: 'location',
//       subtype: 'city',
//       name: 'GLASGOW',
//       iataCode: 'GLA',
//       geoCode: [Object],
//       address: [Object],
//       timeZone: [Object]
//     },
//     {
//       type: 'location',
//       subtype: 'city',
//       name: 'GENOA',
//       iataCode: 'GOA',
//       geoCode: [Object],
//       address: [Object],
//       timeZone: [Object]
//     },
//     {
//       type: 'location',
//       subtype: 'city',
//       name: 'GOTEBORG',
//       iataCode: 'GOT',
//       geoCode: [Object],
//       address: [Object],
//       timeZone: [Object]
//     },
//     {
//       type: 'location',
//       subtype: 'city',
//       name: 'GIRONA',
//       iataCode: 'GRO',
//       geoCode: [Object],
//       address: [Object],
//       timeZone: [Object]
//     },
//     {
//       type: 'location',
//       subtype: 'city',
//       name: 'GRONINGEN',
//       iataCode: 'GRQ',
//       geoCode: [Object],
//       address: [Object],
//       timeZone: [Object]
//     },
//     {
//       type: 'location',
//       subtype: 'city',
//       name: 'GRAZ',
//       iataCode: 'GRZ',
//       geoCode: [Object],
//       address: [Object],
//       timeZone: [Object]
//     },
//     {
//       type: 'location',
//       subtype: 'city',
//       name: 'ATYRAU',
//       iataCode: 'GUW',
//       geoCode: [Object],
//       address: [Object],
//       timeZone: [Object]
//     },
//     ... 165 more items
//   ],
//   parsed: true
// }

// #################################################################################
